package com.easyPoint.service.miniprogram.travel.Impl;

import com.easyPoint.utils.DateUtil;
import com.easyPoint.utils.MiniProConstants;
import com.easyPoint.utils.NotifyUrlConstants;
import com.easyPoint.dao.travel.TourismInfoDao;
import com.easyPoint.dto.pay.MiniPaymentDto;
import com.easyPoint.dto.pay.PaymentDto;
import com.easyPoint.dto.template.MessageTemplateDto;
import com.easyPoint.pojo.travel.TourismOrderInfo;
import com.easyPoint.pojo.travel.TourismRefundInfo;
import com.easyPoint.pojo.travel.VehicleInfo;
import com.easyPoint.service.miniprogram.travel.TourismInfoService;
import com.easyPoint.service.pay.WxPayService;
import com.easyPoint.service.template.TemplateMessageService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.*;
import java.util.concurrent.TimeUnit;

@Service
public class TourismInfoServiceImpl implements TourismInfoService {
    public static final Logger log = LoggerFactory.getLogger(TourismInfoServiceImpl.class);
    @Autowired
    TourismInfoDao tourismInfoDao;

    @Autowired
    WxPayService wxPayService;

    @Autowired
    TemplateMessageService templateMessageService;

    @Autowired
    RedisTemplate<String,Object> redisTemplate;

    //生成预订单并发起支付，用于支付完成后保存订单到数据库
    @Override
    public MiniPaymentDto addAdvanceOrder(int uid, TourismOrderInfo tourismOrderInfo, PaymentDto paymentDto) throws Exception {
        //数据库保存以元为单位，微信支付以分为单位
        paymentDto.setTotal_fee((int)(tourismOrderInfo.getPayMoney()*100));
        System.out.println("----金额："+ paymentDto.getTotal_fee());
        //掉用统一支付订单
        Map map = wxPayService.requestWxPay(paymentDto, uid, NotifyUrlConstants.TOURISM_NOTIFY_URL);
        //返回商户订单号
        String outTradeNo = map.get("out_trade_no").toString();
        tourismOrderInfo.setUid(uid);
        //将预支付订单放入redis中，待支付完成后将数据放入数据库中
        redisTemplate.opsForValue().set(outTradeNo,tourismOrderInfo, 10, TimeUnit.MINUTES);
        //返回小程序支付请求参数，在小程序端调起支付功能
        MiniPaymentDto miniPaymentDto = (MiniPaymentDto)map.get("MiniPaymentDto");
        return miniPaymentDto;
    }


    //下单订票

    /**
     * 回调函数进行下单
     * outTradeNo 商户订单
     * openId 用户openId
     * @return
     */
    @Override
    public int addTourismOrder(Map<String,Object> map) {
        String outTradeNo = map.get("out_trade_no").toString();
        String openId = map.get("openid").toString();
        String transactionId = map.get("transaction_id").toString();
        //根据outTradeNo从redis中获取订单信息
        TourismOrderInfo tourismOrderInfo = (TourismOrderInfo)redisTemplate.opsForValue().get(outTradeNo);
        //为商品添加支付后的商户订单号和微信支付订单号
        tourismOrderInfo.setOutTradeNo(outTradeNo);
        tourismOrderInfo.setTransactionId(transactionId);
        //有往返，每张票的价格的一半
        if(tourismOrderInfo.getIfBack() == 1)
            tourismOrderInfo.setPayMoney(tourismOrderInfo.getPayMoney()/2);
        //生成下单时间
        Date date = new Date();
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm");
        String makeOrderTime = simpleDateFormat.format(date);
        //设置订票时间
        tourismOrderInfo.setMakeOrderTime(makeOrderTime);
        //租车订单默认为未安排状态0
        tourismOrderInfo.setState(0);
        //System.out.println(makeOrderTime);
        //出发票存入数据库
        tourismInfoDao.insertTravelOrderInfo(tourismOrderInfo);
        tourismInfoDao.insertTourismOrderInfo(tourismOrderInfo);
        //获取前端返回的值ifBack的值，判断用户是否购买了返回的票
        //0为否，1为是
        int ifBack = tourismOrderInfo.getIfBack();
        if(ifBack == 1){
            TourismOrderInfo tourismOrderInfo1 = tourismOrderInfo;
            //返回票的出发时间为购买时的返回时间
            tourismOrderInfo1.setDepartureTime(tourismOrderInfo.getBackTime());
            //出发地与目的地相反
            String backDeparturePlace = tourismOrderInfo.getDestination();
            String backDestination = tourismOrderInfo.getDeparturePlace();
            tourismOrderInfo1.setDeparturePlace(backDeparturePlace);
            tourismOrderInfo1.setDestination(backDestination);
            //将反程票插入travel_order和tourism_order表中
            tourismInfoDao.insertTravelOrderInfo(tourismOrderInfo1);
            tourismInfoDao.insertTourismOrderInfo(tourismOrderInfo1);
        }

        //下单完成后，下发模板消息
        Map map1 = new LinkedHashMap();
        Map data = new LinkedHashMap();
        map1.put("value",outTradeNo);
        map1.put("color","#4a4a4a");
        data.put("keyword1",map1);
        Map map2 = new LinkedHashMap();

        map2.put("value",tourismOrderInfo.getPayMoney());
        map2.put("color","#4a4a4a");
        data.put("keyword2",map2);
        Map map3 = new LinkedHashMap();

        map3.put("value",tourismOrderInfo.getMakeOrderTime());
        map3.put("color","#4a4a4a");
        data.put("keyword3",map3);
        Map map4 = new LinkedHashMap();

        map4.put("value","租车");
        map4.put("color","#4a4a4a");
        data.put("keyword4",map4);


        MessageTemplateDto messageTemplateDto = new MessageTemplateDto();
        messageTemplateDto.setTouser(openId);
        //小程序消息模板ID
        messageTemplateDto.setTemplate_id(MiniProConstants.TOURISM_TEMPLATE_ID);
        //预支付订单号
        String formId = redisTemplate.opsForValue().get(outTradeNo + "_prepayId").toString();
        System.out.println("prepayId =======" + formId);
        messageTemplateDto.setForm_id(formId);
        //模板数据
        messageTemplateDto.setData(data);
        messageTemplateDto.setColor("#ccc");
        messageTemplateDto.setEmphasis_keyword("keyword4.DATA");
        messageTemplateDto.setPage("pages/myindex/myindex");


        ObjectMapper objectMapper = new ObjectMapper();
        //将driverMessageDto转换为Json数据
        try{
            String param = objectMapper.writeValueAsString(messageTemplateDto);
            System.out.println(param);
            //发送模板消息，通知用户管理员已经为其租车订单安排车辆信息
            templateMessageService.sendTemplateMessage(param);
        }catch (Exception e){
            log.error("messageTemplateDto类转换为Json数据出现异常" + e);
            return 0;
        }
        return 1;
    }


