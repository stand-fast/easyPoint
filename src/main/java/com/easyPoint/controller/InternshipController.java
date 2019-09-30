package com.easyPoint.controller;

import com.easyPoint.dto.Result;
import com.easyPoint.pojo.user.InternshipInfo;
import com.easyPoint.service.InternshipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;


@Controller
public class InternshipController {

    @Autowired
    InternshipService internshipService;


    /**
     * 下拉加载更多内容
     * @param pageNum
     * @return result
     */

    @ResponseBody
    @RequestMapping("/findAddInternshipInfo")
    public Result findAddInternshipInfo(@RequestParam("pageNum")int pageNum){
        Result result;
        try{
            List<InternshipInfo> internshipInfos = internshipService.findAddInternshipInfo(pageNum);
            if(internshipInfos == null || internshipInfos.isEmpty())
                return new Result<>(201,"已经没有更多数据可以加载",internshipInfos);
            result = new Result<>(200,"请求数据成功",internshipInfos);
            System.out.println("访问数据库成功");
            return result;
        }catch (Exception e){
            return new Result<>(400,"请求异常",null);
        }

    }

}
