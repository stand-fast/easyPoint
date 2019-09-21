package com.easyPoint.pojo.tourism;

/**
 * @author FHJ
 * @date 2019/9/21 17:11
 */
public class Ticket {
    // 车票id
    private Integer ticketId;
    // 同乡会id
    private Integer associationId;
    // 出发时间
    private String departureTime;
    // 到达时间
    private String arrivalTime;
    // 出发地点
    private String departurePlace;
    // 目的地
    private String destination;
    // 价格
    private double price;
    // 总座位数
    private Integer seatNum;
    // 剩余座位数
    private Integer seatSurplus;
    // 已预约人数
    private Integer appointmentNum;
    // 上车地点
    private String boardLocation;
    // 车辆类型
    private Integer type;

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

    public String getDepartureTime() {
        return departureTime;
    }

    public void setDepartureTime(String departureTime) {
        this.departureTime = departureTime;
    }

    public String getArrivalTime() {
        return arrivalTime;
    }

    public void setArrivalTime(String arrivalTime) {
        this.arrivalTime = arrivalTime;
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

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
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

    public Integer getAppointmentNum() {
        return appointmentNum;
    }

    public void setAppointmentNum(Integer appointmentNum) {
        this.appointmentNum = appointmentNum;
    }

    public String getBoardLocation() {
        return boardLocation;
    }

    public void setBoardLocation(String boardLocation) {
        this.boardLocation = boardLocation;
    }

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }
}
