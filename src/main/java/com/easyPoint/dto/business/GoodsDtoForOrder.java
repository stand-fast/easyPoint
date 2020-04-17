package com.easyPoint.dto.business;

/**
 * @author FHJ
 * @date 2020/4/16 20:20
 */
public class GoodsDtoForOrder {
    private String goodName;
    private String businessName;
    private Double deposit;
    private String proImg;

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

    public Double getDeposit() {
        return deposit;
    }

    public void setDeposit(Double deposit) {
        this.deposit = deposit;
    }

    public String getProImg() {
        return proImg;
    }

    public void setProImg(String proImg) {
        this.proImg = proImg;
    }
}
