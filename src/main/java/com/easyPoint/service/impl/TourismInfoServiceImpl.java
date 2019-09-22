package com.easyPoint.service.impl;

import com.easyPoint.dao.TourismInfoDao;
import com.easyPoint.pojo.tourism.TourismOrderInfo;
import com.easyPoint.pojo.tourism.VehicleInfo;
import com.easyPoint.service.TourismInfoService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Service
public class TourismInfoServiceImpl implements TourismInfoService {
    public static final Logger log = LoggerFactory.getLogger(TourismInfoServiceImpl.class);
    @Autowired
    TourismInfoDao tourismInfoDao;

    @Override
    public List<VehicleInfo> findListPageNumVehicleInfo(int pageNum) {
        //收到页数从一开始，表索引从0开始，故减去1
        int index = (pageNum - 1) * 4;
        List<VehicleInfo> listVehicleInfo = tourismInfoDao.findListVehicleInfo(index);
        return listVehicleInfo;
    }

    @Override
    public Integer insertVehicleType(String vehicleType, BigDecimal deposit) {
        //查询vehicleType的车辆类型是否已经添加
        VehicleInfo vehicleInfo = tourismInfoDao.findVehicleInfo(vehicleType);
        //为空则可以添加
        if(vehicleInfo == null){
            try {
                tourismInfoDao.insertVehicleType(vehicleType, deposit);
                //插入车辆类型成功
                return 1;
            }catch (Exception e){
                log.error("该车辆类型已经存在，导入插入异常");
                return 0;
            }
        }
        //否则，返回0，代表该类型已经存在
        return 0;
    }


    @Override
    public Integer addTourismOrder(TourismOrderInfo tourismOrderInfo) {
        Date date = new Date();
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-DD HH:mm:ss");
        tourismOrderInfo.setMakeOrderTime(simpleDateFormat.format(date));
        int resultCode = tourismInfoDao.insertTourismOrderInfo(tourismOrderInfo);
        return resultCode;
    }

    @Override
    public Integer addDriverInfoToTourismOrder(String licensePlateNumber, String color, String driverName, String driverPhone, int tourismId) {
        tourismInfoDao.updateTourismOrderInfoAddDriverInfo(licensePlateNumber,color,driverName,driverPhone,tourismId);
        return 1;
    }
}
