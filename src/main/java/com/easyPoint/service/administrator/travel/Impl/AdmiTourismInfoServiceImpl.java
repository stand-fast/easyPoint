package com.easyPoint.service.administrator.travel.Impl;

import com.easyPoint.utils.AesCbcUtil;
import com.easyPoint.utils.DateUtil;
import com.easyPoint.utils.MiniProConstants;
import com.easyPoint.dao.travel.TourismInfoDao;
import com.easyPoint.dto.Result;
import com.easyPoint.dto.pay.RefundParamDto;
import com.easyPoint.dto.template.MessageTemplateDto;
import com.easyPoint.dto.travel.DriverInfoDto;
import com.easyPoint.dto.travel.PartTourismOrderInfoDto;
import com.easyPoint.dto.travel.TourismRefundPageDetailDto;
import com.easyPoint.dto.travel.TourismRefundPageDto;
import com.easyPoint.pojo.travel.TourismOrderInfo;
import com.easyPoint.pojo.travel.TourismRefundInfo;
import com.easyPoint.pojo.travel.VehicleInfo;

import com.easyPoint.service.administrator.travel.AdmiTourismInfoService;
import com.easyPoint.service.pay.WxPayService;
import com.easyPoint.service.template.TemplateMessageService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * 管理员租车模块的服务层
 * @author FJW
 */
@Service
public class AdmiTourismInfoServiceImpl implements AdmiTourismInfoService {
    public static final Logger log = LoggerFactory.getLogger(AdmiTourismInfoServiceImpl.class);
    @Autowired
    TourismInfoDao tourismInfoDao;

    @Autowired
    WxPayService wxPayService;


    @Autowired
    TemplateMessageService templateMessageService;

    /**
     * 加载所有页面数以及首页信息
     */
    @Override
    public Result getTotalPageAndFirstVehicleInfoList() {
        Map map = new HashMap();
        int total = tourismInfoDao.countVehicleTypeNum();
        //得出车辆类型的总页数
        int totalPage = (total%8 == 0) ? (total/8):(total/8 + 1);
        map.put("totalPage", totalPage);
        //查询第一页车辆类型的信息
        List<VehicleInfo> vehicleInfoList = findListPageNumVehicleInfo(1);
        if(vehicleInfoList.isEmpty())
            return new Result<>(201,"暂无车辆类型数据，请管理员添加");
        map.put("vehicleInfoList",vehicleInfoList);
        //将总页数和首页车辆信息一起放入map中返回
        return new Result<>(200,"查询总页数和首页车辆类型信息成功",map);
    }

    /**
     * 根据分页查询已经添加的车辆类型
     * @param pageNum 页数
     * @return 当页车辆信息
     */
    @Override
    public List<VehicleInfo> findListPageNumVehicleInfo(int pageNum) {
        //收到页数从一开始，表索引从0开始，故减去1
        int index = (pageNum - 1) * 8;
        List<VehicleInfo> vehicleInfoList = tourismInfoDao.findListVehicleInfo(index);
        return vehicleInfoList;
    }

    /**
     * 添加车辆类型
     * @param vehicleType 车辆类型
     * @param deposit 押金
     * @return 是否添加成功
     */

    @Override
    public int insertVehicleType(String vehicleType, BigDecimal deposit) {
        //查询vehicleType的车辆类型是否已经添加
        VehicleInfo vehicleInfo = tourismInfoDao.findVehicleInfo(vehicleType);
        //为空则可以添加
        if(vehicleInfo == null){
            try {
                tourismInfoDao.insertVehicleType(vehicleType, deposit);
                //插入车辆类型成功
                return 1;
            }catch (Exception e){
                log.error("该车辆类型已经存在，导入插入异常");
                return 0;
            }
        }
        //否则，返回0，代表该类型已经存在
        return 0;
    }


    /**
     *
     * @param vehicleId      // 删除车辆类型ID
     * @return 是否删除成功
     */
    @Override
    public int deleteVehicleType(int vehicleId) {
        return tourismInfoDao.deleteVehicleById(vehicleId);
    }


    /**
     * 查询加载的所有页面数并得到首页信息
     * @return 页数，首页信息
     */
    @Override
    public Result findTotalPageAndTourismOrderInfoList() {
        Map map = new HashMap();
        int total = tourismInfoDao.countTourismOrderNum();
        //一页八条数据，得到租车订单总的页数,并存入map中返回前端
        int totalPage = (total%11 == 0) ? (total/11):(total/11 + 1);
        map.put("totalPage",totalPage);
        //查询首页的租车订单信息
        List<PartTourismOrderInfoDto> partTourismOrderInfos = findListPageNumTourismOrderInfo(1);
        if(partTourismOrderInfos.isEmpty())
            return new Result<>(201,"暂无订单信息");
//        for (PartTourismOrderInfoDto partTourismOrderInfo:partTourismOrderInfos)
//            System.out.println(partTourismOrderInfo);
        map.put("partTourismOrderInfos", partTourismOrderInfos);
        return new Result<>(200,"查询订单页数以及首页订单信息成功",map);
    }

