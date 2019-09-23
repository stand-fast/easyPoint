package com.easyPoint.dao;

import com.easyPoint.pojo.user.HometownAssociation;

import java.util.List;

/**
 * @author FHJ
 * @date 2019/9/22 12:14
 */
public interface HometownAssociationDao {
    // 获取所有同乡会
    List<HometownAssociation> getAllHometownAssociation();
}
