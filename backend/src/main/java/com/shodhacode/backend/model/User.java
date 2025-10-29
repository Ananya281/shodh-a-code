package com.shodhacode.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "users") // ✅ Prevents conflict with reserved keyword "user"
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;
    private String email;
    private int score;

    // Optional: one-to-many mapping to submissions (for leaderboard / profile)
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore   // ✅ Avoid circular references in JSON (user → submissions → user)
    private List<Submission> submissions;

    // Constructors
    public User() {}
    public User(String username, String email, int score) {
        this.username = username;
        this.email = email;
        this.score = score;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }

    public int getScore() {
        return score;
    }
    public void setScore(int score) {
        this.score = score;
    }

    public List<Submission> getSubmissions() {
        return submissions;
    }
    public void setSubmissions(List<Submission> submissions) {
        this.submissions = submissions;
    }
}
