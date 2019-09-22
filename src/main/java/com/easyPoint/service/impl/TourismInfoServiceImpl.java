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
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class TourismInfoServiceImpl implements TourismInfoService {
    public static final Logger log = LoggerFactory.getLogger(TourismInfoServiceImpl.class);
    @Autowired
    TourismInfoDao tourismInfoDao;

    @Override
    public Map getTotalPageAndFirstVehicleInfoList() {
        Map map = new HashMap();
        int total = tourismInfoDao.countVehicleTypeNum();
        //得出车辆类型的总页数
        int totalPage = (total%4 == 0) ? (total/4):(total/4 + 1);
        map.put("totalPage", totalPage);
        //查询第一页车辆类型的信息
        List<VehicleInfo> vehicleInfoList = findListPageNumVehicleInfo(1);
        map.put("vehicleInfoList",vehicleInfoList);
        //将总页数和首页车辆信息一起放入map中返回
        return map;
    }

    @Override
    public List<VehicleInfo> findListPageNumVehicleInfo(int pageNum) {
        //收到页数从一开始，表索引从0开始，故减去1
        int index = (pageNum - 1) * 4;
        List<VehicleInfo> vehicleInfoList = tourismInfoDao.findListVehicleInfo(index);
        return vehicleInfoList;
    }

    @Override
    public int insertVehicleType(String vehicleType, BigDecimal deposit) {
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

    //查询加载的所有页面数
    @Override
    public Map findTotalPageAndTourismOrderInfoList() {
        Map map = new HashMap();
        int total = tourismInfoDao.countTourismOrderNum();
        //一页八条数据，得到租车订单总的页数,并存入map中返回前端
        int totalPage = (total%8 == 0) ? (total/8):(total/8 + 1);
        map.put("totalPage",totalPage);
        List<TourismOrderInfo> tourismOrderInfoList = tourismInfoDao.findListTourismOrderInfo(1);
        return map;
    }

    //下单订票
    @Override
    public int addTourismOrder(TourismOrderInfo tourismOrderInfo) {
        //生成下单时间
        Date date = new Date();
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String makeOrderTime = simpleDateFormat.format(date);
        //设置订票时间
        tourismOrderInfo.setMakeOrderTime(makeOrderTime);
        //租车订单默认为未安排状态0
        tourismOrderInfo.setState(0);
        System.out.println(makeOrderTime);
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

    //管理员为租车订单安排车辆后，更新数据库
    @Override
    public int addDriverInfoToTourismOrder(TourismOrderInfo tourismOrderInfo) {
        //生成安排时间
        Date date = new Date();
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String arrangeVehicleTime = simpleDateFormat.format(date);
        tourismOrderInfo.setArrangeVehicleTime(arrangeVehicleTime);
        //将车辆信息更新到tourism_order表中
        tourismInfoDao.updateTourismOrderInfoAddDriverInfo(tourismOrderInfo);
        //更新travel_order表中的订单状态
        tourismInfoDao.updateTravelOrderState(1,tourismOrderInfo.getTravelOrderId());
        return 1;
    }
}
