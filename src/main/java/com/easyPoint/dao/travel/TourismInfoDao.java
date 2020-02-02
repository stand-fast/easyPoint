package com.easyPoint.dao.travel;

import com.easyPoint.dto.travel.*;
import com.easyPoint.pojo.travel.TourismOrderInfo;
import com.easyPoint.pojo.travel.TourismRefundInfo;
import com.easyPoint.pojo.travel.TravelOrderInfo;
import com.easyPoint.pojo.travel.VehicleInfo;

import org.apache.ibatis.annotations.Param;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

    //查询租车订单状态
    Integer findStateById(int travelOrderId);

    //安排车辆，填写司机信息，更新订单表
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

    //恢复原出发日期
    int updateDepartureTimeToOriginalTime(@Param("originalTime")String originalTime,
                                          @Param("travelOrderId") int travelOrderId);

    //保存被修改的日期
    int updateTourismModifiedDate(@Param("beModifiedTime") String beModifiedTime,
                                  @Param("travelOrderId") int travelOrderId);

    //根据订单号查询下单用户和订单状态
    Map findAllowRefundData(int travelOrderId);

    //查询退款需要的订单信息：微信订单号和订单金额，是否为往返票
    TourismOrderInfo findRefundNeceInfo(int travelOrderId);

    //查询退款状态
    int findRefundState(int tourismRefundId);

    //用户申请退款
    int insertTourismRefund(TourismRefundInfo tourismRefundInfo);

    //保存新的退款表id，并修改申请次数
    int updateTourismRefundId(@Param("travelOrderId")int travelOrderId,
                                @Param("tourismRefundId")int tourismRefundId);

    //用户查看小程序退款状态页面的信息
    MiniTourismRefundPageDto findRefundPageInfoById(int tourismRefundId);

    //用户取消退款,修改退款状态
    int updateTourismRefundState(@Param("tourismRefundId") int tourismRefundId,
                                 @Param("finishTime")String finishTime,
                                 @Param("refundState") int refundState);

    //查询退款订单总数
    int countTourismRefundNum();

    //管理员分页查询申请退款的租车订单
    List<TourismRefundPageDto> findListTourismRefund(int index);

    //申请退款详情页信息
    TourismRefundPageDetailDto findTourismRefundDetail(int tourismRefundId);

    //根据tourismRefundId查询travelOrderId和退款状态
    HashMap findOrderIdAndStateById(int tourismRefundId);

    //退款不通过：保存退款操作管理员uid，确认时间，修改状态，保存驳回理由
    int updateTourismRefundToFail(@Param("admiUid") int admiUid,
                                  @Param("tourismRefundId") int tourismRefundId,
                                  @Param("refundState")int refundState,
                                  @Param("confirmRefundTime")String confirmRefundTime,
                                  @Param("rejectReason")String rejectReason);
    //退款通过：保存退款操作管理员uid，确认时间，修改状态，保存驳回理由（同意时，驳回理由为无）
    int updateTourismRefundToSuccess(TourismRefundInfo tourismRefundInfo);
}
