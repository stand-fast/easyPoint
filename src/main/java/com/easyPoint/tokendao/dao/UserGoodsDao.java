package com.easyPoint.tokendao.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.merchant.util.Goods;
import com.merchant.util.GoodsVariety;

public interface UserGoodsDao {
	
	//��ѯ���������Ʒ��goodId
	public List<String> selectRecent_Hot();
	
	//������ƷgoodId��ѯ����������ŵ���Ʒ
	public List<Goods> selectRecent_Hot_Goods(List<String> recent_Hot_GoodId);
	
	//���ݷ����ѯ��Ʒ
	public List<Goods> selectTypeGoods(String type);
	
	//��ѯ��Ʒ���й��
	public List<GoodsVariety> selectAllVariety(String goodId);
	
	//�鿴����Ʒ�Ƿ񱻷����û��ղ�
	public String selectCollectionByUidAndGoodId(@Param("uid") int uid, @Param("goodId") String goodId);
	
	//�鿴�û����е��ղ���Ʒ
	public List<Goods> selectCollectionByUid(int uid);
	
	//�ղػ�ȡ����ƷsignΪ1��-1
	public int updateCollection(@Param("goodId") String goodId, @Param("sign") int sign);
	
	//����Ʒ�����û��ղر���
	public int insertGoodInUserCollection(@Param("uid") String uid, @Param("goodId") String goodId);
	
	//����Ʒ���û��ղر���ɾ��
	public int deleteGoodFromUserCollection(@Param("uid") String uid, @Param("goodId") String goodId);
	
	//���������
	public int addBrowse(@Param("number") int number, @Param("goodId") String goodId);
	
	//��ѯ����Ʒ���
	public GoodsVariety selectVariety(@Param("varietyId") String varietyId);
	
	
	//�޸Ŀ��
	public int updateInventory(@Param("varietyId") String varietyId, @Param("version") int version, @Param("number") int number);
	
	
}
