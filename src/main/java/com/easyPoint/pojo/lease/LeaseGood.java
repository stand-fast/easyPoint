package com.easyPoint.pojo.lease;

import java.math.BigDecimal;

/**
 * @author jw
 * 租赁商品信息
 */
public class LeaseGood {
    private Integer goodId;//商品编号
    private String goodName;//商品名称
    private String businessName;//商家名称
    private BigDecimal lowestPrice;//商品最低价格
    private BigDecimal highestPrice;//商品最高价格
    private String goodImages;//商品图片，用“&”为分隔符
    private BigDecimal deposit;//押金
    private String depositInstruction;//押金说明
    private String takeGoodInstruction;//取货说明
    private String returnGoodInstruction;//还货说明
    private String businessHours;//营业时间
    private String goodDescription;//商品描述
    private Integer leaseNum;//已租次数
    private String proImg;//商品界面图片
    private String goodsTypeId;//商品类别
    private Integer state;//商品状态

    @Override
    public String toString() {
        return "LeaseGood{" +
                "goodId=" + goodId +
                ", goodName='" + goodName + '\'' +
                ", businessName='" + businessName + '\'' +
                ", lowestPrice=" + lowestPrice +
                ", highestPrice=" + highestPrice +
                ", goodImages='" + goodImages + '\'' +
                ", deposit=" + deposit +
                ", depositInstruction='" + depositInstruction + '\'' +
                ", takeGoodInstruction='" + takeGoodInstruction + '\'' +
                ", returnGoodInstruction='" + returnGoodInstruction + '\'' +
                ", businessHours='" + businessHours + '\'' +
                ", goodDescription='" + goodDescription + '\'' +
                ", leaseNum=" + leaseNum +
                ", proImg='" + proImg + '\'' +
                ", goodsTypeId='" + goodsTypeId + '\'' +
                ", state=" + state +
                '}';
    }

    public String getBusinessName() {
        return businessName;
    }

    public void setBusinessName(String businessName) {
        this.businessName = businessName;
    }

    public Integer getGoodId() {
        return goodId;
    }

    public void setGoodId(Integer goodId) {
        this.goodId = goodId;
    }

    public String getGoodName() {
        return goodName;
    }

    public void setGoodName(String goodName) {
        this.goodName = goodName;
    }

    public BigDecimal getLowestPrice() {
        return lowestPrice;
    }

    public void setLowestPrice(BigDecimal lowestPrice) {
        this.lowestPrice = lowestPrice;
    }

    public BigDecimal getHighestPrice() {
        return highestPrice;
    }

    public void setHighestPrice(BigDecimal highestPrice) {
        this.highestPrice = highestPrice;
    }

    public String getGoodImages() {
        return goodImages;
    }

    public void setGoodImages(String goodImages) {
        this.goodImages = goodImages;
    }

    public BigDecimal getDeposit() {
        return deposit;
    }

    public void setDeposit(BigDecimal deposit) {
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

    public String getGoodsTypeId() {
        return goodsTypeId;
    }

    public void setGoodsTypeId(String goodsTypeId) {
        this.goodsTypeId = goodsTypeId;
    }

    public Integer getState() {
        return state;
    }

    public void setState(Integer state) {
        this.state = state;
    }
}
