package com.easyPoint.service.miniprogram.lease.Ipml;

import com.easyPoint.dao.lease.GoodsTypeDao;
import com.easyPoint.dao.lease.LeaseGoodsDao;
import com.easyPoint.dto.lease.MiniLeaseOrderDetailDto;
import com.easyPoint.dto.lease.MiniLeaseOrderPageDto;
import com.easyPoint.dto.pay.PaymentDto;
import com.easyPoint.pojo.lease.GoodOrder;
import com.easyPoint.pojo.lease.GoodVariety;
import com.easyPoint.pojo.lease.GoodsType;
import com.easyPoint.pojo.lease.LeaseGood;
import com.easyPoint.service.miniprogram.lease.LeaseService;
import com.easyPoint.service.pay.WxPayService;
import com.easyPoint.utils.DateUtil;
import com.easyPoint.utils.NotifyUrlConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.text.ParseException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;

@Service
public class LeaseServiceImpl implements LeaseService {

    @Autowired
    GoodsTypeDao goodsTypeDao;

    @Autowired
    LeaseGoodsDao leaseGoodsDao;

    @Autowired
    WxPayService wxPayService;

    @Autowired
    RedisTemplate redisTemplate;

    @Override
    public List<GoodsType> findAllTypeById() {
        return goodsTypeDao.findAllGoodsType();
    }

    /**
     * 查询热门专栏信息
     * @return
     */
    @Override
    public List<String> findAdvertisementImageUrl() {
        return leaseGoodsDao.findImageUrl();
    }

    /**
     * 根据租赁商品类别id查询
     * @param goodsTypeId 类别id
     * @return
     */
    @Override
    public List<Map> findLeaseGoodsByTypeId(int goodsTypeId) {
        return leaseGoodsDao.findLeaseGoodsByTypeId(goodsTypeId);
    }

    /**
     * 根据商品id查询商品详细信息
     * @param goodId
     * @return
     */
    @Override
    public LeaseGood findLeaseGoodById(String goodId) {
        return leaseGoodsDao.findLeaseGoodDetailById(goodId);
    }

    /**
     * 根据商品id查询该商品的所有规格
     * @param goodId
     * @return
     */
    @Override
    public List<GoodVariety> findLeaseGoodsVarietiesByGoodId(String goodId) {
        return leaseGoodsDao.findVarietyByGoodId(goodId);
    }

    @Override
    public Map addAdvanceOrder(int uid, GoodOrder goodOrder) throws Exception {
        Map resultMap = new HashMap(2);
        //验证订单信息是否有缺漏
        if( goodOrder.getGoodId() == null || goodOrder.getLeaseDate()==null
                || goodOrder.getNumber() ==null || goodOrder.getNumber() <= 0
                || goodOrder.getTotalPrice() == null || goodOrder.getSize() == null
                || goodOrder.getPhone() == null || goodOrder.getUserName() == null
                || goodOrder.getVarietyId() == null){
            resultMap.put("code",-1);
            return resultMap;
        }
        //支付金额不能小于0
        if(goodOrder.getTotalPrice().compareTo(new BigDecimal(0))<=0){
            resultMap.put("code",-2);
            return resultMap;
        }
        //判断用户输入联系人信息是否超过最大限长
        if(goodOrder.getUserName().length()>25 || goodOrder.getPhone().length()> 11) {
            resultMap.put("code", -3);
            return resultMap;
        }
        //下单成功，发起预支付请求参数设置
        PaymentDto paymentDto = new PaymentDto();
        //将支付金额*100（单位转化）
        int totalFee = (int)(Double.parseDouble(goodOrder.getTotalPrice().toString()) * 100);
        String body = "易点租赁商品";
        paymentDto.setTotal_fee(totalFee);
        paymentDto.setBody(body);
        //发起支付请求
        Map map = wxPayService.requestWxPay(paymentDto,uid, NotifyUrlConstants.LEASE_NOTIFY_URL);
        //保存生成的商户订单号
        goodOrder.setOutTradeNo(map.get("out_trade_no").toString());
        //保存购买用户id
        goodOrder.setUid(uid);
        //订单状态1：未完成；2：已完成
        goodOrder.setState(1);
        //将订单信息保存到redis中，待支付完成后保存入数据库
        redisTemplate.opsForValue().set("lease_" + goodOrder.getOutTradeNo(), goodOrder, 10,TimeUnit.MINUTES);
        resultMap.put("code",1);
        resultMap.put("MiniPaymentDto",map.get("MiniPaymentDto"));
        return resultMap;
    }

    //支付完成后将redis中的订单保存到数据库中
    @Override
    public int addLeaseOrder(Map<String, Object> map) {
        String outTradeNo = map.get("out_trade_no").toString();
        String transactionId = map.get("transaction_id").toString();
        String makeOrderTime = DateUtil.getDateTime();
        //根据outTradeNo从redis中获取订单信息
        GoodOrder goodOrder = (GoodOrder)redisTemplate.opsForValue().get("lease_"+outTradeNo);
        //取出后删除对应的key
        redisTemplate.delete("lease_"+outTradeNo);
        //保存微信订单号
        goodOrder.setTransactionId(map.get("transaction_id").toString());
        //保存下单时间
        goodOrder.setMakeOrderTime(makeOrderTime);
        //将订单信息保存到数据库中
        leaseGoodsDao.addLeaseOrder(goodOrder);
        return 1;
    }


    /**
     * 查询订单
     * @param
     * @return
     */
    @Override
    public List<MiniLeaseOrderPageDto> findOrderPageInfo(int uid) {
        return leaseGoodsDao.findMiniOrderPageInfo(uid);
    }

    /**
     * 查询订单详情页
     * @param goodOrderId
     * @return
     */
    @Override
    public MiniLeaseOrderDetailDto findOrderDetail(int goodOrderId) throws ParseException{
        MiniLeaseOrderDetailDto miniLeaseOrderDetailDto = leaseGoodsDao.findMiniOrderDetailById(goodOrderId);
//        if(miniLeaseOrderDetailDto.getReceiveTime()!=null){
//            //通过日期格式得到日期
//            SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
//            String receiveTime = miniLeaseOrderDetailDto.getReceiveTime();
//            Date date = simpleDateFormat.parse(receiveTime);
//            //归还日期等于发货时间加上租赁天数
//            String returnTime = simpleDateFormat.format(date.getTime() + miniLeaseOrderDetailDto.getLeaseDate()*24*60*60*1000);
//            miniLeaseOrderDetailDto.setReturnTime(returnTime);
//        }

        return miniLeaseOrderDetailDto;
    }
}
