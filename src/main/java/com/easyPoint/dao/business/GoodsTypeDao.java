package com.easyPoint.dao.business;

import com.easyPoint.pojo.business.GoodsType;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * 商品类别
 */
public interface GoodsTypeDao {

    // 添加商品类别添加商品类别
    Integer addGoodType(GoodsType goodsType);

    // 根据id启用&禁用某个商品类别
    Integer forbiddenOrUse(@Param("goodTypeId") String goodTypeId, @Param("flag") Integer flag);

    // 根据id修改某个类别名和描述
    Integer updateName(@Param("goodTypeId") String goodTypeId, @Param("newName") String newName, @Param("newDescription") String newDescription);

    // 查询所有商品类别（isUse不为空则查询正在使用的商品类目）
    List<GoodsType> findAllGoodType(@Param("inUse") String inUse);

    // 删除商品类目
    Integer deleteType(String goodTypeId);

    // 查询某个名称或id的类目是否存在
    Integer findByIdOrName(@Param("goodTypeId") String goodTypeId, @Param("goodsTypeName") String goodsTypeName);
}
