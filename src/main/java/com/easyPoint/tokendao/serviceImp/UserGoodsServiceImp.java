package com.easyPoint.tokendao.serviceImp;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import com.merchant.util.Goods;
import com.merchant.util.GoodsVariety;
import com.user.dao.UserGoodsDao;
import com.user.service.UserGoodsService;
@SuppressWarnings("unchecked")
@Service
public class UserGoodsServiceImp implements UserGoodsService{
	@Autowired
	UserGoodsDao GoodsDao;
	
	@Autowired
	Goods good;
	
	@Autowired
	GoodsVariety goodVariety;
	
	@Resource(name = "redisTemplate")
	RedisTemplate redisTemplate;
	
	
	
	/*
	 * redis中存储所有商品的哈希结构的key
	 */
	String key_Goods = "Goods";
	/*
	 * 查找近期热门商品
	 */
	@Override
	public List<Goods> selectRecent_Hot() {
		String key_Recent_Hot = "recent_Hot_GoodId";//redis中保存近期热门商品goodId的key
		//redis中查询key为recent_Hot_GoodId的值
		Set<String> recent_Hot_GoodId = redisTemplate.opsForSet().members(key_Recent_Hot);
		//若为第一次访问
		if(recent_Hot_GoodId.size() ==0 ) {
			List<String> goodIds = GoodsDao.selectRecent_Hot();
			for(String s:goodIds)
				System.out.println(s);
			List<Goods> recent_Hot_Goods = GoodsDao.selectRecent_Hot_Goods(goodIds);
			Map<String,Goods> map = new HashMap<>();//保存近期热门的商品key为goodId，value为Goods
			for(Goods good : recent_Hot_Goods) {
				redisTemplate.boundSetOps(key_Recent_Hot).add(good.getGoodId());
				map.put(good.getGoodId(), good);
			}
			redisTemplate.opsForHash().putAll(key_Goods, map);
			return recent_Hot_Goods;
		}
		//从redis中获取近期热门商品，保存近期热门的商品的列表
		List<Goods> recent_Hot_Goods = redisTemplate.opsForHash().multiGet(key_Goods, recent_Hot_GoodId);
		return recent_Hot_Goods;
	}
	
	/*
	 * 根据商品类型 1234：租赁共享；5：民宿酒店；6789：情谊表达；ab：娱乐美食查到对应商品
	 */
	@Override
	public List<Goods> selectTypeGoods(String type) {
		String key_goodType = type + "_goodType";
		Set<String> type_goodIds = redisTemplate.opsForSet().members(key_goodType);
		if(type_goodIds.size() == 0 ) { //redis中没有该类别的商品的goodId集合
			Map<String,Goods> map = new HashMap<>();
			List<Goods> typeGoods = GoodsDao.selectTypeGoods(type);
			for(Goods good : typeGoods) {
				redisTemplate.boundSetOps(key_goodType).add(good.getGoodId());
				map.put(good.getGoodId(), good);
			}
			redisTemplate.opsForHash().putAll(key_Goods, map);
			return typeGoods;
		}
		else {
			List<Goods> typeGoods = redisTemplate.opsForHash().multiGet(key_Goods, type_goodIds);
			return typeGoods;
		}
	}
	
	/*
	 * 查看商品是否被访问用户收藏
	 */
	public boolean IfCollectionByUid(int uid,String goodId) {
		String selectGoodId = GoodsDao.selectCollectionByUidAndGoodId(uid, goodId);
		if(selectGoodId != null)
			return true;
		return false;
	}
	
	/*
	 * 查询商品的所有规格
	 */
	@Override
	public List<GoodsVariety> selectAllVariety(String goodId) {
		//商品规格的key，根据key找到redis中该商品的所有规格
		String goodId_GoodsVariety = goodId + "_GoodsVariety";
		//获取所有规格
		List<GoodsVariety> goodVariety = redisTemplate.opsForHash().values(goodId_GoodsVariety);
		//redis中还未保存商品编号为goodId的商品的规格
		if(goodVariety.size() == 0) {
			Map<String,GoodsVariety> map = new HashMap<>();
			//访问数据库，查询商品的所有规格
			goodVariety = GoodsDao.selectAllVariety(goodId);
			for(GoodsVariety variety :goodVariety) {
				map.put(variety.getVarietyId(), variety);
			}
			redisTemplate.opsForHash().putAll(goodId_GoodsVariety, map);
			return goodVariety;
		}
		return goodVariety;
	}
	
	/*
	 * 增加浏览量
	 */
	@Override
	public int addBrowse(String goodId, int number) {
		//修改redis中商品的浏览量
		good = (Goods) redisTemplate.opsForHash().get(key_Goods, goodId);
		System.out.println(good);
		good.setBrowse(good.getBrowse()+number);
		redisTemplate.opsForHash().put(key_Goods,goodId,good);
		//修改数据库
		int result = GoodsDao.addBrowse(number, goodId);
		return result;
	}
	
	
	/*
	 * 1、更新商品表中的收藏量
	 * 2、将商品从用户收藏表中删除或添加到删除表中
	 */
	@Override
	public int clickCollection(String uid,String goodId, int sign) {
		int result = 0;
		//修改商品的收藏量
		good = (Goods) redisTemplate.opsForHash().get(key_Goods, goodId);
		good.setBrowse(good.getCollection()+sign);
		redisTemplate.opsForHash().put(key_Goods,goodId,good);
		GoodsDao.updateCollection(goodId, sign);
		//将该商品放入用户收藏表中
		if(sign == 1) {
			System.out.println("收藏成功");
			result = GoodsDao.insertGoodInUserCollection(uid, goodId);
		}
		else if(sign == -1) {
			System.out.println("取消收藏成功");
			result = GoodsDao.deleteGoodFromUserCollection(uid, goodId);
		}
		return result;
	}

	/*
	 * 提交订单
	 * 1、查询库存是否满足
	 * 2、
	 */

	@Override
	public int orderGood(String goodId, String varietyId, int number) {
		//商品规格的key，根据key找到redis中该商品的所有规格
		System.out.println(number);
		String goodId_GoodsVariety = goodId + "_GoodsVariety";
		//result:是否更新成功
		int result = 0;
		while(result == 0){
			goodVariety = (GoodsVariety) redisTemplate.opsForHash().get(goodId_GoodsVariety, varietyId);
			System.out.println(goodVariety);
			if(number > goodVariety.getInventory()) {
				return 0;
			}
			result = GoodsDao.updateInventory(varietyId,goodVariety.getVersion(),number);
			System.out.println(result);
		}
		goodVariety = GoodsDao.selectVariety(varietyId);
		redisTemplate.opsForHash().put(goodId_GoodsVariety, varietyId, goodVariety);
		System.out.println("订购成功");
		return result;
	}
	
	
}
