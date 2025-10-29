package com.shodhacode.backend.util;

import org.springframework.stereotype.Component;
import java.io.*;

@Component
public class LocalExecutor {

    /**
     * Executes code locally (supports Python, C++, Java).
     * For safety, runs in temp directory with simple IO.
     */
    public String runCode(String language, String code, String input) throws Exception {
        File tempDir = new File(System.getProperty("java.io.tmpdir"));
        File codeFile;
        String command;
        String result;

        switch (language.toLowerCase()) {
            case "python":
                codeFile = new File(tempDir, "Main.py");
                try (FileWriter writer = new FileWriter(codeFile)) {
                    writer.write(code);
                }
                command = "python " + codeFile.getAbsolutePath();
                result = executeCommand(command, input);
                break;

            case "cpp":
            case "c++":
                codeFile = new File(tempDir, "Main.cpp");
                try (FileWriter writer = new FileWriter(codeFile)) {
                    writer.write(code);
                }
                Process compile = new ProcessBuilder("g++", codeFile.getAbsolutePath(), "-o", tempDir + "/Main").start();
                compile.waitFor();
                command = tempDir + "/Main";
                result = executeCommand(command, input);
                break;

            case "java":
                File javaFile = new File(tempDir, "Main.java");
                try (FileWriter writer = new FileWriter(javaFile)) {
                    writer.write(code);
                }
                Process compileJava = new ProcessBuilder("javac", javaFile.getAbsolutePath()).start();
                compileJava.waitFor();
                command = "java -cp " + tempDir + " Main";
                result = executeCommand(command, input);
                break;

            default:
                throw new Exception("Unsupported language: " + language);
        }

        return result.trim();
    }

    private String executeCommand(String command, String input) throws IOException, InterruptedException {
        ProcessBuilder builder = new ProcessBuilder(command.split(" "));
        builder.redirectErrorStream(true);
        Process process = builder.start();

        if (input != null && !input.isEmpty()) {
            try (BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(process.getOutputStream()))) {
                writer.write(input);
                writer.flush();
            }
        }

        BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
        StringBuilder output = new StringBuilder();
        String line;
        while ((line = reader.readLine()) != null) {
            output.append(line).append("\n");
        }

        process.waitFor();
        return output.toString();
    }
}
