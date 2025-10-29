package com.shodhacode.backend.repository;

import com.shodhacode.backend.model.Contest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContestRepository extends JpaRepository<Contest, Long> { }
