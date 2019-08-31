package com.easyPoint.tokendao.util;

public class UserAddress {
	String addressId;//地址id
	String uid;//用户id
	String username;//用户名
	String phonenumber;//联系电话
	String address;//送货地址
	String typeAddress;//地址类型 1代表家；2代表学校；3代表公司
	String sex;//性别：1男;2女;
	
	
	public String getSex() {
		return sex;
	}
	public void setSex(String sex) {
		this.sex = sex;
	}

	public String getAddressId() {
		return addressId;
	}
	public void setAddressId(String addressId) {
		this.addressId = addressId;
	}
	public String getTypeAddress() {
		return typeAddress;
	}
	public void setTypeAddress(String typeAddress) {
		this.typeAddress = typeAddress;
	}
	public String getUid() {
		return uid;
	}
	public void setUid(String uid) {
		this.uid = uid;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPhonenumber() {
		return phonenumber;
	}
	public void setPhonenumber(String phonenumber) {
		this.phonenumber = phonenumber;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	@Override
	public String toString() {
		return "UserAddress [addressId=" + addressId + ", uid=" + uid + ", username=" + username + ", phonenumber="
				+ phonenumber + ", address=" + address + ", typeAddress=" + typeAddress + ", sex=" + sex + "]";
	}


	
	
}
