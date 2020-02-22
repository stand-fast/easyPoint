package com.easyPoint.controller.administrator.accountoperation;

import com.easyPoint.dto.Result;
import com.easyPoint.dto.administrator.AdminChangePassword;
import com.easyPoint.dto.administrator.AdminChangePhone;
import com.easyPoint.pojo.adminstrator.AdminAccount;
import com.easyPoint.service.administrator.account.AdminAccountService;
import com.easyPoint.service.administrator.account.IdNumVerifyService;
import com.easyPoint.service.administrator.account.SendMessageService;
import com.easyPoint.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 有关管理员账号的操作
 *
 * @author FHJ
 * @date 2019/11/10 17:14
 */
@CrossOrigin
@Controller
@RequestMapping("/administrator")
public class AccountController {

    @Autowired
    SendMessageService sendMessageService;
    @Autowired
    IdNumVerifyService idNumVerifyService;
    @Autowired
    AdminAccountService adminAccountService;

    /**
     * 发送手机验证码
     *
     * @param phone
     * @param flag
     */
    @RequestMapping("/sendMessage")
    @ResponseBody
    public Result sendMessage(String phone, Integer flag) {
        Result result = new Result();
        try {
            sendMessageService.sendMessage(phone, flag);
        } catch (Exception e) {
            e.printStackTrace();
        }
        result.setCode(1);
        result.setMessage("成功！");
        return result;
    }

    @RequestMapping("/idNumVerify")
    @ResponseBody
    public Result idNumVerify(String name, String idNum) {
        Result result = new Result();
        idNumVerifyService.idNumVerify(name, idNum);
        result.setCode(1);
        result.setMessage("成功！");
        return result;
    }

    /**
     * 添加管理员
     *
     * @param adminAccount
     * @return
     */
    @RequestMapping(value = "/addAdmin", method = RequestMethod.POST)
    @ResponseBody
    public Result addAdmin(AdminAccount adminAccount, HttpServletRequest request) {
        Result result = new Result();

        String token = request.getHeader("token");
        Integer check = JwtUtil.getIdentity(token);
        if (check != 0) {
            result.setCode(110);
            result.setMessage("非超级管理员，出现非法操作！");
            return result;
        }

        if (adminAccount == null) {
            result.setCode(2);
            result.setMessage("参数为空！");
            return result;
        }

        String phone = adminAccount.getPhone();
        String username = adminAccount.getUsername();
        String password = adminAccount.getPassword();
        Integer identity = adminAccount.getIdentity();

        if (phone == null || phone.equals("") || username == null || username.equals("") || password == null || password.equals("") || identity == null || !(identity == 0 || identity == 1)) {
            result.setCode(2);
            result.setMessage("参数为空！");
            return result;
        }

        // 查询账户是否已经存在
        AdminAccount account = adminAccountService.findAdminByPhone(phone);

        if (account != null) {
            result.setCode(3);
            result.setMessage("手机号已被注册！");
            return result;
        }

        // 将账户设为启用该
        adminAccount.setState(1);
        // 添加账户
        Integer flag = adminAccountService.addAdmin(adminAccount);

        if (flag == 1) {
            result.setCode(1);
            result.setMessage("添加成功！");
            return result;
        } else {
            result.setCode(-1);
            result.setMessage("添加失败！");
            return result;
        }
    }

    /**
     * 查询所有普通管理员账号
     *
     * @return
     */
    @RequestMapping(value = "/findAllCommonAdmin", method = RequestMethod.GET)
    @ResponseBody
    public Result findAllCommonAdmin(Integer startIndex, Integer pageSize, HttpServletRequest request) {
        Result result = new Result();

        String token = request.getHeader("token");
        Integer check = JwtUtil.getIdentity(token);
        if (check != 0) {
            result.setCode(110);
            result.setMessage("非超级管理员，出现非法操作！");
            return result;
        }

        Integer commonAdminNum = adminAccountService.findAllCommonAdminNum();

        if (commonAdminNum == 0) {
            result.setCode(0);
            result.setMessage("查询到0条数据！");
            return result;
        }

        if ((startIndex - 1) * pageSize >= commonAdminNum) {
            result.setCode(3);
            result.setMessage("页码超出最大范围！");
            return result;
        }

        List<AdminAccount> adminAccountList = adminAccountService.findAllCommonAdmin((startIndex - 1) * pageSize, pageSize);

        result.setCode(1);
        result.setMessage("查询成功！");
        Map<String, Object> map = new HashMap<>(2);
        map.put("totalNum", commonAdminNum);
        map.put("adminAccountList", adminAccountList);
        result.setData(map);
        return result;
    }

