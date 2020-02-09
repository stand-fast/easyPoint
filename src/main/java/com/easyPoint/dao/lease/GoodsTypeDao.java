package com.easyPoint.dao.lease;

import com.easyPoint.pojo.lease.GoodsType;

import java.util.List;
import java.util.Map;

/**
 * @author jw
 * 租赁模块，商品类别Dao层
 */
public interface GoodsTypeDao {
    //小程序查询所有租赁商品类别
    List<GoodsType> findAllGoodsType(int belongToBigType);
}
