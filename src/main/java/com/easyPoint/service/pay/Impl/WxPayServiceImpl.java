package com.easyPoint.service.pay.Impl;

import com.easyPoint.Util.HttpRequestUtil;
import com.easyPoint.Util.MiniProConstants;
import com.easyPoint.Util.WxPayConstants;
import com.easyPoint.dao.mine.UserInfoDao;
import com.easyPoint.dto.pay.PaymentDto;
import com.easyPoint.dto.pay.RequestPaymentParamDto;
import com.easyPoint.service.pay.WxPayService;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.commons.codec.digest.DigestUtils;
import org.dom4j.Document;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class WxPayServiceImpl implements WxPayService {

    @Autowired
    private UserInfoDao userInfoDao;

    //发起微信支付
    /**
     *
     * @param uid
     * @param totalFee 订单总金额，单位为分。
     * @param body  商品简单描述，该字段请按照规范传递。
     * @param attachData    附加数据，在查询API和支付通知中原样返回，可作为自定义参数使用。
     */
    @Override
    public RequestPaymentParamDto requestWxPay(int uid, String totalFee, String body, String attachData) {
        String openId = userInfoDao.findUserOpenIdByUid(uid);
        //随机字符串，长度要求在32位以内
        String nonceStr = "123123112313123123123";
        //商品订单号,用户下订单后台生成
        String out_trade_no= "123456789";
        PaymentDto paymentDto = new PaymentDto();
        paymentDto.setAppid(MiniProConstants.APPID);
        paymentDto.setMch_id(WxPayConstants.MCH_ID);
        paymentDto.setNonce_str(nonceStr);
        paymentDto.setBody(body);
        paymentDto.setOut_trade_no(out_trade_no);
        paymentDto.setTotal_fee(totalFee);
        paymentDto.setSpbill_create_ip(WxPayConstants.SPBILL_CREATE_IP); //客户端ip
        paymentDto.setNotify_url(WxPayConstants.NOTIFY_URL);//通知地址(需要是外网可以访问的)
        paymentDto.setTrade_type(WxPayConstants.TRADE_TYPE);
        paymentDto.setOpenid(openId);
        String preSign = paymentDto.toString1();
        String sign = "";
        try {
            byte[] mysignByte = (preSign + WxPayConstants.KEY).getBytes("utf-8");
            sign = DigestUtils.md5Hex(mysignByte).toUpperCase();
        }catch (Exception e){}
        paymentDto.setSign(sign);
        ObjectMapper objectMapper = new ObjectMapper();
        String result = "";
        try {
            String payParam = objectMapper.writeValueAsString(paymentDto);
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
            System.out.println(map.get("return_msg"));

        }catch (Exception e){}



        return null;
    }
}
