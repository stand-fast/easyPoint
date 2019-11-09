package com.easyPoint.service.pay.Impl;

import com.easyPoint.util.*;
import com.easyPoint.dao.mine.UserInfoDao;
import com.easyPoint.dao.travel.TourismInfoDao;
import com.easyPoint.dto.pay.PaymentDto;
import com.easyPoint.dto.pay.MiniPaymentDto;
import com.easyPoint.dto.pay.RefundParamDto;
import com.easyPoint.pojo.travel.TourismOrderInfo;
import com.easyPoint.service.pay.WxPayService;
import org.apache.commons.codec.digest.DigestUtils;


import org.dom4j.Document;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;

import java.io.InputStream;
import java.util.*;
import java.util.concurrent.TimeUnit;

@Service
public class WxPayServiceImpl implements WxPayService {

    @Autowired
    private UserInfoDao userInfoDao;

    @Autowired
    private TourismInfoDao tourismInfoDao;

    @Autowired
    private RedisTemplate<String,String> redisTemplate;

    //发起微信支付
    /**
     *  uid
     *  totalFee 订单总金额，单位为分。
     *  body  商品简单描述，该字段请按照规范传递。
     * @return MiniPaymentDto
     */
    @Override
    public Map requestWxPay(PaymentDto paymentDto, int uid, String notifyUrl) throws Exception {
        String openId = userInfoDao.findUserOpenIdByUid(uid);
        System.out.println("-------------------"+openId);
        //        //随机字符串，长度要求在32位以内
        String nonceStr = RandomStrUtil.createNonceStr();
        //商品订单号,用户下订单后台生成
        String out_trade_no= RandomStrUtil.createOutTradeNo(uid);
        paymentDto.setAppid(MiniProConstants.APPID);
        paymentDto.setMch_id(WxPayConstants.MCH_ID);
        paymentDto.setNonce_str(nonceStr);
        paymentDto.setOut_trade_no(out_trade_no);
        paymentDto.setSpbill_create_ip(WxPayConstants.SPBILL_CREATE_IP); //客户端ip
        paymentDto.setNotify_url(notifyUrl);//通知地址(需要是外网可以访问的)
        paymentDto.setTrade_type(WxPayConstants.TRADE_TYPE);
        paymentDto.setOpenid(openId);
        String preSign = paymentDto.toString1();

        Map<String, Object> sParaTemp = new HashMap<>();
        sParaTemp.put("appid", paymentDto.getAppid());
        sParaTemp.put("mch_id", paymentDto.getMch_id());
        sParaTemp.put("nonce_str", paymentDto.getNonce_str());
        sParaTemp.put("body",  paymentDto.getBody());
        sParaTemp.put("out_trade_no", paymentDto.getOut_trade_no());
        sParaTemp.put("total_fee",paymentDto.getTotal_fee());
        sParaTemp.put("spbill_create_ip", paymentDto.getSpbill_create_ip());
        sParaTemp.put("notify_url",paymentDto.getNotify_url());
        sParaTemp.put("trade_type", paymentDto.getTrade_type());
        sParaTemp.put("openid", paymentDto.getOpenid());
        List keys = new ArrayList<>(sParaTemp.keySet());
        //参数名ASCII码从小到大排序（字典序）；
        Collections.sort(keys);
        String prestr = "";
        for (int i = 0; i < keys.size(); i++) {
            String key = (String) keys.get(i);
            String value =  sParaTemp.get(key) + "";
            if (i == keys.size() - 1) {// 拼接时，不包括最后一个&字符
                prestr = prestr + key + "=" + value;
            } else {
                prestr = prestr + key + "=" + value + "&";
            }
        }


        String sign = "";
        System.out.println("sign = " + prestr + WxPayConstants.KEY);
        byte[] mysignByte = (prestr + WxPayConstants.KEY).getBytes("utf-8");
        sign = DigestUtils.md5Hex(mysignByte).toUpperCase();
        paymentDto.setSign(sign);
        String result = "";
        try {
            //构造xml请求参数
            String payParam = XmlUtil.messageToXML(paymentDto);
            // 将得到的xml中有“__”应该替换成“_”
            payParam = payParam.replace("__", "_");
            System.out.println(payParam);
            //发起统一订单请求
            result = HttpRequestUtil.sendPost(WxPayConstants.WXPAY_URL,payParam);
            System.out.println("请求微信预支付接口，返回 result："+result);
            // 将解析结果存储在Map中
            Map map = new HashMap();
            InputStream in=new ByteArrayInputStream(result.getBytes());
            // 读取输入流
            SAXReader reader = new SAXReader();

            Document document = reader.read(in);
            // 得到xml根元素
            Element root = document.getRootElement();
            // 得到根元素的所有子节点
            List<Element> elementList = root.elements();
            for (Element element : elementList) {
                map.put(element.getName(), element.getText());
            }
//            Set<String> keys1 = map.keySet();
//            for(String key : keys1){
//                System.out.println(key + "=" +map.get(key));
//            }
            String prepay_id = map.get("prepay_id").toString();//返回的预付单信息
            //将prepay_id缓存到redis中，用户模板消息发送
            redisTemplate.opsForValue().set(out_trade_no + "_prepayId",prepay_id,7, TimeUnit.HOURS);
            String packageParam = new StringBuffer().append("prepay_id=").append(prepay_id).toString();
            String timeStamp = System.currentTimeMillis() / 1000 +"";
            String stringSignTemp = "appId=" + MiniProConstants.APPID + "&nonceStr=" + nonceStr + "&package=prepay_id=" + prepay_id + "&signType=MD5&timeStamp=" + timeStamp;
            //再次签名
            byte[] paySignByte = (stringSignTemp + WxPayConstants.KEY).getBytes("utf-8");
            String paysign = DigestUtils.md5Hex(paySignByte).toUpperCase();
            //小程序参数结果
            MiniPaymentDto miniPaymentDto = new MiniPaymentDto(timeStamp, packageParam, paysign, nonceStr);
            //返回结果
            Map<String,Object> resultMap = new HashMap<>();
            //返回商户订单号
            resultMap.put("out_trade_no", out_trade_no);
            resultMap.put("MiniPaymentDto" ,miniPaymentDto);
            return resultMap;
        }catch (Exception e){
            throw new Exception();
        }
    }

