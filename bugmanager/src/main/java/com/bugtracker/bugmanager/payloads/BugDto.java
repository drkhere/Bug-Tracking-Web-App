package com.bugtracker.bugmanager.payloads;

import com.bugtracker.bugmanager.entities.Project;
import com.bugtracker.bugmanager.entities.User;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

import java.util.Date;

public class BugDto {

    private int id;
    private String title;
    private String description;
    private String priority;
    private String status;
    private Date created;
    private Date updated;
    private User reported_by_user_id;
    private User user;

    @ManyToOne
    @JoinColumn(name = "project_id")
    private Project project;

    public BugDto() {
    }

    public BugDto(int id, String title, String description, String priority, String status, Date created, Date updated,
                  User reportedByUserId, User assignedToUserId, Project projectId) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.status = status;
        this.created = created;
        this.updated = updated;
        this.reported_by_user_id = reportedByUserId;
        this.user = assignedToUserId;
        this.project = projectId;
    }

    // Getters and Setters

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getPriority() {
        return priority;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Date getCreated() {
        return created;
    }

    public void setCreated(Date created) {
        this.created = created;
    }

    public Date getUpdated() {
        return updated;
    }

    public void setUpdated(Date updated) {
        this.updated = updated;
    }

    public User getReported_by_user_id() {
        return reported_by_user_id;
    }

    public void setReported_by_user_id(User reported_by_user_id) {
        this.reported_by_user_id = reported_by_user_id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }
}
