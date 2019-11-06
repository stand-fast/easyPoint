package com.easyPoint.Util;

public class WxPayConstants {

    //商户号
    public static final String MCH_ID = "1559868741";

    //终端IP
    public static final String SPBILL_CREATE_IP = "120.78.198.103";


    //交易类型
    public static final String TRADE_TYPE = "JSAPI";

    //统一下单API接口链接
    public static final String WXPAY_URL = "https://api.mch.weixin.qq.com/pay/unifiedorder";

    //申请退款接口链接
    public static final String REFUND_URL ="https://api.mch.weixin.qq.com/secapi/pay/refund";

    // 商户支付密钥
    public static final String KEY = "&key=z55nb16gn1h89sa5x1dsfe6r4ty6e5qq";

    //读取证书的安装路径
    public static final String CERTIFICATE_PATH="C:\\Users\\Administrator\\AppData\\Local\\Temp\\2\\Temp1_1559868741_20191022_cert.zip\\apiclient_cert.p12";
}
