package com.easyPoint.tokendao.controller;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.user.service.OrderService;
import com.user.util.CreateID;
import com.user.util.Order;

@Controller
public class OrderController {
	@Autowired
	OrderService orderService;
	
	
	@ResponseBody
	@RequestMapping("/purchaseOfGoods")
	public int purchaseOfGoods(Order order) throws ParseException {
		System.out.println("购买请求"+order);
		orderService.purchaseOfGood(order);
		return 1;
	}
	
	@ResponseBody
	@RequestMapping("/selectUserOrder")
	public List<Order> selectUserOrder(@RequestParam("uid")String uid) {
		List<Order> orders = orderService.selectUserOrder(uid);
		return orders;
	}
}
