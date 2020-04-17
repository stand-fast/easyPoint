package com.easyPoint.dao.business;

import com.easyPoint.dto.business.GoodOrderDto;
import org.apache.ibatis.annotations.Param;

import java.util.List;


/**
 * 商品订单
 */

public interface GoodsOrderDao {
    // 查询所有订单或者指定状态的订单
    List<GoodOrderDto> findAllOrder(@Param("state") Integer state, @Param("startIndex") Integer startIndex, @Param("pageSize") Integer pageSize);

    // 查询所有订单数量或者指定状态的订单数量
    Integer findAllOrderNum(@Param("state") Integer state);
}