    /**
     * 退款申请
     * @param uid 用户id
     * @param orderId 订单id，数据库自动生成id
     * @param notifyUrl 退款成功回调地址
     * @return
     * @throws Exception
     */
    @Override
    public Map requestRefund(int uid, int orderId,int refundFee, String notifyUrl) throws Exception {
        RefundParamDto refundParamDto = new RefundParamDto();
        //根据订单编号查找微信订单号
        TourismOrderInfo tourismOrderInfo = tourismInfoDao.findTransactionId(orderId);
        //单位转换
        int totalFee = (int)(tourismOrderInfo.getPayMoney()*100);
        //随机字符串，长度要求在32位以内
        String nonceStr = RandomStrUtil.createNonceStr();
        //商品退单号
        String out_refund_no= RandomStrUtil.createOutTradeNo(uid);
        refundParamDto.setAppid(MiniProConstants.APPID);
        refundParamDto.setMch_id(WxPayConstants.MCH_ID);
        refundParamDto.setTransaction_id(tourismOrderInfo.getTransactionId());
        refundParamDto.setNonce_str(nonceStr);
        refundParamDto.setOut_refund_no(out_refund_no);
        refundParamDto.setTotal_fee(totalFee);
        refundParamDto.setRefund_fee(refundFee);
        refundParamDto.setNotify_url(notifyUrl);//通知地址(需要是外网可以访问的)

        Map<String, Object> sParaTemp = new HashMap<>();
        sParaTemp.put("appid", refundParamDto.getAppid());
        sParaTemp.put("mch_id", refundParamDto.getMch_id());
        sParaTemp.put("nonce_str", refundParamDto.getNonce_str());
        sParaTemp.put("total_fee",refundParamDto.getTotal_fee());
        sParaTemp.put("notify_url",refundParamDto.getNotify_url());
        sParaTemp.put("refund_fee",refundParamDto.getRefund_fee());
        sParaTemp.put("out_refund_no",refundParamDto.getOut_refund_no());
        sParaTemp.put("transaction_id",refundParamDto.getTransaction_id());
        List keys = new ArrayList<>(sParaTemp.keySet());
        //参数名ASCII码从小到大排序（字典序）；
        Collections.sort(keys);
        //拼接字符串
        StringBuffer stringBuffer = new StringBuffer();
        for (int i = 0; i < keys.size(); i++) {
            String key = (String) keys.get(i);
            String value =  sParaTemp.get(key) + "";
            // 拼接时，不包括最后一个&字符
            if (i == keys.size() - 1) {
                stringBuffer.append(key).append("=").append(value);
            } else {
                stringBuffer.append(key).append("=").append(value).append("&");
            }
        }
        String sign = stringBuffer.append(WxPayConstants.KEY).toString();
        System.out.println("sign = " + sign);
        byte[] signByte = sign.getBytes("utf-8");
        //MD5加密
        sign = DigestUtils.md5Hex(signByte).toUpperCase();
        refundParamDto.setSign(sign);
        String result = "";
        try {
            //构造xml请求参数
            String payParam = XmlUtil.messageToXML(refundParamDto);
            // 将得到的xml中有“__”应该替换成“_”
            payParam = payParam.replace("__", "_");
            System.out.println(payParam);
            //发起退款请求
            result = HttpRequestUtil.sendHttpsPost(payParam);
            System.out.println("请求微信退款接口，返回 result："+result);
            // 将解析结果存储在Map中
            Map map = new HashMap();
            InputStream in=new ByteArrayInputStream(result.getBytes());
            // 读取输入流
            SAXReader reader = new SAXReader();

            Document document = reader.read(in);
            // 得到xml根元素
            Element root = document.getRootElement();
            // 得到根元素的所有子节点
            List<Element> elementList = root.elements();
            for (Element element : elementList) {
                map.put(element.getName(), element.getText());
            }
            System.out.println("return_code" + "=============" + map.get("return_code"));
            System.out.println("transaction_id" +"============"+ map.get("transaction_id"));

        }catch (Exception e){
            throw new Exception();
        }
        return null;
    }
}
