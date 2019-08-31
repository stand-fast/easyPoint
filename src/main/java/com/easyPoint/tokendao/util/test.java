package com.easyPoint.tokendao.util;

import java.util.HashMap;

import com.thoughtworks.xstream.XStream;

public class test {

	public static void main(String[] args) {
//		HashMap<String,String> map = new HashMap<>();
//		map.put("a", "ab");
//		map.put("a", "abc");
//		System.out.println(map);
//		System.out.println(Math.random()*9);
		User user = new User();
		user.setNickName("fan");
		user.setAvatarUrl("adf");
		user.setGender("1");
		user.setOpenId("o9fyZ5U5RyDL6mdpbxPGPWjHQsrQ");
		XStream xstream = new XStream();
		String xml = xstream.toXML(user);
		System.out.println(xml);
	}

}
