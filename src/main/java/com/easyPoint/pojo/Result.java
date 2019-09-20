package com.easyPoint.pojo;

public class Result<T> {
    private Integer code;
    private String message;
    private T data;

    public Result(){

    }

    public Result(int code, String message, T data) {
        this(code, message);
        this.data = data;
    }

    public Result(int code, String message) {
        this.code = code;
        this.message = message;
    }

    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }
}

