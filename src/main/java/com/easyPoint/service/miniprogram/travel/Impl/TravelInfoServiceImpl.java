package com.easyPoint.service.miniprogram.travel.Impl;

import com.easyPoint.dao.travel.TourismInfoDao;
import com.easyPoint.pojo.tourism.TravelOrderInfo;
import com.easyPoint.service.miniprogram.travel.TravelInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * 小程序出行模块订单的服务层
 * @author FJW
 */
@Service
public class TravelInfoServiceImpl implements TravelInfoService {

    @Autowired
    TourismInfoDao tourismInfoDao;
    //出行模块订单，租车与包车共享
    @Override
    public List<TravelOrderInfo> findListTravelOrderByUid(int uid) {
        return tourismInfoDao.findListTravelOrderByUid(uid);
    }

    //用户查询出行订单详情信息
    @Override
    public Object findTravelOrderDetailInfo(int travelOrderId, int type) {
        //判断小程序端点击的出行订单是租车还是包车模块;0为租车，1为包车
        if(type == 0)
            return tourismInfoDao.findTourismOrderDetailInfo(travelOrderId);
        return null;
    }
}
