package com.bugtracker.bugmanager.payloads;


import com.bugtracker.bugmanager.entities.Bug;
import jakarta.persistence.*;

public class SuggestionDto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "bug_id")
    private Bug bug;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String suggestions;

    // Constructors
    public SuggestionDto() {}

    public SuggestionDto(Bug bug, String suggestions) {
        this.bug = bug;
        this.suggestions = suggestions;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Bug getBug() {
        return bug;
    }

    public void setBug(Bug bug) {
        this.bug = bug;
    }

    public String getSuggestions() {
        return suggestions;
    }

    public void setSuggestions(String suggestions) {
        this.suggestions = suggestions;
    }
}