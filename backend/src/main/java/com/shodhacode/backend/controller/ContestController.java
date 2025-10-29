package com.shodhacode.backend.controller;

import com.shodhacode.backend.dto.LeaderboardEntry;
import com.shodhacode.backend.model.Contest;
import com.shodhacode.backend.service.ContestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/contests")
public class ContestController {

    @Autowired
    private ContestService contestService;

    // ✅ Get all contests
    @GetMapping
    public List<Contest> getAllContests() {
        return contestService.getAllContests();
    }

    // ✅ Get contest by ID
    @GetMapping("/{id}")
    public Contest getContestById(@PathVariable Long id) {
        return contestService.getContestById(id);
    }

    // ✅ Get leaderboard for a contest
    @GetMapping("/{id}/leaderboard")
    public List<LeaderboardEntry> getLeaderboard(@PathVariable Long id) {
        return contestService.getLeaderboard(id);
    }
}
