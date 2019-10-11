package com.easyPoint.controller.miniprogram.travel;

import com.easyPoint.dto.Result;
import com.easyPoint.pojo.tourism.TravelOrderInfo;
import com.easyPoint.service.miniprogram.travel.TravelInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
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
    public Result findTravelOrder(int uid){
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
}
