package com.easyPoint.dao.mine;

import com.easyPoint.pojo.user.UserInfo;

public interface UserInfoDao {
    //查询用户名信息
    UserInfo findUserInfoById(int uid);

    //根据用户openId查询用户信息
    UserInfo findUserInfoByOpenId(String openId);

    //根据用户的uid查询用户的openId
    String findUserOpenIdByUid(int uid);

    //插入用户信息
    int insertUserInfo(UserInfo userInfo);

    //修改用户信息
    int updateUserInfo(UserInfo userInfo);

}
