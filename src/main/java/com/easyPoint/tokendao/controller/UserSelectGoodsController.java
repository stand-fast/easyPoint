package com.easyPoint.tokendao.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.merchant.util.Goods;
import com.merchant.util.GoodsVariety;
import com.user.service.UserGoodsService;

@Controller
public class UserSelectGoodsController {
	@Autowired
	UserGoodsService userGoodsService;
	
	//近期热门商品
	@ResponseBody
	@RequestMapping("/userSelectRecent_Hot")
	public List<Goods> userSelectRecent_Hot(){
		List<Goods> allGoods = userGoodsService.selectRecent_Hot();
		for(Goods good:allGoods)
		{
			good.setDetails_img_list(good.getDetails_img().split(";"));
			System.out.println(good);
		}
		return allGoods;
	}
	
	//商品分类
	@ResponseBody
	@RequestMapping("/userSelectTypeGoods")
	public List<Goods> userSelectTypeGoods(@RequestParam("type") String type){
		List<Goods> typeGoods = userGoodsService.selectTypeGoods(type);
		return typeGoods;
	}
	
	/*
	 * 查找商品所有规格,并且增加浏览量
	 */
	@ResponseBody
	@RequestMapping("selectGoodVariety")
	public Map<Object, Object> selectGoodVariety(@RequestParam("uid")int uid,@RequestParam("goodId")String goodId) {
		System.out.println(goodId);
		List<GoodsVariety> allVariety = userGoodsService.selectAllVariety(goodId);
		//
		userGoodsService.addBrowse(goodId, 1);
		boolean isCollected = userGoodsService.IfCollectionByUid(uid, goodId);
		Map<Object, Object> map = new HashMap<>();
		map.put("allVariety", allVariety);
		map.put("isCollected", isCollected);
		return map;
	}
	
	/*
	 * 收藏或取消收藏
	 * uid：用户编号
	 * goodId：商品编号;sign：1收藏，-1取消;
	 */
	@ResponseBody 
	@RequestMapping("clickConllection")
	public int clickConlection(@RequestParam("uid")String uid,@RequestParam("goodId")String goodId,@RequestParam("sign")int sign) {
		int result = userGoodsService.clickCollection(uid,goodId, sign);
		return result;
	}
	
	@ResponseBody
	@RequestMapping("orderGood")
	public int purchase(@RequestParam("uid")String uid,@RequestParam("goodId")String goodId,
						 @RequestParam("varietyId")String varietyId,@RequestParam("number")int number) {
		int result = userGoodsService.orderGood(goodId, varietyId, number);
		return result;
	}
	
	
}
