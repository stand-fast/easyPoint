package com.easyPoint.service;

import com.easyPoint.pojo.tourism.TourismOrderInfo;
import com.easyPoint.pojo.tourism.VehicleInfo;

import java.math.BigDecimal;
import java.util.List;

public interface TourismInfoService {

    //根据分页查询已经添加的车辆类型
    List<VehicleInfo> findListPageNumVehicleInfo(int pageNum);

    //添加车辆类型
    Integer insertVehicleType(String vehicleType, BigDecimal deposit);

    //查询所有租车订单


    //添加订单
    Integer addTourismOrder(TourismOrderInfo tourismOrderInfo);

    //为订单安排车辆信息
    Integer addDriverInfoToTourismOrder(String licensePlateNumber,
                                        String color,
                                        String driverName,
                                        String driverPhone,
                                        int tourismId);
}
