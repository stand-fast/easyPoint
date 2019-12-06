package com.easyPoint.pojo.travel;

/**
 * @author FJW
 * 租车退款表信息
 */
public class TourismRefundInfo {
    //表id
    private Integer tourismRefundId;
    //travel_order表id
    private Integer travelOrderId;
    //退款状态1：待处理，2：审核不通过；3：正在退款；4：已退款；5：已取消
    private Integer refundState;
    //用户申请退款时间
    private String requestRefundTime;
    //管理员确定退款时间
    private String confirmRefundTime;
    //退款时间
    private String refundTime;
    //微信退款单号
    private String refundId;
    //退款金额；单位为分
    private Integer refundFee;
    //退款理由
    private String refundReason;
    //操作该退款订单的管理员id
    private Integer admiUid;
    //驳回原因
    private String rejectReason;

    public Integer getAdmiUid() {
        return admiUid;
    }

    public void setAdmiUid(Integer admiUid) {
        this.admiUid = admiUid;
    }

    public Integer getTourismRefundId() {
        return tourismRefundId;
    }

    public void setTourismRefundId(Integer tourismRefundId) {
        this.tourismRefundId = tourismRefundId;
    }

    public Integer getTravelOrderId() {
        return travelOrderId;
    }

    public void setTravelOrderId(Integer travelOrderId) {
        this.travelOrderId = travelOrderId;
    }

    public Integer getRefundState() {
        return refundState;
    }

    public void setRefundState(Integer refundState) {
        this.refundState = refundState;
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

    public String getRefundTime() {
        return refundTime;
    }

    public void setRefundTime(String refundTime) {
        this.refundTime = refundTime;
    }

    public String getRefundId() {
        return refundId;
    }

    public void setRefundId(String refundId) {
        this.refundId = refundId;
    }

    public Integer getRefundFee() {
        return refundFee;
    }

    public void setRefundFee(Integer refundFee) {
        this.refundFee = refundFee;
    }

    public String getRefundReason() {
        return refundReason;
    }

    public void setRefundReason(String refundReason) {
        this.refundReason = refundReason;
    }

    public String getRejectReason() {
        return rejectReason;
    }

    public void setRejectReason(String rejectReason) {
        this.rejectReason = rejectReason;
    }

    @Override
    public String toString() {
        return "TourismRefundInfo{" +
                "tourismRefundId=" + tourismRefundId +
                ", travelOrderId=" + travelOrderId +
                ", refundState=" + refundState +
                ", requestRefundTime='" + requestRefundTime + '\'' +
                ", confirmRefundTime='" + confirmRefundTime + '\'' +
                ", refundTime='" + refundTime + '\'' +
                ", refundId='" + refundId + '\'' +
                ", refundFee='" + refundFee + '\'' +
                ", refundReason='" + refundReason + '\'' +
                ", admiUid=" + admiUid +
                ", rejectReason='" + rejectReason + '\'' +
                '}';
    }
}
