package com.easyPoint.controller.miniprogram.travel;

import com.easyPoint.dto.Result;
import com.easyPoint.pojo.tourism.TourismOrderInfo;
import com.easyPoint.pojo.tourism.VehicleInfo;
import com.easyPoint.service.miniprogram.travel.TourismInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import java.util.List;

/**
 * 小程序租车模块
 * @author FJW
 */

@CrossOrigin
@Controller
@RequestMapping("/miniProgram")
public class TourismController {

    @Autowired
    TourismInfoService tourismInfoService;



    /**
     * 用户进入租车页面查询车辆类型
     * @return 车辆类型
     */
    @ResponseBody
    @RequestMapping("/findAllVehicleType")
    public Result findAllVehicleType(){
        List<VehicleInfo> vehicleInfoList = tourismInfoService.findAllVehicleInfo();
        if(vehicleInfoList.isEmpty())
            return new Result(201,"暂无车辆类型，请等待管理员添加");
        return new Result<>(200,"查询所有车辆类型成功", vehicleInfoList);
    }

    /**
     * 提交订单
     * @param  tourismOrderInfo 订单信息
     * @return 验证码
     */
    @ResponseBody
    @RequestMapping("/orderTourismOrder")
    public Result orderTourismOrder(TourismOrderInfo tourismOrderInfo){
        Result result;
        tourismInfoService.addTourismOrder(tourismOrderInfo);
        result = new Result<>(200,"提交租车订单成功",null);
        return result;
    }





    /**
     * FJW
     * 修改出发日期
     * @param departureTime 新的出发时间
     * @param beModifiedTime 原出发日期
     * @param travelOrderId 订单编号
     * @return 验证码
     */
    @ResponseBody
    @RequestMapping("/updateTourismDepartureTime")
    public Result updateTourismDepartureTime(@RequestParam("departureTime")String departureTime,
                                             @RequestParam("beModifiedTime")String beModifiedTime,
                                             @RequestParam("travelOrderId")int travelOrderId){
        int resultCode = tourismInfoService.updateTourismOrderDepartureTime(departureTime, beModifiedTime, travelOrderId);
        if(resultCode == 1)
            return new Result<>(200,"修改出发时间成功");
        return new Result<>(201,"修改出发日期必须在出发前一天之前修改，当前已经超过修改日期");
    }
}
