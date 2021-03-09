package com.easyPoint.pojo.drivingschoolpojo;

import java.math.BigDecimal;

/**
 * FJW
 * 驾校套餐
 */
public class DrivingSchoolSetmeal {
    /**
     * setmeal_id	unsigned int		主键
     * driving_school_id	unsigned int	所属驾校
     * setmeal_name	char(20)	套餐名称	不为空
     * study_cycle	varchar(20)	学车周期
     * price	decimal	课程价格	不为空
     * note	varchar(100)	备注
     */
    private Integer setmealId;
    private Integer drivingSchoolId;
    private String setmealName;
    private String studyCycle;
    private BigDecimal price;
    private String note;

    public Integer getSetmealId() {
        return setmealId;
    }

    public void setSetmealId(Integer setmealId) {
        this.setmealId = setmealId;
    }

    public Integer getDrivingSchoolId() {
        return drivingSchoolId;
    }

    public void setDrivingSchoolId(Integer drivingSchoolId) {
        this.drivingSchoolId = drivingSchoolId;
    }

    public String getSetmealName() {
        return setmealName;
    }

    public void setSetmealName(String setmealName) {
        this.setmealName = setmealName;
    }

    public String getStudyCycle() {
        return studyCycle;
    }

    public void setStudyCycle(String studyCycle) {
        this.studyCycle = studyCycle;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    @Override
    public String toString() {
        return "DrivingSchoolSetmeal{" +
                "setmealId=" + setmealId +
                ", drivingSchoolId=" + drivingSchoolId +
                ", setmealName='" + setmealName + '\'' +
                ", studyCycle='" + studyCycle + '\'' +
                ", price=" + price +
                ", note='" + note + '\'' +
                '}';
    }
}
