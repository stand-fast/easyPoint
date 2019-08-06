package com.easyPoint.controller;

import com.easyPoint.pojo.TestPojo;
import com.easyPoint.service.TestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

/**
 * @author FHJ
 * @date 2019/8/5 14:09
 */
@Controller
@RequestMapping("/test")
public class TestController {

    @Autowired
    private TestService testService;

    @RequestMapping("/findAll")
    public String findAll(Model model){
        System.out.println("表现层：查询所有");
        List<TestPojo> list = testService.findAll();
        model.addAttribute("list",list);
        return "list";
    }

    @RequestMapping("/save")
    public void save(HttpServletRequest request, HttpServletResponse response, TestPojo testPojo) throws IOException {
        System.out.println("表现层：保存...");
        testService.saveTestPojo(testPojo);
        response.sendRedirect(request.getContextPath()+"/test/findAll");
        return;
    }
}
