package com.easyPoint.service;

import com.easyPoint.pojo.tourism.TourismOrderInfo;
import com.easyPoint.pojo.tourism.TravelOrderInfo;
import com.easyPoint.pojo.tourism.VehicleInfo;
import com.easyPoint.pojo.tourism.dto.DriverInfoDto;
import com.easyPoint.pojo.tourism.dto.PartTourismOrderInfoDto;

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
    List<PartTourismOrderInfoDto> findListPageNumTourismOrderInfo(int pageNum);

    //为订单安排车辆信息
    int addDriverInfoToTourismOrder(TourismOrderInfo tourismOrderInfo);

    //更改租车订单状态，完成结单
    int updateTourismOrderState(int travelOrderId);

    //查询已安排订单车辆信息
    DriverInfoDto findDriverInfoByTravelOrderId(int travelOrderId);

    //用户进入租车页面查询车辆类型
    List<VehicleInfo> findAllVehicleInfo();
    //添加订单
    int addTourismOrder(TourismOrderInfo tourismOrderInfo);

    //出行模块订单，租车与包车共享
    List<TravelOrderInfo> findListTravelOrderByUid(int uid);

    //用户查询租车订单详情信息
    Object findTravelOrderDetailInfo(int travelOrderId, int type);
    //修改出发日期
    int updateTourismOrderDepartureTime(String departureTime,
                                        String beModifiedTime,
                                        String travelOrderId);
}
