package com.easyPoint.controller.miniprogram.lease;

import com.easyPoint.dto.Result;
import com.easyPoint.dto.lease.MiniLeaseOrderDetailDto;
import com.easyPoint.dto.lease.MiniLeaseOrderPageDto;
import com.easyPoint.pojo.lease.GoodOrder;
import com.easyPoint.pojo.lease.GoodVariety;
import com.easyPoint.pojo.lease.GoodsType;
import com.easyPoint.pojo.lease.LeaseGood;
import com.easyPoint.service.miniprogram.lease.LeaseService;
import com.easyPoint.utils.XmlUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedOutputStream;
import java.util.List;
import java.util.Map;

/**
 * @author JW
 * 小程序租赁模块控制层
 */
@CrossOrigin
@Controller
@RequestMapping("/miniProgram")
public class MiniLeaseController {

    @Autowired
    LeaseService leaseService;
    /**
     * 查询租赁模块导航条所有类别：音响设备；装饰灯等
     * @return
     */
    @ResponseBody
    @GetMapping("/lease/findLeaseType")
    public Result findLeaseType(){
        List<GoodsType> goodsTypes = leaseService.findAllTypeById();
        if(!goodsTypes.isEmpty())
            return new Result<>(200,"查询所有分类导航名称成功",goodsTypes);
        return new Result(201,"暂无分类导航");
    }

    /**
     * 小程序热门专栏
     */
    @GetMapping("lease/hot")
    @ResponseBody
    public Result findRecentHot(){
        List<String> advertisementImageUrl = leaseService.findAdvertisementImageUrl();
        if(advertisementImageUrl.isEmpty())
            return new Result(201,"暂无热门信息");
        return new Result<>(200,"查询热门专栏成功",advertisementImageUrl);
    }

    /**
     * 小程序租赁商品界面，根据类别id查询所属该类别的租赁商品
     * @param goodsTypeId
     * @return
     */
    @GetMapping("lease/goods")
    @ResponseBody
    public Result findLeaseGoods(@RequestParam("goodsTypeId")int goodsTypeId){
        List<Map> leaseGoods = leaseService.findLeaseGoodsByTypeId(goodsTypeId);
        if(!leaseGoods.isEmpty())
            return new Result<>(200,"根据导航条租赁商品类别查询商品成功",leaseGoods);
        return new Result(201,"当前暂无该类别的租赁商品");
    }

    /**
     * 根据商品id查询商品详细信息
     * @param goodId
     * @return
     */
    @GetMapping("lease/detail")
    @ResponseBody
    public Result findLeaseGoodsDetail(@RequestParam("goodId")int goodId){
        LeaseGood leaseGood = leaseService.findLeaseGoodById(goodId);
        if(leaseGood!=null)
            return new Result<>(200,"查询该租赁商品详细信息成功",leaseGood);
        return new Result(401,"商品编号错误");
    }

    /**
     * 小程序用户租商品时，根据商品id查询该商品的所有规格
     * @param goodId
     * @return
     */
    @GetMapping("lease/varieties")
    @ResponseBody
    public Result findLeaseGoodsVarieties(@RequestParam("goodId")int goodId){
        List<GoodVariety> leaseGoodsVarieties = leaseService.findLeaseGoodsVarietiesByGoodId(goodId);
        if(!leaseGoodsVarieties.isEmpty())
            return new Result<>(200,"查询该租赁商品的所有规格信息成功",leaseGoodsVarieties);
        return new Result<>(201,"该租赁商品暂无规格信息");
    }


    /**
     * 用户提交订单请求
     * @param uid
     * @param goodOrder
     * @return
     * @throws Exception
     */
    @PostMapping("lease/purchase")
    @ResponseBody
    public Result orderLeaseGood(@RequestAttribute("uid")int uid, GoodOrder goodOrder) throws Exception{
        Map resultMap = leaseService.addAdvanceOrder(uid,goodOrder);
        int code = (int)resultMap.get("code");
        if(code == -1)
            return new Result(401,"请保存订单信息完整");
        else if(code == -2)
            return new Result(402,"支付金额不能小于0");
        else if(code == -3)
            return new Result(403,"联系人信息超过最大限长");
        else if(code == 1)
            return new Result<>(200,"提交订单成功，请及时完成支付",resultMap.get("MiniPaymentDto"));
        return new Result(404,"系统异常");
    }


    //支付成功后回调方法
    @RequestMapping("lease/pay.do")
    public void payCallBack(HttpServletRequest request, HttpServletResponse response){
        try {
            Map<String, Object> dataMap = XmlUtil.parseXML(request);
            System.out.println("支付成功。。。" + dataMap.get("cash_fee"));
            if("SUCCESS".equals(dataMap.get("return_code"))){

                //将订单保存到数据库
                leaseService.addLeaseOrder(dataMap);
                System.out.println("----------执行完成");
                BufferedOutputStream out = new BufferedOutputStream(response.getOutputStream());
                String msg = "<xml><return_code><![CDATA[SUCCESS]]></return_code><return_msg><![CDATA[OK]]></return_msg></xml>";
                out.write(msg.getBytes());
                out.flush();
                out.close();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * 查询所有订单
     * @param uid
     * @param num
     * @return
     */
    @GetMapping("lease/order")
    @ResponseBody
    public Result findLeaseOrder(@RequestAttribute("uid")int uid){
        List<MiniLeaseOrderPageDto> orders = leaseService.findOrderPageInfo(uid);
        if(orders.isEmpty())
            return new Result(201,"目前暂无订单信息");
        return new Result<>(200,"查询租赁订单页面信息成功",orders);
    }

    /**
     * 查询租赁订单详情页
     * @param goodOrderId
     * @return
     */
    @GetMapping("lease/orderDetail")
    @ResponseBody
    public Result findOrderDetail(@RequestParam("goodOrderId")int goodOrderId) throws Exception{
        MiniLeaseOrderDetailDto orderDetail = leaseService.findOrderDetail(goodOrderId);
        System.out.println(orderDetail);
        if(orderDetail == null)
            return new Result(401,"该订单不存在");
        System.out.println(111);
        return new Result<>(200,"查询订单详情页成功",orderDetail);
    }

}
