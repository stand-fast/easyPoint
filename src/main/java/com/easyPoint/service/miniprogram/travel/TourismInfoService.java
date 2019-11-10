package com.easyPoint.service.miniprogram.travel;

import com.easyPoint.dto.pay.MiniPaymentDto;
import com.easyPoint.dto.pay.PaymentDto;
import com.easyPoint.pojo.travel.TourismOrderInfo;
import com.easyPoint.pojo.travel.VehicleInfo;

import java.util.List;
import java.util.Map;

public interface TourismInfoService {




    //用户进入租车页面查询车辆类型
    List<VehicleInfo> findAllVehicleInfo();

    //生成预订单并发起支付，用于支付完成后保存订单到数据库
    MiniPaymentDto addAdvanceOrder(int uid, TourismOrderInfo tourismOrderInfo, PaymentDto paymentDto) throws Exception;

    //添加订单
    int addTourismOrder(Map<String,Object> map);


    //修改出发日期
    int updateTourismOrderDepartureTime(String departureTime,
                                        String beModifiedTime,
                                        int travelOrderId);
}
