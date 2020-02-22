package com.easyPoint.controller.administrator.business;

import com.easyPoint.dto.Result;
import com.easyPoint.pojo.business.GoodsType;
import com.easyPoint.service.business.GoodsTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@CrossOrigin
@Controller
@RequestMapping("/administrator")
public class GoodsTypeController {

    @Autowired
    GoodsTypeService goodsTypeService;

    /**
     * 添加商品类目
     *
     * @param goodsType
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "/addGoodType", method = RequestMethod.POST)
    public Result addGoodType(GoodsType goodsType) {
        Result result = new Result();
        String goodsTypeName = goodsType.getGoodsTypeName();
        Integer state = goodsType.getState();

        if (goodsTypeName == null || goodsTypeName.equals("") || state == null || !(state == 1 || state == 2)) {
            result.setCode(2);
            result.setMessage("参数为空！或状态设置有误！");
            return result;
        }

        Integer temp = goodsTypeService.findByIdOrName(goodsType.getGoodsTypeId(), goodsTypeName);

        if (temp != null) {
            result.setCode(3);
            result.setMessage("商品类别名已经存在！");
            return result;
        }

        Integer flag = goodsTypeService.addGoodType(goodsType);

        if (flag != null && flag == 1) {
            result.setCode(1);
            result.setMessage("添加成功！");
        } else {
            result.setCode(-1);
            result.setMessage("添加失败！");
        }
        return result;
    }

    /**
     * 根据id启用&禁用某个商品类别
     *
     * @param goodTypeId
     * @param flag
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "/forbiddenOrUse", method = RequestMethod.POST)
    public Result forbiddenOrUse(String goodTypeId, Integer flag) {
        Result result = new Result();

        if (goodTypeId == null || goodTypeId.equals("") || flag == null || !(flag == 1 || flag == 2)) {
            result.setCode(2);
            result.setMessage("参数为空！或参数错误！");
            return result;
        }

        Integer temp = goodsTypeService.findByIdOrName(goodTypeId, null);

        if (temp == null) {
            result.setCode(3);
            result.setMessage("商品类别不存在！");
            return result;
        }

        Integer f = goodsTypeService.forbiddenOrUse(goodTypeId, flag);

        if (f != null && f == 1) {
            result.setCode(1);
            result.setMessage("修改成功！");
        } else {
            result.setCode(-1);
            result.setMessage("修改失败！");
        }
        return result;
    }

    /**
     * 根据id修改某个类别名和描述
     *
     * @param goodTypeId
     * @param newName
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "/updateNameAndDec", method = RequestMethod.POST)
    public Result updateName(String goodTypeId, String newName, String newDes) {
        Result result = new Result();

        if (goodTypeId == null || goodTypeId.equals("") || ((newName == null || newName.equals("")) && (newDes == null || newDes.equals("")))) {
            result.setCode(2);
            result.setMessage("参数为空！");
            return result;
        }

        Integer temp = goodsTypeService.findByIdOrName(goodTypeId, null);

        if (temp == null) {
            result.setCode(3);
            result.setMessage("商品类别不存在！");
            return result;
        }

        Integer flag = goodsTypeService.updateName(goodTypeId, newName, newDes);

        if (flag != null && flag == 1) {
            result.setCode(1);
            result.setMessage("修改成功！");
        } else {
            result.setCode(-1);
            result.setMessage("修改失败！");
        }
        return result;
    }

    /**
     * 查询所有商品类别
     *
     * @param inUse
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "/findAllGoodType", method = RequestMethod.GET)
    public Result findAllGoodType(String inUse) {
        Result result = new Result();

        List<GoodsType> list = goodsTypeService.findAllGoodType(inUse);

        if (list.size() == 0) {
            result.setCode(0);
            result.setMessage("商品类目为空！");
        } else {
            result.setCode(1);
            result.setMessage("查询成功！");
            result.setData(list);
        }
        return result;
    }

    /**
     * 根据id删除
     *
     * @param goodTypeId
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "/deleteGoodType", method = RequestMethod.POST)
    public Result deleteGoodType(String goodTypeId) {
        Result result = new Result();

        if (goodTypeId == null || goodTypeId.equals("")) {
            result.setCode(2);
            result.setMessage("参数为空！");
            return result;
        }

        Integer temp = goodsTypeService.findByIdOrName(goodTypeId, null);

        if (temp == null) {
            result.setCode(3);
            result.setMessage("商品类别不存在！");
            return result;
        }

        Integer flag = goodsTypeService.deleteType(goodTypeId);

        if (flag != null && flag == 1) {
            result.setCode(1);
            result.setMessage("删除成功！");
        } else {
            result.setCode(-1);
            result.setMessage("删除失败！");
        }
        return result;
    }
}


