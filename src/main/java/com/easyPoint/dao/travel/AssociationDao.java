package com.easyPoint.dao.travel;

import com.easyPoint.dto.travel.TicketDto;
import com.easyPoint.dto.travel.TicketInfoDto;
import com.easyPoint.pojo.travel.Association;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * 乡会模块dao层
 *
 * @author FHJ
 * @date 2019/9/22 12:14
 */
public interface AssociationDao {
    // 添加同乡会
    Integer addAssociation(Association associationName);

    // 根据同乡会名称查询同乡会是否存在
    Integer findAssociationByName(String associationName);

    // 根据同乡会id查询同乡会是否存在
    Integer findAssociationById(String associationId);

    // 查询某同乡会是否添加过某个上下车地点
    Integer findPlaceByIdAndPlace(@Param("associationId") String associationId, @Param("place") String place);

    // 添加某同乡会的上下车地点
    Integer addPlace(@Param("associationId") String associationId, @Param("place") String place);

    // 删除某同乡会某个上下车地点
    Integer deletePlaceByIdAndPlace(@Param("associationId") String associationId, @Param("place") String place);

    // 获取某同乡会的上下车地点
    List<String> findAllPlaces(@Param("associationId") String associationId, @Param("startIndex") Integer startIndex, @Param("pageSize") Integer pageSize);

    // 获取某同乡会的上下车地点总数量
    Integer findPlacesNum(String associationId);

    // 获取所有同乡会(分页）
    List<Association> findAllAssociation(@Param("startIndex") Integer startIndex, @Param("pageSize") Integer pageSize);

    // 获取所有同乡会
    List<Association> getAllAssociation();

    // 查询同乡会数量
    Integer findAssociationNum();

    // 添加车票
    Integer addTicket(TicketDto ticketDto);

    // 获取车票
    List<TicketDto> getTicket(@Param("state") Integer state, @Param("startIndex") Integer startIndex, @Param("pageSize") Integer pageSize);

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
}
