package com.easyPoint.service.miniprogram.travel.Impl;

import com.easyPoint.dao.travel.AssociationDao;
import com.easyPoint.dto.pay.MiniPaymentDto;
import com.easyPoint.dto.pay.PaymentDto;
import com.easyPoint.dto.travel.MiniBuyTicketPageDto;
import com.easyPoint.pojo.travel.*;
import com.easyPoint.service.miniprogram.travel.AssociationService;
import com.easyPoint.service.pay.WxPayService;
import com.easyPoint.utils.DateUtil;
import com.easyPoint.utils.NotifyUrlConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.*;
import java.util.concurrent.TimeUnit;

@Service
public class AssociationServiceImpl implements AssociationService {

    @Autowired
    AssociationDao associationDao;

    @Autowired
    WxPayService wxPayService;

    @Autowired
    RedisTemplate<String,Object> redisTemplate;
    /**
     * 小程序查看所有同乡会名称
     * @return 同乡会
     */
    @Override
    public List<Association> findAllAssociations() {
        return associationDao.getAllAssociation();
    }

    //根据同乡会id查询车票信息
    public List<MiniBuyTicketPageDto> findTicketsById(int associationId){
        return associationDao.findTicketsById(associationId);
    }


    /**
     * 用户提交订单,生成预订单
     * @param uid 用户id
     * @param ticketId 车票id
     * @param travelNum 购票数量
     * @param passenger 乘客人信息
     * @return
     */
    public Map addAdvanceOrder(int uid, int ticketId, int travelNum, String passenger, String phone) throws Exception {
        Map resultMap = new HashMap(2);
        //乘客人的数量少于购票数
        if(passenger == "" || phone == ""){
            resultMap.put("code",-1);
            return resultMap;
        }
        //判断用户输入乘客信息是否超过最大限长
        if(passenger.length()>25 || phone.length()> 11) {
            resultMap.put("code", -5);
            return resultMap;
        }
        //在并发情况下，最多重试5次
        int result = 0;//是否修改剩余车票成功标识
        Ticket ticket = null;
        for(int i=0;i<5;i++){
            //根据ticketId查询车票信息
            ticket = associationDao.findTicketInfoByid(ticketId);
            if(ticket == null){
                resultMap.put("code",-4);
                return resultMap;
            }
            //如果剩余票数少于购票票数
            if(ticket.getSeatSurplus() < travelNum){
                resultMap.put("code",-2);
                return resultMap;
            }
            //修改车票剩余数量
            result = associationDao.updateTicketSeatSurplus(ticketId,ticket.getSeatSurplus() - travelNum,ticket.getVersion());
            if(result == 1)
                break;
        }
        //当前抢票人数过多，购票失败
        if(result == 0){
            resultMap.put("code", -3);
            return resultMap;
       }
        //抢票成功，发起预支付请求参数设置
        PaymentDto paymentDto = new PaymentDto();
        //票价*票数*100（单位转化）
        int totalFee = (int)(ticket.getPrice() * travelNum *100);
        String body = "易点出行同乡会购车票";
        paymentDto.setTotal_fee(totalFee);
        paymentDto.setBody(body);
        //发起支付请求
        Map map = wxPayService.requestWxPay(paymentDto,uid, NotifyUrlConstants.ASSOCIATION_TICKET_NOTIFY_URL);
        //返回商户订单号
        String outTradeNo = map.get("out_trade_no").toString();
        //缓存订单
        AssociationOrderInfo associationOrderInfo = new AssociationOrderInfo();
        //设置订单用户id
        associationOrderInfo.setUid(uid);
        //设置订单购票的id
        associationOrderInfo.setTicketId(ticketId);
        //设置订单出发地点
        associationOrderInfo.setDeparturePlace(ticket.getDeparturePlace());
        //设置订单目的地
        associationOrderInfo.setDestination(ticket.getDestination());
        //设置乘客数量
        associationOrderInfo.setTravelNum(travelNum);
        //设置出发时间
        associationOrderInfo.setDepartureTime(ticket.getDepartureDay() + " " + ticket.getDepartureTime());
        //设置订单类型
        associationOrderInfo.setType(1);
        //设置票价
        associationOrderInfo.setPrice(new BigDecimal(ticket.getPrice()));

        associationOrderInfo.setPassenger(passenger);

        associationOrderInfo.setPhone(phone);
        //将预支付订单放入redis中，待支付完成后将数据放入数据库中
        redisTemplate.opsForValue().set("Association_expire:"+outTradeNo,1,10,TimeUnit.MINUTES);
        redisTemplate.opsForValue().set(outTradeNo,associationOrderInfo);
        MiniPaymentDto miniPaymentDto = (MiniPaymentDto)map.get("MiniPaymentDto");
        resultMap.put("code", 1);
        resultMap.put("MiniPaymentDto", miniPaymentDto);
        return resultMap;
    }

