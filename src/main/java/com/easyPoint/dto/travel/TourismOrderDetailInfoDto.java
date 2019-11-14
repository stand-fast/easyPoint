package com.easyPoint.dto.travel;

/**
 * 返回小程序租车订单详情信息
 */
public class TourismOrderDetailInfoDto extends DriverInfoDto {

    private String passenger;//乘客
    private String phone;//联系电话
    //是否购买保险
    private Integer ifInsurance;
    //付款金额
    private Integer payMoney;
    //下单时间
    private String makeOrderTime;
    //押金
    private String deposit;
    //是否被修改日期
    private Integer IfModified;

    //退款订单表id
    private Integer tourismRefundId;

    //退款原因
    private String refundReason;
    //驳回原因
    private String rejectReason;

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

    public Integer getIfInsurance() {
        return ifInsurance;
    }

    public void setIfInsurance(Integer ifInsurance) {
        this.ifInsurance = ifInsurance;
    }

    public Integer getPayMoney() {
        return payMoney;
    }

    public void setPayMoney(Integer payMoney) {
        this.payMoney = payMoney;
    }

    public String getMakeOrderTime() {
        return makeOrderTime;
    }

    public void setMakeOrderTime(String makeOrderTime) {
        this.makeOrderTime = makeOrderTime;
    }

    public Integer getTourismRefundId() {
        return tourismRefundId;
    }

    public void setTourismRefundId(Integer tourismRefundId) {
        this.tourismRefundId = tourismRefundId;
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

    public String getDeposit() {
        return deposit;
    }

    public void setDeposit(String deposit) {
        this.deposit = deposit;
    }

    @Override
    public String toString() {
        return "TourismOrderDetailInfoDto{" +
                "passenger='" + passenger + '\'' +
                ", phone='" + phone + '\'' +
                ", ifInsurance=" + ifInsurance +
                ", payMoney=" + payMoney +
                ", makeOrderTime='" + makeOrderTime + '\'' +
                ", deposit='" + deposit + '\'' +
                ", IfModified=" + IfModified +
                ", tourismRefundId=" + tourismRefundId +
                ", refundReason='" + refundReason + '\'' +
                ", rejectReason='" + rejectReason + '\'' +
                '}';
    }

    public Integer getIfModified() {
        return IfModified;
    }

    public void setIfModified(Integer ifModified) {
        IfModified = ifModified;
    }

}
