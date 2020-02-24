package com.easyPoint.service.miniprogram.travel;

import com.easyPoint.dto.travel.MiniTourismRefundPageDto;
import com.easyPoint.dto.travel.TourismRefundPageDto;
import com.easyPoint.pojo.travel.TravelOrderInfo;

import java.util.List;

public interface TravelInfoService {
    //出行模块订单，租车与包车共享
    List<TravelOrderInfo> findListTravelOrderByUid(int uid);

    //用户查询租车订单详情信息
    Object findTravelOrderDetailInfo(int travelOrderId, int type);

    //用户查看退款状态页面的信息
    MiniTourismRefundPageDto findRefundPageInfoById(int tourismRefundId);

    //用户取消退款
    int cancelTourismRefund(int tourismRefundId);


}
