package com.easyPoint.pojo.tourism;


public class TourismOrderInfo extends TravelOrderInfo{
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
    private Integer vehicleId;
    private Integer ifBack;//是否往反
    private String backTime;//返回时间
    private Integer ifInsurance;
    private Integer payMoney;
    private String makeOrderTime;
    private String arrangeVehicleTime;
    private String licensePlateNumber;
    private String color;
    private String driverName;
    private String driverPhone;

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

    public Integer getPayMoney() {
        return payMoney;
    }

    public void setPayMoney(Integer payMoney) {
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

    @Override
    public String toString() {
        return "TourismOrderInfo{" +
                super.toString() +
                "vehicleId=" + vehicleId +
                ", ifBack=" + ifBack +
                ", backTime='" + backTime + '\'' +
                ", ifInsurance=" + ifInsurance +
                ", payMoney=" + payMoney +
                ", makeOrderTime='" + makeOrderTime + '\'' +
                ", licensePlateNumber='" + licensePlateNumber + '\'' +
                ", color='" + color + '\'' +
                ", driverName='" + driverName + '\'' +
                ", driverPhone='" + driverPhone + '\'' +
                '}';
    }
}
