package com.easyPoint.dao;

import com.easyPoint.pojo.travel.AssociationTicket;
import com.easyPoint.pojo.user.HometownAssociation;

import java.util.List;

/**
 * @author FHJ
 * @date 2019/9/22 12:14
 */
public interface HometownAssociationDao {
    // 获取所有同乡会
    List<HometownAssociation> getAllHometownAssociation();

    // 根据同乡会名称获取同乡会
    HometownAssociation getHometownAssociationByName(String associationName);

    // 添加同乡会
    void addHometownAssociation(String associationName);

    // 添加车票
    void  addTicket(AssociationTicket associationTicket);
}
