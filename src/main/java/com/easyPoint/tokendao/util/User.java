package com.easyPoint.tokendao.util;

import org.springframework.stereotype.Component;

@Component
public class User {
	int uid;//用户id
	String openId;//小程序openId
	String nickName;//用户名
	String gender;//1男2女
	String avatarUrl;//头像路径

	
	public int getUid() {
		return uid;
	}
	public void setUid(int uid) {
		this.uid = uid;
	}
	public String getOpenId() {
		return openId;
	}
	public void setOpenId(String openId) {
		this.openId = openId;
	}
	
	public String getNickName() {
		return nickName;
	}
	public void setNickName(String nickName) {
		this.nickName = nickName;
	}
	public String getGender() {
		return gender;
	}
	public void setGender(String gender) {
		this.gender = gender;
	}
	public String getAvatarUrl() {
		return avatarUrl;
	}
	public void setAvatarUrl(String avatarUrl) {
		this.avatarUrl = avatarUrl;
	}
	@Override
	public String toString() {
		return "User [uid=" + uid + ", openId=" + openId + ", nickName=" + nickName + ", gender=" + gender
				+ ", avatarUrl=" + avatarUrl + "]";
	}
	
	
	
}
