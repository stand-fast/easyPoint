package com.easyPoint.service.business;

import com.easyPoint.dto.business.GoodOrderDto;

import java.util.List;

/**
 * @author FHJ
 * @date 2020/3/18 21:53
 */
public interface GoodsOrderService {
    // 查询所有订单或者指定状态的订单
    List<GoodOrderDto> findAllOrder(Integer state);
}
