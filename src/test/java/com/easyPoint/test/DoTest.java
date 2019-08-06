package com.easyPoint.test;

import com.easyPoint.dao.TestDao;
import com.easyPoint.pojo.TestPojo;
import com.easyPoint.service.TestService;
import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

/**
 * @author FHJ
 * @date 2019/8/5 17:35
 */
public class DoTest {

    @Test
    public void run1(){
        ApplicationContext applicationContext = new ClassPathXmlApplicationContext("applicationContext.xml");
        TestService testService = (TestService) applicationContext.getBean("testService");
        List<TestPojo> list = testService.findAll();
    }

    @Test
    public void run2() throws IOException {
        InputStream in = Resources.getResourceAsStream("SqlMapConfig.xml");
        SqlSessionFactory factory = new SqlSessionFactoryBuilder().build(in);
        SqlSession session = factory.openSession();
        TestDao testDao = session.getMapper(TestDao.class);
        List<TestPojo> list = testDao.findAll();
        for (TestPojo pojo : list){
            System.out.println(pojo);
        }
        session.close();
        in.close();
    }

    @Test
    public void run3() throws IOException {
        InputStream in = Resources.getResourceAsStream("SqlMapConfig.xml");
        SqlSessionFactory factory = new SqlSessionFactoryBuilder().build(in);
        SqlSession session = factory.openSession();
        TestDao testDao = session.getMapper(TestDao.class);
        TestPojo pojo = new TestPojo();
        pojo.setUsername("习大大");
        pojo.setPassword("444555666");
        pojo.setAge(20);
        testDao.saveTestPojo(pojo);
        session.commit();
        session.close();
        in.close();
    }
}
