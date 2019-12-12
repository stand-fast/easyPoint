package com.easyPoint.dto.travel;

import java.math.BigDecimal;

public class MiniTourismRefundPageDto {
    //退款表id
    private Integer tourismRefundId;
    //微信订单号
    private String transactionId;

    //退款金额
    private BigDecimal refundMoney;
    //用户申请退款时间
    private String requestRefundTime;
    //管理员确定退款时间
    private String confirmRefundTime;
    //取消退款或者退款成功时间
    private String finishTime;
    //退款状态
    private Integer refundState;
    //驳回原因
    private String rejectReason;

    @Override
    public String toString() {
        return "MiniTourismRefundPageDto{" +
                "tourismRefundId=" + tourismRefundId +
                ", transactionId='" + transactionId + '\'' +
                ", refundMoney=" + refundMoney +
                ", requestRefundTime='" + requestRefundTime + '\'' +
                ", confirmRefundTime='" + confirmRefundTime + '\'' +
                ", finishTime='" + finishTime + '\'' +
                ", refundState=" + refundState +
                ", rejectReason='" + rejectReason + '\'' +
                '}';
    }

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

    public String getConfirmRefundTime() {
        return confirmRefundTime;
    }

    public void setConfirmRefundTime(String confirmRefundTime) {
        this.confirmRefundTime = confirmRefundTime;
    }

    public String getFinishTime() {
        return finishTime;
    }

    public void setFinishTime(String finishTime) {
        this.finishTime = finishTime;
    }

    public Integer getRefundState() {
        return refundState;
    }

    public void setRefundState(Integer refundState) {
        this.refundState = refundState;
    }

    public String getRejectReason() {
        return rejectReason;
    }

    public void setRejectReason(String rejectReason) {
        this.rejectReason = rejectReason;
    }
}
