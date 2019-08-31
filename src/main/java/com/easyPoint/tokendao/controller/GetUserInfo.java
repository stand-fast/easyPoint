package com.easyPoint.tokendao.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.user.serviceImp.UserInfoServiceImp;
import com.user.util.HttpUtil;
import com.user.util.JwtUtil;
import com.user.util.LoginResponse;
import com.user.util.LoginResponseUtil;
import com.user.util.User;

@Controller
public class GetUserInfo {
	@Autowired
	User user;
	@Autowired
	UserInfoServiceImp userInfoServiceImp;
	
	/*
	 * 一、获取用户openId
	 * 
	 * 二、根据openId去数据库查找用户是否第一次登录，
	 * 	  若不是第一次登录，则从数据库中将用户信息查找出来
	 *   若是，则解密用户信息，将用户信息存入数据库
	 *   
	 * 三、将数据返回给小程序端
	 * 
	 */
	@ResponseBody
	@RequestMapping(value = "/getUserInfo") // 获取用户信息
	public Map getOpenId(@Param("code") String code,@Param("encryptedData") String encryptedData,@Param("iv") String iv) {
		//appid是你小程序的appid,secret是你小程序的appsercet,js_code是前台登陆成功后返回给你的code,grant_type为固定值authorization_code.
		String js_code = code;
		String APPID = "wxe01ead21cec586c4";
		String SECRET = "679aa6c79c85459b23f9a87bdd173759";
		String param = "appid="+APPID+"&secret="+SECRET+"&js_code="+js_code+"&grant_type=authorization_code";
		String url = "https://api.weixin.qq.com/sns/jscode2session";
		String date = HttpUtil.sendGet(url, param);
		System.out.println(date);
		Map map = new HashMap();
		/*
		 * 解析json数据
		 */
		ObjectMapper mapper=new ObjectMapper();
		String session_key = "";
		try {
			JsonNode rootNode = mapper.readTree(date);
			String openId = rootNode.path("openid").asText();
			user.setOpenId(openId);
			user = userInfoServiceImp.selectUserInfo(user.getOpenId());
			if(user==null) {
				session_key = rootNode.path("session_key").asText();
				//解密用户微信信息，并将信息返回给小程序
				int res = userInfoServiceImp.insertUserInfo(encryptedData, session_key, iv, "UTF-8");
				if(res ==1)
					user = userInfoServiceImp.selectUserInfo(openId);
				System.out.println(user);
			}
			
		//生成token
			LoginResponse loginResponse;
			 String token = JwtUtil.sign(user.getUid(), user.getNickName());
			 if(token!=null&token.length()>0) {
				 loginResponse = LoginResponseUtil.getLoginResponse(token, 200, "授权登录成功");
			 }
			 else {
				 loginResponse = LoginResponseUtil.getLoginResponse(null, 400, "授权登录失败");
			 }
			 System.out.println(loginResponse);
			 map.put("user", user);
			 map.put("LoginResponse", loginResponse);
		} catch (JsonProcessingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} 
		
		return map;
	}  

}
