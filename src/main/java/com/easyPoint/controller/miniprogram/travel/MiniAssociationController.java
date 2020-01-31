package com.easyPoint.controller.miniprogram.travel;

import com.easyPoint.dto.Result;
import com.easyPoint.dto.travel.MiniBuyTicketPageDto;
import com.easyPoint.pojo.travel.Association;
import com.easyPoint.pojo.travel.Passenger;
import com.easyPoint.service.miniprogram.travel.AssociationService;
import com.easyPoint.utils.XmlUtil;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sound.midi.Soundbank;
import java.io.BufferedOutputStream;

import java.io.IOException;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin
@Controller
@RequestMapping("/miniProgram")
public class MiniAssociationController {

    @Autowired
    AssociationService associationService;
    /**
     * 小程序查看所有同乡会名称
     * @return 同乡会
     */
    @ResponseBody
    @GetMapping("/findAllAssociations")
    public Result findAllAssociations() {
        List<Association> allAssociations = associationService.findAllAssociations();
        if(allAssociations.isEmpty()){
            return new Result(201,"当前暂无同乡会");
        }
        return new Result<>(200,"查询所有同乡会名称成功",allAssociations);
    }

    /**
     * 查询所有车票
     * @param associationId 同乡会id
     * @return
     */
    @ResponseBody
    @GetMapping("findTickets")
    public Result findTickets(@RequestParam("associationId")int associationId){
        List<MiniBuyTicketPageDto> tickets = associationService.findTicketsById(associationId);
        if(tickets.isEmpty())
            return new Result(201,"暂无车票");
        return new Result<>(200,"查询车票成功",tickets);
    }

    /**
     * 用户提交订单,生成预订单
     * @param uid 用户id
     * @param ticketId 车票id
     * @param travelNum 购票数量
     * @param passenger 乘客人信息
     * @return
     */
    @ResponseBody
    @PostMapping("/association/addAdvanceOrder")
    public Result addAdvanceOrder(@RequestAttribute("uid") int uid,
                                  @RequestParam("ticketId") int ticketId,
                                  @RequestParam("travelNum") int travelNum,
                                  @RequestParam("passenger")String passenger,
                                  @RequestParam("phone")String phone) throws Exception{
//        System.out.println(passengersJson);
//        //将json数据转换为List<Passenger>对象
//        ObjectMapper mapper = new ObjectMapper();
//        List<LinkedHashMap> passengers = mapper.readValue(passengersJson,List.class);
        //发起预支付
        Map map = associationService.addAdvanceOrder(uid,ticketId,travelNum,passenger,phone);
        //数据验证
        int code = (int)map.get("code");
        if(code == -1)
            return new Result(401,"联系人和联系电话不能为空");
        else if(code == -2)
            return new Result(201,"当前票数不足");
        else if(code == -3)
            return new Result(202,"当前抢票人数过多，请稍后重试");
        else if(code == -4)
            return new Result(402,"参数错误");
        else if(code == -5)
            return new Result(405,"乘客名称或手机号超过最大限长");
        return new Result<>(200,"提交成功，请及时支付",map.get("MiniPaymentDto"));
    }

    /**
     * 同乡会支付完成后回调函数
     * @param request
     * @param response
     */
    @RequestMapping("/association/pay.do")
    @ResponseBody
    public void paycallback(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("回调");
        try {
            Map<String, Object> dataMap = XmlUtil.parseXML(request);
            System.out.println("支付成功。。。" + dataMap.get("cash_fee"));
            if("SUCCESS".equals(dataMap.get("return_code"))){

                //将订单保存到数据库
                associationService.addAssociationOrder(dataMap);
                System.out.println("----------执行完成");
                BufferedOutputStream out = new BufferedOutputStream(response.getOutputStream());
                String msg = "<xml><return_code><![CDATA[SUCCESS]]></return_code><return_msg><![CDATA[OK]]></return_msg></xml>";
                out.write(msg.getBytes());
                out.flush();
                out.close();
            }
            //System.out.println(JSON.toJSONString(dataMap));
            //{"transaction_id":"4200000109201805293331420304","nonce_str":"402880e963a9764b0163a979a16e0002","bank_type":"CFT","openid":"oXI6G5Jc4D44y2wixgxE3OPwpDVg","sign":"262978D36A3093ACBE4B55707D6EA7B2","fee_type":"CNY","mch_id":"1491307962","cash_fee":"10","out_trade_no":"14913079622018052909183048768217","appid":"wxa177427bc0e60aab","total_fee":"10","trade_type":"JSAPI","result_code":"SUCCESS","time_end":"20180529091834","is_subscribe":"N","return_code":"SUCCESS"}
        } catch (Exception e) {
            e.printStackTrace();
        }
    }


    /**
     * 用户预约预售票
     * @param uid 用户id
     * @param ticketId 车票id
     * @param travelNum 购票数量
     * @param passenger 乘客人信息
     * @return
     */
    @ResponseBody
    @PostMapping("association/orderAdvanceSaleTicket")
    public Result orderAdvanceSaleTicket(@RequestAttribute("uid") int uid,
                                  @RequestParam("ticketId") int ticketId,
                                  @RequestParam("travelNum") int travelNum,
                                  @RequestParam("passenger")String passenger,
                                  @RequestParam("phone")String phone) throws Exception{

        int code = associationService.orderAdvanceSaleTicket(uid, ticketId, travelNum, passenger, phone);
        if(code == -1)
            return new Result(401,"乘客信息不能为空");
        else if(code ==-2)
            return new Result(402,"参数错误");
        else if(code == -3)
            return new Result(403,"乘客名称或手机号超过最大限长");
        return new Result(200,"订约预售票成功");
    }

}
