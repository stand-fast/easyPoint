package com.easyPoint.tokendao.util;

import java.io.Serializable;

import org.springframework.stereotype.Component;

@Component
public class GoodsVariety implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	String goodId;//商品编号
	String varietyId;//规格编号
	String variety;//规格
	float price;//价格
	int inventory;//库存
	String img;//图片
	int version;
	
	
	@Override
	public String toString() {
		return "GoodsVariety [goodId=" + goodId + ", varietyId=" + varietyId + ", variety=" + variety + ", price="
				+ price + ", inventory=" + inventory + ", img=" + img + ", version=" + version + "]";
	}
	public int getVersion() {
		return version;
	}
	public void setVersion(int version) {
		this.version = version;
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
	public String getVariety() {
		return variety;
	}
	public void setVariety(String variety) {
		this.variety = variety;
	}
	public float getPrice() {
		return price;
	}
	public void setPrice(float price) {
		this.price = price;
	}
	public int getInventory() {
		return inventory;
	}
	public void setInventory(int inventory) {
		this.inventory = inventory;
	}
	public String getImg() {
		return img;
	}
	public void setImg(String img) {
		this.img = img;
	}
	
}
