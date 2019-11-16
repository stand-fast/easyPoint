package com.easyPoint.dto.travel;

/**
 * @author FHJ
 * @date 2019/11/16 14:28
 */
public class TicketInfoDto {
    // 车票id
    private Integer ticketId;
    // 车牌号码
    private String licensePlateNumber;
    // 车辆信息
    private String vehicleType;
    // 车身颜色
    private String color;
    // 司机姓名
    private String driverName;
    // 司机手机号码
    private String driverPhone;

    public Integer getTicketId() {
        return ticketId;
    }

    public void setTicketId(Integer ticketId) {
        this.ticketId = ticketId;
    }

    public String getLicensePlateNumber() {
        return licensePlateNumber;
    }

    public void setLicensePlateNumber(String licensePlateNumber) {
        this.licensePlateNumber = licensePlateNumber;
    }

    public String getVehicleType() {
        return vehicleType;
    }

    public void setVehicleType(String vehicleType) {
        this.vehicleType = vehicleType;
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
}
