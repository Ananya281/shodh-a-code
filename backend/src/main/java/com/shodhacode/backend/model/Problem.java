package com.shodhacode.backend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

@Entity
public class Problem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;
    private String inputFormat;
    private String outputFormat;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "contest_id")
    @JsonBackReference  // ✅ prevents infinite recursion (pairs with @JsonManagedReference in Contest)
    private Contest contest;

    // Constructors
    public Problem() {}

    public Problem(String title, String description, String inputFormat, String outputFormat, Contest contest) {
        this.title = title;
        this.description = description;
        this.inputFormat = inputFormat;
        this.outputFormat = outputFormat;
        this.contest = contest;
    }

    // Getters and setters
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
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
    public String getInputFormat() {
        return inputFormat;
    }
    public void setInputFormat(String inputFormat) {
        this.inputFormat = inputFormat;
    }
    public String getOutputFormat() {
        return outputFormat;
    }
    public void setOutputFormat(String outputFormat) {
        this.outputFormat = outputFormat;
    }
    public Contest getContest() {
        return contest;
    }
    public void setContest(Contest contest) {
        this.contest = contest;
    }
}
