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
import java.util.Map;

@Controller
public class TourismInfoController {

    @Autowired
    TourismInfoService tourismInfoService;

    /**
     * 管理员进入添加车辆类型页面，得到已有车辆类型的总页数，和第一页车辆信息
     * @return 总页数，第一页车辆信息
     */
    @ResponseBody
    @RequestMapping("getTotalPageAndFirstVehicleInfoList")
    public Result getTotalPageAndFirstVehicleInfoList(){
        Map map = tourismInfoService.getTotalPageAndFirstVehicleInfoList();
        return new Result<>(200,"查询总页数和首页车辆信息成功",map);
    }

    /**
     * 分页查询车辆类型的信息
     * @param pageNum
     * @return
     */
    @ResponseBody
    @RequestMapping("/findListPageNumVehicleInfo")
    public Result findListPageNumVehicleInfo(int pageNum){
        Result result;
        List<VehicleInfo> vehicleInfoList = tourismInfoService.findListPageNumVehicleInfo(pageNum);
        if (!vehicleInfoList.isEmpty())
            result = new Result<List>(200,"查询第" + pageNum + "页的车辆类型数据成功", vehicleInfoList);
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
            result = new Result<>(200,"添加类型类型成功",null);
        }else {
            result = new Result<>(400,"该车辆类型已存在",null);
        }
        return result;
    }

    /**
     *管理员进入添加租车订单页面，得到已有车辆类型的总页数，和第一页租车订单信息
     * @return 总页数，第一页租车订单信息
     */


    /**
     * 管理员为租车订单安排车辆信息
     * @param tourismOrderInfo
     * @return
     */
    @ResponseBody
    @RequestMapping("/addDriverInfoToTourismOrder")
    public Result addDriverInfoToTourismOrder(TourismOrderInfo tourismOrderInfo){
        Result result;
        //licensePlateNumber,color,driverName,driverPhone,travelOrderId
        tourismInfoService.addDriverInfoToTourismOrder(tourismOrderInfo);
        result = new Result<>(200,"为租车订单安排车辆信息成功",tourismOrderInfo);
        return result;
    }

    /**
     * 提交订单
     * @param  tourismOrderInfo
     * @return
     */
    @ResponseBody
    @RequestMapping("/orderTourismOrder")
    public Result orderTourismOrder(TourismOrderInfo tourismOrderInfo){
        System.out.println(tourismOrderInfo);
        Result result;
        tourismInfoService.addTourismOrder(tourismOrderInfo);
        result = new Result<>(200,"提交租车订单成功",null);
        return result;
    }

}
