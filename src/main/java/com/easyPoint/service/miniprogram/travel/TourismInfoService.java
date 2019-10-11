package com.easyPoint.service.miniprogram.travel;

import com.easyPoint.pojo.travel.TourismOrderInfo;
import com.easyPoint.pojo.travel.VehicleInfo;

import java.util.List;

public interface TourismInfoService {




    //用户进入租车页面查询车辆类型
    List<VehicleInfo> findAllVehicleInfo();

    //添加订单
    int addTourismOrder(TourismOrderInfo tourismOrderInfo);


    //修改出发日期
    int updateTourismOrderDepartureTime(String departureTime,
                                        String beModifiedTime,
                                        int travelOrderId);
}
