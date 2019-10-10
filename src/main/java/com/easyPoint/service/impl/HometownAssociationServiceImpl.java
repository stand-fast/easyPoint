package com.easyPoint.service.impl;

import com.alibaba.druid.sql.ast.statement.SQLIfStatement;
import com.easyPoint.dao.HometownAssociationDao;
import com.easyPoint.dao.TicketDao;
import com.easyPoint.pojo.tourism.AssociationTicket;
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

    @Override
    public HometownAssociation getHometownAssociationByName(String associationName) {
        if (associationName == null || associationName.equals("")) {
            return null;
        }
        HometownAssociation hometownAssociation = hometownAssociationDao.getHometownAssociationByName(associationName);
        System.out.println("hometownAssociation：" + hometownAssociation);
        if (hometownAssociation != null) {
            System.out.println(hometownAssociation.getAssociationName());
        }
        return hometownAssociation;
    }

    @Override
    public Integer addHometownAssociation(String associationName) {
        try {
            hometownAssociationDao.addHometownAssociation(associationName);
            return 1;
        } catch (Exception e) {
            return 0;
        }
    }

    @Override
    public Integer addTicket(AssociationTicket associationTicket) {
        try {
            hometownAssociationDao.addTicket(associationTicket);
            return 1;
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }
}
