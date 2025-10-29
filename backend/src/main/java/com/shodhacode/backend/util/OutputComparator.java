package com.shodhacode.backend.util;

import org.springframework.stereotype.Component;

@Component
public class OutputComparator {

    /**
     * Compares expected vs actual output (ignoring trailing spaces, line breaks)
     */
    public boolean compareOutputs(String actual, String expected) {
        if (actual == null || expected == null) return false;
        String normalizedActual = actual.trim().replaceAll("\\s+", " ");
        String normalizedExpected = expected.trim().replaceAll("\\s+", " ");
        return normalizedActual.equalsIgnoreCase(normalizedExpected);
    }
}
