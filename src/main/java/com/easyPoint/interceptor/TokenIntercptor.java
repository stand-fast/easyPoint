package com.easyPoint.interceptor;

import com.easyPoint.Util.AesCbcUtil;
import com.easyPoint.Util.JwtUtil;
import com.easyPoint.pojo.Result;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.PrintWriter;
import java.util.Date;

public class TokenIntercptor implements HandlerInterceptor {
    public static final Logger log = LoggerFactory.getLogger(TokenIntercptor.class);
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        response.setCharacterEncoding("utf-8");
        String token = request.getHeader("access_token");
        Date date = new Date(System.currentTimeMillis());
        //token不存在
        if (null != token) {
            //验证token是否正确
            boolean result = JwtUtil.verify(token);
            if (result) {
                System.out.println("token认证正确");
                return true;
            }
            else { //if( date.getTime() <= JwtUtil.getExpiresAt(token).getTime() + 3*24*60*60*1000)
                System.out.println("token认证错误");
                int uid = JwtUtil.getUid(token);
                String nickName = JwtUtil.getNickNames(token);
                token = JwtUtil.sign(uid, nickName);
                response.addHeader("access_token",token);
                return true;
            }
        }
        //登录已经过期
        responseMessage(response,response.getWriter());
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
    private void responseMessage(HttpServletResponse response, PrintWriter out) {
        response.setContentType("application/json; charset=utf-8");
        ObjectMapper mapper = new ObjectMapper();
        String loginOverdueResponse = null;
        try {
            loginOverdueResponse = mapper.writeValueAsString(new Result<>(400,"登录已经过期，重新登录！",null));
        } catch (JsonProcessingException e) {
            log.error("TokenIntercptor转换JSON格式出错");
        }
        out.print(loginOverdueResponse);
        out.flush();
        out.close();
    }
}
