package com.shodhacode.backend.service;

import com.shodhacode.backend.model.Problem;
import com.shodhacode.backend.model.Submission;
import com.shodhacode.backend.model.User;
import com.shodhacode.backend.repository.ProblemRepository;
import com.shodhacode.backend.repository.SubmissionRepository;
import com.shodhacode.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.io.*;
import java.nio.charset.StandardCharsets;
import java.nio.file.*;
import java.time.LocalDateTime;
import java.util.*;

@Service
public class CodeJudgeService {

    @Autowired private ProblemRepository problemRepository;
    @Autowired private UserRepository userRepository;
    @Autowired private SubmissionRepository submissionRepository;

    @Async
    public void evaluateSubmissionAsync(Long problemId, Long userId, String code, String language) {
        Problem problem = problemRepository.findById(problemId).orElseThrow();
        User user = userRepository.findById(userId).orElseThrow();

        Submission submission = new Submission();
        submission.setProblem(problem);
        submission.setUser(user);
        submission.setCode(code);
        submission.setLanguage(language);
        submission.setStatus("Running");
        submission.setSubmittedAt(LocalDateTime.now());
        submissionRepository.save(submission);

        try {
            String result = runCodeInDocker(code, language, problem.getInputData(), problem.getExpectedOutput());
            submission.setStatus(result);
        } catch (Exception e) {
            e.printStackTrace();
            submission.setStatus("System Error");
        } finally {
            submission.setSubmittedAt(LocalDateTime.now());
            submissionRepository.save(submission);
        }
    }

    private String runCodeInDocker(String code, String language, String input, String expectedOutput) throws Exception {
        Path tmpDir = Files.createTempDirectory("judge_");
        try {
            String filename;
            String compileCmd = "";
            String runCmd;

            // Language specific logic
            switch (language.toLowerCase()) {
                case "java":
                    filename = "Main.java";
                    compileCmd = "javac Main.java";
                    runCmd = "timeout 5s java Main";
                    break;
                case "cpp":
                case "c++":
                    filename = "main.cpp";
                    compileCmd = "g++ -O2 -std=c++17 main.cpp -o main";
                    runCmd = "timeout 5s ./main";
                    break;
                case "python":
                case "py":
                    filename = "main.py";
                    runCmd = "timeout 5s python3 main.py";
                    break;
                default:
                    throw new IllegalArgumentException("Unsupported language: " + language);
            }

            // Write code & input files
            Files.writeString(tmpDir.resolve(filename), code, StandardCharsets.UTF_8);
            Files.writeString(tmpDir.resolve("input.txt"), input == null ? "" : input, StandardCharsets.UTF_8);

            // Docker command
            String dockerCmd = String.format(
                    "cd /home/runner/work && %s && %s < input.txt > output.txt 2>&1",
                    compileCmd, runCmd
            );

            List<String> command = Arrays.asList(
                    "docker", "run", "--rm",
                    "--network=none",
                    "--cpus=1", "--memory=256m",
                    "-v", tmpDir.toAbsolutePath() + ":/home/runner/work",
                    "shodha/judge:latest",
                    "bash", "-c", dockerCmd
            );

            ProcessBuilder pb = new ProcessBuilder(command);
            pb.redirectErrorStream(true);
            Process process = pb.start();

            // Capture docker output (logs)
            try (BufferedReader reader = new BufferedReader(
                    new InputStreamReader(process.getInputStream()))) {
                reader.lines().forEach(System.out::println);
            }

            int exitCode = process.waitFor();
            if (exitCode != 0) {
                System.err.println("Docker exited with code: " + exitCode);
            }

            // Read the result file
            Path outputFile = tmpDir.resolve("output.txt");
            String output = Files.exists(outputFile)
                    ? Files.readString(outputFile, StandardCharsets.UTF_8)
                    : "No Output";

            // Compare result
            return output.trim().equals(expectedOutput.trim()) ? "Accepted" : "Wrong Answer";

        } finally {
            // Cleanup temp directory
            Files.walk(tmpDir)
                    .sorted(Comparator.reverseOrder())
                    .forEach(path -> {
                        try { Files.deleteIfExists(path); } catch (IOException ignored) {}
                    });
        }
    }

    public Submission evaluateSubmission(Long problemId, Long userId, String code, String language, String input, String output) {
        evaluateSubmissionAsync(problemId, userId, code, language);
        Submission s = new Submission();
        s.setStatus("Pending");
        s.setSubmittedAt(LocalDateTime.now());
        return s;
    }
}
