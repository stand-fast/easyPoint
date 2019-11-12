package com.easyPoint.service.administrator.travel;

import com.easyPoint.dto.Result;
import com.easyPoint.dto.travel.DriverInfoDto;
import com.easyPoint.dto.travel.PartTourismOrderInfoDto;
import com.easyPoint.dto.travel.TourismRefundPageDetailDto;
import com.easyPoint.dto.travel.TourismRefundPageDto;
import com.easyPoint.pojo.travel.TourismOrderInfo;
import com.easyPoint.pojo.travel.VehicleInfo;


import java.math.BigDecimal;
import java.util.List;

public interface AdmiTourismInfoService {

    //加载所有页面数
    Result getTotalPageAndFirstVehicleInfoList();

    //根据分页查询已经添加的车辆类型
    List<VehicleInfo> findListPageNumVehicleInfo(int pageNum);

    //添加车辆类型
    int insertVehicleType(String vehicleType, BigDecimal deposit);

    //删除车辆类型
    int deleteVehicleType(int vehicleId);

    //查询加载的所有页面数并返回首页的租车订单信息
    Result findTotalPageAndTourismOrderInfoList();

    //查询第pageNum页的租车订单数据
    List<PartTourismOrderInfoDto> findListPageNumTourismOrderInfo(int pageNum);

    //为订单安排车辆信息
    int addDriverInfoToTourismOrder(TourismOrderInfo tourismOrderInfo);

    //更改租车订单状态，完成结单
    int updateTourismOrderState(int travelOrderId);

    //查询已安排订单车辆信息
    DriverInfoDto findDriverInfoByTravelOrderId(int travelOrderId);

    //分页查询退款订单
    List<TourismRefundPageDto> findListTourismRefundByPageNum(int pageNum);

    //退款订单详情页
    TourismRefundPageDetailDto findTourismRefundDetail(int tourismRefundId);

    //管理员是否同意退款
    int ifAgreeTourismRefund(int uid, int tourismRefundId, String rejectReason, int ifAgree);

}
