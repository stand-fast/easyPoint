package com.easyPoint.pojo.lease;

import java.io.Serializable;
import java.math.BigDecimal;

/**
 * @author jw
 * 租赁订单表信息
 */
public class GoodOrder implements Serializable {
    private Integer goodOrderId;//订单编号
    private Integer goodId;
    private Integer uid;//微信用户
    private Integer varietyId;//商品规格id
    private String userName;//姓名
    private String phone;//联系电话
    private Integer number;//购买数量
    private BigDecimal totalPrice;//总金额
    private String size;//尺寸
    private Integer leaseDate;//租借天数
    private String makeOrderTime;//下单时间
    private String receiveTime;//取货时间
    private String receiveAddress;//取货地址
    private String returnTime;//归还时间
    private String note;//备注信息
    private Integer state;//订单状态	1：未发货；2已取货；3：已完成
    private String outTradeNo;	//char(30)	商户订单号
    private String transactionId;	//char(32)	微信订单号


    @Override
    public String toString() {
        return "GoodOrder{" +
                "goodOrderId=" + goodOrderId +
                ", goodId=" + goodId +
                ", uid=" + uid +
                ", varietyId=" + varietyId +
                ", userName='" + userName + '\'' +
                ", phone='" + phone + '\'' +
                ", number=" + number +
                ", totalPrice=" + totalPrice +
                ", size='" + size + '\'' +
                ", leaseDate=" + leaseDate +
                ", makeOrderTime='" + makeOrderTime + '\'' +
                ", receiveTime='" + receiveTime + '\'' +
                ", receiveAddress='" + receiveAddress + '\'' +
                ", returnTime='" + returnTime + '\'' +
                ", note='" + note + '\'' +
                ", state=" + state +
                ", outTradeNo='" + outTradeNo + '\'' +
                ", transactionId='" + transactionId + '\'' +
                '}';
    }

    public String getReceiveAddress() {
        return receiveAddress;
    }

    public void setReceiveAddress(String receiveAddress) {
        this.receiveAddress = receiveAddress;
    }

    public String getReturnTime() {
        return returnTime;
    }

    public void setReturnTime(String returnTime) {
        this.returnTime = returnTime;
    }

    public Integer getGoodId() {
        return goodId;
    }

    public void setGoodId(Integer goodId) {
        this.goodId = goodId;
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

    public Integer getGoodOrderId() {
        return goodOrderId;
    }

    public void setGoodOrderId(Integer goodOrderId) {
        this.goodOrderId = goodOrderId;
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

    public BigDecimal getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(BigDecimal totalPrice) {
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

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public Integer getState() {
        return state;
    }

    public void setState(Integer state) {
        this.state = state;
    }
}
