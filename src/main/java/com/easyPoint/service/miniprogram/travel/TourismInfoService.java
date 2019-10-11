package com.easyPoint.service.miniprogram.travel;

import com.easyPoint.dto.Result;
import com.easyPoint.pojo.tourism.TourismOrderInfo;
import com.easyPoint.pojo.tourism.TravelOrderInfo;
import com.easyPoint.pojo.tourism.VehicleInfo;
import com.easyPoint.pojo.tourism.dto.DriverInfoDto;
import com.easyPoint.pojo.tourism.dto.PartTourismOrderInfoDto;

import java.math.BigDecimal;
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
