package com.easyPoint.pojo.business;

import java.util.List;

/**
 * 商品
 */
public class Goods {
    private String goodId;
    private String goodName;
    private String businessName;
    private double lowestPrice;
    private double highestPrice;
    private String goodImages;
    private double deposit;
    private String depositInstruction;
    private String takeGoodInstruction;
    private String returnGoodInstruction;
    private String businessHours;
    private String goodDescription;
    private Integer leaseNum;
    private String proImg;
    private List<GoodVariety> goodVarietyList;
    // 状态
    private String state;

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

    public String getBusinessName() {
        return businessName;
    }

    public void setBusinessName(String businessName) {
        this.businessName = businessName;
    }

    public double getLowestPrice() {
        return lowestPrice;
    }

    public void setLowestPrice(double lowestPrice) {
        this.lowestPrice = lowestPrice;
    }

    public double getHighestPrice() {
        return highestPrice;
    }

    public void setHighestPrice(double highestPrice) {
        this.highestPrice = highestPrice;
    }

    public String getGoodImages() {
        return goodImages;
    }

    public void setGoodImages(String goodImages) {
        this.goodImages = goodImages;
    }

    public double getDeposit() {
        return deposit;
    }

    public void setDeposit(double deposit) {
        this.deposit = deposit;
    }

    public String getDepositInstruction() {
        return depositInstruction;
    }

    public void setDepositInstruction(String depositInstruction) {
        this.depositInstruction = depositInstruction;
    }

    public String getTakeGoodInstruction() {
        return takeGoodInstruction;
    }

    public void setTakeGoodInstruction(String takeGoodInstruction) {
        this.takeGoodInstruction = takeGoodInstruction;
    }

    public String getReturnGoodInstruction() {
        return returnGoodInstruction;
    }

    public void setReturnGoodInstruction(String returnGoodInstruction) {
        this.returnGoodInstruction = returnGoodInstruction;
    }

    public String getBusinessHours() {
        return businessHours;
    }

    public void setBusinessHours(String businessHours) {
        this.businessHours = businessHours;
    }

    public String getGoodDescription() {
        return goodDescription;
    }

    public void setGoodDescription(String goodDescription) {
        this.goodDescription = goodDescription;
    }

    public Integer getLeaseNum() {
        return leaseNum;
    }

    public void setLeaseNum(Integer leaseNum) {
        this.leaseNum = leaseNum;
    }

    public String getProImg() {
        return proImg;
    }

    public void setProImg(String proImg) {
        this.proImg = proImg;
    }

    public List<GoodVariety> getGoodVarietyList() {
        return goodVarietyList;
    }

    public void setGoodVarietyList(List<GoodVariety> goodVarietyList) {
        this.goodVarietyList = goodVarietyList;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }
}
