package com.easyPoint.service.impl;

import com.easyPoint.dao.InternshipDao;
import com.easyPoint.pojo.user.InternshipInfo;
import com.easyPoint.service.InternshipService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Service
public class InternshipServiceImpl implements InternshipService {
    public static final Logger log = LoggerFactory.getLogger(InternshipServiceImpl.class);
    @Autowired
    InternshipDao internshipDao;
    @Resource(name = "redisTemplate")
    RedisTemplate redisTemplate;

    //redis中存放internshipId的列表集合的key
    String internshipInfoIdListKey = "internshipInfoIdListKey";
    //redis中存放internshipInfo对象的哈希集合的key
    String internshipInfoHashKey = "internshipInfoHashKey";

    @Override
    public List<InternshipInfo> findAddInternshipInfo(int pageNum) {
        List<String> addInternshipInfoId = redisTemplate.opsForList().range(internshipInfoIdListKey,pageNum,pageNum+10);

        //判断redis中缓存中取出值是否为空
        if(addInternshipInfoId.isEmpty()){
            List<InternshipInfo> internshipInfos = internshipDao.findAddInternshipInfo(pageNum);
            Map<String,InternshipInfo> internshipInfoMap = new HashMap<>();
            for(InternshipInfo internshipInfo:internshipInfos){
                //
                redisTemplate.opsForList().rightPush(internshipInfoIdListKey,"InternshipInfo"+internshipInfo.getInternshipId());
                //定义key为InternshipInfo+对应的id号
                internshipInfoMap.put("InternshipInfo"+internshipInfo.getInternshipId(),internshipInfo);
            }
            //将第一次查询的对象存入redis中
            redisTemplate.opsForHash().putAll(internshipInfoHashKey,internshipInfoMap);
            log.info("存入redis");
            return internshipInfos;
        }
        List<InternshipInfo> internshipInfos = redisTemplate.opsForHash().multiGet(internshipInfoHashKey,addInternshipInfoId);
        log.info("从redis中获取");
        return internshipInfos;
    }
}
