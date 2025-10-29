package com.shodhacode.backend.dto;

public class LeaderboardEntry {
    private String username;
    private int solved;
    private int penalty; // here we’ll use total submission count as a simple penalty

    public LeaderboardEntry(String username, int solved, int penalty) {
        this.username = username;
        this.solved = solved;
        this.penalty = penalty;
    }

    public String getUsername() { return username; }
    public int getSolved() { return solved; }
    public int getPenalty() { return penalty; }
}
