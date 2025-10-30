FROM debian:bookworm-slim

# Install compilers, interpreters, and basic tools
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        openjdk-17-jdk-headless \
        python3 \
        g++ \
        coreutils \
        bash \
        procps && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Create non-root user for secure execution
RUN useradd -m runner
USER runner
WORKDIR /home/runner/work

CMD ["bash"]
