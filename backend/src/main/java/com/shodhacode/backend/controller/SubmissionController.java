package com.shodhacode.backend.controller;

import com.shodhacode.backend.model.Submission;
import com.shodhacode.backend.service.CodeJudgeService;
import com.shodhacode.backend.repository.SubmissionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/submissions")
@CrossOrigin(origins = "*") // ✅ allow frontend (React) to connect
public class SubmissionController {

    @Autowired
    private CodeJudgeService codeJudgeService;

    @Autowired
    private SubmissionRepository submissionRepository;

    // ✅ POST: Create + Judge new submission
    @PostMapping
    public Submission judgeCode(@RequestBody Submission submission) {
        if (submission.getProblem() == null || submission.getUser() == null) {
            throw new IllegalArgumentException("❌ Missing problem or user details in submission");
        }

        // Evaluate submission
        Submission evaluated = codeJudgeService.evaluateSubmission(
                submission.getProblem().getId(),
                submission.getUser().getId(),
                submission.getCode(),
                submission.getLanguage(),
                "", ""  // Placeholder input/output
        );

        // Persist the evaluated result
        return submissionRepository.save(evaluated);
    }

    // ✅ GET: Polling by submissionId
    @GetMapping("/{id}")
    public Submission getSubmissionById(@PathVariable Long id) {
        return submissionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Submission not found"));
    }
}
