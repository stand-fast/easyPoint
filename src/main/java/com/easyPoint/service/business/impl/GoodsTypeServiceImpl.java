package com.easyPoint.service.business.impl;

import com.easyPoint.dao.business.GoodsTypeDao;
import com.easyPoint.pojo.business.GoodsType;
import com.easyPoint.service.business.GoodsTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("goodsTypeService")
public class GoodsTypeServiceImpl implements GoodsTypeService {

    @Autowired
    GoodsTypeDao goodsTypeDao;
    // 添加商品类别
    @Override
    public Integer addGoodType(GoodsType goodsType) {
        return goodsTypeDao.addGoodType(goodsType);
    }

    @Override
    public Integer forbiddenOrUse(String goodTypeId, Integer flag) {
        return goodsTypeDao.forbiddenOrUse(goodTypeId, flag);
    }

    @Override
    public Integer updateName(String goodTypeId, String newName, String newDescription) {
        return goodsTypeDao.updateName(goodTypeId, newName, newDescription);
    }

    @Override
    public List<GoodsType> findAllGoodType(String inUse) {
        return goodsTypeDao.findAllGoodType(inUse);
    }

    @Override
    public Integer deleteType(String goodTypeId) {
        return goodsTypeDao.deleteType(goodTypeId);
    }

    @Override
    public Integer findByIdOrName(String goodTypeId, String goodsTypeName) {
        return goodsTypeDao.findByIdOrName(goodTypeId, goodsTypeName);
    }

}
