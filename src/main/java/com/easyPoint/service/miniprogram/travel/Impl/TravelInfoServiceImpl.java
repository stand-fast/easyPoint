package com.easyPoint.service.miniprogram.travel.Impl;

import com.easyPoint.dao.travel.AssociationDao;
import com.easyPoint.dao.travel.TourismInfoDao;
import com.easyPoint.dto.travel.MiniTourismRefundPageDto;
import com.easyPoint.dto.travel.TourismOrderDetailInfoDto;
import com.easyPoint.pojo.travel.TravelOrderInfo;
import com.easyPoint.service.miniprogram.travel.TravelInfoService;
import com.easyPoint.utils.DateUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * 小程序出行模块订单的服务层
 * @author FJW
 */
@Service
public class TravelInfoServiceImpl implements TravelInfoService {

    @Autowired
    TourismInfoDao tourismInfoDao;

    @Autowired
    AssociationDao associationDao;
    //出行模块订单，租车与包车共享
    @Override
    public List<TravelOrderInfo> findListTravelOrderByUid(int uid) {
        return tourismInfoDao.findListTravelOrderByUid(uid);
    }


    //用户查询出行订单详情信息
    @Override
    public Object findTravelOrderDetailInfo(int travelOrderId, int type) {
        //判断小程序端点击的出行订单是租车还是包车模块;0为租车，1为同乡会包车
        if(type == 0) {
            TourismOrderDetailInfoDto tourismOrderDetailInfo = tourismInfoDao.findTourismOrderDetailInfo(travelOrderId);
            return tourismOrderDetailInfo;
        }
        else {
            //查询同乡会订单车票的详情信息
                Map associationOrderDetial = associationDao.findAssociationOrderDetial(travelOrderId);
            System.out.println("--------------"+associationOrderDetial.get("departureTime"));
            associationOrderDetial.put("departureTime",associationOrderDetial.get("departureTime").toString());

            return associationOrderDetial;
        }
    }

    /**
     * 根据tourismRefundId查找退款页面信息
     * @param tourismRefundId
     * @return
     */
    @Override
    public MiniTourismRefundPageDto findRefundPageInfoById(int tourismRefundId) {
        MiniTourismRefundPageDto miniTourismRefundPageDto = tourismInfoDao.findRefundPageInfoById(tourismRefundId);
        return miniTourismRefundPageDto;
    }


    /**
     * 用户取消退款
     * @param tourismRefundId
     * @return
     */
    @Override
    public int cancelTourismRefund(int tourismRefundId) {
        String finishTime = DateUtil.getDateTime();
        //修改退款状态,5:取消退款
        int resultCode = tourismInfoDao.updateTourismRefundState(tourismRefundId,finishTime,5);
        return resultCode;
    }
}
