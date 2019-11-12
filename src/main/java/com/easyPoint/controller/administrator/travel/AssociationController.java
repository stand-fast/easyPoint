package com.easyPoint.controller.administrator.travel;

import com.easyPoint.dto.Result;
import com.easyPoint.service.administrator.travel.AssociationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * 同乡会控制器
 * @author FHJ
 * @date 2019/11/10 18:46
 */
@CrossOrigin
@Controller
@RequestMapping("/administrator")
public class AssociationController {

    @Autowired
    AssociationService associationService;

    /**
     * 添加同乡会
     * @param associationName
     * @return
     */
    @RequestMapping("/addAssociation")
    @ResponseBody
    public Result addAssociation(String associationName) {
        Result result = new Result();

        if (associationName == null || associationName.equals("")) {
            result.setCode(0);
            result.setMessage("同乡会名字为空！");
            return result;
        }

        // 查询是否已添加该同乡会
        Integer num = associationService.findAssociationByName(associationName);

        if (num != 0) {
            result.setCode(2);
            result.setMessage("同乡会名已添加过！");
            return result;
        }

        // 添加同乡会
        Integer flag = associationService.addAssociation(associationName);

        if (flag != null && flag == 1) {
            result.setCode(1);
            result.setMessage("同乡会添加成功！");
            return result;
        } else {
            result.setCode(-1);
            result.setMessage("同乡会添加失败！");
            return result;
        }
    }
}
