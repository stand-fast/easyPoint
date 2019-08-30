package com.easyPoint.tokendao.util;

import java.io.Serializable;
import java.util.Arrays;

import org.springframework.stereotype.Component;

@Component
public class Goods implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	String goodId;//商品编号
	String goodName;//商品名称
	float price;//最低价格
	float freight;//运费
	int sales;//销量
	String detailsInfo;//商品详情
	String pro_img;//商品界面图片
	String details_img;//详情轮播图图片
	String[] details_img_list;
	int browse;//浏览量
	int collection;//收藏量
	String type;//商品类型 1：租赁共享；2：民宿酒店；3：情谊表达；4：娱乐美食
	String merchantId;//商家Id

	
	public int getBrowse() {
		return browse;
	}
	public void setBrowse(int browse) {
		this.browse = browse;
	}
	
	public int getCollection() {
		return collection;
	}
	public void setCollection(int collection) {
		this.collection = collection;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getGoodId() {
		return goodId;
	}
	public void setGoodId(String goodId) {
		this.goodId = goodId;
	}
	public String getGoodName() {
		return goodName;
	}
	public void setGoodName(String goodName) {
		this.goodName = goodName;
	}
	
	public float getPrice() {
		return price;
	}
	public void setPrice(float price) {
		this.price = price;
	}
	public String getPro_img() {
		return pro_img;
	}
	public void setPro_img(String pro_img) {
		this.pro_img = pro_img;
	}
	public String getDetails_img() {
		return details_img;
	}
	public void setDetails_img(String details_img) {
		this.details_img = details_img;
	}
	public String[] getDetails_img_list() {
		return details_img_list;
	}
	public void setDetails_img_list(String[] details_img_list) {
		this.details_img_list = details_img_list;
	}
	public float getFreight() {
		return freight;
	}
	public void setFreight(float freight) {
		this.freight = freight;
	}

	public int getSales() {
		return sales;
	}
	public void setSales(int sales) {
		this.sales = sales;
	}
	public String getDetailsInfo() {
		return detailsInfo;
	}
	public void setDetailsInfo(String detailsInfo) {
		this.detailsInfo = detailsInfo;
	}

	public String getMerchantId() {
		return merchantId;
	}
	public void setMerchantId(String merchantId) {
		this.merchantId = merchantId;
	}
	@Override
	public String toString() {
		return "Goods [goodId=" + goodId + ", goodName=" + goodName + ", price=" + price + ", freight=" + freight
				+ ", sales=" + sales + ", detailsInfo=" + detailsInfo + ", pro_img=" + pro_img + ", details_img="
				+ details_img + ", details_img_list=" + Arrays.toString(details_img_list) + ", browse=" + browse
				+ ", collection=" + collection + ", type=" + type + ", merchantId=" + merchantId + "]";
	}
	
	
}
