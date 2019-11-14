package com.easyPoint.controller.administrator.travel;

import com.easyPoint.dao.travel.TourismInfoDao;
import com.easyPoint.dto.Result;
import com.easyPoint.dto.travel.DriverInfoDto;
import com.easyPoint.dto.travel.PartTourismOrderInfoDto;
import com.easyPoint.dto.travel.TourismRefundPageDetailDto;
import com.easyPoint.dto.travel.TourismRefundPageDto;
import com.easyPoint.pojo.travel.TourismOrderInfo;
import com.easyPoint.pojo.travel.VehicleInfo;

import com.easyPoint.service.administrator.travel.AdmiTourismInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.BufferedOutputStream;
import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

/**
 * @author FJW
 * 管理员租车模块
 */
@CrossOrigin
@Controller
@RequestMapping("/administrator")
public class AdmiTourismController {

    @Autowired
    AdmiTourismInfoService admiTourismInfoService;

    /**
     * 管理员进入添加车辆类型页面，得到已有车辆类型的总页数，和第一页车辆信息
     * @return 总页数，第一页车辆信息
     */

    @ResponseBody
    @RequestMapping("getTotalPageAndFirstVehicleInfoList")
    public Result getTotalPageAndFirstVehicleInfoList(){
        Result result = admiTourismInfoService.getTotalPageAndFirstVehicleInfoList();
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
        List<VehicleInfo> vehicleInfoList = admiTourismInfoService.findListPageNumVehicleInfo(pageNum);
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
        int resultCode = admiTourismInfoService.insertVehicleType(vehicleType, deposit);
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
        int resultCode = admiTourismInfoService.deleteVehicleType(vehicleId);
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
        return admiTourismInfoService.findTotalPageAndTourismOrderInfoList();
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
        List<PartTourismOrderInfoDto> partTourismOrderInfos = admiTourismInfoService.findListPageNumTourismOrderInfo(pageNum);
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
        int resultCode = admiTourismInfoService.addDriverInfoToTourismOrder(tourismOrderInfo);
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
        DriverInfoDto driverInfo = admiTourismInfoService.findDriverInfoByTravelOrderId(travelOrderId);
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
        int code = admiTourismInfoService.updateTourismOrderState(travelOrderId);
        if(code == 1)
            return new Result<>(200,"结单成功",null);
        return new Result<>(400,"结单失败",null);
    }

    /**
     * 管理员进入退款申请首页
     * @return 首页信息以及总页数
     */
    @ResponseBody
    @GetMapping("/tourismRefund/FirstPage")
    public Result tourismRefundFirstPage(){
        Map dataMap = admiTourismInfoService.findTourismRefundFirstPage();
        return new Result(200,"请求退款订单首页数据和总页数成功",dataMap);
    }

    /**
     * 分页查询第几页退款订单
     * @param pageNum
     * @return
     */
    @ResponseBody
    @GetMapping("/tourismRefunds/page")
    public Result findTourismRefunds(int pageNum){
        if(pageNum < 0)
            return new Result(401,"页码出错");
        List<TourismRefundPageDto> tourismRefundPageDtoList = admiTourismInfoService.findListTourismRefundByPageNum(pageNum);
        if(tourismRefundPageDtoList.size() != 0)
            return new Result<>(200,"查询退款订单成功", tourismRefundPageDtoList);
        return new Result<>(201,"数据已经全部加载完毕");
    }

    /**
     * 退款订单详情页
     * @param tourismRefundId 退款订单号
     * @return 详情信息
     */
    @ResponseBody
    @GetMapping("/tourismRefund/detail")
    public Result findTourismRefundDetailPage(int tourismRefundId){
        if(tourismRefundId < 0)
            return new Result(401,"退款表id参数错误");
        TourismRefundPageDetailDto tourismRefundPageDetailDto = admiTourismInfoService.findTourismRefundDetail(tourismRefundId);
        if(tourismRefundPageDetailDto != null)
            return new Result<>(200,"查询退款订单详情信息成功",tourismRefundPageDetailDto);
        return new Result(400,"数据库查询异常");
    }

    /**
     * 管理员确认是否通过退款
     * uid 管理员id@RequestParam("uid")int uid,
     * @param tourismRefundIdCode 退款表id
     * @param rejectReason 驳回理由
     * @param ifAgree 是否通过
     * @return 退款是否成功
     */
    @ResponseBody
    @RequestMapping("tourism/ifAgree")
    public Result ifAgreeTourismRefunds(
                                        @RequestParam("code")String tourismRefundIdCode,
                                        @RequestParam("reason")String rejectReason,
                                        @RequestParam("ifAgree")int ifAgree){
        int uid = 5;
        int resultCode = admiTourismInfoService.ifAgreeTourismRefund(uid, tourismRefundIdCode, rejectReason,ifAgree);
        if(resultCode == -2)
            return new Result(401,"退款异常");
        else if(resultCode == 0)
            return new Result(201,"不通过成功");
        return new Result(200,"退款成功");
    }

    @ResponseBody
    @RequestMapping("/tourism/refund.do")
    public void t(HttpServletResponse response) throws Exception{
        System.out.println("-----------------------退款成功");

        BufferedOutputStream out = new BufferedOutputStream(response.getOutputStream());
        String msg = "<xml><return_code><![CDATA[SUCCESS]]></return_code><return_msg><![CDATA[OK]]></return_msg></xml>";
        out.write(msg.getBytes());
        out.flush();
        out.close();
    }
}
