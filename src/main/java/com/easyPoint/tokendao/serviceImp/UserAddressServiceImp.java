package com.easyPoint.tokendao.serviceImp;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.user.dao.UserAddressDao;
import com.user.service.UserAddressService;
import com.user.util.UserAddress;
@Service
public class UserAddressServiceImp implements UserAddressService {
	@Autowired
	UserAddressDao userAddressDao;
	@Override
//	@Transactional(propagation = Propagation.REQUIRED, 
//    isolation = Isolation.DEFAULT, readOnly = false)
	public List<UserAddress> selectUserAddressByUid(String uid) {
		List<UserAddress> AllUserAddress = userAddressDao.selectAddressByUid(uid);
		return AllUserAddress;
	}
	@Override
	public int addAddress(UserAddress address) {
		userAddressDao.addAddress(address);
		return 200;
	}
	@Override
	public int deleteAddressById(int addressId) {
		userAddressDao.deleteAddressById(addressId);
		return 200;
	}
	@Override
	public int updateAddress(UserAddress address) {
		userAddressDao.updateAddress(address);
		return 200;
	}

}
