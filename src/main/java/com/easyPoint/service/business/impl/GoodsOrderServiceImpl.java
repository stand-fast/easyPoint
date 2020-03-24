package com.easyPoint.service.business.impl;

import com.easyPoint.dao.business.GoodsOrderDao;
import com.easyPoint.dto.business.GoodOrderDto;
import com.easyPoint.service.business.GoodsOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author FHJ
 * @date 2020/3/18 21:53
 */
@Service("goodsOrderService")
public class GoodsOrderServiceImpl implements GoodsOrderService {

    @Autowired
    GoodsOrderDao goodsOrderDao;

    @Override
    public List<GoodOrderDto> findAllOrder(Integer state) {
        return goodsOrderDao.findAllOrder(state);
    }
}
