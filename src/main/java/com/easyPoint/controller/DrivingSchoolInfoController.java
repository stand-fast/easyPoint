package com.easyPoint.controller;

import com.easyPoint.pojo.drivingschoolpojo.DrivingSchoolInfo;
import com.easyPoint.pojo.drivingschoolpojo.DrivingSchoolInfoDetail;
import com.easyPoint.pojo.Result;
import com.easyPoint.service.DrivingSchoolInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
public class DrivingSchoolInfoController {
    @Autowired
    DrivingSchoolInfoService drivingSchoolInfoService;


    //默认显示，下拉加载更多
    @ResponseBody
    @RequestMapping("/findAddDrivingSchoolInfo")
    public Result findAddDrivingSchoolInfo(int pageNum){
        Result result;
        List<DrivingSchoolInfo> drivingSchoolInfos = drivingSchoolInfoService.findAddDrivingSchoolInfo(pageNum);
        //查询得到驾校列表不为空，提交给小程序
        if(drivingSchoolInfos!=null&&!drivingSchoolInfos.isEmpty()){
            result = new Result<>(200,"加载驾校信息成功",drivingSchoolInfos);
            return result;
        }else if(drivingSchoolInfos!=null&&drivingSchoolInfos.isEmpty()){
            result = new Result<>(201,"已经加载全部内容",drivingSchoolInfos);
            return result;
        }
        return new Result<>(400,"服务器访问繁忙，请稍后重试",null);
    }

    //查询商品详情信息
    @ResponseBody
    @RequestMapping("findDrivingSchoolInfoDetailById")
    public Result findDrivingSchoolInfoDetailById(int drivingSchoolId){
        Result result;
        DrivingSchoolInfoDetail drivingSchoolInfoDetail = drivingSchoolInfoService.findDrivingSchoolInfoDetailById(drivingSchoolId);
        if(drivingSchoolInfoDetail!=null){
            result = new Result<>(200,"查询驾校详情信息成功！",drivingSchoolInfoDetail);
        }else{
            result = new Result<>(400,"查询驾校详情信息出现异常，请稍后重试",null);
        }
        return result;
    }

}
