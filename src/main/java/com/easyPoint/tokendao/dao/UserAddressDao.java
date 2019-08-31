package com.easyPoint.tokendao.dao;

import java.util.List;

import com.user.util.UserAddress;

public interface UserAddressDao {
	//�����û�uid�������и��û����ջ���ַ
	public List<UserAddress> selectAddressByUid(String uid);
	
	//���ݵ�ַidɾ���û��ջ��ַ
	public void deleteAddressById(int addressId);
	
	//���µ�ַ
	public void updateAddress(UserAddress address);
	
	//��ӵ�ַ
	public void addAddress(UserAddress address);
}
