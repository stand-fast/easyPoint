package com.easyPoint.tokendao.controller;

import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import com.alibaba.fastjson.JSONObject;
import com.user.util.JwtUtil;
import com.user.util.LoginResponse;
import com.user.util.LoginResponseUtil;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.PrintWriter;

public class TokenInterceptor implements HandlerInterceptor {
	

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        response.setCharacterEncoding("utf-8");
        String token = request.getHeader("access_token");
        //token不存在
        if (null != token) {
            //验证token是否正确
            boolean result = JwtUtil.verify(token);
            if (result) {
            	System.out.println("token认证正确");
            	return true;
            }
            else {
            	System.out.println("token认证错误");
            	int uid = JwtUtil.getUid(token);
            	System.out.println(uid);
            	String nickName = JwtUtil.getUsername(token);
            	token = JwtUtil.sign(uid, nickName);
            }
        }
        LoginResponse loginResponse = LoginResponseUtil.getLoginResponse(token,400,"请求失败");
        responseMessage(response,response.getWriter(),loginResponse);
        return false;
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {

    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {

    }

    /**
     * 返回信息给客户端
     */
    private void responseMessage(HttpServletResponse response, PrintWriter out, LoginResponse loginResponse) {
        response.setContentType("application/json; charset=utf-8");
        out.print(JSONObject.toJSONString(loginResponse));
        out.flush();
        out.close();
    }
}
