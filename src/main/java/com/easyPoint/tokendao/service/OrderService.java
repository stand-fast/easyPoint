package com.easyPoint.tokendao.service;

import java.util.List;

import com.user.util.Order;

public interface OrderService {
	//下单
	public void purchaseOfGood(Order order);
	
	//订单页面
	public List<Order> selectUserOrder(String uid);
}
