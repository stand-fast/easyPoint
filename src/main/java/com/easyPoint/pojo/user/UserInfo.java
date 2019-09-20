package com.easyPoint.pojo.user;

public class UserInfo {
    private Integer uid; //用户ID
    private String openId; //微信用户标识
    private String studentId; //学号
    private String avatarUrl; //微信头像路径
    private String nickName; //微信用户名
    private String userName; //姓名
    private Integer gender; //性别
    private String phone; //联系电话
    private Integer grage; //年纪
    private String major; //专业

    public Integer getUid() {
        return uid;
    }

    public void setUid(Integer uid) {
        this.uid = uid;
    }

    public String getOpenId() {
        return openId;
    }

    public void setOpenId(String openId) {
        this.openId = openId;
    }

    public String getStudentId() {
        return studentId;
    }

    public void setStudentId(String studentId) {
        this.studentId = studentId;
    }

    public String getAvatarUrl() {
        return avatarUrl;
    }

    public void setAvatarUrl(String avatarUrl) {
        this.avatarUrl = avatarUrl;
    }

    public String getNickName() {
        return nickName;
    }

    public void setNickName(String nickName) {
        this.nickName = nickName;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public Integer getGender() {
        return gender;
    }

    public void setGender(Integer gender) {
        this.gender = gender;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public Integer getGrage() {
        return grage;
    }

    public void setGrage(Integer grage) {
        this.grage = grage;
    }

    public String getMajor() {
        return major;
    }

    public void setMajor(String major) {
        this.major = major;
    }

    @Override
    public String toString() {
        return "UserInfo{" +
                "uid=" + uid +
                ", openId='" + openId + '\'' +
                ", studentId='" + studentId + '\'' +
                ", avatarUrl='" + avatarUrl + '\'' +
                ", nickName='" + nickName + '\'' +
                ", userName='" + userName + '\'' +
                ", gender=" + gender +
                ", phone='" + phone + '\'' +
                ", grage=" + grage +
                ", major='" + major + '\'' +
                '}';
    }
}
