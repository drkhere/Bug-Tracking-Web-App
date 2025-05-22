package com.bugtracker.bugmanager.payloads;

import com.bugtracker.bugmanager.entities.Project;
import com.bugtracker.bugmanager.entities.User;
import jakarta.persistence.*;
import jakarta.persistence.criteria.CriteriaBuilder;

import java.sql.Timestamp;
import java.time.LocalDateTime;

public class ProjectTeamDto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "project_id")
    private Project project;

    @Column(name = "role")
    private  String role;

    @Column(name = "assigned_at")
    private Timestamp assigned_at ;

    @PrePersist
    protected void onCreate() {
        assigned_at = Timestamp.valueOf(LocalDateTime.now());
    }

    public ProjectTeamDto() {
    }

    public ProjectTeamDto(Timestamp assigned_at, int id, Project project_id, String role, User user_id) {
        this.assigned_at = assigned_at;
        this.id = id;
        this.project = project_id;
        this.role = role;
        this.user = user_id;
    }

    public Timestamp getAssigned_at() {
        return assigned_at;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Project getProject() {
        return project;
    }

//
//    public Integer getProjectId() {
//        return project.getId();
//    }

    public void setAssigned_at(Timestamp assigned_at) {
        this.assigned_at = assigned_at;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public User getUser() {
        return user;
    }

//    public Integer getUserId() {
//        return user.getUserid();
//    }

    public void setUser(User user) {
        this.user = user;
    }
}
