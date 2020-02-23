package com.easyPoint.service.miniprogram.travel;

import com.easyPoint.dto.travel.MiniBuyTicketPageDto;
import com.easyPoint.pojo.travel.Association;

import java.util.List;
import java.util.Map;

public interface AssociationService {
    //小程序查看所有同乡会名称
    List<Association> findAllAssociations();

    //根据同乡会id查询车票信息
    List<MiniBuyTicketPageDto> findTicketsById(int associationId);

    //用户提交订单,生成预订单,缺乘客
    Map addAdvanceOrder(int uid, int ticketId, int travelNum, String passenger, String phone) throws Exception;

    //支付成功，添加订单
    int addAssociationOrder(Map<String,Object> map);

    //用户预约预售票
    int orderAdvanceSaleTicket(int uid, int ticketId, int travelNum, String passenger, String phone);
}
