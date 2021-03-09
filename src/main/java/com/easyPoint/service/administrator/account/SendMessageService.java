package com.easyPoint.service.administrator.account;

/**
 * @author FHJ
 * @date 2019/11/23 20:31
 */
public interface SendMessageService {

    void sendMessage(String phone, Integer flag) throws Exception;
}
