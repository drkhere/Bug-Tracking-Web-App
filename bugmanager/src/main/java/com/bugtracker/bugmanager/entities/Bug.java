package com.bugtracker.bugmanager.entities;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "bug")
public class Bug {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id ;

    private String title;
    private String description;
    private String priority;
    private String status;

    @Temporal(TemporalType.TIMESTAMP)
    private Date created;

    @Temporal(TemporalType.TIMESTAMP)
    private Date updated;

    @ManyToOne
    @JoinColumn(name = "reported_by_user_id")
    private User reported_by_user_id;

    @ManyToOne
    @JoinColumn(name = "assigned_to_user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "project_id")
    private Project project;

    public Bug(){
    }

    public Bug(User assigned_to_user_id, Date created, String description, int id, String priority, Project project_id, User reported_by_user_id, String status, String title, Date updated) {
        this.user = assigned_to_user_id;
        this.created = created;
        this.description = description;
        this.id = id;
        this.priority = priority;
        this.project = project_id;
        this.reported_by_user_id = reported_by_user_id;
        this.status = status;
        this.title = title;
        this.updated = updated;
    }

    @PrePersist
    protected void onCreate() {
        created = new Date();  // Stores current date & time
        updated = new Date();
    }

    @PreUpdate
    protected void onUpdate() {
        updated = new Date();  // Updates with current timestamp
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Date getCreated() {
        return created;
    }

    public void setCreated(Date created) {
        this.created = created;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getPriority() {
        return priority;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    public User getReported_by_user_id() {
        return reported_by_user_id;
    }

    public void setReported_by_user_id(User reported_by_user_id) {
        this.reported_by_user_id = reported_by_user_id;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Date getUpdated() {
        return updated;
    }

    public void setUpdated(Date updated) {
        this.updated = updated;
    }
}
