package com.shodhacode.backend.controller;

import com.shodhacode.backend.model.Submission;
import com.shodhacode.backend.service.CodeJudgeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/judge")
public class SubmissionController {

    @Autowired
    private CodeJudgeService codeJudgeService;

    @PostMapping
    public Submission judgeCode(
            @RequestParam Long problemId,
            @RequestParam Long userId,
            @RequestParam String language,
            @RequestBody String code,
            @RequestParam String input,
            @RequestParam String expectedOutput) {
        return codeJudgeService.evaluateSubmission(problemId, userId, code, language, input, expectedOutput);
    }
}
