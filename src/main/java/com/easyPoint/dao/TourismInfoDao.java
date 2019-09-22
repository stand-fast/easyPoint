package com.easyPoint.dao;

import com.easyPoint.pojo.tourism.TourismOrderInfo;
import com.easyPoint.pojo.tourism.VehicleInfo;
import org.apache.ibatis.annotations.Param;

import java.math.BigDecimal;
import java.util.List;

public interface TourismInfoDao {
    //查询车辆类型的信息
    List<VehicleInfo> findListVehicleInfo(int index);

    //管理员添加车辆类型
    Integer insertVehicleType(@Param("vehicleType")String vehicleType, @Param("deposit")BigDecimal deposit);

    //根据车辆类型名称，查询要添加的车辆类型是否已经存在
    VehicleInfo findVehicleInfo(String vehicleType);



    //用户支付完押金后，提交订单插入数据库
    Integer insertTourismOrderInfo(TourismOrderInfo tourismOrderInfo);

    //安排车辆，填写司机信息，更新订单表
    Integer updateTourismOrderInfoAddDriverInfo(@Param("licensePlateNumber")String licensePlateNumber,
                                                @Param("color")String color,
                                                @Param("driverName")String driverName,
                                                @Param("driverPhone")String driverPhone,
                                                @Param("tourismId")int tourismId);
}