    /**
     * 支付成功，添加订单
     * @param map
     * @return
     */
    @Override
    public int addAssociationOrder(Map<String, Object> map) {
        Set<String> key = map.keySet();
        for(String s:key){
            System.out.println(s + " " + map.get(s));
        }
        String outTradeNo = map.get("out_trade_no").toString();
        String transactionId = map.get("transaction_id").toString();
        String makeOrderTime = DateUtil.getDateTime();
        //根据outTradeNo从redis中获取订单信息
        AssociationOrderInfo associationOrderInfo = (AssociationOrderInfo)redisTemplate.opsForValue().get(outTradeNo);

        redisTemplate.delete("Association_expire:"+outTradeNo);
        redisTemplate.delete(outTradeNo);

        associationOrderInfo.setOutTradeNo(outTradeNo);
        associationOrderInfo.setTransactionId(transactionId);
        associationOrderInfo.setMakeOrderTime(makeOrderTime);
        //3:已付款
        associationOrderInfo.setState(3);
        //将订单保存到数据库
        associationDao.insertTravelOrderInfo(associationOrderInfo);
        associationDao.insertAssociationOrderInfo(associationOrderInfo);

        return 1;
    }

    /**
     * 用户预约预售票
     * @param uid
     * @param ticketId
     * @param travelNum
     * @param passengers
     * @return
     */
    @Override
    public int orderAdvanceSaleTicket(int uid, int ticketId, int travelNum, String passenger, String phone) {
        if(passenger == "" || phone == ""){
            return -1;
        }
        //判断用户输入乘客信息是否超过最大限长
        if(passenger.length()>25 || phone.length()> 11) {
            return -3;
        }
        Ticket ticket = associationDao.findTicketInfoByid(ticketId);
        if(ticket == null)
            return -2;
        AssociationOrderInfo associationOrderInfo = new AssociationOrderInfo();
        associationOrderInfo.setUid(uid);
        associationOrderInfo.setTicketId(ticketId);
        associationOrderInfo.setDeparturePlace(ticket.getDeparturePlace());
        associationOrderInfo.setDestination(ticket.getDestination());
        associationOrderInfo.setTravelNum(travelNum);
        associationOrderInfo.setDepartureTime(ticket.getDepartureDay() + " " + ticket.getDepartureTime());
        associationOrderInfo.setType(1);
        String makeOrderTime = DateUtil.getDateTime();
        associationOrderInfo.setMakeOrderTime(makeOrderTime);
        associationOrderInfo.setPrice(new BigDecimal(ticket.getPrice()));
        //4:已预约
        associationOrderInfo.setState(4);
        associationOrderInfo.setPassenger(passenger);
        associationOrderInfo.setPhone(phone);
        //将订单保存到数据库
        associationDao.insertTravelOrderInfo(associationOrderInfo);
        associationDao.insertAssociationOrderInfo(associationOrderInfo);

        //修改车票预约人数
        while(true){
            int result = associationDao.updateTicketSeatSurplus(ticketId,ticket.getSeatSurplus() + travelNum,ticket.getVersion());
            if(result == 1)
                break;
        }

        return 1;
    }
}
