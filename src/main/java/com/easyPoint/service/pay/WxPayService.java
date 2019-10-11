package com.easyPoint.service.pay;

import com.easyPoint.dto.pay.RequestPaymentParamDto;

public interface WxPayService {

    //发起微信支付
    /**
     *
     * @param uid
     * @param totalFee 订单总金额，单位为分。
     * @param body  商品简单描述，该字段请按照规范传递。
     * @param attachData    附加数据，在查询API和支付通知中原样返回，可作为自定义参数使用。
     */
    RequestPaymentParamDto requestWxPay(int uid, String totalFee, String body, String attachData);
}
