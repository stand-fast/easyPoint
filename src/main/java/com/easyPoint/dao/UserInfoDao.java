package com.easyPoint.dao;

import com.easyPoint.pojo.user.UserInfo;

public interface UserInfoDao {
    //查询用户名，联系电话
    UserInfo findUserInfoById(int uid);
}
