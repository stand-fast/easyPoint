package com.easyPoint.pojo.business;

/**
 * 商品订单
 */
public class GoodOrder {
    private String goodOrderId;
    private String goodId;
    private Integer uid;
    private Integer varietyId;
    private String userName;
    private String phone;
    private Integer number;
    private double totalPrice;
    private String size;
    private Integer leaseDate;
    private String makeOrderTime;
    private String receiveTime;
    private String returnTime;
    private String receiveAddress;
    private String note;
    private String refund;
    private String state;
    private String outTradeNo;
    private String transactionId;

    public String getGoodOrderId() {
        return goodOrderId;
    }

    public void setGoodOrderId(String goodOrderId) {
        this.goodOrderId = goodOrderId;
    }

    public String getGoodId() {
        return goodId;
    }

    public void setGoodId(String goodId) {
        this.goodId = goodId;
    }

    public Integer getUid() {
        return uid;
    }

    public void setUid(Integer uid) {
        this.uid = uid;
    }

    public Integer getVarietyId() {
        return varietyId;
    }

    public void setVarietyId(Integer varietyId) {
        this.varietyId = varietyId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public Integer getNumber() {
        return number;
    }

    public void setNumber(Integer number) {
        this.number = number;
    }

    public double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(double totalPrice) {
        this.totalPrice = totalPrice;
    }

    public String getSize() {
        return size;
    }

    public void setSize(String size) {
        this.size = size;
    }

    public Integer getLeaseDate() {
        return leaseDate;
    }

    public void setLeaseDate(Integer leaseDate) {
        this.leaseDate = leaseDate;
    }

    public String getMakeOrderTime() {
        return makeOrderTime;
    }

    public void setMakeOrderTime(String makeOrderTime) {
        this.makeOrderTime = makeOrderTime;
    }

    public String getReceiveTime() {
        return receiveTime;
    }

    public void setReceiveTime(String receiveTime) {
        this.receiveTime = receiveTime;
    }

    public String getReturnTime() {
        return returnTime;
    }

    public void setReturnTime(String returnTime) {
        this.returnTime = returnTime;
    }

    public String getReceiveAddress() {
        return receiveAddress;
    }

    public void setReceiveAddress(String receiveAddress) {
        this.receiveAddress = receiveAddress;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public String getRefund() {
        return refund;
    }

    public void setRefund(String refund) {
        this.refund = refund;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getOutTradeNo() {
        return outTradeNo;
    }

    public void setOutTradeNo(String outTradeNo) {
        this.outTradeNo = outTradeNo;
    }

    public String getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(String transactionId) {
        this.transactionId = transactionId;
    }
}
