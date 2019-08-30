package com.easyPoint.tokendao.service;

import com.user.util.User;

public interface UserInfoService {
	public User selectUserInfo(String openId);
	public User selectUserInfoByUid(int uid);
	public int insertUserInfo(String data, String key, String iv, String encodingFormat);
}
