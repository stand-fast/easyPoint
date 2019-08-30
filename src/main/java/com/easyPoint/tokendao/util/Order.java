package com.easyPoint.tokendao.util;

import java.util.Date;

import org.springframework.stereotype.Component;

import com.merchant.util.Goods;
import com.merchant.util.GoodsVariety;
@Component
public class Order {
	String orderId;// 订单编号
	String uid;// 购买用户
	String goodId;// 商品编号
	Goods good;// 商品
	String varietyId;// 商品规格
	GoodsVariety variety;
	String addressId;// 地址编号
	UserAddress address;// 收货地址
	int number;// 商品数量
	double totalPrice;// 总金额
	String startTime;// 下单时间
	Date deliveryTime;// 发货时间
	Date receiveTime;// 收货时间
	Date finishTime;// 完成时间
	String refund;// 是否退款 0否1退
	String state;// 1已付款，2已取货，3已完成
	
	String logo;//商家logo
	String companyName;//商家名称

	public String getOrderId() {
		return orderId;
	}

	public void setOrderId(String orderId) {
		this.orderId = orderId;
	}

	

	public String getUid() {
		return uid;
	}

	public void setUid(String uid) {
		this.uid = uid;
	}

	public Goods getGood() {
		return good;
	}

	public void setGoodId(Goods good) {
		this.good = good;
	}

	public UserAddress getAddress() {
		return address;
	}

	public void setAddressId(UserAddress address) {
		this.address = address;
	}

	public int getNumber() {
		return number;
	}

	public void setNumber(int number) {
		this.number = number;
	}



	public double getTotalPrice() {
		return totalPrice;
	}

	public void setTotalPrice(double totalPrice) {
		this.totalPrice = totalPrice;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getGoodId() {
		return goodId;
	}

	public void setGoodId(String goodId) {
		this.goodId = goodId;
	}

	public String getVarietyId() {
		return varietyId;
	}

	public void setVarietyId(String varietyId) {
		this.varietyId = varietyId;
	}

	public GoodsVariety getVariety() {
		return variety;
	}

	public void setVariety(GoodsVariety variety) {
		this.variety = variety;
	}

	public String getAddressId() {
		return addressId;
	}

	public void setAddressId(String addressId) {
		this.addressId = addressId;
	}

	

	public String getStartTime() {
		return startTime;
	}

	public void setStartTime(String startTime) {
		this.startTime = startTime;
	}

	public Date getDeliveryTime() {
		return deliveryTime;
	}

	public void setDeliveryTime(Date deliveryTime) {
		this.deliveryTime = deliveryTime;
	}

	public Date getReceiveTime() {
		return receiveTime;
	}

	public void setReceiveTime(Date receiveTime) {
		this.receiveTime = receiveTime;
	}

	public Date getFinishTime() {
		return finishTime;
	}

	public void setFinishTime(Date finishTime) {
		this.finishTime = finishTime;
	}

	public String getRefund() {
		return refund;
	}

	public void setRefund(String refund) {
		this.refund = refund;
	}

	public void setGood(Goods good) {
		this.good = good;
	}

	public void setAddress(UserAddress address) {
		this.address = address;
	}
	

	public String getLogo() {
		return logo;
	}

	public void setLogo(String logo) {
		this.logo = logo;
	}

	public String getCompanyName() {
		return companyName;
	}

	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}

	@Override
	public String toString() {
		return "Order [orderId=" + orderId + ", uid=" + uid + ", goodId=" + goodId + ", good=" + good + ", varietyId="
				+ varietyId + ", variety=" + variety + ", addressId=" + addressId + ", address=" + address + ", number="
				+ number + ", totalPrice=" + totalPrice + ", startTime=" + startTime + ", deliveryTime=" + deliveryTime
				+ ", receiveTime=" + receiveTime + ", finishTime=" + finishTime + ", refund=" + refund + ", state="
				+ state + ", logo=" + logo + ", companyName=" + companyName + "]";
	}

}
