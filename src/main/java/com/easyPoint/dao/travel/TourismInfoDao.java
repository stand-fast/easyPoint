package com.easyPoint.dao.travel;

import com.easyPoint.dto.travel.DriverInfoDto;
import com.easyPoint.dto.travel.PartTourismOrderInfoDto;
import com.easyPoint.dto.travel.TourismOrderDetailInfoDto;
import com.easyPoint.pojo.travel.TourismOrderInfo;
import com.easyPoint.pojo.travel.TravelOrderInfo;
import com.easyPoint.pojo.travel.VehicleInfo;

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
    //分页查询车辆类型的信息
    List<VehicleInfo> findListVehicleInfo(int index);

    //管理员添加车辆类型
    Integer insertVehicleType(@Param("vehicleType") String vehicleType, @Param("deposit") BigDecimal deposit);

    //根据车辆类型名称已经删除状态，查询要添加的车辆类型是否已经存在
    VehicleInfo findVehicleInfo(String vehicleType);

    //删除车辆类型
    int deleteVehicleById(int vehicleId);

    //查询订单总数
    Integer countTourismOrderNum();

    //管理员分页查询租车订单信息
    List<PartTourismOrderInfoDto> findListTourismOrderInfo(int index);

    //安排车辆，填写司机信息，更新订单表，更新travel_order表的订单状态
    Integer updateTourismOrderInfoAddDriverInfo(TourismOrderInfo tourismOrderInfo);
    //安排车辆,结单修改订单状态
    Integer updateTravelOrderState(@Param("state") int state, @Param("travelOrderId") int travelOrderId);

    //查询给租车订单安排的车辆信息
    DriverInfoDto findDriverInfoByTravelOrderId(int travelOrderId);

    //查询所有车辆类型的信息
    List<VehicleInfo> findAllVehicleInfo();

    //用户支付完押金后，提交订单插入数据库,分别插入travel_order、tourism_order表中
    Integer insertTravelOrderInfo(TourismOrderInfo tourismOrderInfo);
    Integer insertTourismOrderInfo(TourismOrderInfo tourismOrderInfo);


    //出行订单，租车与包车共享，
    List<TravelOrderInfo> findListTravelOrderByUid(int uid);

    //用户进入租车订单详情页面
    TourismOrderDetailInfoDto findTourismOrderDetailInfo(int travelOrderId);


    //修改出发日期
    int updateTourismOrderDepartureTime(@Param("departureTime") String departureTime,
                                        @Param("tomorrowDate") String tomorrowDate,
                                        @Param("travelOrderId") int travelOrderId);

    //保存被修改的日期
    int updateTourismModifiedDate(@Param("beModifiedTime") String beModifiedTime,
                                  @Param("travelOrderId") int travelOrderId);

    //查询微信订单号和支付总金额
    TourismOrderInfo findTransactionId(int travelOrderId);
}
