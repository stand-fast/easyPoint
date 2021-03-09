package com.easyPoint.controller.administrator.accountoperation;

import com.easyPoint.dto.Result;
import com.easyPoint.pojo.adminstrator.AdminAccount;
import com.easyPoint.service.administrator.account.AdminAccountService;

import com.easyPoint.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.Map;

/**
 * 管理员登录
 *
 * @author FHJ
 * @date 2019/11/30 18:35
 */
@CrossOrigin
@Controller
@RequestMapping("/administrator")
public class AdminLoginController {

    @Autowired
    AdminAccountService adminAccountService;

    /**
     * 管理员登录
     *
     * @param phone
     * @param password
     * @return
     */
    @RequestMapping(value = "/adminLogin", method = RequestMethod.POST)
    @ResponseBody
    public Result adminLogin(String phone, String password) {
        Result result = new Result();

        if (phone == null || phone.equals("") || password == null || password.equals("")) {
            result.setCode(2);
            result.setMessage("参数为空！");
            return result;
        }

        AdminAccount adminAccount = adminAccountService.findAdminByPhone(phone);

        if (adminAccount == null) {
            result.setCode(-1);
            result.setMessage("用户名或密码错误！");
            return result;
        }

        if (!adminAccount.getPassword().equals(password)) {
            result.setCode(-1);
            result.setMessage("用户名或密码错误！");
            return result;
        }

        String token = JwtUtil.sign(phone, adminAccount.getIdentity());
        Map<String, Object> map = new HashMap<>(2);
        map.put("token", token);
        adminAccount.setPassword(null);
        map.put("admin", adminAccount);
        result.setCode(1);
        result.setMessage("登录成功！");
        result.setData(map);
        return result;
    }
}
