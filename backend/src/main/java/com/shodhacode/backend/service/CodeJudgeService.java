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

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.*;
import java.time.LocalDateTime;
import java.util.*;

@Service
public class CodeJudgeService {

    @Autowired private ProblemRepository problemRepository;
    @Autowired private UserRepository userRepository;
    @Autowired private SubmissionRepository submissionRepository;

    /**
     * Triggered by controller — immediately returns "Pending" to frontend
     * and then asynchronously judges the code in Docker.
     */
    public Submission evaluateSubmission(Long problemId, Long userId, String code, String language,
                                         String input, String output) {

        Problem problem = problemRepository.findById(problemId).orElseThrow();
        User user = userRepository.findById(userId).orElseThrow();

        // Create new submission entry
        Submission submission = new Submission();
        submission.setProblem(problem);
        submission.setUser(user);
        submission.setCode(code);
        submission.setLanguage(language);
        submission.setStatus("Pending");
        submission.setSubmittedAt(LocalDateTime.now());
        submissionRepository.save(submission);

        // Run the judge asynchronously
        evaluateSubmissionAsync(submission.getId(), problemId, userId, code, language);

        return submission;
    }

    /**
     * Asynchronous code execution inside Docker container.
     */
    @Async
    public void evaluateSubmissionAsync(Long submissionId, Long problemId, Long userId,
                                        String code, String language) {
        try {
            Problem problem = problemRepository.findById(problemId).orElseThrow();
            Submission submission = submissionRepository.findById(submissionId).orElseThrow();

            submission.setStatus("Running");
            submissionRepository.save(submission);

            // Run the code in Docker and capture result
            String result = runCodeInDocker(code, language,
                    problem.getInputData(), problem.getExpectedOutput());

            submission.setStatus(result);
        } catch (Exception e) {
            e.printStackTrace();
            Submission s = submissionRepository.findById(submissionId).orElse(null);
            if (s != null) s.setStatus("System Error");
        } finally {
            Submission s = submissionRepository.findById(submissionId).orElse(null);
            if (s != null) {
                s.setSubmittedAt(LocalDateTime.now());
                submissionRepository.save(s);
            }
        }
    }

    /**
     * Runs given code safely inside a Docker container and compares output.
     */
    private String runCodeInDocker(String code, String language,
                               String input, String expectedOutput) throws Exception {

    Path tmpDir = Files.createTempDirectory("judge_");
    try {
        String filename;
        String compileCmd = "";
        String runCmd;

        // ✅ Detect Docker binary path (Windows vs Linux)
        String dockerCmd = System.getProperty("os.name").toLowerCase().contains("win")
                ? "C:\\\\Program Files\\\\Docker\\\\Docker\\\\resources\\\\bin\\\\docker.exe"
                : "docker";

        // ✅ Select commands based on language
        switch (language.toLowerCase()) {
            case "java" -> {
                filename = "Main.java";
                compileCmd = "javac Main.java";
                runCmd = "java Main";
            }
            case "cpp", "c++" -> {
                filename = "main.cpp";
                compileCmd = "g++ -O2 -std=c++17 main.cpp -o main";
                runCmd = "./main";
            }
            case "python", "py" -> {
                filename = "main.py";
                runCmd = "python3 main.py";
            }
            default -> throw new IllegalArgumentException("Unsupported language: " + language);
        }

        // ✅ Write code & input files
        Files.writeString(tmpDir.resolve(filename), code, StandardCharsets.UTF_8);
        Files.writeString(tmpDir.resolve("input.txt"),
                input == null ? "" : input, StandardCharsets.UTF_8);

        // ✅ Build the inner Docker command
        String innerCmd = String.format(
                "cd /home/runner/work && %s && timeout 5s %s < input.txt > output.txt 2>&1",
                compileCmd.isBlank() ? "true" : compileCmd,
                runCmd
        );

        // 🧩 Fix Windows path for Docker volume mount
        String volumePath = tmpDir.toAbsolutePath().toString();
        if (System.getProperty("os.name").toLowerCase().contains("win")) {
            volumePath = volumePath.replace("\\", "/");
            if (volumePath.charAt(1) == ':') {
                volumePath = "/" + Character.toLowerCase(volumePath.charAt(0)) + volumePath.substring(2);
            }
        }

        // ✅ Construct final Docker command
        List<String> command = List.of(
                dockerCmd, "run", "--rm",
                "--platform=linux/amd64",
                "--network=none",
                "--cpus=1", "--memory=256m",
                "-v", volumePath + ":/home/runner/work",
                "shodha/judge:latest",
                "bash", "-c", innerCmd
        );

        System.out.println("🚀 Running Docker Command: " + String.join(" ", command));

        // ✅ Execute the Docker command
        ProcessBuilder pb = new ProcessBuilder(command);
        pb.redirectErrorStream(true);
        Process process = pb.start();

        String logs = new String(process.getInputStream().readAllBytes(), StandardCharsets.UTF_8);
        int exitCode = process.waitFor();

        System.out.println("🐳 Docker Exit Code: " + exitCode);
        System.out.println("📜 Docker Logs:\n" + logs);

        // ✅ Read program output
        Path outputFile = tmpDir.resolve("output.txt");
        String output = Files.exists(outputFile)
                ? Files.readString(outputFile, StandardCharsets.UTF_8)
                : "";

        // ✅ Avoid null pointer on expectedOutput
        String safeExpected = (expectedOutput == null) ? "" : expectedOutput.trim();
        String safeOutput = output.trim();

        System.out.println("🖨️ Program Output: " + safeOutput);
        System.out.println("🧠 Expected Output: " + safeExpected);

        // ✅ Handle result conditions
        if (exitCode != 0) return "Runtime Error";
        if (safeExpected.isEmpty()) return safeOutput.isEmpty() ? "Empty Output" : "Accepted";
        return safeOutput.equals(safeExpected) ? "Accepted" : "Wrong Answer";

    } catch (Exception e) {
        e.printStackTrace();
        return "System Error";
    } finally {
        // ✅ Clean up temp files safely
        Files.walk(tmpDir)
                .sorted(Comparator.reverseOrder())
                .forEach(path -> {
                    try { Files.deleteIfExists(path); } catch (IOException ignored) {}
                });
    }
}

}
