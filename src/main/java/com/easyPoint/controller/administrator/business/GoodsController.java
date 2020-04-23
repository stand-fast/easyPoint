package com.easyPoint.controller.administrator.business;

import com.alibaba.fastjson.JSONArray;
import com.easyPoint.dto.Result;
import com.easyPoint.dto.business.GoodsDto;
import com.easyPoint.pojo.business.GoodVariety;
import com.easyPoint.pojo.business.Goods;
import com.easyPoint.service.business.GoodsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.text.SimpleDateFormat;
import java.util.*;

/**
 * @author FHJ
 * @date 2020/3/18 17:18
 */
@CrossOrigin
@Controller
@RequestMapping("/administrator")
public class GoodsController {

    @Autowired
    GoodsService goodsService;

    /**
     * 添加商品
     *
     * @param goods
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "/addGoods", method = RequestMethod.POST)
    public Result addGoods(Goods goods) {
        Result result = new Result();

        String goodName = goods.getGoodName();
        String businessName = goods.getBusinessName();
        Double lowestPrice = goods.getLowestPrice();
        String proImg = goods.getProImg();
        Integer goodsTypeId = goods.getGoodsTypeId();
        Integer state = goods.getState();
        String goodVarietyString = goods.getGoodVarietyString();

        if (goodName == null || goodName.equals("") || businessName == null || businessName.equals("") ||
                lowestPrice == null || lowestPrice.equals("") || proImg == null || proImg.equals("") || goodsTypeId == null || goodsTypeId < 0 ||
                (state != 1 && state != 2 && state != 3) || goodVarietyString == null || goodVarietyString.equals("")) {
            result.setCode(2);
            result.setMessage("参数有误");
            return result;
        }

        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
        int random = (int) (Math.random() * 90) + 10;
        String id = sdf.format(new Date()) + businessName + random;
        goods.setGoodId(id);
        goods.setLeaseNum(0);

        Integer flag = goodsService.addGoods(goods);

        List<GoodVariety> goodVarietyList = JSONArray.parseArray(goodVarietyString, GoodVariety.class);

        if (flag != null && flag == 1 && (goodVarietyList == null || goodVarietyList.size() == 0)) {
            result.setCode(1);
            result.setMessage("添加成功！");
        } else if (goodVarietyList.size() > 0 && flag == 1) {
            int tmp = 1;
            int size = goodVarietyList.size();
            for (int i = 0; i < size; i++) {
                GoodVariety goodVariety = goodVarietyList.get(i);
                goodVariety.setGoodId(id);
                tmp = goodsService.addGoodVariety(goodVariety);
                if (tmp != 1) {
                    break;
                }
            }
            if (tmp != 1) {
                result.setCode(-1);
                result.setMessage("添加失败！");
            } else {
                result.setCode(1);
                result.setMessage("添加成功！");
            }
        } else {
            result.setCode(-1);
            result.setMessage("添加失败！");
        }
        return result;
    }

    /**
     * 根据状态查询已发布过的所有商品
     *
     * @param state
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "/findGoodsByState", method = RequestMethod.GET)
    public Result findGoodsByState(Integer state, Integer startIndex, Integer pageSize) {
        Result result = new Result();

        if (state == null || (state != 1 && state != 2 && state != 3) || startIndex == null || startIndex <= 0 || pageSize == null || pageSize <= 0) {
            result.setCode(2);
            result.setMessage("参数有误");
            return result;
        }

        // 查询总量
        Integer goodsNum = goodsService.findGoodsNumByState(state);

        if (goodsNum == 0) {
            result.setCode(0);
            result.setMessage("暂时没有商品！");
            return result;
        }

        if ((startIndex - 1) * pageSize >= goodsNum) {
            result.setCode(3);
            result.setMessage("页码超出最大范围！");
            return result;
        }

        List<GoodsDto> list = goodsService.findGoodsByState(state, (startIndex - 1) * pageSize, pageSize);

        result.setCode(1);
        result.setMessage("查询成功！");
        Map<String, Object> map = new HashMap<>(2);
        map.put("goodsList", list);
        map.put("totalNum", goodsNum);
        result.setData(map);
        return result;
    }

    /**
     * 根据id修改商品状态
     *
     * @param goodsId
     * @param newState
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "/updateStateById", method = RequestMethod.POST)
    public Result updateStateById(String goodsId, Integer newState) {
        Result result = new Result();

        if (goodsId == null || goodsId.equals("") || newState == null || (newState != 1 && newState != 2 && newState != 3)) {
            result.setCode(2);
            result.setMessage("参数有误");
            return result;
        }

        String str = goodsService.findGoodsById(goodsId);

        if (str == null) {
            result.setCode(0);
            result.setMessage("该商品不存在！");
            return result;
        }

        Integer flag = goodsService.updateStateById(goodsId, newState);

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
     * 根据id查询商品详情
     *
     * @param goodsId
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "/findGoodsDetailsById", method = RequestMethod.GET)
    public Result findGoodsDetailsById(String goodsId) {
        Result result = new Result();

        if (goodsId == null || goodsId.equals("")) {
            result.setCode(2);
            result.setMessage("参数有误");
            return result;
        }

        Goods goods = goodsService.findGoodsDetailsById(goodsId);

        if (goods == null) {
            result.setCode(0);
            result.setMessage("该商品不存在！");
        } else {
            result.setCode(1);
            result.setMessage("查询成功");
            Map<String, Goods> map = new HashMap<>();
            map.put("goodsDetails", goods);
            result.setData(map);
        }

        return result;
    }

    /**
     * 根据id删除商品
     *
     * @param goodsId
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "/deleteGoodsById", method = RequestMethod.POST)
    public Result deleteGoodsById(String goodsId) {
        Result result = new Result();

        if (goodsId == null || goodsId.equals("")) {
            result.setCode(2);
            result.setMessage("参数有误");
            return result;
        }

        String str = goodsService.findGoodsById(goodsId);

        if (str == null) {
            result.setCode(0);
            result.setMessage("该商品不存在！");
            return result;
        }

        Integer flag = goodsService.deleteGoodsById(goodsId);

        if (flag != null && flag == 1) {
            result.setCode(1);
            result.setMessage("删除成功！");
        } else {
            result.setCode(-1);
            result.setMessage("删除失败！");
        }

        return result;
    }

    /**
     * 修改商品信息
     *
     * @param goods
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "/updateGoods", method = RequestMethod.POST)
    public Result updateGoods(Goods goods) {
        Result result = new Result();
        String goodId = goods.getGoodId();
        String goodName = goods.getGoodName();
        String businessName = goods.getBusinessName();
        Double lowestPrice = goods.getLowestPrice();
        Double highestPrice = goods.getHighestPrice();
        String goodImages = goods.getGoodImages();
        Double deposit = goods.getDeposit();
        String depositInstruction = goods.getDepositInstruction();
        String takeGoodInstruction = goods.getTakeGoodInstruction();
        String returnGoodInstruction = goods.getReturnGoodInstruction();
        String businessHours = goods.getBusinessHours();
        String goodDescription = goods.getGoodDescription();
        String proImg = goods.getProImg();
        Integer goodsTypeId = goods.getGoodsTypeId();

        if ((goodId == null || goodId.equals("")) || (lowestPrice == null && highestPrice == null && deposit == null && (goodName == null || goodName.equals("")) && (businessName == null || businessName.equals("")) &&
                (goodImages == null || goodImages.equals("")) && (depositInstruction == null || depositInstruction.equals("")) &&
                (takeGoodInstruction == null || takeGoodInstruction.equals("")) && (returnGoodInstruction == null || returnGoodInstruction.equals(""))
                && (businessHours == null || businessHours.equals("")) && (goodDescription == null || goodDescription.equals("")) &&
                (proImg == null || proImg.equals("")) && goodsTypeId == null)) {
            result.setCode(2);
            result.setMessage("参数有误");
            return result;
        }

        String str = goodsService.findGoodsById(goodId);

        if (str == null) {
            result.setCode(0);
            result.setMessage("该商品不存在！");
            return result;
        }

        Integer flag = goodsService.updateGoods(goods);

        if (flag != null && flag == 1) {
            result.setCode(1);
            result.setMessage("修改成功！");
        } else {
            result.setCode(-1);
            result.setMessage("修改失败！");
        }

        return result;
    }

}
