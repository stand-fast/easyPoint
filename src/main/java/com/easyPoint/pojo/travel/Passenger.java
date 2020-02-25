package com.easyPoint.pojo.travel;

import java.io.Serializable;

public class Passenger implements Serializable {

    //乘客id
    private Integer passengerId;
    //乘客名称
    private String passengerName;
    //乘客联系电话
    private String phone;
    //订单id
    private Integer travelOrderId;

    public Integer getPassengerId() {
        return passengerId;
    }

    public void setPassengerId(Integer passengerId) {
        this.passengerId = passengerId;
    }

    public String getPassengerName() {
        return passengerName;
    }

    public void setPassengerName(String passengerName) {
        this.passengerName = passengerName;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public Integer getTravelOrderId() {
        return travelOrderId;
    }

    public void setTravelOrderId(Integer travelOrderId) {
        this.travelOrderId = travelOrderId;
    }

    @Override
    public String toString() {
        return "Passenger{" +
                "passengerId=" + passengerId +
                ", passengerName='" + passengerName + '\'' +
                ", phone='" + phone + '\'' +
                ", travelOrderId=" + travelOrderId +
                '}';
    }
}
