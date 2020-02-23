package com.easyPoint.dto.business;

import com.easyPoint.pojo.business.Goods;

/**
 * 订单详情
 */
public class GoodOrderDto {
     private String goodOrderId;
     private Goods goods;
     private double price;
     private String userName;
     private String phone;
     private Integer number;
     private String size;
     private Integer leaseDate;
     private String makeOrderTime;
     private String receiveTime;
     private String state;
     private String transactionId;

    public String getGoodOrderId() {
        return goodOrderId;
    }

    public void setGoodOrderId(String goodOrderId) {
        this.goodOrderId = goodOrderId;
    }

    public Goods getGoods() {
        return goods;
    }

    public void setGoods(Goods goods) {
        this.goods = goods;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
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

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(String transactionId) {
        this.transactionId = transactionId;
    }
}
