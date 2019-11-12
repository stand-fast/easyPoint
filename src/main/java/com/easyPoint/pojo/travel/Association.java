package com.easyPoint.pojo.travel;

import java.util.List;

/**
 * @author FHJ
 * @date 2019/11/10 18:30
 */
public class Association {
    // 同乡会id
    private String associationId;
    // 同乡会名称
    private String associationName;
    // 同乡会上下车地点
    private List<String> place;

    public String getAssociationId() {
        return associationId;
    }

    public void setAssociationId(String associationId) {
        this.associationId = associationId;
    }

    public String getAssociationName() {
        return associationName;
    }

    public void setAssociationName(String associationName) {
        this.associationName = associationName;
    }

    public List<String> getPlace() {
        return place;
    }

    public void setPlace(List<String> place) {
        this.place = place;
    }
}
