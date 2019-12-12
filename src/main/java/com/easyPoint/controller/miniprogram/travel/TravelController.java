package com.easyPoint.controller.miniprogram.travel;

import com.easyPoint.dto.Result;
import com.easyPoint.dto.travel.MiniTourismRefundPageDto;
import com.easyPoint.pojo.travel.TravelOrderInfo;
import com.easyPoint.service.miniprogram.travel.TourismInfoService;
import com.easyPoint.service.miniprogram.travel.TravelInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author FJW
 * 小程序包车租车共享部分，查询所有订单
 */


@CrossOrigin
@Controller
@RequestMapping("/miniProgram")
public class TravelController {

    @Autowired
    TravelInfoService travelInfoService;

    /**
     * 用户进入出行订单页面，查询该用户的所有出行模块的订单
     * @param uid 用户id
     * @return 用户的所有订单
     */
    @ResponseBody
    @RequestMapping("/findTravelOrder")
    public Result findTravelOrder(@RequestAttribute("uid")int uid){
        List<TravelOrderInfo> travelOrderInfos = travelInfoService.findListTravelOrderByUid(uid);
        if(travelOrderInfos.isEmpty())
            return new Result<>(201,"暂无订单");
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
                travelInfoService.findTravelOrderDetailInfo(travelOrderId, type));
    }

    /**
     * 退款状态详情页面信息
     * @param tourismRefundId
     * @return
     */
    @ResponseBody
    @GetMapping("/tourism/refundPage")
    public Result findTourismRefundPageInfo(@RequestParam("tourismRefundId")int tourismRefundId){
        MiniTourismRefundPageDto refundPageInfo = travelInfoService.findRefundPageInfoById(tourismRefundId);
        if(refundPageInfo == null)
            return new Result(400,"参数错误");
        return new Result<>(200,"查询退款页面成功",refundPageInfo);
    }

    /**
     * 用户取消退款
     * @param tourismRefundId 退款id
     * @return 是否取消成功
     */
    @ResponseBody
    @PostMapping("/tourism/cancelRefund")
    public Result cancelTourismRefund(@RequestParam("tourismRefundId")int tourismRefundId){
        if(tourismRefundId <= 0)
            return new Result(401,"参数错误");
        int resultCode = travelInfoService.cancelTourismRefund(tourismRefundId);
        if(resultCode == 1)
            return new Result(200,"取消退款成功");
        return new Result(400,"当前状态不支持取消退款申请");
    }
}