    /**
     * 禁用或启用普通管理员账号
     *
     * @param phone
     * @param state
     * @return
     */
    @RequestMapping(value = "/stopOrStartAccount", method = RequestMethod.POST)
    @ResponseBody
    public Result stopOrStartAccount(String phone, Integer state, HttpServletRequest request) {
        Result result = new Result();

        String token = request.getHeader("token");
        Integer check = JwtUtil.getIdentity(token);
        if (check != 0) {
            result.setCode(110);
            result.setMessage("非超级管理员，出现非法操作！");
            return result;
        }

        if (phone == null || phone.equals("") || state == null || !(state == 0 || state == 1)) {
            result.setCode(2);
            result.setMessage("参数为空！");
            return result;
        }

        AdminAccount account = adminAccountService.findAdminByPhone(phone);

        if (account == null) {
            result.setCode(0);
            result.setMessage("账号不存在！");
            return result;
        }

        Integer flag = adminAccountService.stopOrStartAdmin(phone, state);

        if (flag == 1) {
            result.setCode(1);
            result.setMessage("修改成功！");
            return result;
        } else {
            result.setCode(-1);
            result.setMessage("修改失败！");
            return result;
        }
    }

    /**
     * 删除普通管理员账号
     *
     * @param phone
     * @return
     */
    @RequestMapping(value = "/deleteCommonAdmin", method = RequestMethod.POST)
    @ResponseBody
    public Result deleteCommonAdmin(String phone, HttpServletRequest request) {
        Result result = new Result();

        String token = request.getHeader("token");
        Integer check = JwtUtil.getIdentity(token);
        if (check != 0) {
            result.setCode(110);
            result.setMessage("非超级管理员，出现非法操作！");
            return result;
        }

        if (phone == null || phone.equals("")) {
            result.setCode(2);
            result.setMessage("参数为空！");
            return result;
        }

        AdminAccount account = adminAccountService.findAdminByPhone(phone);

        if (account == null) {
            result.setCode(0);
            result.setMessage("账号不存在！");
            return result;
        }

        Integer flag = adminAccountService.deleteCommonAdmin(phone);

        if (flag == 1) {
            result.setCode(1);
            result.setMessage("删除成功！");
            return result;
        } else {
            result.setCode(-1);
            result.setMessage("删除失败！");
            return result;
        }
    }

    /**
     * 管理员修改密码
     *
     * @param adminChangePassword
     * @return
     */
    @RequestMapping(value = "/changePassword", method = RequestMethod.POST)
    @ResponseBody
    public Result changePassword(AdminChangePassword adminChangePassword) {
        Result result = new Result();

        if (adminChangePassword == null) {
            result.setCode(2);
            result.setMessage("参数为空！");
            return result;
        }

        String phone = adminChangePassword.getPhone();
        String oldPassword = adminChangePassword.getOldPassword();
        String newPassword = adminChangePassword.getNewPassword();
        String ensurePassword = adminChangePassword.getEnsurePassword();

        if (phone == null || phone.equals("") || oldPassword == null || oldPassword.equals("") || newPassword == null || newPassword.equals("") || ensurePassword == null || ensurePassword.equals("")) {
            result.setCode(2);
            result.setMessage("参数为空！");
            return result;
        }

        if (!newPassword.equals(ensurePassword)) {
            result.setCode(4);
            result.setMessage("两次密码不一致！");
            return result;
        }

        AdminAccount account = adminAccountService.findAdminByPhone(phone);

        if (account == null) {
            result.setCode(0);
            result.setMessage("账号不存在！");
            return result;
        }

        if (!oldPassword.equals(account.getPassword())) {
            result.setCode(3);
            result.setMessage("旧密码错误！");
            return result;
        }

        Integer flag = adminAccountService.updatePassword(phone, newPassword);

        if (flag == 1) {
            result.setCode(1);
            result.setMessage("修改成功！");
            return result;
        } else {
            result.setCode(-1);
            result.setMessage("修改失败！");
            return result;
        }
    }

