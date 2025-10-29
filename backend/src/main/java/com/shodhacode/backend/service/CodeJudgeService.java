package com.shodhacode.backend.service;

import com.shodhacode.backend.model.Submission;
import com.shodhacode.backend.model.Problem;
import com.shodhacode.backend.repository.SubmissionRepository;
import com.shodhacode.backend.repository.ProblemRepository;
import com.shodhacode.backend.util.LocalExecutor;
import com.shodhacode.backend.util.OutputComparator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class CodeJudgeService {

    @Autowired
    private SubmissionRepository submissionRepository;

    @Autowired
    private ProblemRepository problemRepository;

    @Autowired
    private LocalExecutor localExecutor;

    @Autowired
    private OutputComparator outputComparator;

    /**
     * Judge a submission (execute + compare output)
     */
    public Submission evaluateSubmission(Long problemId, Long userId, String code, String language, String inputData, String expectedOutput) {
        Submission submission = new Submission();
        submission.setProblem(problemRepository.findById(problemId).orElse(null));
        submission.setCode(code);
        submission.setLanguage(language);
        submission.setSubmittedAt(LocalDateTime.now());

        try {
            // Step 1. Execute code
            String actualOutput = localExecutor.runCode(language, code, inputData);

            // Step 2. Compare with expected output
            boolean isCorrect = outputComparator.compareOutputs(actualOutput, expectedOutput);
            submission.setStatus(isCorrect ? "Accepted" : "Wrong Answer");

        } catch (Exception e) {
            submission.setStatus("Runtime Error");
        }

        return submissionRepository.save(submission);
    }
}
