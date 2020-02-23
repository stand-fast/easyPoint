package com.easyPoint.service.miniprogram.lease;

import com.easyPoint.dto.lease.MiniLeaseOrderDetailDto;
import com.easyPoint.dto.lease.MiniLeaseOrderPageDto;
import com.easyPoint.dto.pay.MiniPaymentDto;
import com.easyPoint.pojo.lease.GoodOrder;
import com.easyPoint.pojo.lease.GoodVariety;
import com.easyPoint.pojo.lease.GoodsType;
import com.easyPoint.pojo.lease.LeaseGood;

import java.text.ParseException;
import java.util.List;
import java.util.Map;

/**
 * @author jw
 * 小程序租赁模块服务层
 */
public interface LeaseService {
    //根据所属大类别的id查询所有分类导航栏
    List<GoodsType> findAllTypeById();

    //查询热门专栏信息
    List<String> findAdvertisementImageUrl();

    //根据租赁商品类别id查询
    List<Map> findLeaseGoodsByTypeId(int goodsTypeId);

    //根据商品id查询商品详细信息
    LeaseGood findLeaseGoodById(int goodId);

    //根据商品id查询该商品的所有规格
    List<GoodVariety> findLeaseGoodsVarietiesByGoodId(int goodId);

    //小程序发起支付请求提交预订单
    Map addAdvanceOrder(int uid, GoodOrder goodOrder)throws Exception;

    //添加订单
    int addLeaseOrder(Map<String,Object> map);

    //查询订单
    List<MiniLeaseOrderPageDto> findOrderPageInfo(int uid);

    //查询订单详情页
    MiniLeaseOrderDetailDto findOrderDetail(int goodOrderId) throws ParseException;

}
