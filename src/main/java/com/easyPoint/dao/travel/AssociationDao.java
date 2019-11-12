package com.easyPoint.dao.travel;

/**
 * 乡会模块dao层
 *
 * @author FHJ
 * @date 2019/9/22 12:14
 */
public interface AssociationDao {
    // 添加同乡会
    Integer addAssociation(String associationName);

    // 根据同乡会名称查询同乡会是否存在
    Integer findAssociationByName(String associationName);

    // 根据同乡会id查询同乡会是否存在
    Integer findAssociationById(String associationId);

    // 查询某同乡会是否添加过某个上下车地点

    // 添加某同乡会的上下车地点
}
