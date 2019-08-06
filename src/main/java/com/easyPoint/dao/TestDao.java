package com.easyPoint.dao;

import com.easyPoint.pojo.TestPojo;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author FHJ
 * @date 2019/8/5 17:24
 */
@Repository
public interface TestDao {
    @Select("select * from test")
    List<TestPojo> findAll();

    @Insert("insert into test (username, password, age) values (#{username}, #{password}, #{age})")
    void saveTestPojo(TestPojo testPojo);
}
