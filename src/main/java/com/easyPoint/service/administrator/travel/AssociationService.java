package com.easyPoint.service.administrator.travel;

import com.easyPoint.dto.travel.BuyDetail;
import com.easyPoint.dto.travel.TicketDto;
import com.easyPoint.dto.travel.TicketInfoDto;
import com.easyPoint.pojo.travel.Association;

import java.util.List;

/**
 * 乡会模块服务层
 *
 * @author FHJ
 * @date 2019/11/10 18:39
 */
public interface AssociationService {
    // 添加同乡会
    Integer addAssociation(Association association);

    // 根据同乡会名称查询同乡会是否存在
    Integer findAssociationByName(String associationName);

    // 根据同乡会id查询同乡会是否存在
    Integer findAssociationById(String associationId);

    // 查询某同乡会是否添加过某个上下车地点
    Integer findPlaceByIdAndPlace(String associationId, String place);

    // 添加某同乡会的上下车地点
    Integer addPlace(String associationId, String place);

    // 删除某同乡会某个上下车地点
    Integer deletePlaceByIdAndPlace(String associationId, String place);

    // 获取某同乡会的上下车地点
    List<String> findAllPlaces(String associationId, Integer startIndex, Integer pageSize);

    // 获取某同乡会的上下车地点总数量
    Integer findPlacesNum(String associationId);

    // 获取所有同乡会（分页）
    List<Association> findAllAssociation(Integer startIndex, Integer pageSize);

    // 获取所有同乡会
    List<Association> getAllAssociation();

    // 查询同乡会数量
    Integer findAssociationNum();

    // 添加车票
    Integer addTicket(TicketDto ticketDto);

    // 获取车票
    List<TicketDto> getTicket(Integer state, Integer startIndex, Integer pageSize);

    // 获取正在售卖（已下架）车票数量
    Integer getTicketNum(Integer state);

    // 修改（添加）车辆信息
    Integer updateTicketInfo(TicketInfoDto ticketInfoDto);

    // 查询某车票的车辆信息
    TicketInfoDto findTicketInfo(Integer ticketId);

    // 将某车票下架
    Integer endTicket(Integer ticketId);

    // 删除历史发布的车票
    Integer deleteTicket(Integer ticketId);

    // 查询车票的购票详情
    List<BuyDetail> findBuyDetail(String ticketId, Integer startIndex, Integer pageSize);

    // 查询车票的购票数量
    Integer findBuyDetailNum(String ticketId);
}