    //用户进入租车页面查询车辆类型
    @Override
    public List<VehicleInfo> findAllVehicleInfo() {
        return tourismInfoDao.findAllVehicleInfo();
    }



    //修改出发日期String departureTime, String beModifiedTime, String travelOrderId
    @Override
    public int updateTourismOrderDepartureTime(String departureTime, String beModifiedTime, int travelOrderId) {
        Long date = System.currentTimeMillis();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm");
        //现在时间的后一天，如果比车辆出行时间早，则可以修改，否则不行
        String tomorrowDate = sdf.format(date + 24*60*60*1000);
        int resultCode = tourismInfoDao.updateTourismOrderDepartureTime(departureTime,tomorrowDate,travelOrderId);
        if(resultCode == 1){
            //出发日期修改成功
            resultCode = tourismInfoDao.updateTourismModifiedDate(beModifiedTime,travelOrderId);
            if(resultCode ==1)
                return 1;
            //修改日期失败
            return 0;
        }else
            return 0;
    }

    /**
     * 用户申请租车退款
     * @param uid 用户id
     * @param tourismRefundInfo:
     *                              travelOrderId 订单id
     *                              refund_reason 退款理由
     */
    @Override
    public int requestTourismOrderRefund(int uid, TourismRefundInfo tourismRefundInfo) {

        //查询退款订单的信息
        Map uidAndState = tourismInfoDao.findUidAndStateByTravelOrderId(tourismRefundInfo.getTravelOrderId());
        //判断申请用户是否为该订单的下单用户
        if(uid != Integer.parseInt(uidAndState.get("uid").toString()))
            return -1;
        //判断订单状态，处理中和退款成功的状态不能在次申请退款
        int state = Integer.parseInt(uidAndState.get("state").toString());
        if(5 == state)
            return -2;
        else if(6 == state)
            return -3;
        //生成申请退款时间
        String requestRefundTime = DateUtil.getDateTime();
        //设置申请退款时间
        tourismRefundInfo.setRequestRefundTime(requestRefundTime);
        //设置退款状为待处理
        tourismRefundInfo.setRefundState(1);
        //将申请退款信息保存到数据库
        int resultCode = tourismInfoDao.insertTourismRefund(tourismRefundInfo);
        if(resultCode != 0){
            //修改travel_order表的订单状态
            tourismInfoDao.updateTravelOrderState(5,tourismRefundInfo.getTravelOrderId());
            //保存新的tourismRefundId到tourism_order表中
            tourismInfoDao.updateTourismRefundId(tourismRefundInfo.getTravelOrderId(),tourismRefundInfo.getTourismRefundId());
        }
        //返回保存是否成功
        return resultCode;
    }
}
