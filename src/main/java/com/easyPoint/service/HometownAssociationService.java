package com.easyPoint.service;

import com.easyPoint.pojo.tourism.PartTicket;
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
}
