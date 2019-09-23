package com.easyPoint.controller;

import com.easyPoint.pojo.Result;
import com.easyPoint.pojo.tourism.PartTicket;
import com.easyPoint.pojo.user.HometownAssociation;
import com.easyPoint.service.HometownAssociationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

/**
 * @author FHJ
 * @date 2019/9/21 19:58
 */
@Controller
public class HometownAssociationController {

    @Autowired
    HometownAssociationService hometownAssociationService;

    @ResponseBody
    @RequestMapping("/getTicket")
    public Result getTicketByHometownAssociationId(Integer hometownAssociationId) {
        Result result = new Result();

        if (hometownAssociationId == null) {
            result.setCode(-1);
            result.setMessage("同乡会id为空！");
        } else {
            List<PartTicket> list;
            list = hometownAssociationService.findTicketByAssociationId(hometownAssociationId);
            if (list == null) {
                result.setCode(0);
                result.setMessage("查询到0条数据！");
            } else {
                result.setCode(1);
                result.setMessage("查询成功！");
                result.setData(list);
            }
        }
        return result;
    }

    @ResponseBody
    @RequestMapping("/getAssociation")
    public Result getAllHometownAssociation() {
        Result result = new Result();

        List<HometownAssociation> list = hometownAssociationService.findAllHometownAssociation();

        if (list == null) {
            result.setCode(0);
            result.setMessage("没有数据！");
        } else {
            result.setCode(1);
            result.setMessage("查询成功！");
            result.setData(list);
        }

        return result;
    }
}
