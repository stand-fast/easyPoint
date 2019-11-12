package com.easyPoint.interceptor;

import com.easyPoint.dto.Result;
import com.easyPoint.util.JwtUtil;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.PrintWriter;

public class TokenIntercptor implements HandlerInterceptor {
    public static final Logger log = LoggerFactory.getLogger(TokenIntercptor.class);
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        System.out.println("拦截器开始");
        response.setCharacterEncoding("utf-8");
        //response.addHeader("token","token");
        String token = request.getHeader("token");
//        Date date = new Date(System.currentTimeMillis());
//        //token不存在
        if (null != token) {
            //验证token是否正确
            boolean result = JwtUtil.verify(token);
            if (result) {
                System.out.println("token认证正确");
                int uid = JwtUtil.getUid(token);
                request.setAttribute("uid",uid);
                return true;
            }
            else { //if( date.getTime() <= JwtUtil.getExpiresAt(token).getTime() + 3*24*60*60*1000)
                try{
                    System.out.println("token认证错误");
                    int uid = JwtUtil.getUid(token);
                    String nickName = JwtUtil.getNickNames(token);
                    token = JwtUtil.sign(uid, nickName);
                    response.addHeader("token",token);
                }catch (Exception e){
                    responseMessage(response,response.getWriter());
                    return false;
                }
                return true;
            }
        }
//        //登录已经过期
        responseMessage(response,response.getWriter());
        return true;
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
        System.out.println("拦截器：加载完成");
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        System.out.println("拦截器：结束");
    }
    /**
     * 返回信息给客户端
     */
    private void responseMessage(HttpServletResponse response, PrintWriter out) {
        response.setContentType("application/json; charset=utf-8");
        ObjectMapper mapper = new ObjectMapper();
        String loginOverdueResponse = null;
        try {
            loginOverdueResponse = mapper.writeValueAsString(new Result<>(400,"登录已经过期，重新登录！"));
        } catch (JsonProcessingException e) {
            log.error("TokenIntercptor转换JSON格式出错");
        }
        out.print(loginOverdueResponse);
        out.flush();
        out.close();
    }
}
