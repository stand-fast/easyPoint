package com.easyPoint.tokendao.util;

public class LoginResponseUtil {
	
	public static LoginResponse getLoginResponse(Object data, int code, String msg) {
		LoginResponse loginResponse = new LoginResponse();
		loginResponse.setData(data);
		loginResponse.setCode(code);
		loginResponse.setMsg(msg);
		return loginResponse;
	}
	
}
