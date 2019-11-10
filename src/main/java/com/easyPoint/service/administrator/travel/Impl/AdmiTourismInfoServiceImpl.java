package com.easyPoint.service.administrator.travel.Impl;

import com.easyPoint.dao.travel.TourismInfoDao;
import com.easyPoint.dto.Result;
import com.easyPoint.dto.template.MessageTemplateDto;
import com.easyPoint.dto.travel.DriverInfoDto;
import com.easyPoint.dto.travel.PartTourismOrderInfoDto;
import com.easyPoint.pojo.travel.TourismOrderInfo;
import com.easyPoint.pojo.travel.VehicleInfo;

import com.easyPoint.service.administrator.travel.AdmiTourismInfoService;
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
    TemplateMessageService templateMessageService;

    /**
     * 加载所有页面数以及首页信息
     */
    @Override
    public Result getTotalPageAndFirstVehicleInfoList() {
        Map map = new HashMap();
        int total = tourismInfoDao.countVehicleTypeNum();
        //得出车辆类型的总页数
        int totalPage = (total%4 == 0) ? (total/4):(total/4 + 1);
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
        int index = (pageNum - 1) * 4;
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
        int totalPage = (total%8 == 0) ? (total/8):(total/8 + 1);
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
        int index = (pageNum - 1) * 8;
        List<PartTourismOrderInfoDto> partTourismOrderInfos = tourismInfoDao.findListTourismOrderInfo(index);
        return partTourismOrderInfos;
    }



    //管理员为租车订单安排车辆后，更新数据库
    @Override
    public int addDriverInfoToTourismOrder(TourismOrderInfo tourismOrderInfo){
        //生成安排时间
        Date date = new Date();
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String arrangeVehicleTime = simpleDateFormat.format(date);
        tourismOrderInfo.setArrangeVehicleTime(arrangeVehicleTime);
        int resultCode = 0;
        //将车辆信息更新到tourism_order表中
//        resultCode = tourismInfoDa.updateTourismOrderInfoAddDriverInfo(tourismOrderInfo);
//        //更新travel_order表中的订单状态
//        resultCode = tourismInfoDa.updateTravelOrderState(1,tourismOrderInfo.getTravelOrderId());


        Map map1 = new LinkedHashMap();
        Map data = new LinkedHashMap();
        map1.put("value","20190927155802");
        map1.put("color","#4a4a4a");
        data.put("keyword1",map1);
        Map map2 = new LinkedHashMap();

        map2.put("value","100元");
        map2.put("color","#4a4a4a");
        data.put("keyword2",map2);
        Map map3 = new LinkedHashMap();

        map3.put("value","2019-09-29");
        map3.put("color","#4a4a4a");
        data.put("keyword3",map3);
        Map map4 = new LinkedHashMap();

        map4.put("value","铁头丸");
        map4.put("color","#4a4a4a");
        data.put("keyword4",map4);


        MessageTemplateDto messageTemplateDto = new MessageTemplateDto();
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
            templateMessageService.sendTemplateMessage(param);
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


}
