package com.easyPoint.dao.business;

import com.easyPoint.dto.business.GoodsDetailsDto;

import com.easyPoint.dto.business.GoodsDto;
import com.easyPoint.pojo.business.GoodVariety;
import com.easyPoint.pojo.business.Goods;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * 租赁物品
 */
public interface GoodsDao {
    // 添加商品添加商品
    Integer addGoods(Goods goods);

    // 根据状态查询已发布过的所有商品
    List<GoodsDto> findGoodsByState(@Param("state") Integer state, @Param("startIndex") Integer startIndex, @Param("pageSize") Integer pageSize);

    // 查询某种状态的商品的总量
    Integer findGoodsNumByState(Integer state);

    // 根据id修改商品状态
    Integer updateStateById(@Param("goodsId") String goodsId, @Param("newState") Integer newState);

    // 根据id查询商品详情
    Goods findGoodsDetailsById(String goodsId);

    // 根据id删除商品
    Integer deleteGoodsById(String goodsId);

    // 根据Id查询某商品是否存在
    String findGoodsById(String goodsId);

    // 修改商品信息
    Integer updateGoods(Goods goods);

    // 添加商品类别
    Integer addGoodVariety(GoodVariety goodVariety);
}
