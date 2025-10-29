package com.shodhacode.backend.repository;

import com.shodhacode.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> { }
