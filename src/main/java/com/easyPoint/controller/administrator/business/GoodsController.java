package com.easyPoint.controller.administrator.business;

import com.easyPoint.dto.Result;
import com.easyPoint.dto.business.GoodsDetailsDto;
import com.easyPoint.dto.business.GoodsDto;
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
        double lowestPrice = goods.getLowestPrice();
        double highestPrice = goods.getHighestPrice();
        String goodImages = goods.getGoodImages();
        double deposit = goods.getDeposit();
        String depositInstruction = goods.getDepositInstruction();
        String takeGoodInstruction = goods.getTakeGoodInstruction();
        String returnGoodInstruction = goods.getReturnGoodInstruction();
        String businessHours = goods.getBusinessHours();
        String goodDescription = goods.getGoodDescription();
        String proImg = goods.getProImg();
        String goodsTypeId = goods.getGoodId();
        Integer state = goods.getState();

        if (goodName == null || goodName.equals("") || businessName == null || businessName.equals("") ||
                lowestPrice < 0 || highestPrice < 0 || goodImages == null || goodImages.equals("") ||
                deposit < 0 || depositInstruction == null || depositInstruction.equals("") ||
                takeGoodInstruction == null || takeGoodInstruction.equals("") || returnGoodInstruction == null || returnGoodInstruction.equals("") ||
                businessHours == null || businessHours.equals("") || goodDescription == null || goodDescription.equals("") ||
                proImg == null || proImg.equals("") || goodsTypeId == null || goodsTypeId.equals("") ||
                (state != 1 && state != 2 && state != 3)) {
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
     * 根据状态查询已发布过的所有商品
     *
     * @param state
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "/findGoodsByState", method = RequestMethod.GET)
    public Result findGoodsByState(Integer state) {
        Result result = new Result();

        if (state == null || (state != 1 && state != 2 && state != 3)) {
            result.setCode(2);
            result.setMessage("参数有误");
            return result;
        }

        List<GoodsDto> list = new ArrayList<>();

        list = goodsService.findGoodsByState(state);

        if (list.size() == 0) {
            result.setCode(0);
            result.setMessage("暂时没有订单");
        } else {
            result.setCode(1);
            result.setMessage("查询成功");
            Map<String, List<GoodsDto>> map = new HashMap<>();
            map.put("goods", list);
            result.setData(map);
        }

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

        GoodsDetailsDto goodsDetailsDto = goodsService.findGoodsDetailsById(goodsId);

        if (goodsDetailsDto == null) {
            result.setCode(0);
            result.setMessage("该商品不存在！");
        } else {
            result.setCode(1);
            result.setMessage("查询成功");
            Map<String, GoodsDetailsDto> map = new HashMap<>();
            map.put("goodsDetails", goodsDetailsDto);
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

        String goodName = goods.getGoodName();
        String businessName = goods.getBusinessName();
        double lowestPrice = goods.getLowestPrice();
        double highestPrice = goods.getHighestPrice();
        String goodImages = goods.getGoodImages();
        double deposit = goods.getDeposit();
        String depositInstruction = goods.getDepositInstruction();
        String takeGoodInstruction = goods.getTakeGoodInstruction();
        String returnGoodInstruction = goods.getReturnGoodInstruction();
        String businessHours = goods.getBusinessHours();
        String goodDescription = goods.getGoodDescription();
        String proImg = goods.getProImg();
        String goodsTypeId = goods.getGoodId();

        if (goodName == null || goodName.equals("") || businessName == null || businessName.equals("") ||
                lowestPrice < 0 || highestPrice < 0 || goodImages == null || goodImages.equals("") ||
                deposit < 0 || depositInstruction == null || depositInstruction.equals("") ||
                takeGoodInstruction == null || takeGoodInstruction.equals("") || returnGoodInstruction == null || returnGoodInstruction.equals("") ||
                businessHours == null || businessHours.equals("") || goodDescription == null || goodDescription.equals("") ||
                proImg == null || proImg.equals("") || goodsTypeId == null || goodsTypeId.equals("")) {
            result.setCode(2);
            result.setMessage("参数有误");
            return result;
        }

        Integer flag = goodsService.updateGoods(goods);

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
