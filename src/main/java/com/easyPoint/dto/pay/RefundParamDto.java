package com.easyPoint.dto.pay;

/**
 * FJW
 * 退款请求参数
 */
public class RefundParamDto {
    //微信分配的小程序ID
    private String appid;
    //微信支付分配的商户号
    private String mch_id;
    //随机字符串
    private String nonce_str;
    //签名
    private String sign;
    //微信生成的订单号
    private String transaction_id;
    //商户退款单号
    private String out_refund_no;
    //订单金额
    private Integer total_fee;
   //退款金额
    private Integer refund_fee;
    //退款结果通知url
    private String notify_url;

    public String getAppid() {
        return appid;
    }

    public void setAppid(String appid) {
        this.appid = appid;
    }

    public String getMch_id() {
        return mch_id;
    }

    public void setMch_id(String mch_id) {
        this.mch_id = mch_id;
    }

    public String getNonce_str() {
        return nonce_str;
    }

    public void setNonce_str(String nonce_str) {
        this.nonce_str = nonce_str;
    }

    public String getSign() {
        return sign;
    }

    public void setSign(String sign) {
        this.sign = sign;
    }

    public String getTransaction_id() {
        return transaction_id;
    }

    public void setTransaction_id(String transaction_id) {
        this.transaction_id = transaction_id;
    }

    public String getOut_refund_no() {
        return out_refund_no;
    }

    public Integer getTotal_fee() {
        return total_fee;
    }

    public void setTotal_fee(Integer total_fee) {
        this.total_fee = total_fee;
    }

    public void setOut_refund_no(String out_refund_no) {
        this.out_refund_no = out_refund_no;
    }

    public Integer getRefund_fee() {
        return refund_fee;
    }

    public void setRefund_fee(Integer refund_fee) {
        this.refund_fee = refund_fee;
    }

    public String getNotify_url() {
        return notify_url;
    }

    public void setNotify_url(String notify_url) {
        this.notify_url = notify_url;
    }

    @Override
    public String toString() {
        return "RefundParamDto{" +
                "appid='" + appid + '\'' +
                ", mch_id='" + mch_id + '\'' +
                ", nonce_str='" + nonce_str + '\'' +
                ", sign='" + sign + '\'' +
                ", transaction_id='" + transaction_id + '\'' +
                ", out_refund_no='" + out_refund_no + '\'' +
                ", total_fee=" + total_fee +
                ", refund_fee=" + refund_fee +
                ", notify_url='" + notify_url + '\'' +
                '}';
    }
}
