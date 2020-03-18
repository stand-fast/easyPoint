package com.easyPoint.dao.business;

import com.easyPoint.dto.business.GoodOrderDto;

import java.util.List;

/**
 * 商品订单
 */
public interface GoodsOrderDao {
    // 查询所有订单或者指定状态的订单
    List<GoodOrderDto> findAllOrder(Integer state);
}
