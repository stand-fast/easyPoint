package com.easyPoint.service;

import com.easyPoint.pojo.user.InternshipInfo;

import java.util.List;


public interface InternshipService {

    public List<InternshipInfo> findAddInternshipInfo(int pageNum);

}
