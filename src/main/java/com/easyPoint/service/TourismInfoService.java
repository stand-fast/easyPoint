package com.easyPoint.service;

import com.easyPoint.pojo.tourism.TourismOrderInfo;
import com.easyPoint.pojo.tourism.TravelOrderInfo;
import com.easyPoint.pojo.tourism.VehicleInfo;

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

    //为订单安排车辆信息
    int addDriverInfoToTourismOrder(TourismOrderInfo tourismOrderInfo);

    //添加订单
    int addTourismOrder(TourismOrderInfo tourismOrderInfo);


}
