package com.easyPoint.pojo.lease;

/**
 * @author jw
 * 商品类别表
 */
public class GoodsType {
    private Integer goodsTypeId;
    //类别名	音响设备；装饰灯具；玩具套餐；正装用品；其他
    private String goodsTypeName;
    //类别所属大类别	0：租赁物品；1：闲置共享
    private Integer belongToBigType;

    @Override
    public String toString() {
        return "GoodsType{" +
                "goodsTypeId=" + goodsTypeId +
                ", goodsTypeName='" + goodsTypeName + '\'' +
                ", belongToBigType=" + belongToBigType +
                '}';
    }

    public Integer getGoodsTypeId() {
        return goodsTypeId;
    }

    public void setGoodsTypeId(Integer goodsTypeId) {
        this.goodsTypeId = goodsTypeId;
    }

    public String getGoodsTypeName() {
        return goodsTypeName;
    }

    public void setGoodsTypeName(String goodsTypeName) {
        this.goodsTypeName = goodsTypeName;
    }

    public Integer getBelongToBigType() {
        return belongToBigType;
    }

    public void setBelongToBigType(Integer belongToBigType) {
        this.belongToBigType = belongToBigType;
    }
}
