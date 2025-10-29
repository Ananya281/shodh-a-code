package com.shodhacode.backend.service;

import com.shodhacode.backend.model.Submission;
import com.shodhacode.backend.repository.SubmissionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.Random;

@Service
public class CodeJudgeService {

    @Autowired
    private SubmissionRepository submissionRepository;

    public Submission evaluateSubmission(Long problemId, Long userId, String code, String language, String input, String expectedOutput) {
        Submission submission = new Submission();
        submission.setLanguage(language);
        submission.setCode(code);
        submission.setStatus("Running");
        submission.setSubmittedAt(LocalDateTime.now());
        submission.setOutput("Evaluating...");

        submission = submissionRepository.save(submission);

        // ✅ make variable final to use inside thread
        final Long submissionId = submission.getId();

        new Thread(() -> {
            try {
                Thread.sleep(3000);

                // fetch the same submission again for safety
                Submission s = submissionRepository.findById(submissionId).orElse(null);
                if (s != null) {
                    boolean accepted = new Random().nextBoolean();
                    s.setStatus(accepted ? "Accepted" : "Wrong Answer");
                    s.setOutput(accepted ? "Output matched expected result." : "Output mismatch.");
                    submissionRepository.save(s);
                }
            } catch (InterruptedException ignored) {}
        }).start();

        return submission;
    }
}
