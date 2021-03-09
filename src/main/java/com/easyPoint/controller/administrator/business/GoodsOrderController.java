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
    public Result findAllOrder(Integer state, Integer startIndex, Integer pageSize) {
        Result result = new Result();
        System.out.println(state);
        System.out.println(startIndex);
        System.out.println(pageSize);
        if (startIndex == null || startIndex <= 0 || pageSize == null || pageSize <= 0) {
            result.setCode(2);
            result.setMessage("参数错误");
            return result;
        }

        Integer orderNum = goodsOrderService.findAllOrderNum(state);

        if (orderNum == 0) {
            result.setCode(0);
            result.setMessage("暂时没有订单！");
            return result;
        }

        if ((startIndex - 1) * pageSize >= orderNum) {
            result.setCode(3);
            result.setMessage("页码超出最大范围！");
            return result;
        }

        List<GoodOrderDto> list = goodsOrderService.findAllOrder(state, (startIndex - 1) * pageSize, pageSize);

        result.setCode(1);
        result.setMessage("查询成功");
        Map<String, Object> map = new HashMap<>(2);
        map.put("orders", list);
        map.put("totalNum", orderNum);
        result.setData(map);

        return result;
    }
}
