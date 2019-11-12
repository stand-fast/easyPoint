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
}
