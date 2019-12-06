package com.easyPoint.controller.miniprogram.travel;

import com.easyPoint.utils.XmlUtil;
import com.easyPoint.dto.Result;
import com.easyPoint.dto.pay.MiniPaymentDto;
import com.easyPoint.dto.pay.PaymentDto;
import com.easyPoint.pojo.travel.TourismOrderInfo;
import com.easyPoint.pojo.travel.TourismRefundInfo;
import com.easyPoint.pojo.travel.VehicleInfo;
import com.easyPoint.service.miniprogram.travel.TourismInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedOutputStream;
import java.util.List;
import java.util.Map;

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
    public Result orderTourismOrder(@RequestAttribute("uid")int uid, TourismOrderInfo tourismOrderInfo, PaymentDto paymentDto) throws Exception {
        System.out.println("uid ===== " + uid);
        MiniPaymentDto miniPaymentDto = tourismInfoService.addAdvanceOrder(uid, tourismOrderInfo, paymentDto);
        return new Result<>(200,"提交租车订单成功",miniPaymentDto);
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
        else if(resultCode == 0)
            return new Result<>(201,"修改出发日期必须在出发前一天之前修改，当前已经超过修改日期");
        else
            return new Result<>(202,"只有一次修改机会，请无重复操作");
    }

    /**
     * 用户申请租车退款
     * @param uid 用户id
     * @param tourismRefundInfo:
     *                              travelOrderId 订单id
     *                              refundReason 退款理由
     */
    @ResponseBody
    @RequestMapping("/tourismRefund")
    public Result requestTourismRefund(@RequestAttribute("uid")int uid,
                                       TourismRefundInfo tourismRefundInfo){
        System.out.println("发起退款");
        //验证退款原因长度是否超过最大限长
        if(tourismRefundInfo.getRefundReason().length()>100){
            return new Result(201,"退款原因超过最大限定长度");
        }
        //发起退款申请
        int resultCode = tourismInfoService.requestTourismOrderRefund(uid,tourismRefundInfo);
        //申请成功
        if(resultCode == 1)
            return new Result(200,"申请成功，请耐心等待管理员确认");
        //申请人的uid与订单的uid不同
        else if(resultCode == 0)
            return new Result(202,"申请失败，请确保您为该订单的所属者");
        else if(resultCode == -1)
            return new Result(401,"申请失败，您当前的申请次数已达到限制");
        else if(resultCode == -2)
            return new Result(402,"申请失败，订单已安排");
        else if(resultCode == -3)
            return new Result(403,"申请失败，订单已完成");
        else if(resultCode == -5)
            return new Result(405,"该订单退款正等待管理员处理中，请耐心等待");
        else if(resultCode == -4)
            return new Result(404,"该订单已退款成功，此次申请失败");
        else if(resultCode == -6)
            return new Result(406,"此次申请失败，订单正在退款中");
        //插入数据库异常
        return new Result(400,"申请异常，可联系管理员");
    }

    /**
     * 租车支付完成后回调函数
     * @param request
     * @param response
     */
    @RequestMapping("/tourism/pay.do")
    @ResponseBody
    public void paycallback(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("回调");
        try {
            Map<String, Object> dataMap = XmlUtil.parseXML(request);
            System.out.println("支付成功。。。" + dataMap.get("cash_fee"));
            if("SUCCESS".equals(dataMap.get("return_code"))){

                //将订单保存到数据库
                tourismInfoService.addTourismOrder(dataMap);
                System.out.println("----------执行完成");
                BufferedOutputStream out = new BufferedOutputStream(response.getOutputStream());
                String msg = "<xml><return_code><![CDATA[SUCCESS]]></return_code><return_msg><![CDATA[OK]]></return_msg></xml>";
                out.write(msg.getBytes());
                out.flush();
                out.close();
            }
            //System.out.println(JSON.toJSONString(dataMap));
            //{"transaction_id":"4200000109201805293331420304","nonce_str":"402880e963a9764b0163a979a16e0002","bank_type":"CFT","openid":"oXI6G5Jc4D44y2wixgxE3OPwpDVg","sign":"262978D36A3093ACBE4B55707D6EA7B2","fee_type":"CNY","mch_id":"1491307962","cash_fee":"10","out_trade_no":"14913079622018052909183048768217","appid":"wxa177427bc0e60aab","total_fee":"10","trade_type":"JSAPI","result_code":"SUCCESS","time_end":"20180529091834","is_subscribe":"N","return_code":"SUCCESS"}
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
