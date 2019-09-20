package com.easyPoint.service;

import com.easyPoint.pojo.user.UserInfo;

public interface GetUserInfoService {
    //用户授权后，获取用户信息
    UserInfo getUserInfo(String code, String encryptedData, String iv);
    //根据用户openId从数据库中查询用户基本信息
    UserInfo findUserInfoByOpenId(String openId);
    //解析用户信息后，将数据插入数据库中
    Integer insertUserInfo(UserInfo userInfo);
    //更新用户的基本信息
    Integer updateUserInfo(UserInfo userInfo);

}
