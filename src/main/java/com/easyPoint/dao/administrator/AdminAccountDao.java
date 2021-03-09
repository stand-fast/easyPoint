package com.easyPoint.dao.administrator;

import com.easyPoint.pojo.adminstrator.AdminAccount;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * @author FHJ
 * @date 2019/11/28 23:59
 */
public interface AdminAccountDao {
    // 添加管理员
    Integer addAdmin(AdminAccount adminAccount);

    // 根据手机号码查询账号
    AdminAccount findAdminByPhone(String phone);

    // 查询所有普通管理员
    List<AdminAccount> findAllCommonAdmin(@Param("startIndex") Integer startIndex, @Param("pageSize") Integer pageSize);

    // 查询所有普通管理员数量
    Integer findAllCommonAdminNum();

    // 禁用或启用普通管理员
    Integer stopOrStartAdmin(@Param("phone") String phone, @Param("state") Integer state);

    // 删除普通管理员账号
    Integer deleteCommonAdmin(String phone);

    // 修改密码
    Integer updatePassword(@Param("phone") String phone, @Param("newPassword") String newPassword);

    // 更换手机号码
    Integer updatePhone(@Param("phone") String phone, @Param("newPhone") String newPhone, @Param("newPassword") String newPassword);

    // 修改用户名
    Integer updateAdminName(@Param("phone") String phone, @Param("newName") String newName);
}
