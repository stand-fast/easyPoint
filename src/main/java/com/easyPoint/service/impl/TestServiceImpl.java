package com.easyPoint.service.impl;

import com.easyPoint.dao.TestDao;
import com.easyPoint.pojo.TestPojo;
import com.easyPoint.service.TestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author FHJ
 * @date 2019/8/5 17:26
 */
@Service("testService")
public class TestServiceImpl implements TestService {

    @Autowired
    private TestDao testDao;

    @Override
    public List<TestPojo> findAll() {
        System.out.println("业务层：查询所有账户...");
        return testDao.findAll();
    }

    @Override
    public void saveTestPojo(TestPojo testPojo) {
        System.out.println("业务层：保存账户...");
        testDao.saveTestPojo(testPojo);
    }
}
