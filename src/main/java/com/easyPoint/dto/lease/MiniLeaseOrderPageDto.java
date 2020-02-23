package com.easyPoint.dto.lease;

import java.math.BigDecimal;

/**
 * @author jw
 * 小程序租赁订单页面的信息
 */
public class MiniLeaseOrderPageDto {
    private Integer goodOrderId;
    private String goodName;
    private BigDecimal price;
    private Integer number;
    private Integer state;
    private String goodDescription;

    @Override
    public String toString() {
        return "MiniLeaseOrderPageDto{" +
                "goodOrderId=" + goodOrderId +
                ", goodName='" + goodName + '\'' +
                ", price=" + price +
                ", number=" + number +
                ", state=" + state +
                ", goodDescription='" + goodDescription + '\'' +
                '}';
    }

    public Integer getGoodOrderId() {
        return goodOrderId;
    }

    public void setGoodOrderId(Integer goodOrderId) {
        this.goodOrderId = goodOrderId;
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

    public Integer getNumber() {
        return number;
    }

    public void setNumber(Integer number) {
        this.number = number;
    }

    public Integer getState() {
        return state;
    }

    public void setState(Integer state) {
        this.state = state;
    }

    public String getGoodDescription() {
        return goodDescription;
    }

    public void setGoodDescription(String goodDescription) {
        this.goodDescription = goodDescription;
    }
}