    /**
     * 管理员更改绑定手机
     *
     * @param adminChangePhone
     * @return
     */
    @RequestMapping(value = "/changePhone", method = RequestMethod.POST)
    @ResponseBody
    public Result changePhone(AdminChangePhone adminChangePhone) {
        Result result = new Result();

        if (adminChangePhone == null) {
            result.setCode(2);
            result.setMessage("参数为空！");
            return result;
        }

        String phone = adminChangePhone.getPhone();
        String newPhone = adminChangePhone.getNewPhone();
        String verifyCode = adminChangePhone.getVerifyCode();
        String newPassword = adminChangePhone.getNewPassword();
        String ensurePassword = adminChangePhone.getEnsurePassword();

        if (phone == null || phone.equals("") || newPhone == null || newPhone.equals("") || verifyCode == null || verifyCode.equals("") || newPassword == null || newPassword.equals("") || ensurePassword == null || ensurePassword.equals("")) {
            result.setCode(2);
            result.setMessage("参数为空！");
            return result;
        }

        if (!verifyCode.equals("123456")) {
            result.setCode(3);
            result.setMessage("验证码错误！");
            return result;
        }

        if (!newPassword.equals(ensurePassword)) {
            result.setCode(4);
            result.setMessage("两次密码不一致！");
            return result;
        }

        if (phone.equals(newPhone)) {
            result.setCode(5);
            result.setMessage("新旧手机号码一致！");
            return result;
        }

        AdminAccount account = adminAccountService.findAdminByPhone(phone);

        if (account == null) {
            result.setCode(0);
            result.setMessage("账号不存在！");
            return result;
        }

        AdminAccount adminAccount = adminAccountService.findAdminByPhone(newPhone);

        if (adminAccount != null) {
            result.setCode(6);
            result.setMessage("新手机号码已被注册！");
            return result;
        }

        Integer flag = adminAccountService.updatePhone(phone, newPhone, newPassword);

        if (flag == 1) {
            result.setCode(1);
            result.setMessage("修改成功！");
            return result;
        } else {
            result.setCode(-1);
            result.setMessage("修改失败！");
            return result;
        }
    }

    /**
     * 管理员忘记密码
     *
     * @param adminChangePassword
     * @return
     */
    @RequestMapping(value = "/forgetPassword", method = RequestMethod.POST)
    @ResponseBody
    public Result forgetPassword(AdminChangePassword adminChangePassword) {
        Result result = new Result();

        if (adminChangePassword == null) {
            result.setCode(2);
            result.setMessage("参数为空！");
            return result;
        }

        String phone = adminChangePassword.getPhone();
        String verifyCode = adminChangePassword.getVerifyCode();
        String newPassword = adminChangePassword.getNewPassword();
        String ensurePassword = adminChangePassword.getEnsurePassword();

        if (phone == null || phone.equals("") || verifyCode == null || verifyCode.equals("") || newPassword == null || newPassword.equals("") || ensurePassword == null || ensurePassword.equals("")) {
            result.setCode(2);
            result.setMessage("参数为空！");
            return result;
        }

        if (!verifyCode.equals("123456")) {
            result.setCode(3);
            result.setMessage("验证码错误！");
            return result;
        }

        if (!newPassword.equals(ensurePassword)) {
            result.setCode(4);
            result.setMessage("两次密码不一致！");
            return result;
        }

        AdminAccount account = adminAccountService.findAdminByPhone(phone);

        if (account == null) {
            result.setCode(0);
            result.setMessage("账号不存在！");
            return result;
        }

        Integer flag = adminAccountService.updatePassword(phone, newPassword);

        if (flag == 1) {
            result.setCode(1);
            result.setMessage("修改成功！");
            return result;
        } else {
            result.setCode(-1);
            result.setMessage("修改失败！");
            return result;
        }
    }

    /**
     * 管理员修改用户名
     *
     * @param phone
     * @param newName
     * @return
     */
    @RequestMapping(value = "/updateAdminName", method = RequestMethod.POST)
    @ResponseBody
    public Result updateAdminName(String phone, String newName) {
        Result result = new Result();

        if (phone == null || newName == null || phone.equals("") || newName.equals("")) {
            result.setCode(2);
            result.setMessage("参数为空！");
            return result;
        }

        AdminAccount account = adminAccountService.findAdminByPhone(phone);

        if (account == null) {
            result.setCode(0);
            result.setMessage("账号不存在！");
            return result;
        }

        Integer flag = adminAccountService.updateAdminName(phone, newName);

        if (flag == 1) {
            result.setCode(1);
            result.setMessage("修改成功！");
            return result;
        } else {
            result.setCode(-1);
            result.setMessage("修改失败！");
            return result;
        }
    }
}
