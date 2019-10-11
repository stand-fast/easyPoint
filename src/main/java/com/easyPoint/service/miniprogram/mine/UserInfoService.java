package com.easyPoint.service.miniprogram.mine;

import com.easyPoint.pojo.user.UserInfo;

/**
 * @author FJW
 * @version 1.0.0
 */
public interface UserInfoService {
    //用户授权后，获取用户信息
    UserInfo getUserInfo(String code, String encryptedData, String iv);


    //更新用户的基本信息
    Integer updateUserInfo(UserInfo userInfo);

}
