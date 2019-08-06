package com.easyPoint.service;

import com.easyPoint.pojo.TestPojo;

import java.util.List;

/**
 * @author FHJ
 * @date 2019/8/5 17:26
 */
public interface TestService {
    List<TestPojo> findAll();

    void saveTestPojo(TestPojo testPojo);
}
