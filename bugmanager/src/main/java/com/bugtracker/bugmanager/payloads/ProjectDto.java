package com.bugtracker.bugmanager.payloads;

import com.bugtracker.bugmanager.entities.User;
import jakarta.persistence.*;

import java.sql.Date;
import java.sql.Timestamp;

public class ProjectDto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "project_name", nullable = false)
    private String project_name;
    @Column(name = "description")
    private String description;
    @Column(name = "start_date")
    private java.sql.Date start_date;
    @Column(name = "end_date")
    private java.sql.Date end_date;
    @Column(name = "status")
    private String status;
    @Column(name = "created", updatable = false)
    private Timestamp created;
    @Column(name = "updated")
    private Timestamp updated;

    @ManyToOne
    @JoinColumn(name = "assigned_project_manager_id")
    private User user;

    public ProjectDto(){
    }

    public ProjectDto(User assigned_project_manager_id, Timestamp created, String description, Date end_date, Integer id, String project_name, Date start_date, String status, Timestamp updated) {
        this.user = assigned_project_manager_id;
        this.created = created;
        this.description = description;
        this.end_date = end_date;
        this.id = id;
        this.project_name = project_name;
        this.start_date = start_date;
        this.status = status;
        this.updated = updated;
    }

    @PrePersist
    protected void onCreate() {
        created = new Timestamp(System.currentTimeMillis());
        updated = new Timestamp(System.currentTimeMillis());
    }

    @PreUpdate
    protected void onUpdate() {
        updated = new Timestamp(System.currentTimeMillis());
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getProject_name() {
        return project_name;
    }

    public void setProject_name(String project_name) {
        this.project_name = project_name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public java.sql.Date getStart_date() {
        return start_date;
    }

    public void setStart_date(java.sql.Date start_date) {
        this.start_date = start_date;
    }

    public java.sql.Date getEnd_date() {
        return end_date;
    }

    public void setEnd_date(java.sql.Date end_date) {
        this.end_date = end_date;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Timestamp getCreated() {
        return created;
    }

    public void setCreated(Timestamp created) {
        this.created = created;
    }

    public Timestamp getUpdated() {
        return updated;
    }

    public void setUpdated(Timestamp updated) {
        this.updated = updated;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}


