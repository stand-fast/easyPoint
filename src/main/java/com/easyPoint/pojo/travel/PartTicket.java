package com.easyPoint.pojo.travel;

/**
 * @author FHJ
 * @date 2019/9/21 20:45
 */
public class PartTicket {
    private Integer ticketId;
    private String departureTime;
    private String departurePlace;
    private String destination;
    private double price;
    private Integer seatSurplus;
    private Integer type;

    public Integer getTicketId() {
        return ticketId;
    }

    public void setTicketId(Integer ticketId) {
        this.ticketId = ticketId;
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

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
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
}
