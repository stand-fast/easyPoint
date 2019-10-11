package com.easyPoint.service;

import com.easyPoint.pojo.travel.AssociationTicket;
import com.easyPoint.pojo.travel.PartTicket;
import com.easyPoint.pojo.user.HometownAssociation;

import java.util.List;

/**
 * @author FHJ
 * @date 2019/9/21 19:41
 */
public interface HometownAssociationService {

    // 根据同乡会id查询该乡会的车票
    List<PartTicket> findTicketByAssociationId(Integer associationId);

    // 获取所有同乡会
    List<HometownAssociation> findAllHometownAssociation();

    // 根据同乡会名称获取同乡会
    HometownAssociation getHometownAssociationByName(String associationName);

    // 添加同乡会
    Integer addHometownAssociation(String associationName);

    // 添加车票
    Integer addTicket(AssociationTicket associationTicket);
}
