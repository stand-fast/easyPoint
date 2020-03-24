package com.easyPoint.controller.administrator.business;

import com.easyPoint.dto.Result;
import com.easyPoint.dto.business.GoodOrderDto;
import com.easyPoint.service.business.GoodsOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author FHJ
 * @date 2020/3/18 21:55
 */
@CrossOrigin
@Controller
@RequestMapping("/administrator")
public class GoodsOrderController {

    @Autowired
    GoodsOrderService goodsOrderService;

    /**
     * 查询所有订单或者指定状态的订单
     *
     * @param state
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "/findAllOrder", method = RequestMethod.GET)
    public Result findAllOrder(Integer state) {
        Result result = new Result();
        List<GoodOrderDto> list = new ArrayList<>();

        if (state == null || state.equals("")) {
            list = goodsOrderService.findAllOrder(null);
        } else {
            list = goodsOrderService.findAllOrder(state);
        }

        if (list.size() == 0) {
            result.setCode(0);
            result.setMessage("暂时没有订单");
        } else {
            result.setCode(1);
            result.setMessage("查询成功");
            Map<String, List<GoodOrderDto>> map = new HashMap<>();
            map.put("orders", list);
            result.setData(map);
        }

        return result;
    }
}
