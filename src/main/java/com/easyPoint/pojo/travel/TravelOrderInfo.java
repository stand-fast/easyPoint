package com.easyPoint.pojo.travel;

/**
 * @author FJW
 * 包车与租车订单共有部分,即出行模块订单
 */
public class TravelOrderInfo {
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

    @Override
    public String toString() {
        return "TravelOrderInfo{" +
                "travelOrderId=" + travelOrderId +
                ", uid=" + uid +
                ", departurePlace='" + departurePlace + '\'' +
                ", destination='" + destination + '\'' +
                ", travelNum=" + travelNum +
                ", departureTime='" + departureTime + '\'' +
                ", type=" + type +
                ", state=" + state +
                '}';
    }
}
