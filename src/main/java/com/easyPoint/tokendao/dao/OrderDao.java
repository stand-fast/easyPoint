package com.easyPoint.tokendao.dao;


import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.user.util.Order;

public interface OrderDao {
	//添加订单
	public void addOrder(Order order);
	
	//查询订单
	public List<Order> selectUserOrder(@Param("uid") String uid);
	
}
