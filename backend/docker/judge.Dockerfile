# --- Judge Environment ---
FROM debian:bookworm-slim

# Install compilers & runtimes
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    openjdk-17-jdk-headless python3 g++ coreutils bash procps && \
    useradd -m runner && \
    rm -rf /var/lib/apt/lists/*

USER runner
WORKDIR /home/runner/work
