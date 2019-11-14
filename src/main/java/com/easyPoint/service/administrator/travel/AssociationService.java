package com.easyPoint.service.administrator.travel;

import java.util.List;

/**
 * 乡会模块服务层
 *
 * @author FHJ
 * @date 2019/11/10 18:39
 */
public interface AssociationService {
    // 添加同乡会
    Integer addAssociation(String associationName);

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
}
