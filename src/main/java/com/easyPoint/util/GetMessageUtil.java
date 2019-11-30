package com.easyPoint.util;

/**
 * @author FHJ
 * @date 2019/11/23 20:07
 */
public class GetMessageUtil {

    public static String getMessage() {
        double message = Math.random();
        if (message < 0.1) {
            message += 0.1;
        }
        return (int) (message * 1000000) + "";
    }
}
