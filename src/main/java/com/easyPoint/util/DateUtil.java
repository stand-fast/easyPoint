package com.easyPoint.Util;

import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * @author FJW
 * 创建日期类
 */
public class DateUtil {

    /**
     * 获取当前时间
     * @return 返回格式化时间
     */
    public static String getDateTime(){
        Date date = new Date();
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        return simpleDateFormat.format(date);
    }
}
