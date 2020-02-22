package com.easyPoint.dao.business;

import com.easyPoint.dto.business.GoodsDetailsDto;
import com.easyPoint.dto.business.GoodsDto;
import com.easyPoint.pojo.business.Goods;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * 租赁物品
 */
public interface GoodsDao {
    // 添加商品
    Integer addGoods(Goods goods);
    // 根据状态查询已发布过的所有商品
    List<GoodsDto> findGoodsByState(String state);
    // 根据id修改商品状态
    Integer updateStateById(@Param("GoodsId") String GoodsId, @Param("newState") String newState);
    // 根据id查询商品详情
    GoodsDetailsDto findGoodsDetailsById(String goodsId);
    // 根据id删除商品
    Integer deleteGoodsById(String goodsId);
    // 根据Id查询某商品是否存在
    String findGoodsById(String goodsId);
    // 修改商品信息
    Integer updateGoods(Goods goods);
}