    //分页查询第pageNum页的租车订单信息
    @Override
    public List<PartTourismOrderInfoDto> findListPageNumTourismOrderInfo(int pageNum) {
        //收到页数从一开始，表索引从0开始，故减去1
        int index = (pageNum - 1) * 11;
        List<PartTourismOrderInfoDto> partTourismOrderInfos = tourismInfoDao.findListTourismOrderInfo(index);
        return partTourismOrderInfos;
    }



    //管理员为租车订单安排车辆后，更新数据库
    @Override
    public int addDriverInfoToTourismOrder(TourismOrderInfo tourismOrderInfo){
        //查询订单状态
        int state = tourismInfoDao.findStateById(tourismOrderInfo.getTravelOrderId());
        //订单状态不为未安排和已安排，不允许修改安排车辆的信息
        if(state != 0 && state != 1)
            return -1;
        //生成安排时间
        Date date = new Date();
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String arrangeVehicleTime = simpleDateFormat.format(date);
        tourismOrderInfo.setArrangeVehicleTime(arrangeVehicleTime);
        int resultCode = 0;
        //将车辆信息更新到tourism_order表中
        resultCode = tourismInfoDao.updateTourismOrderInfoAddDriverInfo(tourismOrderInfo);
        //更新travel_order表中的订单状态
        resultCode = tourismInfoDao.updateTravelOrderState(1,tourismOrderInfo.getTravelOrderId());


        Map map1 = new LinkedHashMap();
        Map data = new LinkedHashMap();
        map1.put("value",arrangeVehicleTime);
        map1.put("color","#4a4a4a");
        data.put("keyword1",map1);
        Map map2 = new LinkedHashMap();

        map2.put("value","0元");
        map2.put("color","#4a4a4a");
        data.put("keyword2",map2);
        Map map3 = new LinkedHashMap();

        map3.put("value","2019-09-29");
        map3.put("color","#4a4a4a");
        data.put("keyword3",map3);
        Map map4 = new LinkedHashMap();

        map4.put("value","安排车辆");
        map4.put("color","#4a4a4a");
        data.put("keyword4",map4);


        MessageTemplateDto messageTemplateDto = new MessageTemplateDto();
        //查询用户的openId
        messageTemplateDto.setTouser("o9fyZ5U5RyDL6mdpbxPGPWjHQsrQ");
        messageTemplateDto.setTemplate_id("T2Q_F8pFHwFB3fbUttlXNFdRzkf8JFBbahcI29EJWC0");
        messageTemplateDto.setForm_id("1ef0a1dac67447a192ee84ad73a4640b");
        messageTemplateDto.setData(data);
        messageTemplateDto.setColor("#ccc");
        messageTemplateDto.setEmphasis_keyword("keyword4.DATA");


        ObjectMapper objectMapper = new ObjectMapper();
        //将driverMessageDto转换为Json数据
        try{
            String param = objectMapper.writeValueAsString(messageTemplateDto);
            //发送模板消息，通知用户管理员已经为其租车订单安排车辆信息
            //templateMessageService.sendTemplateMessage(param);
        }catch (Exception e){
            log.error("messageTemplateDto类转换为Json数据出现异常" + e);
            return 0;
        }

        return resultCode;
    }

    //更改租车订单状态，完成结单
    @Override
    public int updateTourismOrderState(int travelOrderId) {
        int resultCode = tourismInfoDao.updateTravelOrderState(2,travelOrderId);
        return resultCode;
    }


    //查询已安排订单车辆信息
    @Override
    public DriverInfoDto findDriverInfoByTravelOrderId(int travelOrderId) {
        return tourismInfoDao.findDriverInfoByTravelOrderId(travelOrderId);
    }


    /**
     * 退款订单首页信息数据
     * @return 首页退款订单以及总页数
     */
    @Override
    public Map findTourismRefundFirstPage() {
        Map resultMap = new HashMap<>();
        //查询首页的退款订单信息
        List<TourismRefundPageDto> tourismRefundPageDtoList = tourismInfoDao.findListTourismRefund(0);
        resultMap.put("tourismRefundInfoList",tourismRefundPageDtoList);
        //统计申请退款订单总数
        int totalNum = tourismInfoDao.countTourismRefundNum();
        //计算总页数
        int totalPage;
        if(totalNum % 8 != 0)
            totalPage = totalNum / 8 + 1;
        else
            totalPage = totalNum / 8;
        resultMap.put("totalPage", totalPage);
        return resultMap;
    }

    /**
     * 分页查询退款订单
     * @param pageNum 页数
     * @return 该页退款信息
     */
    @Override
    public List<TourismRefundPageDto> findListTourismRefundByPageNum(int pageNum) {
        //数据库第pageNum页开始下标
        int index = (pageNum - 1) * 8;
        List<TourismRefundPageDto> tourismRefundPageDtoList = tourismInfoDao.findListTourismRefund(index);
        return tourismRefundPageDtoList;
    }

