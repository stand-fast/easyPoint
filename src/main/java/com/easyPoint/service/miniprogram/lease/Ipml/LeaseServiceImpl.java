package com.easyPoint.service.miniprogram.lease.Ipml;

import com.easyPoint.dao.lease.GoodsTypeDao;
import com.easyPoint.pojo.lease.GoodsType;
import com.easyPoint.service.miniprogram.lease.LeaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LeaseServiceImpl implements LeaseService {

    @Autowired
    GoodsTypeDao goodsTypeDao;
    @Override
    public List<GoodsType> findAllTypeById(int belongToBigType) {
        return goodsTypeDao.findAllGoodsType(belongToBigType);
    }
}
