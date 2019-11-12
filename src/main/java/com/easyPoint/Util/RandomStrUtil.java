package com.easyPoint.Util;

import org.apache.commons.codec.digest.DigestUtils;

import java.io.UnsupportedEncodingException;
import java.security.SecureRandom;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;

public class RandomStrUtil {

    /**
     * 生成微信支付nonceStr随机字符串
     * @return 随机数
     * @throws UnsupportedEncodingException
     */
    public static String createNonceStr() throws UnsupportedEncodingException {
        long time = System.currentTimeMillis();
        SecureRandom sr = new SecureRandom();
        int randomNum = sr.nextInt(10000);
        String nonceStr = new StringBuffer().append(time).append(randomNum).toString();
        byte[] nonceStrByte = (nonceStr).getBytes("utf-8");
        return DigestUtils.md5Hex(nonceStrByte).toUpperCase();
    }

    /**
     * 商品订单号,用户下订单后台生成
     * @param uid uid
     * @return 长度为30的唯一字符串
     */
    public static String createOutTradeNo(int uid){
        String today = new SimpleDateFormat("yyyyMMdd").format(new Date());
        int uuid = UUID.randomUUID().toString().hashCode();
        if (uuid < 0) {
            uuid = -uuid;
        }
        String.format("%012d", uuid);
        String partUid = "000000".substring(0,6 - (uid + "").length()) + uid;
        StringBuffer randomCode = new StringBuffer();
        for(int i=0;i<4;i++){
            randomCode.append((int) (Math.random() * 9));
        }
        return new StringBuffer().append(randomCode).append(today).append(partUid).append(uuid).toString();
    }
}
