package com.easyPoint.service.miniprogram.travel.Impl;

import com.easyPoint.dao.travel.TourismInfoDao;
import com.easyPoint.dto.travel.TourismOrderDetailInfoDto;
import com.easyPoint.pojo.travel.TravelOrderInfo;
import com.easyPoint.service.miniprogram.travel.TravelInfoService;
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
    //出行模块订单，租车与包车共享
    @Override
    public List<TravelOrderInfo> findListTravelOrderByUid(int uid) {
        return tourismInfoDao.findListTravelOrderByUid(uid);
    }


    //用户查询出行订单详情信息
    @Override
    public Object findTravelOrderDetailInfo(int travelOrderId, int type) {
        //判断小程序端点击的出行订单是租车还是包车模块;0为租车，1为包车
        if(type == 0) {
            TourismOrderDetailInfoDto tourismOrderDetailInfo = tourismInfoDao.findTourismOrderDetailInfo(travelOrderId);
            //如果退款订单表id不为null,则该订单为退单状态，需返回退款原因
            if(tourismOrderDetailInfo.getTourismRefundId() !=null){
                Map<String, String> mapRefundAndRejectReason = tourismInfoDao.findMapRefundAndRejectReason(tourismOrderDetailInfo.getTourismRefundId());
                tourismOrderDetailInfo.setRefundReason(mapRefundAndRejectReason.get("refundReason"));
                tourismOrderDetailInfo.setRejectReason(mapRefundAndRejectReason.get("rejectReason"));
            }
            //为空时，则没有退款申请理由和驳回理由
            return tourismOrderDetailInfo;
        }
        return null;
    }

}
