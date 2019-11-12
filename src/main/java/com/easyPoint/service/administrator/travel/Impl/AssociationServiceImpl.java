package com.easyPoint.service.administrator.travel.Impl;

import com.easyPoint.dao.travel.AssociationDao;
import com.easyPoint.service.administrator.travel.AssociationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
     * @param associationName
     * @return
     */
    @Override
    public Integer addAssociation(String associationName) {
        return associationDao.addAssociation(associationName);
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

}
