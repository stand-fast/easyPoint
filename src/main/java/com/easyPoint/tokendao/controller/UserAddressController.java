package com.easyPoint.tokendao.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.user.service.UserAddressService;
import com.user.util.UserAddress;

@Controller
public class UserAddressController {
	@Autowired
	UserAddressService userAddressService;
	
	//根据用户Uid查找地址ַ
	@ResponseBody
	@RequestMapping(value="/selectUserAddressByUid")
	public List<UserAddress> selectUserAddressByUid(@RequestParam("uid") String uid) {
		List<UserAddress> allUserAddress = userAddressService.selectUserAddressByUid(uid);
		for(UserAddress address:allUserAddress)
			System.out.println(address);
		System.out.println("查询地址----");
		return allUserAddress;
	}
	//添加地址ַ
	@ResponseBody
	@RequestMapping("/addAddress")
	public int addAddress(UserAddress address) {
		System.out.println(address);
		int state = userAddressService.addAddress(address);
		System.out.println(state);
		return 0;//state;
	}
	//删除地址ַ
	@ResponseBody
	@RequestMapping("/deleteAddressById")
	public int deleteAddressById(@RequestParam("addressId") int addressId) {
		int state = userAddressService.deleteAddressById(addressId);
		return state;
	}
	//修改地址
	@ResponseBody
	@RequestMapping("/updateAddress")
	public int updateAddress(UserAddress address) {
		int state = userAddressService.updateAddress(address);
		return state;
	}
	
}
