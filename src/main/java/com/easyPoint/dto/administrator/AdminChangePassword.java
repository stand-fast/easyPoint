package com.easyPoint.dto.administrator;

/**
 * @author FHJ
 * @date 2019/11/30 15:51
 */
public class AdminChangePassword {
    private String phone;
    private String verifyCode;
    private String oldPassword;
    private String newPassword;
    private String ensurePassword;

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getVerifyCode() {
        return verifyCode;
    }

    public void setVerifyCode(String verifyCode) {
        this.verifyCode = verifyCode;
    }

    public String getOldPassword() {
        return oldPassword;
    }

    public void setOldPassword(String oldPassword) {
        this.oldPassword = oldPassword;
    }

    public String getNewPassword() {
        return newPassword;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }

    public String getEnsurePassword() {
        return ensurePassword;
    }

    public void setEnsurePassword(String ensurePassword) {
        this.ensurePassword = ensurePassword;
    }
}
