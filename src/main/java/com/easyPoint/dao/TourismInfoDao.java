package com.easyPoint.dao;

import com.easyPoint.pojo.tourism.TourismOrderInfo;
import com.easyPoint.pojo.tourism.TravelOrderInfo;
import com.easyPoint.pojo.tourism.VehicleInfo;
import com.easyPoint.pojo.tourism.dto.DriverInfo;
import com.easyPoint.pojo.tourism.dto.PartTourismOrderInfo;
import org.apache.ibatis.annotations.Param;

import java.math.BigDecimal;
import java.util.List;

/**
 * 关于租车模块的dao
 * FJW
 */
public interface TourismInfoDao {

    //查询车辆类型总数
    Integer countVehicleTypeNum();
    //查询车辆类型的信息
    List<VehicleInfo> findListVehicleInfo(int index);

    //管理员添加车辆类型
    Integer insertVehicleType(@Param("vehicleType")String vehicleType, @Param("deposit")BigDecimal deposit);

    //根据车辆类型名称，查询要添加的车辆类型是否已经存在
    VehicleInfo findVehicleInfo(String vehicleType);


    //查询订单总数
    Integer countTourismOrderNum();

    //分页查询租车订单信息
    List<PartTourismOrderInfo> findListTourismOrderInfo(int index);

    //用户支付完押金后，提交订单插入数据库,分别插入travel_order、tourism_order表中
    Integer insertTravelOrderInfo(TourismOrderInfo tourismOrderInfo);
    Integer insertTourismOrderInfo(TourismOrderInfo tourismOrderInfo);

    //安排车辆，填写司机信息，更新订单表，更新travel_order表的订单状态
    Integer updateTourismOrderInfoAddDriverInfo(TourismOrderInfo tourismOrderInfo);
    //安排车辆,结单修改订单状态
    Integer updateTravelOrderState(@Param("state") int state, @Param("travelOrderId") int travelOrderId);

    //查询给租车订单安排的车辆信息
    DriverInfo findDriverInfoByTravelOrderId(int travelOrderId);
}
