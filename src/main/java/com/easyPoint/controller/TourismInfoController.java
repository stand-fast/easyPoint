package com.easyPoint.controller;

import com.easyPoint.pojo.Result;
import com.easyPoint.pojo.tourism.TourismOrderInfo;
import com.easyPoint.pojo.tourism.TravelOrderInfo;
import com.easyPoint.pojo.tourism.VehicleInfo;
import com.easyPoint.pojo.tourism.dto.DriverInfoDto;
import com.easyPoint.pojo.tourism.dto.PartTourismOrderInfoDto;
import com.easyPoint.service.TourismInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

/**
 * @author FJW
 */
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
        return new Result<>(400,"服务器出现异常",null);
    }

    /**
     * 用户进入租车页面查询车辆类型
     * @return 车辆类型
     */
    @ResponseBody
    @RequestMapping("/findAllVehicleType")
    public Result findAllVehicleType(){
        List<VehicleInfo> vehicleInfoList = tourismInfoService.findAllVehicleInfo();
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
        System.out.println(tourismOrderInfo);
        Result result;
        tourismInfoService.addTourismOrder(tourismOrderInfo);
        result = new Result<>(200,"提交租车订单成功",null);
        return result;
    }

    /**
     * 用户进入出行订单页面，查询该用户的所有出行模块的订单
     * @param uid 用户id
     * @return 用户的所有订单
     */
    @ResponseBody
    @RequestMapping("/findTravelOrder")
    public Result findTravelOrder(int uid){
        List<TravelOrderInfo> travelOrderInfos = tourismInfoService.findListTravelOrderByUid(uid);
        return new Result<>(200,"查询用户的出行订单成功",travelOrderInfos);
    }

    /**
     * 小程序用户查询订单详情
     * @param travelOrderId 出行订单号
     * @param type 出行订单类型
     * @return 包车或租车订单详情
     */
    @ResponseBody
    @RequestMapping("/findTravelOrderDetailInfo")
    public Result findTravelOrderDetailInfo(@RequestParam("travelOrderId")int travelOrderId,
                                            @RequestParam("type")int type){
        return new Result<>(200,"查询出行订单详情成功",
                             tourismInfoService.findTravelOrderDetailInfo(travelOrderId, type));
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
            return new Result<>(200,"修改出发时间成功", null);
        return new Result<>(201,"修改出发日期必须在出发前一天之前修改，当前已经超过修改日期",null);
    }
}