    /**
     * 退款订单详情页
     * @param tourismRefundId 退款表id
     * @return 退款订单详情
     */
    @Override
    public TourismRefundPageDetailDto findTourismRefundDetail(int tourismRefundId) {
        TourismRefundPageDetailDto tourismRefundDetail = tourismInfoDao.findTourismRefundDetail(tourismRefundId);
        //加密tourismRefundId
        try {
            String code = AesCbcUtil.encrypt(tourismRefundId+"",MiniProConstants.REFUND_DATA_KEY, MiniProConstants.REFUND_DATA_VI, "UTF-8");
            tourismRefundDetail.setCode(code);
        } catch (Exception e) {
            log.error("加密失败");
            return null;
        }
        return tourismRefundDetail;
    }

    /**
     * 管理员是否同意退款
     * @param uid 管理员id
     * @param tourismRefundIdCode 退款订单表id加密数据
     * @param rejectReason 驳回理由
     * @param ifAgree 是否同意 0否，1同意
     * @return
     */
    @Override
    public int ifAgreeTourismRefund(int uid, String tourismRefundIdCode, String rejectReason, int ifAgree) {
        //管理员确认退款时间
        String confirmRefundTime = DateUtil.getDateTime();
        //解密tourismRefundIdCode得到tourismRefundId
        String decryptRefundId = AesCbcUtil.decrypt(tourismRefundIdCode, MiniProConstants.REFUND_DATA_KEY, MiniProConstants.REFUND_DATA_VI,"UTF-8");
        if(null == decryptRefundId){
            log.error("解密tourismRefundId异常");
            return -2;
        }
        int tourismRefundId = Integer.parseInt(decryptRefundId);
        //查询travelOrderId和退款状态
        HashMap idAndState = tourismInfoDao.findOrderIdAndStateById(tourismRefundId);
        int refundState = Integer.parseInt(idAndState.get("refundState").toString());
        int travelOrderId = Integer.parseInt(idAndState.get("travelOrderId").toString());
        //判断此时的退款状态是否支持退款
        if(refundState != 1)
            return -3;
        //管理员不同意退款
        if(ifAgree == 0){
            //将不同意理由保存到tourismRefund表中，并修改其状态为不通过
            //修改travel_order表中的订单状态为不通过 1：待处理，2：审核不通过；3：正在退款；4：已退款；5：已取消
            tourismInfoDao.updateTourismRefundToFail(uid, tourismRefundId, 2, confirmRefundTime, rejectReason);
            //
            //tourismInfoDao.updateTravelOrderState(2, travelOrderId);
            //
            return 0;
        }
        //管理员同意退款
        //发起退款
        //根据订单编号查找微信订单号，订单付款金额，是否为往返票
        System.out.println("------------------------");
        TourismOrderInfo tourismOrderInfo = tourismInfoDao.findRefundNeceInfo(travelOrderId);
        //构造退款参数对象
        RefundParamDto refundParamDto = new RefundParamDto();
        //设置微信订单号
        refundParamDto.setTransaction_id(tourismOrderInfo.getTransactionId());
        //设置订单支付总金额,并转换单位，由元转为分后取整
        //判断该票是否为往返票，若是，则支付总金额为订单票价的双倍,1代表为往返票，0为否
        if(tourismOrderInfo.getIfBack() == 1)
            refundParamDto.setTotal_fee((int)(tourismOrderInfo.getPayMoney()*100)*2);
        else
            refundParamDto.setTotal_fee((int)(tourismOrderInfo.getPayMoney()*100));
        //全额退款
        refundParamDto.setRefund_fee((int)(tourismOrderInfo.getPayMoney()*100));

        //请求微信退款
        //返回数据
        Map resultMap;
        try {
            resultMap = wxPayService.requestRefund(uid, refundParamDto);
            //申请退款成功
            if("SUCCESS".equals(resultMap.get("return_code"))&&"SUCCESS".equals(resultMap.get("result_code"))){
                //将操作信息保存到tourismRefund表中，并修改其状态为通过，插入微信退款单号，退款金额
                TourismRefundInfo tourismRefundInfo = new TourismRefundInfo();
                tourismRefundInfo.setAdmiUid(uid);
                tourismRefundInfo.setTourismRefundId(tourismRefundId);
                tourismRefundInfo.setRefundState(4);
                tourismRefundInfo.setConfirmRefundTime(confirmRefundTime);
                tourismRefundInfo.setFinishTime(DateUtil.getDateTime());
                tourismRefundInfo.setRejectReason(rejectReason);
                tourismRefundInfo.setRefundId(resultMap.get("refund_id").toString());
                tourismRefundInfo.setRefundFee(Integer.parseInt(resultMap.get("refund_fee").toString()));
                tourismInfoDao.updateTourismRefundToSuccess(tourismRefundInfo);
                //修改travel_order表中的订单状态为通过 0：未安排；1已安排；2已完成；3已付款；4：已预约；5：已退款
                tourismInfoDao.updateTravelOrderState(5, travelOrderId);
                return 1;
            }
            //退款资金不足
            else if("SUCCESS".equals(resultMap.get("return_code"))&&"FAIL".equals(resultMap.get("result_code"))&&"NOTENOUGH".equals(resultMap.get("err_code"))){
                return 2;
            }
        }catch (Exception e){
            log.error("退款请求失败" + e);
            return -4;
        }
        return -5;
    }
}
