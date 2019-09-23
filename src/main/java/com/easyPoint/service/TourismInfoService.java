package com.easyPoint.service;

import com.easyPoint.pojo.tourism.TourismOrderInfo;
import com.easyPoint.pojo.tourism.TravelOrderInfo;
import com.easyPoint.pojo.tourism.VehicleInfo;
import com.easyPoint.pojo.tourism.dto.DriverInfo;
import com.easyPoint.pojo.tourism.dto.PartTourismOrderInfo;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

public interface TourismInfoService {

    //加载所有页面数
    Map getTotalPageAndFirstVehicleInfoList();

    //根据分页查询已经添加的车辆类型
    List<VehicleInfo> findListPageNumVehicleInfo(int pageNum);

    //添加车辆类型
    int insertVehicleType(String vehicleType, BigDecimal deposit);

    //查询加载的所有页面数并返回首页的租车订单信息
    Map findTotalPageAndTourismOrderInfoList();

    //查询第pageNum页的租车订单数据
    List<PartTourismOrderInfo> findListPageNumTourismOrderInfo(int pageNum);

    //为订单安排车辆信息
    int addDriverInfoToTourismOrder(TourismOrderInfo tourismOrderInfo);

    //更改租车订单状态，完成结单
    int updateTourismOrderState(int travelOrderId);

    //查询已安排订单车辆信息
    DriverInfo findDriverInfoByTravelOrderId(int travelOrderId);

    //添加订单
    int addTourismOrder(TourismOrderInfo tourismOrderInfo);


}
