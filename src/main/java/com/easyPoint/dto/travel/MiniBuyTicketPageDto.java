package com.easyPoint.dto.travel;

import java.math.BigDecimal;

/**
 * @author FJW
 * 小程序购票页面数据
 */
public class MiniBuyTicketPageDto {
    //车票id
    private Integer ticketId;
    //出发日期
    private String departureDay;
    //出发时间点
    private String departureTime;
    //出发地点
    private String departurePlace;
    //目的地点
    private String destination;
    //票价
    private BigDecimal price;
    //车票类型  1：正在售卖；2：预售
    private Integer type;
    //剩余车票位数
    private Integer seatSurplus;

    @Override
    public String toString() {
        return "MiniBuyTicketPageDto{" +
                "ticketId=" + ticketId +
                ", departureDay='" + departureDay + '\'' +
                ", departureTime='" + departureTime + '\'' +
                ", departurePlace='" + departurePlace + '\'' +
                ", destination='" + destination + '\'' +
                ", price=" + price +
                ", type=" + type +
                ", seatSurplus=" + seatSurplus +
                '}';
    }

    public Integer getTicketId() {
        return ticketId;
    }

    public void setTicketId(Integer ticketId) {
        this.ticketId = ticketId;
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

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    public Integer getSeatSurplus() {
        return seatSurplus;
    }

    public void setSeatSurplus(Integer seatSurplus) {
        this.seatSurplus = seatSurplus;
    }
}
