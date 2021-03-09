package com.easyPoint.pojo.user;

import org.springframework.stereotype.Component;

import java.io.Serializable;
import java.math.BigDecimal;

/**
 * fjw
 */
@Component
public class InternshipInfo implements Serializable {
    private static final long serialVersionUID = 1L;
    private Integer internshipId;
    private Integer merchantId;//商家id
    private String jobName;//岗位名称
    private String jobContent;//工作内容
    private BigDecimal jobSalary;//薪资
    private Integer jobSettle;//1：日结；2：月结
    private Integer recruitNum;//招聘人数
    private String jobDate;//兼职日期
    private String jobTime;//兼职时间
    private String jobPlace;//工作地点
    private Integer sex;//1：男；2：女；
    private String welfare;//福利待遇
    private String requirement;//任职要求
    private String publishTime;//发布日期
    private Integer applicantNum;//已报名人数
    private Integer state;//招聘信息状态	1：正在招聘；2：已下架（不为空）

    public Integer getInternshipId() {
        return internshipId;
    }

    public void setInternshipId(Integer internshipId) {
        this.internshipId = internshipId;
    }

    public String getJobContent() {
        return jobContent;
    }

    public void setJobContent(String jobContent) {
        this.jobContent = jobContent;
    }

    public String getJobDate() {
        return jobDate;
    }

    public void setJobDate(String jobDate) {
        this.jobDate = jobDate;
    }

    public Integer getApplicantNum() {
        return applicantNum;
    }

    public void setApplicantNum(Integer applicantNum) {
        this.applicantNum = applicantNum;
    }

    public static long getSerialVersionUID() {
        return serialVersionUID;
    }

    public Integer getMerchantId() {
        return merchantId;
    }

    public void setMerchantId(Integer merchantId) {
        this.merchantId = merchantId;
    }

    public String getJobName() {
        return jobName;
    }

    public void setJobName(String jobName) {
        this.jobName = jobName;
    }

    public BigDecimal getJobSalary() {
        return jobSalary;
    }

    public void setJobSalary(BigDecimal jobSalary) {
        this.jobSalary = jobSalary;
    }

    public Integer getJobSettle() {
        return jobSettle;
    }

    public void setJobSettle(Integer jobSettle) {
        this.jobSettle = jobSettle;
    }

    public Integer getRecruitNum() {
        return recruitNum;
    }

    public void setRecruitNum(Integer recruitNum) {
        this.recruitNum = recruitNum;
    }

    public String getJobTime() {
        return jobTime;
    }

    public void setJobTime(String jobTime) {
        this.jobTime = jobTime;
    }

    public String getJobPlace() {
        return jobPlace;
    }

    public void setJobPlace(String jobPlace) {
        this.jobPlace = jobPlace;
    }

    public Integer getSex() {
        return sex;
    }

    public void setSex(Integer sex) {
        this.sex = sex;
    }

    public String getWelfare() {
        return welfare;
    }

    public void setWelfare(String welfare) {
        this.welfare = welfare;
    }

    public String getRequirement() {
        return requirement;
    }

    public void setRequirement(String requirement) {
        this.requirement = requirement;
    }

    public String getPublishTime() {
        return publishTime;
    }

    public void setPublishTime(String publishTime) {
        this.publishTime = publishTime;
    }

    public Integer getState() {
        return state;
    }

    public void setState(Integer state) {
        this.state = state;
    }

    @Override
    public String toString() {
        return "internshipInfo{" +
                "internshipId=" + internshipId +
                ", merchantId=" + merchantId +
                ", jobName='" + jobName + '\'' +
                ", jobContent='" + jobContent + '\'' +
                ", jobSalary=" + jobSalary +
                ", jobSettle=" + jobSettle +
                ", recruitNum=" + recruitNum +
                ", jobDate='" + jobDate + '\'' +
                ", jobTime='" + jobTime + '\'' +
                ", jobPlace='" + jobPlace + '\'' +
                ", sex=" + sex +
                ", welfare='" + welfare + '\'' +
                ", requirement='" + requirement + '\'' +
                ", publishTime='" + publishTime + '\'' +
                ", applicantNum=" + applicantNum +
                ", state=" + state +
                '}';
    }
}
