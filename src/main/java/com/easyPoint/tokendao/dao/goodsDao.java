package com.easyPoint.tokendao.dao;

import java.util.List;

import com.merchant.util.Goods;

public interface goodsDao {
	//添加
	public int addGoods(Goods goods);
	//删除
	public int deleteGoods(String goodId);
	//更新
	public int updateGoods(Goods goods);
	//查询
	public List<Goods> selectGoods(Goods goods);
}
