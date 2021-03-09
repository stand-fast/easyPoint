package com.easyPoint.utils;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/**
 * @author FHJ
 * @date 2019/12/1 19:16
 */
public class JwtUtil {
    public static final Logger log = LoggerFactory.getLogger(com.easyPoint.utils.JwtUtil.class);

    /**
     * 过期时间为30分钟
     */
    private static final long EXPIRE_TIME = 30 * 60 * 1000;
    /**
     * token私钥
     */
    private static final String TOKEN_SECRET = "r2a35g7s96g4j2k7s3a6t7eb14k27gkq";

    /**
     * 校验token是否正确
     *
     * @param token 密钥
     * @return 是否正确
     */
    public static boolean verify(String token) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(TOKEN_SECRET);
            JWTVerifier verifier = JWT.require(algorithm).build();
            DecodedJWT jwt = verifier.verify(token);
            return true;
        } catch (Exception exception) {
            log.error(exception.getMessage());
            return false;
        }
    }

    /**
     * @return token中包含的用户名
     */
    public static String getNickNames(String token) {
        DecodedJWT jwt = JWT.decode(token);
        return jwt.getClaim("nickName").asString();
    }

    /**
     * 获取登陆用户ID
     */
    public static int getUid(String token) {
        DecodedJWT jwt = JWT.decode(token);
        return jwt.getClaim("uid").asInt();
    }

    /**
     * @param token
     * @return 过期时间
     */
    public static Date getExpiresAt(String token) {
        DecodedJWT jwt = JWT.decode(token);
        return jwt.getExpiresAt();
    }

    /**
     * 生成签名,30min后过期
     */
    public static String sign(int uid, String nickName) {
        try {
//            过期时间
            Date date = new Date(System.currentTimeMillis() + EXPIRE_TIME);
//            私钥及加密算法
            Algorithm algorithm = Algorithm.HMAC256(TOKEN_SECRET);
//            设置头部信息
            Map<String, Object> header = new HashMap<>();
            header.put("typ", "JWT");
            header.put("alg", "HS256");
            // 附带nickname，uid信息，生成签名
            return JWT.create().withHeader(header).withClaim("nickName", nickName).withClaim("uid", uid)
                    .withExpiresAt(date).sign(algorithm);
        } catch (Exception e) {
            log.error("token生成发生错误");
            return null;
        }
    }

    /**
     * 获取登陆用户手机号
     */
    public static String getPhone(String token) {
        DecodedJWT jwt = JWT.decode(token);
        return jwt.getClaim("phone").asString();
    }

    /**
     * 获取管理员身份
     */
    public static Integer getIdentity(String token) {
        DecodedJWT jwt = JWT.decode(token);
        return jwt.getClaim("identity").asInt();
    }

    /**
     * 生成签名，返回jwt字符串
     *
     * @param phone
     * @return
     */
    public static String sign(String phone, Integer identity) {
        try {
            // 过期时间
            Date expiration_time = new Date(System.currentTimeMillis() + EXPIRE_TIME);
            // 私钥及加密算法
            Algorithm algorithm = Algorithm.HMAC256(TOKEN_SECRET);
            // 设置头部信息
            Map<String, Object> header = new HashMap<>();
            header.put("type", "JWT");
            header.put("alg", "HS256");
            // 附带userId信息，生成签名
            return JWT.create().withHeader(header).withClaim("phone", phone).withClaim("identity", identity)
                    .withExpiresAt(expiration_time).sign(algorithm);
        } catch (Exception e) {
            log.error("token生成发生错误");
            log.error(e.getMessage());
            return null;
        }
    }
}
