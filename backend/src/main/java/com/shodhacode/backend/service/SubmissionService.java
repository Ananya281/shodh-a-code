package com.shodhacode.backend.service;

import com.shodhacode.backend.model.Submission;
import com.shodhacode.backend.repository.SubmissionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SubmissionService {

    @Autowired
    private SubmissionRepository submissionRepository;

    public List<Submission> getAllSubmissions() {
        return submissionRepository.findAll();
    }

    public Submission saveSubmission(Submission submission) {
        return submissionRepository.save(submission);
    }
}
