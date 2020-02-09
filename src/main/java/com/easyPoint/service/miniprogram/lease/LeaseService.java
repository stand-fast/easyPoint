package com.easyPoint.service.miniprogram.lease;

import com.easyPoint.pojo.lease.GoodsType;

import java.util.List;

/**
 * @author jw
 * 小程序租赁模块服务层
 */
public interface LeaseService {
    //根据所属大类别的id查询所有分类导航栏
    List<GoodsType> findAllTypeById(int belongToBigType);
}
