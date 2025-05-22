package com.bugtracker.bugmanager.entities;

import jakarta.persistence.*;

import java.sql.Timestamp;
import java.time.LocalDateTime;

@Entity
@Table(name = "project_team")
public class Project_team {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private  User user;

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

    public Project_team() {
    }

    public Project_team(Timestamp assigned_at, int id, Project project_id, String role, User user_id) {
        this.assigned_at = assigned_at;
        this.id = id;
        this.project = project_id;
        this.role = role;
        this.user = user_id;
    }

    public Timestamp getAssigned_at() {
        return assigned_at;
    }

    public void setAssigned_at(Timestamp assigned_at) {
        this.assigned_at = assigned_at;
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

    public void setUser(User user) {
        this.user = user;
    }
}
