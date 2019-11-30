package com.easyPoint.interceptor;

import com.alibaba.fastjson.JSONObject;
import com.easyPoint.dto.Result;
import com.easyPoint.util.JwtUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

public class PcTokenInterceptor implements HandlerInterceptor {
    public static final Logger log = LoggerFactory.getLogger(PcTokenInterceptor.class);

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        response.setCharacterEncoding("utf-8");
        String token = request.getHeader("token");
        Result result = new Result();
        // token存在
        if (null != token) {
            //验证token是否正确
            boolean isRight = JwtUtil.verify(token);
            Date date = new Date();
            if (isRight) {
                long tokenTime = JwtUtil.getExpiresAt(token).getTime();
                // token过期
                if (date.getTime() > tokenTime) {
                    // 过期超过半个月
                    if (date.getTime() > (tokenTime + 15 * 24 * 60 * 60 * 1000)) {
                        System.out.println("token过期超过半个月！");
                        result.setCode(-30);
                        result.setMessage("token过期超过半个月，请重新登录！");
                        String jsonMessage = JSONObject.toJSONString(result);
                        responseMessage(response, jsonMessage);
                        return false;
                    }
                    // 过期没超过半个月，生成新的token
                    String newToken = JwtUtil.sign(JwtUtil.getPhone(token), JwtUtil.getIdentity(token));
                    System.out.println("token过期，生成新的token！");
                    result.setCode(10);
                    result.setMessage("token过期，生成新的token！");
                    Map<String, String> map = new HashMap<>();
                    map.put("newToken", newToken);
                    result.setData(map);
                    String jsonMessage = JSONObject.toJSONString(result);
                    responseMessage(response, jsonMessage);
                    return false;
                }
                return true;
            } else {
                System.out.println("token认证错误！");
                result.setCode(-20);
                result.setMessage("token认证错误！请登录！");
                String jsonMessage = JSONObject.toJSONString(result);
                responseMessage(response, jsonMessage);
                return false;
            }
        } else {
            result.setCode(-10);
            result.setMessage("token为空，用户未登录！");
            String jsonMessage = JSONObject.toJSONString(result);
            responseMessage(response, jsonMessage);
            return false;
        }
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
        System.out.println("加载完成");
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        System.out.println("结束");
    }

    /**
     * 返回信息给客户端
     *
     * @param response
     * @param message
     */
    private void responseMessage(HttpServletResponse response, String message) {
        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json; charset=utf-8");

        PrintWriter writer = null;

        try {
            writer = response.getWriter();
            writer.print(message);
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (writer != null) {
                writer.flush();
                writer.close();
            }
        }
    }
}
