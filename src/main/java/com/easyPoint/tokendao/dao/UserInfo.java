package com.easyPoint.tokendao.dao;

import com.user.util.User;

/*
 * 通过openId查询用户信息,添加用户信息
 * 
 */
public interface UserInfo {
	
	public User selectUserInfoByOpenId(String openId);
	
	public User selectUserInfoByUid(int uid);
	
	public int insertUserInfo(User user);
}
