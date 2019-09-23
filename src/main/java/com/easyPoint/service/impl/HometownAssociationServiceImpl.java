package com.easyPoint.service.impl;

import com.easyPoint.dao.HometownAssociationDao;
import com.easyPoint.dao.TicketDao;
import com.easyPoint.pojo.tourism.PartTicket;
import com.easyPoint.pojo.tourism.Ticket;
import com.easyPoint.pojo.user.HometownAssociation;
import com.easyPoint.service.HometownAssociationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * @author FHJ
 * @date 2019/9/21 19:49
 */
@Service
public class HometownAssociationServiceImpl implements HometownAssociationService {
    @Autowired
    TicketDao ticketDao;
    @Autowired
    HometownAssociationDao hometownAssociationDao;

    @Override
    public List<PartTicket> findTicketByAssociationId(Integer associationId) {
        List<PartTicket> list;
        list = ticketDao.findTicketByAssociationId(associationId);

        if (list == null || list.size() == 0) {
            return null;
        } else {
            return list;
        }

    }

    @Override
    public List<HometownAssociation> findAllHometownAssociation() {
        List<HometownAssociation> list;
        list = hometownAssociationDao.getAllHometownAssociation();

        if (list == null || list.size() == 0) {
            return null;
        } else {
            return list;
        }
    }
}
