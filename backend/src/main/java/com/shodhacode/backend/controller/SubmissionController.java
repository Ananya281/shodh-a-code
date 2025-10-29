package com.shodhacode.backend.controller;

import com.shodhacode.backend.model.Submission;
import com.shodhacode.backend.service.CodeJudgeService;
import com.shodhacode.backend.repository.SubmissionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/submissions") // ✅ match frontend route
public class SubmissionController {

    @Autowired
    private CodeJudgeService codeJudgeService;

    @Autowired
    private SubmissionRepository submissionRepository;

    // ✅ POST: create + judge new submission
    @PostMapping
    public Submission judgeCode(@RequestBody Submission submission) {
        // This allows React’s createSubmission() payload:
        // { contestId, problemId, username, language, code }
        return codeJudgeService.evaluateSubmission(
                submission.getProblem().getId(),
                submission.getUser().getId(),
                submission.getCode(),
                submission.getLanguage(),
                "", ""  // optional input/output placeholders
        );
    }

    // ✅ GET: for polling
    @GetMapping("/{id}")
    public Submission getSubmissionById(@PathVariable Long id) {
        return submissionRepository.findById(id).orElse(null);
    }
}
