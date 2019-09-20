package com.easyPoint.service;

import com.easyPoint.pojo.drivingschoolpojo.DrivingSchoolInfo;
import com.easyPoint.pojo.drivingschoolpojo.DrivingSchoolInfoDetail;
import com.easyPoint.pojo.drivingschoolpojo.DrivingSchoolSetmeal;

import java.util.List;

public interface DrivingSchoolInfoService {
    //默认显示，下拉加载更多
    List<DrivingSchoolInfo> findAddDrivingSchoolInfo(int pageNum);

    //查询商品详情信息
    DrivingSchoolInfoDetail findDrivingSchoolInfoDetailById(int drivingSchoolId);

    //查询驾校所有学车套餐
    List<DrivingSchoolSetmeal> findAllDrivingSchoolSetmealByDrivingSchoolId(int drivingSchoolId);
}
