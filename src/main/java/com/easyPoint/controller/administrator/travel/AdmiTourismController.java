package com.easyPoint.controller.administrator.travel;

import com.easyPoint.dto.Result;
import com.easyPoint.pojo.tourism.TourismOrderInfo;
import com.easyPoint.pojo.tourism.TravelOrderInfo;
import com.easyPoint.pojo.tourism.VehicleInfo;
import com.easyPoint.pojo.tourism.dto.DriverInfoDto;
import com.easyPoint.pojo.tourism.dto.PartTourismOrderInfoDto;
import com.easyPoint.service.TourismInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.math.BigDecimal;
import java.util.List;

/**
 * @author FJW
 * 管理员租车模块
 */
@CrossOrigin
@Controller
@RequestMapping("/administrator")
public class AdmiTourismController {

    @Autowired
    TourismInfoService tourismInfoService;

    /**
     * 管理员进入添加车辆类型页面，得到已有车辆类型的总页数，和第一页车辆信息
     * @return 总页数，第一页车辆信息
     */

    @ResponseBody
    @RequestMapping("getTotalPageAndFirstVehicleInfoList")
    public Result getTotalPageAndFirstVehicleInfoList(){
        Result result = tourismInfoService.getTotalPageAndFirstVehicleInfoList();
        return result;
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
            result = new Result<List>(201,"已经加载完全部数据");
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
            result = new Result<>(200,"添加类型类型成功");
        }else {
            result = new Result<>(400,"该车辆类型已存在");
        }
        return result;
    }

    /**
     * @param vehicleId 车辆类型id
     * @return 验证是否删除成功
     */
    @ResponseBody
    @RequestMapping("/deleteVehicleType")
    public Result deleteVehicleType(@RequestParam("vehicleId") int vehicleId){
        int resultCode = tourismInfoService.deleteVehicleType(vehicleId);
        if(resultCode == 1)
            return new Result(200,"删除车辆类型成功");
        return new Result(201,"删除车辆类型失败");
    }

    /**
     *管理员进入租车订单页面，得到已有订单的总页数，和第一页租车订单信息
     * @return 总页数，第一页租车订单信息
     */
    @ResponseBody
    @RequestMapping("/getTotalPageAndFirstTourismOrderInfoList")
    public Result getTotalPageAndFirstTourismOrderInfoList(){
        return tourismInfoService.findTotalPageAndTourismOrderInfoList();
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
        List<PartTourismOrderInfoDto> partTourismOrderInfos = tourismInfoService.findListPageNumTourismOrderInfo(pageNum);
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
        int resultCode = tourismInfoService.addDriverInfoToTourismOrder(tourismOrderInfo);
        if(resultCode == 1)
            result = new Result<>(200,"为租车订单安排车辆信息成功");
        else
            result = new Result<>(201,"安排车辆信息失败");
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
        DriverInfoDto driverInfo = tourismInfoService.findDriverInfoByTravelOrderId(travelOrderId);
        if(driverInfo != null)
            return new Result<>(200,"查询车辆信息成功",driverInfo);
        return new Result<>(400,"该订单还未安排车辆",null);
    }
    /**
     * 管理员完成租车结单
     * @param travelOrderId 订单编号
     * @return 验证码
     */
    @ResponseBody
    @RequestMapping("/finishTourismOrder")
    public Result finishTourismOrder(int travelOrderId){
        //修改订单状态
        int code = tourismInfoService.updateTourismOrderState(travelOrderId);
        if(code == 1)
            return new Result<>(200,"结单成功",null);
        return new Result<>(400,"结单失败",null);
    }

}
