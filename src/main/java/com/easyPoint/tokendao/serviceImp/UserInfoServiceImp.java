package com.easyPoint.tokendao.serviceImp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.user.dao.UserInfo;
import com.user.service.UserInfoService;
import com.user.util.AesCbcUtil;
import com.user.util.User;
@Service
public class UserInfoServiceImp implements UserInfoService {
	@Autowired
	UserInfo userInfo;
	@Autowired
	User user;
	@Override
	public User selectUserInfo(String openId) {
		user = userInfo.selectUserInfoByOpenId(openId);
		return user;
	}

	@Override
	public int insertUserInfo(String encryptedData, String session_key, String iv, String encodingFormat) {
		// 对encryptedData加密数据进行AES解密
        try { 
        	//System.out.println(encryptedData+" "+session_key+" "+iv);
            String result = AesCbcUtil.decrypt(encryptedData, session_key, iv, encodingFormat);
            System.out.println(result);
            ObjectMapper mapper=new ObjectMapper();
            if (result != null && result.length() > 0) {  
            	  JsonNode rootNode = mapper.readTree(result); // 读取Json
            	  User user = new User();
            	  user.setOpenId(rootNode.path("openId").asText());
                  user.setNickName(rootNode.path("nickName").asText());
                  user.setGender(rootNode.path("gender").asText());
                  user.setAvatarUrl(rootNode.path("avatarUrl").asText());
                  int res = userInfo.insertUserInfo(user);
                  System.out.println(res);
                  if(res ==1 )
                	  return res;
                  else
                	  return 0;

            } else {  
            	return 0;
            }  
        } catch (Exception e) {  
            e.printStackTrace();  
        } 
		return 0;
	}

	@Override
	public User selectUserInfoByUid(int uid) {
		user = userInfo.selectUserInfoByUid(uid);
		return user;
	}

}
