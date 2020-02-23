package com.easyPoint.dto.lease;

import java.math.BigDecimal;

/**
 * @author jw
 * 小程序租赁订单详情页信息
 */
public class MiniLeaseOrderDetailDto {
    private Integer goodOrderId;//订单编号
    private String businessName;//商家名称
    private String userName;//姓名
    private String phone;//联系电话
    private String goodName;//商品名称
    private BigDecimal price;//商品价格
    private String goodDescription;//商品描述
    private BigDecimal deposit;//押金
    private Integer number;//购买数量
    private BigDecimal totalPrice;//总金额
    private String size;//尺寸
    private Integer leaseDate;//租借天数
    private String receiveAddress;//取货地点
    private String makeOrderTime;//下单时间
    private String receiveTime;//取货时间
    private String returnTime;//归还时间
    private String note;//备注信息
    private Integer state;//订单状态	1：未发货；2已取货；3：已完成
    private String transactionId;	//char(32)	微信订单号

    public Integer getGoodOrderId() {
        return goodOrderId;
    }

    public void setGoodOrderId(Integer goodOrderId) {
        this.goodOrderId = goodOrderId;
    }

    public String getBusinessName() {
        return businessName;
    }

    public void setBusinessName(String businessName) {
        this.businessName = businessName;
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

    public String getGoodName() {
        return goodName;
    }

    public void setGoodName(String goodName) {
        this.goodName = goodName;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public String getGoodDescription() {
        return goodDescription;
    }

    public void setGoodDescription(String goodDescription) {
        this.goodDescription = goodDescription;
    }

    public BigDecimal getDeposit() {
        return deposit;
    }

    public void setDeposit(BigDecimal deposit) {
        this.deposit = deposit;
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

    public String getReceiveAddress() {
        return receiveAddress;
    }

    public void setReceiveAddress(String receiveAddress) {
        this.receiveAddress = receiveAddress;
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

    public String getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(String transactionId) {
        this.transactionId = transactionId;
    }

    @Override
    public String toString() {
        return "MiniLeaseOrderDetailDto{" +
                "goodOrderId=" + goodOrderId +
                ", businessName='" + businessName + '\'' +
                ", userName='" + userName + '\'' +
                ", phone='" + phone + '\'' +
                ", goodName='" + goodName + '\'' +
                ", price=" + price +
                ", goodDescription='" + goodDescription + '\'' +
                ", deposit=" + deposit +
                ", number=" + number +
                ", totalPrice=" + totalPrice +
                ", size='" + size + '\'' +
                ", leaseDate=" + leaseDate +
                ", receiveAddress='" + receiveAddress + '\'' +
                ", makeOrderTime='" + makeOrderTime + '\'' +
                ", receiveTime='" + receiveTime + '\'' +
                ", returnTime='" + returnTime + '\'' +
                ", note='" + note + '\'' +
                ", state=" + state +
                ", transactionId='" + transactionId + '\'' +
                '}';
    }
}
