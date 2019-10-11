package com.easyPoint.service.miniprogram.travel.Impl;

import com.easyPoint.dao.travel.TourismInfoDao;
import com.easyPoint.pojo.tourism.TourismOrderInfo;
import com.easyPoint.pojo.tourism.VehicleInfo;
import com.easyPoint.service.miniprogram.travel.TourismInfoService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class TourismInfoServiceImpl implements TourismInfoService {
    public static final Logger log = LoggerFactory.getLogger(TourismInfoServiceImpl.class);
    @Autowired
    TourismInfoDao tourismInfoDao;




    //下单订票
    @Override
    public int addTourismOrder(TourismOrderInfo tourismOrderInfo) {
        //生成下单时间
        Date date = new Date();
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm");
        String makeOrderTime = simpleDateFormat.format(date);
        //设置订票时间
        tourismOrderInfo.setMakeOrderTime(makeOrderTime);
        //租车订单默认为未安排状态0
        tourismOrderInfo.setState(0);
        //System.out.println(makeOrderTime);
        //出发票存入数据库
        tourismInfoDao.insertTravelOrderInfo(tourismOrderInfo);
        tourismInfoDao.insertTourismOrderInfo(tourismOrderInfo);
        //获取前端返回的值ifBack的值，判断用户是否购买了返回的票
        //0为否，1为是
        int ifBack = tourismOrderInfo.getIfBack();
        if(ifBack == 1){
            TourismOrderInfo tourismOrderInfo1 = tourismOrderInfo;
            //返回票的出发时间为购买时的返回时间
            tourismOrderInfo1.setDepartureTime(tourismOrderInfo.getBackTime());
            //出发地与目的地相反
            String backDeparturePlace = tourismOrderInfo.getDestination();
            String backDestination = tourismOrderInfo.getDeparturePlace();
            tourismOrderInfo1.setDeparturePlace(backDeparturePlace);
            tourismOrderInfo1.setDestination(backDestination);
            //将反程票插入travel_order和tourism_order表中
            tourismInfoDao.insertTravelOrderInfo(tourismOrderInfo1);
            tourismInfoDao.insertTourismOrderInfo(tourismOrderInfo1);
        }
        return 1;
    }


    //用户进入租车页面查询车辆类型
    @Override
    public List<VehicleInfo> findAllVehicleInfo() {
        return tourismInfoDao.findAllVehicleInfo();
    }



    //修改出发日期String departureTime, String beModifiedTime, String travelOrderId
    @Override
    public int updateTourismOrderDepartureTime(String departureTime, String beModifiedTime, int travelOrderId) {
        Long date = System.currentTimeMillis();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm");
        //现在时间的后一天，如果比车辆出行时间早，则可以修改，否则不行
        String tomorrowDate = sdf.format(date + 24*60*60*1000);
        int resultCode = tourismInfoDao.updateTourismOrderDepartureTime(departureTime,tomorrowDate,travelOrderId);
        if(resultCode == 1){
            //出发日期修改成功
            resultCode = tourismInfoDao.updateTourismModifiedDate(beModifiedTime,travelOrderId);
            if(resultCode ==1)
                return 1;
            //修改日期失败
            return 0;
        }else
            return 0;
    }
}
