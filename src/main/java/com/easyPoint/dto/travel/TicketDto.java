package com.easyPoint.dto.travel;

/**
 * @author FHJ
 * @date 2019/11/16 14:27
 */
public class TicketDto {
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
}
