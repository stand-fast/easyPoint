package com.easyPoint.service.impl;

import com.easyPoint.dao.DrivingSchoolInfoDao;
import com.easyPoint.pojo.drivingschoolpojo.DrivingSchoolInfo;
import com.easyPoint.pojo.drivingschoolpojo.DrivingSchoolInfoDetail;
import com.easyPoint.pojo.drivingschoolpojo.DrivingSchoolSetmeal;
import com.easyPoint.service.DrivingSchoolInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * FJW
 * 小程序学车模块
 */
@Service
public class DrivingSchoolInfoServiceImpl implements DrivingSchoolInfoService {

    @Autowired
    DrivingSchoolInfoDao drivingSchoolInfoDao;


    @Override
    public List<DrivingSchoolInfo> findAddDrivingSchoolInfo(int pageNum) {
        List<DrivingSchoolInfo> drivingSchoolInfos = drivingSchoolInfoDao.findAddDrivingSchoolInfo(pageNum);
        return drivingSchoolInfos;
    }

    @Override
    public DrivingSchoolInfoDetail findDrivingSchoolInfoDetailById(int drivingSchoolId) {
        DrivingSchoolInfoDetail drivingSchoolInfoDetail = drivingSchoolInfoDao.findDrivingSchoolInfoDetailById(drivingSchoolId);

        return drivingSchoolInfoDetail;
    }

    @Override
    public List<DrivingSchoolSetmeal> findAllDrivingSchoolSetmealByDrivingSchoolId(int drivingSchoolId) {
        List<DrivingSchoolSetmeal> drivingSchoolSetmeals = drivingSchoolInfoDao.findAllDrivingSchoolSetmealByDrivingSchoolId(drivingSchoolId);

        return drivingSchoolSetmeals;
    }
}
