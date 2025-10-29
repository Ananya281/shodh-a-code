package com.shodhacode.backend.repository;

import com.shodhacode.backend.model.Submission;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface SubmissionRepository extends JpaRepository<Submission, Long> {
    // all submissions whose problem belongs to a given contest
    List<Submission> findByProblem_Contest_Id(Long contestId);
}
