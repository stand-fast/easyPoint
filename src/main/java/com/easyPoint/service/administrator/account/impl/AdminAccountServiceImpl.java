package com.easyPoint.service.administrator.account.impl;

import com.easyPoint.dao.administrator.AdminAccountDao;
import com.easyPoint.pojo.adminstrator.AdminAccount;
import com.easyPoint.service.administrator.account.AdminAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author FHJ
 * @date 2019/11/30 10:37
 */
@Service("adminAccountService")
public class AdminAccountServiceImpl implements AdminAccountService {

    @Autowired
    AdminAccountDao adminAccountDao;

    @Override
    public Integer addAdmin(AdminAccount adminAccount) {
        return adminAccountDao.addAdmin(adminAccount);
    }

    @Override
    public AdminAccount findAdminByPhone(String phone) {
        return adminAccountDao.findAdminByPhone(phone);
    }

    @Override
    public List<AdminAccount> findAllCommonAdmin(Integer startIndex, Integer pageSize) {
        return adminAccountDao.findAllCommonAdmin(startIndex, pageSize);
    }

    @Override
    public Integer findAllCommonAdminNum() {
        return adminAccountDao.findAllCommonAdminNum();
    }

    @Override
    public Integer stopOrStartAdmin(String phone, Integer state) {
        return adminAccountDao.stopOrStartAdmin(phone, state);
    }

    @Override
    public Integer deleteCommonAdmin(String phone) {
        return adminAccountDao.deleteCommonAdmin(phone);
    }

    @Override
    public Integer updatePassword(String phone, String newPassword) {
        return adminAccountDao.updatePassword(phone, newPassword);
    }

    @Override
    public Integer updatePhone(String phone, String newPhone, String newPassword) {
        return adminAccountDao.updatePhone(phone, newPhone, newPassword);
    }
}
