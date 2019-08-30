package com.easyPoint.tokendao.service;

import java.util.List;

import com.merchant.util.Goods;
import com.merchant.util.GoodsVariety;

public interface UserGoodsService {
		//��ѯ������Ʒ
		public List<Goods> selectRecent_Hot();
		
		//���ݷ����ѯ��Ʒ
		public List<Goods> selectTypeGoods(String type);
		
		//��ѯ��Ʒ���й��
		public List<GoodsVariety> selectAllVariety(String goodId);
		
		//�鿴��Ʒ�Ƿ񱻷����û��ղ�
		public boolean IfCollectionByUid(int uid, String goodId);
		
		//���������
		public int addBrowse(String goodId, int number);
		
		/*
		 * ����ղذ�ť��
		 * �ղػ�ȡ����ƷsignΪ1��-1
		 * ������Ʒ�ղػ�ɾ�����û����ղر���
		 */
		public int clickCollection(String uid, String goodId, int sign);
		
		//�ύ����
		public int orderGood(String goodId, String varietyId, int number);

}
