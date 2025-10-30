package com.shodhacode.backend.controller;

import com.shodhacode.backend.model.Submission;
import com.shodhacode.backend.repository.SubmissionRepository;
import com.shodhacode.backend.service.CodeJudgeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/submissions")
@CrossOrigin(origins = "*") // allow frontend access
public class SubmissionController {

    @Autowired
    private CodeJudgeService codeJudgeService;

    @Autowired
    private SubmissionRepository submissionRepository;

    // ✅ POST: create + judge submission
    @PostMapping
    public Submission judgeCode(@RequestBody Submission submission) {
        if (submission.getProblem() == null || submission.getUser() == null) {
            throw new IllegalArgumentException("❌ Missing problem or user details in submission");
        }

        // ✅ Trigger judge service
        Submission saved = codeJudgeService.evaluateSubmission(
                submission.getProblem().getId(),
                submission.getUser().getId(),
                submission.getCode(),
                submission.getLanguage(),
                "", ""
        );

        // ✅ Return the same saved submission object (already has ID)
        return saved;
    }

    // ✅ GET: fetch submission status (for polling)
    @GetMapping("/{id}")
    public Submission getSubmissionById(@PathVariable Long id) {
        return submissionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("❌ Submission not found"));
    }
}
