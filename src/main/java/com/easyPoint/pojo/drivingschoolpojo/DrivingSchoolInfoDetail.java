package com.easyPoint.pojo.drivingschoolpojo;

import com.easyPoint.pojo.drivingschoolpojo.DrivingSchoolInfo;

/**
 * FJW
 * 驾校详情信息
 */

public class DrivingSchoolInfoDetail extends DrivingSchoolInfo {

    /**
     * detail_imgs_url	varchar(154)	详情轮播图路径,用&为分割符
     * study_time_morning	char(13)	早上学车时间
     * study_time_noon	char(13)	中午学车时间
     * study_time_night	char(13)	晚上学车时间
     * conditions_overleaf	varchar(2000)	报名须知内容，用&为分割符
     * driving_school_profile	varchar(2000)	驾校简介	不为空
     * pass_rate	decimal	通过率
     */
    private String detailImgsUrl;
    private String studyTimeMorning;
    private String studyTimeNoon;
    private String studyTimeNight;
    private String conditionsOverleaf;
    private String drivingSchoolProfile;
    private String passRate;


    public String getDetailImgsUrl() {
        return detailImgsUrl;
    }

    public void setDetailImgsUrl(String detailImgsUrl) {
        this.detailImgsUrl = detailImgsUrl;
    }

    public String getStudyTimeMorning() {
        return studyTimeMorning;
    }

    public void setStudyTimeMorning(String studyTimeMorning) {
        this.studyTimeMorning = studyTimeMorning;
    }

    public String getStudyTimeNoon() {
        return studyTimeNoon;
    }

    public void setStudyTimeNoon(String studyTimeNoon) {
        this.studyTimeNoon = studyTimeNoon;
    }

    public String getStudyTimeNight() {
        return studyTimeNight;
    }

    public void setStudyTimeNight(String studyTimeNight) {
        this.studyTimeNight = studyTimeNight;
    }

    public String getConditionsOverleaf() {
        return conditionsOverleaf;
    }

    public void setConditionsOverleaf(String conditionsOverleaf) {
        this.conditionsOverleaf = conditionsOverleaf;
    }

    public String getDrivingSchoolProfile() {
        return drivingSchoolProfile;
    }

    public void setDrivingSchoolProfile(String drivingSchoolProfile) {
        this.drivingSchoolProfile = drivingSchoolProfile;
    }

    public String getPassRate() {
        return passRate;
    }

    public void setPassRate(String passRate) {
        this.passRate = passRate;
    }

    @Override
    public String toString() {
        return super.toString()+"DrivingSchoolInfoDetail{" +
                "detailImgsUrl='" + detailImgsUrl + '\'' +
                ", studyTimeMorning='" + studyTimeMorning + '\'' +
                ", studyTimeNoon='" + studyTimeNoon + '\'' +
                ", studyTimeNight='" + studyTimeNight + '\'' +
                ", conditionsOverleaf='" + conditionsOverleaf + '\'' +
                ", drivingSchoolProfile='" + drivingSchoolProfile + '\'' +
                ", passRate='" + passRate + '\'' +
                '}';
    }
}
