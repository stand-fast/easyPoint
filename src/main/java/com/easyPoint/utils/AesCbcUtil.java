package com.easyPoint.utils;


import org.apache.commons.codec.binary.Base64;
import org.bouncycastle.jce.provider.BouncyCastleProvider;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import java.io.UnsupportedEncodingException;
import java.security.*;

public class AesCbcUtil {
    public static final Logger log = LoggerFactory.getLogger(AesCbcUtil.class);
    static {
        Security.addProvider(new BouncyCastleProvider());
    }



    public static String encrypt(String data, String key, String iv, String encodingFormat) throws UnsupportedEncodingException {
        byte[] dataByte = data.getBytes(encodingFormat);
        byte[] keyByte = Base64.decodeBase64(key);
        byte[] ivByte = Base64.decodeBase64(iv);
        try {
            Cipher cipher = Cipher.getInstance("AES/CBC/PKCS7Padding");
            SecretKeySpec spec = new SecretKeySpec(keyByte, "AES");
            AlgorithmParameters parameters = AlgorithmParameters.getInstance("AES");
            parameters.init(new IvParameterSpec(ivByte));
            cipher.init(Cipher.ENCRYPT_MODE, spec, parameters);// 初始化
            byte[] resultByte = cipher.doFinal(dataByte);
            if (null != resultByte && resultByte.length > 0) {
                String result = Base64.encodeBase64String(resultByte);
                return result;
            }
        }catch (Exception e) {
            log.error("加密发生错误");
            return null;
        }
        return null;
    }
    /**
     * AES解密
     * @param data 密文，被加密的数据
     * @param key 秘钥
     * @param iv 偏移量
     * @param encodingFormat 解密后的结果需要进行的编码
     * @return 解密后数据
     * @author FJW
     */
    public static String decrypt(String data, String key, String iv, String encodingFormat) {
        byte[] dataByte = Base64.decodeBase64(data);
        byte[] keyByte = Base64.decodeBase64(key);
        byte[] ivByte = Base64.decodeBase64(iv);

        try {
            Cipher cipher = Cipher.getInstance("AES/CBC/PKCS7Padding");
            SecretKeySpec spec = new SecretKeySpec(keyByte, "AES");
            AlgorithmParameters parameters = AlgorithmParameters.getInstance("AES");
            parameters.init(new IvParameterSpec(ivByte));
            cipher.init(Cipher.DECRYPT_MODE, spec, parameters);// 初始化
            byte[] resultByte = cipher.doFinal(dataByte);
            if (null != resultByte && resultByte.length > 0) {
                String result = new String(resultByte, encodingFormat);
                return result;
            }
        }catch (Exception e) {
            log.error("解密发生错误");
            return null;
        }
        return null;
    }
}
