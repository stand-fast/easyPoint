package com.easyPoint.service.pay;

import com.easyPoint.dto.pay.MiniPaymentDto;
import com.easyPoint.dto.pay.PaymentDto;
import com.easyPoint.dto.pay.RefundParamDto;

import java.util.Map;


public interface WxPayService {

    /**
     * 发起微信支付
     * @param paymentDto
     * @return 小程序发起支付请求参数
     */
    Map requestWxPay(PaymentDto paymentDto, int uid, String notifyUrl) throws Exception;

    /**
     * 退款接口
     * @param uid
     * @param orderId
     * @param refundFee
     * @param notifyUrl
     * @return
     * @throws Exception
     */
    Map requestRefund(int uid, int orderId,int refundFee, String notifyUrl) throws Exception;
}
