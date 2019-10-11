package com.easyPoint.dto.pay;

/**
 * 微信小程序发起微信支付的请求参数
 */
public class RequestPaymentParamDto {

    //时间戳
    private Long timeStamp;
    //统一下单接口返回的 prepay_id 参数值，提交格式如：prepay_id=***
    private String packages;
    //利用MD5加密数据
    private String paySign;
    //随机字符串，长度为32个字符以下
    private String nonceStr;

    public RequestPaymentParamDto(Long timeStamp, String packages, String paySign, String nonceStr) {
        this.timeStamp = timeStamp;
        this.packages = packages;
        this.paySign = paySign;
        this.nonceStr = nonceStr;
    }

    public Long getTimeStamp() {
        return timeStamp;
    }

    public void setTimeStamp(Long timeStamp) {
        this.timeStamp = timeStamp;
    }

    public String getPackages() {
        return packages;
    }

    public void setPackages(String packages) {
        this.packages = packages;
    }

    public String getPaySign() {
        return paySign;
    }

    public void setPaySign(String paySign) {
        this.paySign = paySign;
    }

    public String getNonceStr() {
        return nonceStr;
    }

    public void setNonceStr(String nonceStr) {
        this.nonceStr = nonceStr;
    }

    @Override
    public String toString() {
        return "RequestPaymentParamDto{" +
                "timeStamp=" + timeStamp +
                ", packages='" + packages + '\'' +
                ", paySign='" + paySign + '\'' +
                ", nonceStr='" + nonceStr + '\'' +
                '}';
    }
}
