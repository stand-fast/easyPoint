package com.easyPoint.pojo.travel;


import java.io.Serializable;
import java.math.BigDecimal;

public class TourismOrderInfo implements Serializable {
    /**
     * travel _order_id	unsigned int		主键
     * vehicle_id	unsigned int	车辆类型	不为空
     * is_ insurance	unsigned tinyint	是否购买保险	不为空。0：否（默认）；1：是
     * pay_money	decimal	已付款金额	不为空。0：（默认）
     * make_order_time	datetime	下单时间	不为空
     * arrange_vehicle_time	datetime	安排车辆时间
     * finish_order_time	datetime	订单完成时间	默认为null
     * license_plate_number	char(10)	车牌号	可为空
     * color	char(10)	车辆颜色	可为空
     * driver_name	char(10)	司机姓名	可为空
     * driver_phone	char（11）	司机电话	可为空
     * be_modified_time	char(20)	被修改时间	可为空
     */
    /**
     * travel_order_id	unsigned int		主键
     * uid	unsigned int	user表的uid	不为空
     * departure_place	varchar(100)	出发地点	不为空
     * destination	varchar(100)	目的地	不为空
     * travel_num	unsigned int	出行人数/票数	不为空
     * departure_time	datetime	出发时间	不为空
     * type	unsigned tinyint	同乡包车/旅游出行	0：旅游出行
     *                                              1：同乡包车
     * state	unsigned tinyint	订单状态	0：未安排
     *                                          1：已安排
     *                                          2：已完成
     *                                          3：已付款
     *                                          4：已预约
     */

    private Integer travelOrderId;
    private Integer uid;
    private String departurePlace;
    private String destination;
    private Integer travelNum;
    private String departureTime;
    private Integer type;
    private Integer state;
    private Integer vehicleId;
    private String passenger;//乘客
    private String phone;//联系电话
    private Integer ifBack;//是否往反
    private String backTime;//返回时间
    private Integer ifInsurance;
    private Float payMoney;
    private String makeOrderTime;
    private String arrangeVehicleTime;
    private String licensePlateNumber;
    private String color;
    private String driverName;
    private String driverPhone;
    //商户订单号
    private String outTradeNo;
    //微信订单号
    private String transactionId;

    @Override
    public String toString() {
        return "TourismOrderInfo{" +
                "travelOrderId=" + travelOrderId +
                ", uid=" + uid +
                ", departurePlace='" + departurePlace + '\'' +
                ", destination='" + destination + '\'' +
                ", travelNum=" + travelNum +
                ", departureTime='" + departureTime + '\'' +
                ", type=" + type +
                ", state=" + state +
                ", vehicleId=" + vehicleId +
                ", passenger='" + passenger + '\'' +
                ", phone='" + phone + '\'' +
                ", ifBack=" + ifBack +
                ", backTime='" + backTime + '\'' +
                ", ifInsurance=" + ifInsurance +
                ", payMoney=" + payMoney +
                ", makeOrderTime='" + makeOrderTime + '\'' +
                ", arrangeVehicleTime='" + arrangeVehicleTime + '\'' +
                ", licensePlateNumber='" + licensePlateNumber + '\'' +
                ", color='" + color + '\'' +
                ", driverName='" + driverName + '\'' +
                ", driverPhone='" + driverPhone + '\'' +
                ", outTradeNo='" + outTradeNo + '\'' +
                ", transactionId='" + transactionId + '\'' +
                ", ifModified=" + ifModified +
                '}';
    }

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

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    public Integer getState() {
        return state;
    }

    public void setState(Integer state) {
        this.state = state;
    }

    public int getIfModified() {
        return ifModified;
    }

    public void setIfModified(int ifModified) {
        this.ifModified = ifModified;
    }

    //出发日期是否被修改
    private int ifModified;
    public String getArrangeVehicleTime() {
        return arrangeVehicleTime;
    }

    public void setArrangeVehicleTime(String arrangeVehicleTime) {
        this.arrangeVehicleTime = arrangeVehicleTime;
    }

    public Integer getVehicleId() {
        return vehicleId;
    }

    public void setVehicleId(Integer vehicleId) {
        this.vehicleId = vehicleId;
    }

    public Integer getIfBack() {
        return ifBack;
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

    public void setIfBack(Integer ifBack) {
        this.ifBack = ifBack;
    }

    public String getBackTime() {
        return backTime;
    }

    public void setBackTime(String backTime) {
        this.backTime = backTime;
    }

    public Integer getIfInsurance() {
        return ifInsurance;
    }

    public void setIfInsurance(Integer ifInsurance) {
        this.ifInsurance = ifInsurance;
    }

    public Float getPayMoney() {
        return payMoney;
    }

    public void setPayMoney(Float payMoney) {
        this.payMoney = payMoney;
    }

    public String getMakeOrderTime() {
        return makeOrderTime;
    }

    public void setMakeOrderTime(String makeOrderTime) {
        this.makeOrderTime = makeOrderTime;
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

    public String getOutTradeNo() {
        return outTradeNo;
    }

    public void setOutTradeNo(String outTradeNo) {
        this.outTradeNo = outTradeNo;
    }

    public String getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(String transactionId) {
        this.transactionId = transactionId;
    }
}
