package com.easyPoint.controller;

import com.easyPoint.pojo.Result;
import com.easyPoint.pojo.tourism.TourismOrderInfo;
import com.easyPoint.pojo.tourism.VehicleInfo;
import com.easyPoint.pojo.tourism.dto.DriverInfo;
import com.easyPoint.pojo.tourism.dto.PartTourismOrderInfo;
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
     * @param pageNum 页数
     * @return 验证码
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
     * @param vehicleType 车辆类型
     * @param deposit 定金
     * @return 验证码以及验证信息
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
     *管理员进入租车订单页面，得到已有订单的总页数，和第一页租车订单信息
     * @return 总页数，第一页租车订单信息
     */
    @ResponseBody
    @RequestMapping("/getTotalPageAndFirstTourismOrderInfoList")
    public Result getTotalPageAndFirstTourismOrderInfoList(){
        Map map = tourismInfoService.findTotalPageAndTourismOrderInfoList();
        return new Result<>(200,"查询订单页数以及首页订单信息成功", map);
    }

    /**
     * 分页查询租车订单信息
     * @param pageNum 页数
     * @return 第几页的所有订单信息
     */
    @ResponseBody
    @RequestMapping("/findListPageNumTourismOrderInfo")
    public Result findListPageNumTourismOrderInfo(int pageNum){
        Result result;
        List<PartTourismOrderInfo> partTourismOrderInfos = tourismInfoService.findListPageNumTourismOrderInfo(pageNum);
        if (!partTourismOrderInfos.isEmpty())
            result = new Result<List>(200,"查询第" + pageNum + "页的租车订单数据成功", partTourismOrderInfos);
        else
            result = new Result<List>(201,"数据已经全部加载",null);
        return result;
    }
    /**
     * 管理员为租车订单安排车辆信息
     * @param tourismOrderInfo 订单信息
     * @return 验证码
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
     * 管理员进入结单页面，显示车辆信息
     * @param travelOrderId 订单id
     * @return 车辆信息
     */
    @ResponseBody
    @RequestMapping("/findDriverInfo")
    public Result findDriverInfo(int travelOrderId){
        DriverInfo driverInfo = tourismInfoService.findDriverInfoByTravelOrderId(travelOrderId);
        if(driverInfo != null)
            return new Result<>(200,"查询车辆信息成功",driverInfo);
        return new Result<>(400,"该订单还未安排车辆",null);
    }
    /**
     * 管理员完成租车结单
     * @param tourismOrderId 订单编号
     * @return 验证码
     */
    @ResponseBody
    @RequestMapping("/finishTourismOrder")
    public Result finishTourismOrder(int travelOrderId){
        //修改订单状态
        int code = tourismInfoService.updateTourismOrderState(travelOrderId);
        if(code == 1)
            return new Result<>(200,"结单成功",null);
        return new Result<>(400,"服务器出现异常",null);
    }

    /**
     * 提交订单
     * @param  tourismOrderInfo 订单信息
     * @return 验证码
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
