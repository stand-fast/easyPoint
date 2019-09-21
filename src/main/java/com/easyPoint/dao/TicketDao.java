package com.easyPoint.dao;

import com.easyPoint.pojo.tourism.Ticket;

import java.util.List;

/**
 * @author FHJ
 * @date 2019/9/21 17:19
 */
public interface TicketDao {
    // 根据同乡会id查询该乡会的车票
    List<Ticket> findTicketByAssociationId(Integer associationId);
}
