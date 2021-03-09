package com.easyPoint.dto.travel;

import java.math.BigDecimal;

/**
 * 管理员申请退款页面数据
 */
public class TourismRefundPageDto {
    //退款表id
    private Integer tourismRefundId;
    //微信订单号
    private String transactionId;
    //乘客名称
    private String passenger;
    //联系电话
    private String phone;
    //退款金额
    private BigDecimal refundMoney;
    //退款时间
    private String requestRefundTime;
    //退款状态
    private Integer refundState;

    public Integer getTourismRefundId() {
        return tourismRefundId;
    }

    public void setTourismRefundId(Integer tourismRefundId) {
        this.tourismRefundId = tourismRefundId;
    }

    public String getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(String transactionId) {
        this.transactionId = transactionId;
    }

    public String getPassenger() {
        return passenger;
    }

    public void setPassenger(String passenger) {
        this.passenger = passenger;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public BigDecimal getRefundMoney() {
        return refundMoney;
    }

    public void setRefundMoney(BigDecimal refundMoney) {
        this.refundMoney = refundMoney;
    }

    public String getRequestRefundTime() {
        return requestRefundTime;
    }

    public void setRequestRefundTime(String requestRefundTime) {
        this.requestRefundTime = requestRefundTime;
    }

    public Integer getRefundState() {
        return refundState;
    }

    public void setRefundState(Integer refundState) {
        this.refundState = refundState;
    }

    @Override
    public String toString() {
        return "TourismRefundPageDto{" +
                "transactionId='" + transactionId + '\'' +
                ", passenger='" + passenger + '\'' +
                ", phone='" + phone + '\'' +
                ", refundMoney=" + refundMoney +
                ", requestRefundTime='" + requestRefundTime + '\'' +
                ", refundState=" + refundState +
                '}';
    }
}
