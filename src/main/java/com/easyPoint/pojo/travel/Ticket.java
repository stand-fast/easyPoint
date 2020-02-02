package com.easyPoint.pojo.travel;

/**
 * @author FHJ
 * @date 2019/9/21 17:11
 */
public class Ticket {
    // 车票id
    private Integer ticketId;
    // 同乡会id
    private Integer associationId;
    // 同乡会名称
    private String associationName;
    // 出发日期
    private String departureDay;
    // 出发时间点
    private String departureTime;
    // 出发地点
    private String departurePlace;
    // 目的地
    private String destination;
    // 价格
    private Double price;
    // 总座位数
    private Integer seatNum;
    // 剩余座位数
    private Integer seatSurplus;
    // 车票类型
    private Integer type;
    // 发布时间
    private String issueTime;
    // 车票状态
    private Integer state;
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
    //乐观锁标识
    private Integer version;

    @Override
    public String toString() {
        return "Ticket{" +
                "ticketId=" + ticketId +
                ", associationId=" + associationId +
                ", associationName='" + associationName + '\'' +
                ", departureDay='" + departureDay + '\'' +
                ", departureTime='" + departureTime + '\'' +
                ", departurePlace='" + departurePlace + '\'' +
                ", destination='" + destination + '\'' +
                ", price=" + price +
                ", seatNum=" + seatNum +
                ", seatSurplus=" + seatSurplus +
                ", type=" + type +
                ", issueTime='" + issueTime + '\'' +
                ", state=" + state +
                ", licensePlateNumber='" + licensePlateNumber + '\'' +
                ", vehicleType='" + vehicleType + '\'' +
                ", color='" + color + '\'' +
                ", driverName='" + driverName + '\'' +
                ", driverPhone='" + driverPhone + '\'' +
                ", version=" + version +
                '}';
    }

    public String getVehicleType() {
        return vehicleType;
    }

    public void setVehicleType(String vehicleType) {
        this.vehicleType = vehicleType;
    }

    public Integer getVersion() {
        return version;
    }

    public void setVersion(Integer version) {
        this.version = version;
    }

    public Integer getTicketId() {
        return ticketId;
    }

    public void setTicketId(Integer ticketId) {
        this.ticketId = ticketId;
    }

    public Integer getAssociationId() {
        return associationId;
    }

    public void setAssociationId(Integer associationId) {
        this.associationId = associationId;
    }

    public String getAssociationName() {
        return associationName;
    }

    public void setAssociationName(String associationName) {
        this.associationName = associationName;
    }

    public String getDepartureDay() {
        return departureDay;
    }

    public void setDepartureDay(String departureDay) {
        this.departureDay = departureDay;
    }

    public String getDepartureTime() {
        return departureTime;
    }

    public void setDepartureTime(String departureTime) {
        this.departureTime = departureTime;
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

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Integer getSeatNum() {
        return seatNum;
    }

    public void setSeatNum(Integer seatNum) {
        this.seatNum = seatNum;
    }

    public Integer getSeatSurplus() {
        return seatSurplus;
    }

    public void setSeatSurplus(Integer seatSurplus) {
        this.seatSurplus = seatSurplus;
    }

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    public String getIssueTime() {
        return issueTime;
    }

    public void setIssueTime(String issueTime) {
        this.issueTime = issueTime;
    }

    public Integer getState() {
        return state;
    }

    public void setState(Integer state) {
        this.state = state;
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
}
