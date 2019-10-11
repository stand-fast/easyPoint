package com.easyPoint.Util;

public class WxPayConstants {

    //商户号
    public static final String MCH_ID = "填写商户号";

    //终端IP
    public static final String SPBILL_CREATE_IP = "120.78.198.103";

    //通知地址
    public static final String NOTIFY_URL = "https://easypoint.club/weixin/paycallback.do";

    //交易类型
    public static final String TRADE_TYPE = "JSAPI";

    //统一下单API接口链接
    public static final String WXPAY_URL = "https://api.mch.weixin.qq.com/pay/unifiedorder";

    // 商户支付密钥
    public static final String KEY = "&key=填写商户支付密钥";
}
