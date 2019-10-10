package com.easyPoint.controller;

import com.easyPoint.dto.Result;
import com.easyPoint.pojo.tourism.AssociationTicket;
import com.easyPoint.pojo.tourism.PartTicket;
import com.easyPoint.pojo.user.HometownAssociation;
import com.easyPoint.service.HometownAssociationService;
import org.omg.PortableInterceptor.HOLDING;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
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
            result.setMessage("数据库没有数据！");
        } else {
            result.setCode(1);
            result.setMessage("查询成功！");
            result.setData(list);
        }

        return result;
    }

    @ResponseBody
    @RequestMapping(value = "/addAssociation")
    public Result addHometownAssociation(String associationName) {
        Result result = new Result();
        System.out.println("associationName：" + associationName);
        if (associationName == null || associationName.equals("")) {
            result.setCode(-1);
            result.setMessage("同乡会名称为空！");
        }

        HometownAssociation hometownAssociation = hometownAssociationService.getHometownAssociationByName(associationName);

        if (hometownAssociation != null) {
            result.setCode(0);
            result.setMessage("同乡会名称已经存在！");
        } else {
            Integer flag = hometownAssociationService.addHometownAssociation(associationName);
            if (flag == null || flag == 0) {
                result.setCode(-2);
                result.setMessage("添加失败！");
            } else {
                result.setCode(1);
                result.setMessage("添加成功！");
            }
        }
        return result;
    }

    @ResponseBody
    @RequestMapping(value = "/addTicket", method = RequestMethod.POST)
    public Result addTicket(AssociationTicket associationTicket) {
        Result result = new Result();
        if (associationTicket == null || associationTicket.getAssociationId() == null || associationTicket.getDepartureTime() == null || associationTicket.getDepartureDay() == null || associationTicket.getDeparturePlace() == null || associationTicket.getDestination() == null || associationTicket.getPrice() == null || associationTicket.getSeatNum() == null || associationTicket.getType() == null) {
            result.setCode(-1);
            result.setMessage("车票信息不完整！");
        } else {
            Integer flag = hometownAssociationService.addTicket(associationTicket);
            if (flag == 1) {
                result.setCode(1);
                result.setMessage("车票添加成功！");
            } else {
                result.setCode(0);
                result.setMessage("车票添加失败！");
            }
        }
        return result;
    }
}
