package com.easyPoint.service.business;

import com.easyPoint.dto.business.GoodsDetailsDto;
import com.easyPoint.dto.business.GoodsDto;
import com.easyPoint.pojo.business.Goods;

import java.util.List;

/**
 * @author FHJ
 * @date 2020/3/18 17:06
 */
public interface GoodsService {
    // 添加商品添加商品
    Integer addGoods(Goods goods);

    // 根据状态查询已发布过的所有商品
    List<GoodsDto> findGoodsByState(Integer state);

    // 根据id修改商品状态
    Integer updateStateById(String goodsId, Integer newState);

    // 根据id查询商品详情
    GoodsDetailsDto findGoodsDetailsById(String goodsId);

    // 根据id删除商品
    Integer deleteGoodsById(String goodsId);

    // 根据Id查询某商品是否存在
    String findGoodsById(String goodsId);

    // 修改商品信息
    Integer updateGoods(Goods goods);
}
