package com.easyPoint.tokendao.serviceImp;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.user.dao.OrderDao;
import com.user.service.OrderService;
import com.user.util.CreateID;
import com.user.util.Order;
@Service
public class OrderServiceImp implements OrderService {
	@Autowired
	OrderDao orderDao;
	
	@Autowired
	CreateID createId;
	@Override
	public void purchaseOfGood(Order order) {
		order.setOrderId(createId.getOrderIdByUUId(order.getUid()));
		Date startTime = new Date();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		order.setStartTime(sdf.format(startTime));
		orderDao.addOrder(order);
	}

	@Override
	public List<Order> selectUserOrder(String uid) {
		List<Order> orders = orderDao.selectUserOrder(uid);
		return orders;
	}

}
