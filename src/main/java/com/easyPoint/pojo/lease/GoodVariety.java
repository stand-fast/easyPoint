package com.easyPoint.pojo.lease;

import java.math.BigDecimal;

/**
 * @author jw
 * 租赁商品规格
 */
public class GoodVariety {
    private Integer varietyId;
    private Integer goodId;//商品编号
    private String variety;//规格名称
    private String size;//尺寸	以&为分割符，S&M&L
    private BigDecimal price;//价格
    private String img;//图片

    @Override
    public String toString() {
        return "GoodVariety{" +
                "varietyId=" + varietyId +
                ", goodId=" + goodId +
                ", variety='" + variety + '\'' +
                ", size='" + size + '\'' +
                ", price=" + price +
                ", img='" + img + '\'' +
                '}';
    }

    public Integer getVarietyId() {
        return varietyId;
    }

    public void setVarietyId(Integer varietyId) {
        this.varietyId = varietyId;
    }

    public Integer getGoodId() {
        return goodId;
    }

    public void setGoodId(Integer goodId) {
        this.goodId = goodId;
    }

    public String getVariety() {
        return variety;
    }

    public void setVariety(String variety) {
        this.variety = variety;
    }

    public String getSize() {
        return size;
    }

    public void setSize(String size) {
        this.size = size;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
    }
}
