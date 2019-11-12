package com.easyPoint.service.administrator.travel;

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
}
