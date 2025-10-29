package com.shodhacode.backend.service;

import com.shodhacode.backend.dto.LeaderboardEntry;
import com.shodhacode.backend.model.Contest;
import com.shodhacode.backend.model.Submission;
import com.shodhacode.backend.repository.ContestRepository;
import com.shodhacode.backend.repository.SubmissionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class ContestService {

    @Autowired
    private ContestRepository contestRepository;

    @Autowired
    private SubmissionRepository submissionRepository;

    // ✅ Return all contests
    public List<Contest> getAllContests() {
        return contestRepository.findAll();
    }

    // ✅ Return one contest by ID
    public Contest getContestById(Long id) {
        return contestRepository.findById(id).orElse(null);
    }

    // ✅ Leaderboard logic
    public List<LeaderboardEntry> getLeaderboard(Long contestId) {
        List<Submission> allSubs = submissionRepository.findByProblem_Contest_Id(contestId);

        Map<String, List<Submission>> userSubs = allSubs.stream()
                .filter(s -> s.getUser() != null)
                .collect(Collectors.groupingBy(s -> s.getUser().getUsername()));

        List<LeaderboardEntry> leaderboard = new ArrayList<>();

        for (var entry : userSubs.entrySet()) {
            String username = entry.getKey();
            List<Submission> subs = entry.getValue();

            int solved = (int) subs.stream()
                    .filter(s -> "Accepted".equalsIgnoreCase(s.getStatus()))
                    .map(s -> s.getProblem().getId())
                    .distinct()
                    .count();

            int penalty = subs.size();

            leaderboard.add(new LeaderboardEntry(username, solved, penalty));
        }

        leaderboard.sort(Comparator
                .comparing(LeaderboardEntry::getSolved).reversed()
                .thenComparing(LeaderboardEntry::getPenalty));

        return leaderboard;
    }
}
