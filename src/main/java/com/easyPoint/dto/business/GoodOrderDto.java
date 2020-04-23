package com.easyPoint.dto.business;


/**
 * 订单详情
 */

public class GoodOrderDto {
    private String goodOrderId;
    private GoodsDtoForOrder goodsDtoForOrder;
    private String userName;
    private String phone;
    private Integer number;
    private Integer leaseDate;
    private String size;
    private Double totalPrice;
    private String receiveTime;
    private String makeOrderTime;
    private Integer state;
    private String transactionId;

    public String getGoodOrderId() {
        return goodOrderId;
    }

    public void setGoodOrderId(String goodOrderId) {
        this.goodOrderId = goodOrderId;
    }

    public GoodsDtoForOrder getGoodsDtoForOrder() {
        return goodsDtoForOrder;
    }

    public void setGoodsDtoForOrder(GoodsDtoForOrder goodsDtoForOrder) {
        this.goodsDtoForOrder = goodsDtoForOrder;
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

    public Integer getLeaseDate() {
        return leaseDate;
    }

    public void setLeaseDate(Integer leaseDate) {
        this.leaseDate = leaseDate;
    }

    public String getSize() {
        return size;
    }

    public void setSize(String size) {
        this.size = size;
    }

    public Double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(Double totalPrice) {
        this.totalPrice = totalPrice;
    }

    public String getReceiveTime() {
        return receiveTime;
    }

    public void setReceiveTime(String receiveTime) {
        this.receiveTime = receiveTime;
    }

    public String getMakeOrderTime() {
        return makeOrderTime;
    }

    public void setMakeOrderTime(String makeOrderTime) {
        this.makeOrderTime = makeOrderTime;
    }

    public Integer getState() {
        return state;
    }

    public void setState(Integer state) {
        this.state = state;
    }

    public String getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(String transactionId) {
        this.transactionId = transactionId;
    }
}
