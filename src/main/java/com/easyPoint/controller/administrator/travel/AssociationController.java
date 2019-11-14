package com.easyPoint.controller.administrator.travel;

import com.easyPoint.dto.Result;
import com.easyPoint.service.administrator.travel.AssociationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 同乡会控制器
 *
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
     *
     * @param associationName
     * @return
     */
    @RequestMapping(value = "/addAssociation")
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

    /**
     * 添加同乡会上下车地点
     *
     * @param associationId
     * @param place
     * @return
     */
    @RequestMapping(value = "/addAssociationPlace")
    @ResponseBody
    public Result addAssociationPlace(String associationId, String place) {
        Result result = new Result();

        if (associationId == null || associationId.equals("") || place == null || place.equals("")) {
            result.setCode(0);
            result.setMessage("参数为空！");
            return result;
        }

        // 查看同乡会是否存在
        Integer associationNum = associationService.findAssociationById(associationId);

        if (associationNum == 0) {
            result.setCode(-2);
            result.setMessage("该同乡会不存在！");
            return result;
        }

        // 查看该同乡会是否添加过该地址
        Integer placeNum = associationService.findPlaceByIdAndPlace(associationId, place);

        if (placeNum != 0) {
            result.setCode(-3);
            result.setMessage("此同乡会已经添加过该地址了！");
            return result;
        }

        // 添加地址
        Integer flag = associationService.addPlace(associationId, place);

        if (flag == 1) {
            result.setCode(1);
            result.setMessage("添加成功！");
            return result;
        } else {
            result.setCode(-1);
            result.setMessage("添加失败！");
            return result;
        }
    }

    /**
     * 删除某同乡会某个上下车地点
     *
     * @param associationId
     * @param place
     * @return
     */
    @RequestMapping(value = "/deleteAssociationPlace")
    @ResponseBody
    public Result deleteAssociationPlace(String associationId, String place) {
        Result result = new Result();

        if (associationId == null || associationId.equals("") || place == null || place.equals("")) {
            result.setCode(0);
            result.setMessage("参数为空！");
            return result;
        }

        // 查看数据库中是否有这条记录
        Integer placeNum = associationService.findPlaceByIdAndPlace(associationId, place);

        if (placeNum == 0) {
            result.setCode(2);
            result.setMessage("没添加过该地址或者没有此同乡会！");
            return result;
        }

        // 删除地址
        Integer flag = associationService.deletePlaceByIdAndPlace(associationId, place);

        if (flag == 1) {
            result.setCode(1);
            result.setMessage("删除成功！");
            return result;
        } else {
            result.setCode(-1);
            result.setMessage("删除失败！");
            return result;
        }
    }

    /**
     * 查询某同乡会的所有上下车地点
     *
     * @param associationId
     * @param startIndex
     * @param pageSize
     * @return
     */
    @RequestMapping("/findAllPlaces")
    @ResponseBody
    public Result findAllPlaces(String associationId, Integer startIndex, Integer pageSize) {
        Result result = new Result();

        if (associationId == null || associationId.equals("") || startIndex == null || startIndex <= 0 || pageSize == null || pageSize <= 0) {
            result.setCode(2);
            result.setMessage("参数为空！");
            return result;
        }

        // 查询总数量
        Integer placeNum = associationService.findPlacesNum(associationId);

        if (placeNum == 0) {
            result.setCode(0);
            result.setMessage("查询到0条数据！");
            return result;
        }

        if ((startIndex - 1) * pageSize > placeNum) {
            result.setCode(3);
            result.setMessage("页码超出最大范围！");
            return result;
        }

        List<String> places = associationService.findAllPlaces(associationId, (startIndex - 1) * pageSize, pageSize);

        result.setCode(1);
        result.setMessage("查询成功！");
        Map<String, Object> map = new HashMap<>();
        map.put("totalNum", placeNum);
        map.put("placeList", places);
        result.setData(map);
        return result;
    }
}
