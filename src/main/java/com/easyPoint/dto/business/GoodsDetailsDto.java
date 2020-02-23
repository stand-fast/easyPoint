package com.easyPoint.dto.business;

/**
 * 根据id查询商品详情
 */
public class GoodsDetailsDto {
    private String goodName;
    private String businessName;
    private double lowestPrice;
    private double highestPrice;
    private String proImg;
    private String depositInstruction;
    private String takeGoodInstruction;
    private String returnGoodInstruction;
    private String goodDescription;
    // 已租次数
    private Integer leaseNum;

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

    public String getProImg() {
        return proImg;
    }

    public void setProImg(String proImg) {
        this.proImg = proImg;
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
}
