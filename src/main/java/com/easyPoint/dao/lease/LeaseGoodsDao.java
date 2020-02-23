package com.easyPoint.dao.lease;

import com.easyPoint.dto.lease.MiniLeaseOrderDetailDto;
import com.easyPoint.dto.lease.MiniLeaseOrderPageDto;
import com.easyPoint.pojo.lease.GoodOrder;
import com.easyPoint.pojo.lease.GoodVariety;
import com.easyPoint.pojo.lease.LeaseGood;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

/**
 * @author jw
 * 租赁模块，商品信息Dao层
 */
public interface LeaseGoodsDao {

    //查询热门专栏图片路径
    List<String> findImageUrl();

    //根据租赁商品的类别查询小程序租赁商品界面的简要信息
    List<Map> findLeaseGoodsByTypeId(int goodsTypeId);

    //根据租赁商品id查询小程序租赁商品的详情页面信息
    LeaseGood findLeaseGoodDetailById(int goodId);

    //根据商品id查询该商品的所有规格
    List<GoodVariety> findVarietyByGoodId(int goodId);

    //保存租赁订单信息
    int addLeaseOrder(GoodOrder goodOrder);

    //查询订单页面信息
    List<MiniLeaseOrderPageDto> findMiniOrderPageInfo(@Param("uid")int uid);

    //查询小程序租赁订单详情页数据
    MiniLeaseOrderDetailDto findMiniOrderDetailById(int goodOrderId);
}
