package com.easyPoint.pojo.tourism.dto;

/**
 * @author FJW
 * 返回管理员前端租车订单的信息
 */
public class PartTourismOrderInfoDto {

    //订单id
    private Integer travelOrderId;
    //用户id
    private Integer uid;
    //出发地点
    private String departurePlace;
    //目的地
    private String destination;
    //出行人数
    private Integer travelNum;
    //出发时间
    private String departureTime;
    //订单状态
    private Integer state;

    //是否购买保险
    private Integer ifInsurance;
    //付款金额
    private Integer payMoney;
    //车辆类型
    private String vehicleType;
    //乘客名
    private String passenger;
    //联系电话
    private String phone;


    public Integer getTravelOrderId() {
        return travelOrderId;
    }

    public void setTravelOrderId(Integer travelOrderId) {
        this.travelOrderId = travelOrderId;
    }

    public Integer getUid() {
        return uid;
    }

    public void setUid(Integer uid) {
        this.uid = uid;
    }

    public String getDeparturePlace() {
        return departurePlace;
    }

    public void setDeparturePlace(String departurePlace) {
        this.departurePlace = departurePlace;
    }

    public String getDestination() {
        return destination;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }

    public Integer getTravelNum() {
        return travelNum;
    }

    public void setTravelNum(Integer travelNum) {
        this.travelNum = travelNum;
    }

    public String getDepartureTime() {
        return departureTime;
    }

    public void setDepartureTime(String departureTime) {
        this.departureTime = departureTime;
    }

    public Integer getState() {
        return state;
    }

    public void setState(Integer state) {
        this.state = state;
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

    public String getVehicleType() {
        return vehicleType;
    }

    public void setVehicleType(String vehicleType) {
        this.vehicleType = vehicleType;
    }

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

    @Override
    public String toString() {
        return "PartTourismOrderInfoDto{" +
                "travelOrderId=" + travelOrderId +
                ", uid=" + uid +
                ", departurePlace='" + departurePlace + '\'' +
                ", destination='" + destination + '\'' +
                ", travelNum=" + travelNum +
                ", departureTime='" + departureTime + '\'' +
                ", state=" + state +
                ", ifInsurance=" + ifInsurance +
                ", payMoney=" + payMoney +
                ", vehicleType='" + vehicleType + '\'' +
                ", passenger='" + passenger + '\'' +
                ", phone='" + phone + '\'' +
                '}';
    }
}
