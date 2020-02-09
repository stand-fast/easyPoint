package com.easyPoint.controller.miniprogram.lease;

import com.easyPoint.dto.Result;
import com.easyPoint.pojo.lease.GoodsType;
import com.easyPoint.service.miniprogram.lease.LeaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    public Result findLeaseType(@RequestParam("belongToBigType")int belongToBigType){
        List<GoodsType> goodsTypes = leaseService.findAllTypeById(belongToBigType);
        if(!goodsTypes.isEmpty())
            return new Result<>(200,"查询所有分类导航名称成功",goodsTypes);
        return new Result(201,"暂无分类导航");
    }

}
