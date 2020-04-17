package com.easyPoint.service.business.impl;

import com.easyPoint.dao.business.GoodsDao;
import com.easyPoint.dto.business.GoodsDetailsDto;
import com.easyPoint.dto.business.GoodsDto;
import com.easyPoint.pojo.business.GoodVariety;
import com.easyPoint.pojo.business.Goods;
import com.easyPoint.service.business.GoodsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author FHJ
 * @date 2020/3/18 17:09
 */
@Service("goodsService")
public class GoodsServiceImpl implements GoodsService {

    @Autowired
    GoodsDao goodsDao;

    @Override
    public Integer addGoods(Goods goods) {
        return goodsDao.addGoods(goods);
    }

    @Override
    public List<GoodsDto> findGoodsByState(Integer state, Integer startIndex, Integer pageSize) {
        return goodsDao.findGoodsByState(state, startIndex, pageSize);
    }

    @Override
    public Integer findGoodsNumByState(Integer state) {
        return goodsDao.findGoodsNumByState(state);
    }

   @Override
    public Integer updateStateById(String goodsId, Integer newState) {
        return goodsDao.updateStateById(goodsId, newState);
    }

    @Override
    public GoodsDetailsDto findGoodsDetailsById(String goodsId) {
        return goodsDao.findGoodsDetailsById(goodsId);
    }

    @Override
    public Integer deleteGoodsById(String goodsId) {
        return goodsDao.deleteGoodsById(goodsId);
    }

    @Override
    public String findGoodsById(String goodsId) {
        return goodsDao.findGoodsById(goodsId);
    }

    @Override
    public Integer updateGoods(Goods goods) {
        return goodsDao.updateGoods(goods);
    }

    @Override
    public Integer addGoodVariety(GoodVariety goodVariety) {
        return goodsDao.addGoodVariety(goodVariety);
    }
}
