package com.easyPoint.service.business;

import com.easyPoint.pojo.business.GoodsType;

import java.util.List;

public interface GoodsTypeService {
    // 添加商品类别添加商品类别
    Integer addGoodType(GoodsType goodsType);
    // 根据id启用&禁用某个商品类别
    Integer forbiddenOrUse(String goodTypeId, Integer flag);
    // 根据id修改某个类别名
    Integer updateName(String goodTypeId, String newName, String newDescription);
    // 查询所有商品类别
    List<GoodsType> findAllGoodType(String inUse);
    // 删除商品类目
    Integer deleteType(String goodTypeId);
    // 查询某个id或名称的类目是否存在
    Integer findByIdOrName(String goodTypeId, String goodsTypeName);

}
