package com.easyPoint.service.pay;

import com.easyPoint.dto.pay.MiniPaymentDto;
import com.easyPoint.dto.pay.PaymentDto;

import java.util.Map;


public interface WxPayService {

    /**
     * 发起微信支付
     * @param paymentDto
     * @return 小程序发起支付请求参数
     */
    Map requestWxPay(PaymentDto paymentDto, int uid, String notifyUrl) throws Exception;
}
