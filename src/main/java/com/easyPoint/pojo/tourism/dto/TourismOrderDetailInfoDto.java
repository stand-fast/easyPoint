package com.easyPoint.pojo.tourism.dto;

/**
 * 返回小程序租车订单详情信息
 */
public class TourismOrderDetailInfoDto extends DriverInfoDto {

    private String passenger;//乘客
    private String phone;//联系电话
    //是否购买保险
    private Integer ifInsurance;
    //付款金额
    private Integer payMoney;
    //下单时间
    private String makeOrderTime;
    //押金
    private String deposit;
    //是否被修改日期
    private Integer IfModified;

    public String getPassenger() {
        return passenger;
    }

    public void setPassenger(String passenger) {
        this.passenger = passenger;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public Integer getIfInsurance() {
        return ifInsurance;
    }

    public void setIfInsurance(Integer ifInsurance) {
        this.ifInsurance = ifInsurance;
    }

    public Integer getPayMoney() {
        return payMoney;
    }

    public void setPayMoney(Integer payMoney) {
        this.payMoney = payMoney;
    }

    public String getMakeOrderTime() {
        return makeOrderTime;
    }

    public void setMakeOrderTime(String makeOrderTime) {
        this.makeOrderTime = makeOrderTime;
    }

    public String getDeposit() {
        return deposit;
    }

    public void setDeposit(String deposit) {
        this.deposit = deposit;
    }

    @Override
    public String toString() {
        return "TourismOrderDetailInfoDto{" +
                "passenger='" + passenger + '\'' +
                ", phone='" + phone + '\'' +
                ", ifInsurance=" + ifInsurance +
                ", payMoney=" + payMoney +
                ", makeOrderTime='" + makeOrderTime + '\'' +
                ", deposit='" + deposit + '\'' +
                ", IfModified=" + IfModified +
                '}';
    }

    public Integer getIfModified() {
        return IfModified;
    }

    public void setIfModified(Integer ifModified) {
        IfModified = ifModified;
    }

}
