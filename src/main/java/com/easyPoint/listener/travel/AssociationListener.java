package com.easyPoint.listener.travel;

import com.easyPoint.dao.travel.AssociationDao;
import com.easyPoint.pojo.travel.AssociationOrderInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.connection.Message;
import org.springframework.data.redis.connection.MessageListener;
import org.springframework.data.redis.core.RedisTemplate;

public class AssociationListener implements MessageListener {
    @Autowired
    RedisTemplate<String,Object> redisTemplate;
    @Autowired
    AssociationDao associationDao;

    @Override
    public void onMessage(Message message, byte[] bytes) {
        String expireKey = new String(message.getBody());
        System.out.println("从channel为："+new String(message.getChannel())+"获取一条新的消息，消息内容为："+new String(message.getBody()));
        if(expireKey.contains("Association_expire:")){
            String outTradeNo = expireKey.split(":")[1];
            AssociationOrderInfo associationOrderInfo = (AssociationOrderInfo)redisTemplate.opsForValue().get(outTradeNo);
            int ticketId = associationOrderInfo.getTicketId();
            int travelNum = associationOrderInfo.getTravelNum();
            //恢复剩余车票
            associationDao.updateExpireTicketSeatSurplus(ticketId,travelNum);
            //删除缓存中与该订单相关信息
            redisTemplate.delete(outTradeNo);
        }
        System.out.println(new String(bytes));


    }
}
