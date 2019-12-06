package com.easyPoint.service.administrator.account;

import com.easyPoint.pojo.adminstrator.AdminAccount;

import java.util.List;

/**
 * @author FHJ
 * @date 2019/11/30 10:36
 */
public interface AdminAccountService {
    // 添加管理员
    Integer addAdmin(AdminAccount adminAccount);

    // 根据手机号码查询账号
    AdminAccount findAdminByPhone(String phone);

    // 查询所有普通管理员
    List<AdminAccount> findAllCommonAdmin(Integer startIndex, Integer pageSize);

    // 查询所有普通管理员数量
    Integer findAllCommonAdminNum();

    // 禁用或启用普通管理员
    Integer stopOrStartAdmin(String phone, Integer state);

    // 删除普通管理员账号
    Integer deleteCommonAdmin(String phone);

    // 修改密码
    Integer updatePassword(String phone, String newPassword);

    // 更换手机号码
    Integer updatePhone(String phone, String newPhone, String newPassword);

    // 修改用户名
    Integer updateAdminName(String phone, String newName);
}
