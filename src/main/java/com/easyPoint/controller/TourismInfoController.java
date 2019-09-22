package com.easyPoint.controller;

import com.easyPoint.pojo.Result;
import com.easyPoint.pojo.tourism.TourismOrderInfo;
import com.easyPoint.pojo.tourism.VehicleInfo;
import com.easyPoint.service.TourismInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.math.BigDecimal;
import java.util.List;

@Controller
public class TourismInfoController {

    @Autowired
    TourismInfoService tourismInfoService;

    @ResponseBody
    @RequestMapping("/findListPageNumVehicleInfo")
    public Result findListPageNumVehicleInfo(int pageNum){
        Result result;
        List<VehicleInfo> listVehicleInfo = tourismInfoService.findListPageNumVehicleInfo(pageNum);
        if (!listVehicleInfo.isEmpty())
            result = new Result<List>(200,"查询第" + pageNum + "页的车辆类型数据成功", listVehicleInfo);
        else
            result = new Result<List>(201,"无",null);
        return result;
    }

    /**
     * 管理员添加车辆类型
     * @param vehicleType
     * @param deposit
     * @return
     */
    @ResponseBody
    @RequestMapping("/addNewVehicleInfo")
    public Result addNewVehicleInfo(@RequestParam("vehicleType") String vehicleType, @RequestParam("deposit") BigDecimal deposit){
        Result result;
        int resultCode = tourismInfoService.insertVehicleType(vehicleType, deposit);
        if(resultCode == 1){
            result = new Result<>(200,"添加类型类型成功",123131);
        }else {
            result = new Result<>(400,"该车辆类型已存在",12313);
        }
        System.out.println(result);
        return result;
    }

    /**
     *
     */


    /**
     * 管理员为租车订单安排车辆信息
     * @param licensePlateNumber
     * @param color
     * @param driverName
     * @param driverPhone
     * @param tourismId
     * @return
     */
    @ResponseBody
    @RequestMapping("/orderTourismOrder")
    public Result orderTourismOrder(@RequestParam("licensePlateNumber") String licensePlateNumber,
                                    @RequestParam("color")String color, @RequestParam("driverName")String driverName,
                                    @RequestParam("driverPhone")String driverPhone,
                                    @RequestParam("tourismId")int tourismId){
        Result result;
        tourismInfoService.addDriverInfoToTourismOrder(licensePlateNumber,color,driverName,driverPhone,tourismId);
        result = new Result<>(200,"为租车订单安排车辆信息成功",null);
        return result;
    }

    @ResponseBody
    @RequestMapping("/addDriverInfoToTourismOrder")
    public Result addDriverInfoToTourismOrder(TourismOrderInfo tourismOrderInfo){
        Result result;
        tourismInfoService.addTourismOrder(tourismOrderInfo);
        result = new Result<>(200,"提交租车订单成功",null);
        return result;
    }

}
