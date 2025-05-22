package com.bugtracker.bugmanager.entities;

public class LoginResponse {
    Integer userid ;
    String role;

    public String getRole() {
        return role;
    }

    public LoginResponse(String role, Integer userid) {
        this.role = role;
        this.userid = userid;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public Integer getUserid() {
        return userid;
    }

    public void setUserid(Integer userid) {
        this.userid = userid;
    }
}
