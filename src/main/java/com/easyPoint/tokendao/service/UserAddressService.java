package com.easyPoint.tokendao.service;

import java.util.List;

import com.user.util.UserAddress;

public interface UserAddressService {
	//������ջ���ַ
	public int addAddress(UserAddress address);
	
	//���ݵ�ַidɾ���û��ջ��ַ
	public int deleteAddressById(int addressId);
	
	//���µ�ַ
	public int updateAddress(UserAddress address);
	
	//�����û��������ջ���ַ
	public List<UserAddress> selectUserAddressByUid(String uid);
}
