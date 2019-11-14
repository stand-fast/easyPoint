package com.easyPoint.dto.travel;

public class TourismRefundPageDetailDto extends TourismRefundPageDto {

    //出发地点
    private String departurePlace;
    //目的地
    private String destination;
    //出行人数
    private Integer travelNum;
    //出发时间
    private String departureTime;

    //是否购买保险
    private Integer ifInsurance;

    //车辆类型
    private String vehicleType;

    //退款原因
    private String refundReason;

    //驳回原因
    private String rejectReason;

    //tourism_refund_id的加密数据
    private String code;

    public String getDeparturePlace() {
        return departurePlace;
    }

    public void setDeparturePlace(String departurePlace) {
        this.departurePlace = departurePlace;
    }

    public String getDepartureTime() {
        return departureTime;
    }

    public void setDepartureTime(String departureTime) {
        this.departureTime = departureTime;
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

    public Integer getIfInsurance() {
        return ifInsurance;
    }

    public void setIfInsurance(Integer ifInsurance) {
        this.ifInsurance = ifInsurance;
    }

    public String getVehicleType() {
        return vehicleType;
    }

    public void setVehicleType(String vehicleType) {
        this.vehicleType = vehicleType;
    }

    public String getRefundReason() {
        return refundReason;
    }

    public void setRefundReason(String refundReason) {
        this.refundReason = refundReason;
    }

    public String getRejectReason() {
        return rejectReason;
    }

    public void setRejectReason(String rejectReason) {
        this.rejectReason = rejectReason;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    @Override
    public String toString() {
        return "TourismRefundPageDetailDto{" +
                "departurePlace='" + departurePlace + '\'' +
                ", destination='" + destination + '\'' +
                ", travelNum=" + travelNum +
                ", departureTime='" + departureTime + '\'' +
                ", ifInsurance=" + ifInsurance +
                ", vehicleType='" + vehicleType + '\'' +
                ", refundReason='" + refundReason + '\'' +
                ", rejectReason='" + rejectReason + '\'' +
                ", code='" + code + '\'' +
                '}';
    }
}
