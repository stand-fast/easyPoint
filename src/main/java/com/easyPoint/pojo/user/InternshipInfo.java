package com.easyPoint.pojo.user;

import org.springframework.stereotype.Component;

import java.io.Serializable;

/**
 * fjw
 */
@Component
public class InternshipInfo implements Serializable {
    private static final long serialVersionUID = 1L;
    int internshipId;
    int merchantId;//商家id
    String jobName;//岗位名称
    String jobContent;//工作内容
    float jobSalary;//薪资
    int jobSettle;//1：日结；2：月结
    int recruitNum;//招聘人数
    String jobDate;//兼职日期
    String jobTime;//兼职时间
    String jobPlace;//工作地点
    int sex;//1：男；2：女；
    String welfare;//福利待遇
    String requirement;//任职要求
    String publishTime;//发布日期
    int applicantNum;//已报名人数
    int state;//招聘信息状态	1：正在招聘；2：已下架（不为空）


    public int getInternshipId() {
        return internshipId;
    }

    public void setInternshipId(int internshipId) {
        this.internshipId = internshipId;
    }


    public int getMerchantId() {
        return merchantId;
    }

    public void setMerchantId(int merchantId) {
        this.merchantId = merchantId;
    }

    public String getJobName() {
        return jobName;
    }

    public void setJobName(String jobName) {
        this.jobName = jobName;
    }

    public String getJobContent() {
        return jobContent;
    }

    public void setJobContent(String jobContent) {
        this.jobContent = jobContent;
    }

    public float getJobSalary() {
        return jobSalary;
    }

    public void setJobSalary(float jobSalary) {
        this.jobSalary = jobSalary;
    }

    public int getJobSettle() {
        return jobSettle;
    }

    public void setJobSettle(int jobSettle) {
        this.jobSettle = jobSettle;
    }

    public int getRecruitNum() {
        return recruitNum;
    }

    public void setRecruitNum(int recruitNum) {
        this.recruitNum = recruitNum;
    }

    public String getJobDate() {
        return jobDate;
    }

    public void setJobDate(String jobDate) {
        this.jobDate = jobDate;
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

    public int getSex() {
        return sex;
    }

    public void setSex(int sex) {
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

    public int getApplicantNum() {
        return applicantNum;
    }

    public void setApplicantNum(int applicantNum) {
        this.applicantNum = applicantNum;
    }

    public int getState() {
        return state;
    }

    public void setState(int state) {
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
