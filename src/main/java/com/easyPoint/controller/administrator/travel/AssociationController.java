package com.easyPoint.controller.administrator.travel;

import com.easyPoint.dto.Result;
import com.easyPoint.dto.travel.TicketDto;
import com.easyPoint.dto.travel.TicketInfoDto;
import com.easyPoint.pojo.travel.Association;
import com.easyPoint.service.administrator.travel.AssociationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.text.SimpleDateFormat;
import java.util.Date;
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
    @RequestMapping(value = "/addAssociation", method = RequestMethod.POST)
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

        Association association = new Association();
        association.setAssociationName(associationName);

        // 添加同乡会
        Integer flag = associationService.addAssociation(association);

        if (flag != null && flag == 1) {
            result.setCode(1);
            result.setMessage("同乡会添加成功！");
            Map<String, String> map = new HashMap<>(1);
            map.put("associationId", association.getAssociationId());
            result.setData(map);
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
    @RequestMapping(value = "/addAssociationPlace", method = RequestMethod.POST)
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
    @RequestMapping(value = "/deleteAssociationPlace", method = RequestMethod.POST)
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
    @RequestMapping(value = "/findAllPlaces", method = RequestMethod.GET)
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

    /**
     * 查询所有同乡会(分页）
     *
     * @param startIndex
     * @param pageSize
     * @return
     */
    @RequestMapping(value = "/findAllAssociation", method = RequestMethod.GET)
    @ResponseBody
    public Result findAllAssociation(Integer startIndex, Integer pageSize) {
        Result result = new Result();

        if (startIndex == null || startIndex <= 0 || pageSize == null || pageSize <= 0) {
            result.setCode(2);
            result.setMessage("参数为空！");
            return result;
        }
        System.out.println(startIndex + "******" + pageSize);
        // 查询同乡会总数量
        Integer associationNum = associationService.findAssociationNum();

        if (associationNum == 0) {
            result.setCode(0);
            result.setMessage("查询到0条数据！");
            return result;
        }

        if ((startIndex - 1) * pageSize > associationNum) {
            result.setCode(3);
            result.setMessage("页码超出最大范围！");
            return result;
        }

        List<Association> associationList = associationService.findAllAssociation((startIndex - 1) * pageSize, pageSize);

        result.setCode(1);
        result.setMessage("查询成功！");
        Map<String, Object> map = new HashMap<>();
        map.put("totalNum", associationNum);
        map.put("associationList", associationList);
        result.setData(map);
        return result;

    }

    /**
     * 查询所有同乡会
     *
     * @return
     */
    @RequestMapping(value = "/getAllAssociation", method = RequestMethod.GET)
    @ResponseBody
    public Result getAllAssociation() {
        Result result = new Result();

        List<Association> associationList = associationService.getAllAssociation();

        if (associationList != null && associationList.size() == 0) {
            result.setCode(0);
            result.setMessage("查询到0条数据！");
            return result;
        }

        result.setCode(1);
        result.setMessage("查询成功！");
        Map<String, Object> map = new HashMap<>();
        map.put("associationList", associationList);
        result.setData(map);
        return result;
    }

    /**
     * 添加车票
     *
     * @param ticketDto
     * @return
     */
    @RequestMapping(value = "/addTicket", method = RequestMethod.POST)
    @ResponseBody
    public Result addTicket(TicketDto ticketDto) {
        Result result = new Result();

        if (ticketDto == null) {
            result.setCode(2);
            result.setMessage("参数为空(欠缺)！");
            return result;
        }

        Integer associationId = ticketDto.getAssociationId();
        String departurePlace = ticketDto.getDeparturePlace();
        String destination = ticketDto.getDestination();
        String departureDay = ticketDto.getDepartureDay();
        String departureTime = ticketDto.getDepartureTime();
        Integer seatNum = ticketDto.getSeatNum();
        Integer type = ticketDto.getType();

        if (associationId == null || departurePlace == null || departurePlace.equals("") || destination == null || destination.equals("") || departureDay == null || departureDay.equals("") || departureTime == null || departureTime.equals("") || seatNum == null || type == null) {
            result.setCode(2);
            result.setMessage("参数为空(欠缺)！");
            return result;
        }

        ticketDto.setSeatSurplus(seatNum);
        ticketDto.setState(1);

        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date date = new Date();

        ticketDto.setIssueTime(simpleDateFormat.format(date));

        Integer flag = associationService.addTicket(ticketDto);

        if (flag == 1) {
            result.setCode(1);
            result.setMessage("添加车票成功！");
            return result;
        } else {
            result.setCode(-1);
            result.setMessage("添加车票失败！");
            return result;
        }
    }

    /**
     * 获取发布过的车票
     *
     * @param state
     * @param startIndex
     * @param pageSize
     * @return
     */
    @RequestMapping(value = "/getTicket", method = RequestMethod.GET)
    @ResponseBody
    public Result getTicket(Integer state, Integer startIndex, Integer pageSize) {
        Result result = new Result();

        if (!(state == 1 || state == 2) || startIndex == null || startIndex <= 0 || pageSize == null || pageSize <= 0) {
            result.setCode(2);
            result.setMessage("参数为空！");
            return result;
        }

        Integer ticketNum = associationService.getTicketNum(state);

        if (ticketNum == 0) {
            result.setCode(0);
            result.setMessage("查询到0条数据！");
            return result;
        }

        if ((startIndex - 1) * pageSize > ticketNum) {
            result.setCode(3);
            result.setMessage("页码超出最大范围！");
            return result;
        }

        List<TicketDto> ticketList = associationService.getTicket(state, (startIndex - 1) * pageSize, pageSize);

        result.setCode(1);
        result.setMessage("查询成功！");
        Map<String, Object> map = new HashMap<>(2);
        map.put("ticketNum", ticketNum);
        map.put("ticketList", ticketList);
        result.setData(map);
        return result;
    }


    /**
     * 修改（添加）车辆信息
     *
     * @param ticketInfoDto
     * @return
     */
    @RequestMapping(value = "/updateTicketInfo", method = RequestMethod.POST)
    @ResponseBody
    public Result updateTicketInfo(TicketInfoDto ticketInfoDto) {
        Result result = new Result();

        if (ticketInfoDto == null) {
            result.setCode(2);
            result.setMessage("参数为空！");
            return result;
        }

        Integer ticketId = ticketInfoDto.getTicketId();
        String licensePlateNumber = ticketInfoDto.getLicensePlateNumber();
        String vehicleType = ticketInfoDto.getVehicleType();
        String color = ticketInfoDto.getColor();
        String driverName = ticketInfoDto.getDriverName();
        String driverPhone = ticketInfoDto.getDriverPhone();

        if (ticketId == null || licensePlateNumber == null || licensePlateNumber.equals("") || vehicleType == null || vehicleType.equals("") || color == null || color.equals("") || driverName == null || driverName.equals("") || driverPhone == null || driverPhone.equals("")) {
            result.setCode(2);
            result.setMessage("参数为空！");
            return result;
        }

        Integer flag = associationService.updateTicketInfo(ticketInfoDto);

        if (flag == 1) {
            result.setCode(1);
            result.setMessage("修改成功！");
            return result;
        } else {
            result.setCode(-1);
            result.setMessage("修改失败！");
            return result;
        }
    }

    /**
     * 查询某车票的车辆信息
     *
     * @param ticketId
     * @return
     */
    @RequestMapping(value = "/findTicketInfo", method = RequestMethod.GET)
    @ResponseBody
    public Result findTicketInfo(Integer ticketId) {
        Result result = new Result();

        if (ticketId == null) {
            result.setCode(2);
            result.setMessage("参数为空！");
            return result;
        }

        TicketInfoDto ticketInfoDto = associationService.findTicketInfo(ticketId);

        if (ticketInfoDto == null) {
            result.setCode(-1);
            result.setMessage("查询失败！");
            return result;
        } else {
            result.setCode(1);
            result.setMessage("查询成功！");
            Map<String, TicketInfoDto> map = new HashMap<>(1);
            map.put("ticketInfo", ticketInfoDto);
            result.setData(map);
            return result;
        }
    }

    /**
     * 将车票下架
     *
     * @param ticketId
     * @return
     */
    @RequestMapping(value = "/endTicket", method = RequestMethod.POST)
    @ResponseBody
    public Result endTicket(Integer ticketId) {
        Result result = new Result();

        if (ticketId == null) {
            result.setCode(2);
            result.setMessage("参数为空！");
            return result;
        }

        Integer flag = associationService.endTicket(ticketId);

        if (flag == 1) {
            result.setCode(1);
            result.setMessage("下架成功！");
            return result;
        } else {
            result.setCode(-1);
            result.setMessage("下架失败！");
            return result;
        }
    }

    /**
     * 删除车票
     *
     * @param ticketId
     * @return
     */
    @RequestMapping(value = "/deleteTicket", method = RequestMethod.POST)
    @ResponseBody
    public Result deleteTicket(Integer ticketId) {
        Result result = new Result();

        if (ticketId == null) {
            result.setCode(2);
            result.setMessage("参数为空！");
            return result;
        }

        Integer flag = associationService.deleteTicket(ticketId);

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
}

