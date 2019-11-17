package com.easyPoint.service.administrator.travel.Impl;

import com.easyPoint.dao.travel.AssociationDao;
import com.easyPoint.dto.travel.TicketDto;
import com.easyPoint.dto.travel.TicketInfoDto;
import com.easyPoint.pojo.travel.Association;
import com.easyPoint.service.administrator.travel.AssociationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * 乡会模块服务层具体实现
 *
 * @author FHJ
 * @date 2019/11/10 18:40
 */
@Service("associationService")
public class AssociationServiceImpl implements AssociationService {

    @Autowired
    AssociationDao associationDao;

    /**
     * 添加同乡会
     *
     * @param association
     * @return
     */
    @Override
    public Integer addAssociation(Association association) {
        return associationDao.addAssociation(association);
    }

    /**
     * 根据同乡会名称查询同乡会是否存在
     *
     * @param associationName
     * @return
     */
    @Override
    public Integer findAssociationByName(String associationName) {
        return associationDao.findAssociationByName(associationName);
    }

    /**
     * 根据同乡会id查询同乡会是否存在
     *
     * @param associationId
     * @return
     */
    @Override
    public Integer findAssociationById(String associationId) {
        return associationDao.findAssociationById(associationId);
    }

    /**
     * 查询某同乡会是否添加过某个上下车地点
     *
     * @param associationId
     * @param place
     * @return
     */
    @Override
    public Integer findPlaceByIdAndPlace(String associationId, String place) {
        return associationDao.findPlaceByIdAndPlace(associationId, place);
    }

    /**
     * 添加某同乡会的上下车地点
     *
     * @param associationId
     * @param place
     * @return
     */
    @Override
    public Integer addPlace(String associationId, String place) {
        return associationDao.addPlace(associationId, place);
    }

    /**
     * 删除某同乡会某个上下车地点
     *
     * @param associationId
     * @param place
     * @return
     */
    @Override
    public Integer deletePlaceByIdAndPlace(String associationId, String place) {
        return associationDao.deletePlaceByIdAndPlace(associationId, place);
    }

    @Override
    public List<String> findAllPlaces(String associationId, Integer startIndex, Integer pageSize) {
        return associationDao.findAllPlaces(associationId, startIndex, pageSize);
    }

    @Override
    public Integer findPlacesNum(String associationId) {
        return associationDao.findPlacesNum(associationId);
    }

    @Override
    public List<Association> findAllAssociation(Integer startIndex, Integer pageSize) {
        return associationDao.findAllAssociation(startIndex, pageSize);
    }

    @Override
    public List<Association> getAllAssociation() {
        return associationDao.getAllAssociation();
    }

    @Override
    public Integer findAssociationNum() {
        return associationDao.findAssociationNum();
    }

    @Override
    public Integer addTicket(TicketDto ticketDto) {
        return associationDao.addTicket(ticketDto);
    }

    @Override
    public List<TicketDto> getTicket(Integer state, Integer startIndex, Integer pageSize) {
        return associationDao.getTicket(state, startIndex, pageSize);
    }

    @Override
    public Integer getTicketNum(Integer state) {
        return associationDao.getTicketNum(state);
    }

    @Override
    public Integer updateTicketInfo(TicketInfoDto ticketInfoDto) {
        return associationDao.updateTicketInfo(ticketInfoDto);
    }

    @Override
    public TicketInfoDto findTicketInfo(Integer ticketId) {
        return associationDao.findTicketInfo(ticketId);
    }

    @Override
    public Integer endTicket(Integer ticketId) {
        return associationDao.endTicket(ticketId);
    }

    @Override
    public Integer deleteTicket(Integer ticketId) {
        return associationDao.deleteTicket(ticketId);
    }
}
