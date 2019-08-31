package com.easyPoint.tokendao.util;

public class LoginResponse {
	private int code = 0;

    private String msg;

    private Object data;

    public Object getData() {
        return data;
    }

    public int getCode() {
		return code;
	}

	public void setCode(int code) {
		this.code = code;
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

	public void setData(Object data) {
        this.data = data;
    }

	@Override
	public String toString() {
		return "LoginResponse [code=" + code + ", msg=" + msg + ", data=" + data + "]";
	}
	

}
