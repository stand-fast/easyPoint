package com.easyPoint.dao;

import com.easyPoint.pojo.user.InternshipInfo;

import java.util.List;

/**
 * fjw
 */
public interface InternshipDao {

    //下拉加载更多
    List<InternshipInfo> findAddInternshipInfo(int pageNum);

}
