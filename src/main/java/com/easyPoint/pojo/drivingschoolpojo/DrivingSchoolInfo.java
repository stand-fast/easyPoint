package com.easyPoint.pojo.drivingschoolpojo;

import java.math.BigDecimal;

/**
 * FJW
 * 驾校模块封面信息
 */
public class DrivingSchoolInfo {
    /**
     * driving_school_id	unsigned int		主键
     * merchant_id	unsigned int	驾校所属商家
     * default_img_url	char(30)	驾校一览对应驾校图片路径	不为空
     * driving_school_name	varchar(20)	驾校名称	不为空
     * driving_school_address	varchar(60)	驾校地址	不为空
     * lowest_price	decimal	最低价格	不为空
     */
    private Integer drivingSchoolId;
    private Integer merchantId;
    private String defaultImgUrl;
    private String drivingSchoolName;
    private BigDecimal lowestPrice;

    public Integer getDrivingSchoolId() {
        return drivingSchoolId;
    }

    public void setDrivingSchoolId(Integer drivingSchoolId) {
        this.drivingSchoolId = drivingSchoolId;
    }

    public Integer getMerchantId() {
        return merchantId;
    }

    public void setMerchantId(Integer merchantId) {
        this.merchantId = merchantId;
    }

    public String getDefaultImgUrl() {
        return defaultImgUrl;
    }

    public void setDefaultImgUrl(String defaultImgUrl) {
        this.defaultImgUrl = defaultImgUrl;
    }

    public String getDrivingSchoolName() {
        return drivingSchoolName;
    }

    public void setDrivingSchoolName(String drivingSchoolName) {
        this.drivingSchoolName = drivingSchoolName;
    }

    public BigDecimal getLowestPrice() {
        return lowestPrice;
    }

    public void setLowestPrice(BigDecimal lowestPrice) {
        this.lowestPrice = lowestPrice;
    }

    @Override
    public String toString() {
        return "DrivingSchoolInfo{" +
                "drivingSchoolId=" + drivingSchoolId +
                ", merchantId=" + merchantId +
                ", defaultImgUrl='" + defaultImgUrl + '\'' +
                ", drivingSchoolName='" + drivingSchoolName + '\'' +
                ", lowestPrice=" + lowestPrice +
                '}';
    }
}
