package com.easyPoint.dto.template;

import java.util.Map;

public class MessageTemplateDto {
    //通知用户的openId
    private String touser;
    //消息模板ID
    private String template_id;
    //表单id或支付id
    private String form_id;
    //通知消息内容
    private Map data;
    //字体颜色
    private String color;
    //通知内容中的重点对象
    private String emphasis_keyword;
    //通知模板点击跳转页
    private String page;

    public String getPage() {
        return page;
    }

    public void setPage(String page) {
        this.page = page;
    }

    public String getTouser() {
        return touser;
    }

    public void setTouser(String touser) {
        this.touser = touser;
    }

    public String getTemplate_id() {
        return template_id;
    }

    public void setTemplate_id(String template_id) {
        this.template_id = template_id;
    }

    public String getForm_id() {
        return form_id;
    }

    public void setForm_id(String form_id) {
        this.form_id = form_id;
    }

    public Map getData() {
        return data;
    }

    public void setData(Map data) {
        this.data = data;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getEmphasis_keyword() {
        return emphasis_keyword;
    }

    public void setEmphasis_keyword(String emphasis_keyword) {
        this.emphasis_keyword = emphasis_keyword;
    }

    @Override
    public String toString() {
        return "MessageTemplateDto{" +
                "touser='" + touser + '\'' +
                ", template_id='" + template_id + '\'' +
                ", form_id='" + form_id + '\'' +
                ", data=" + data +
                ", color='" + color + '\'' +
                ", emphasis_keyword='" + emphasis_keyword + '\'' +
                ", page='" + page + '\'' +
                '}';
    }
}
