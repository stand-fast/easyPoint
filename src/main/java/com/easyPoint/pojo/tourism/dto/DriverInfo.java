package com.easyPoint.pojo.tourism.dto;

/**
 * @author FJW
 * 车辆信息，包括司机信息等
 */
public class DriverInfo {
    //订单号
    private Integer travelOrderId;
    //车牌号
    private String licensePlateNumber;
    //车辆颜色
    private String color;
    //司机姓名
    private String driverName;
    //司机电话
    private String driverPhone;
    //车辆类型
    private String vehicleType;

    public Integer getTravelOrderId() {
        return travelOrderId;
    }

    public void setTravelOrderId(Integer travelOrderId) {
        this.travelOrderId = travelOrderId;
    }

    public String getLicensePlateNumber() {
        return licensePlateNumber;
    }

    public void setLicensePlateNumber(String licensePlateNumber) {
        this.licensePlateNumber = licensePlateNumber;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getDriverName() {
        return driverName;
    }

    public void setDriverName(String driverName) {
        this.driverName = driverName;
    }

    public String getDriverPhone() {
        return driverPhone;
    }

    public void setDriverPhone(String driverPhone) {
        this.driverPhone = driverPhone;
    }

    public String getVehicleType() {
        return vehicleType;
    }

    public void setVehicleType(String vehicleType) {
        this.vehicleType = vehicleType;
    }

    @Override
    public String toString() {
        return "DriverInfo{" +
                "travelOrderId=" + travelOrderId +
                ", licensePlateNumber='" + licensePlateNumber + '\'' +
                ", color='" + color + '\'' +
                ", driverName='" + driverName + '\'' +
                ", driverPhone='" + driverPhone + '\'' +
                ", vehicleType='" + vehicleType + '\'' +
                '}';
    }
}
