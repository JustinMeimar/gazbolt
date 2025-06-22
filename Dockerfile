FROM node:18-slim as development

# Install Python and git
RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    git \
    && rm -rf /var/lib/apt/lists/*

# Install bun
RUN npm install -g bun

# Install dragon-runner
RUN git clone https://github.com/cmput415/Dragon-Runner /app/dragon-runner && \
    cd /app/dragon-runner && \
    pip install --break-system-packages .

# Set up frontend
WORKDIR /app/frontend
COPY gazbolt/package.json gazbolt/bun.lock* ./
RUN bun install
COPY gazbolt/ .

# Expose ports
EXPOSE 5001 5173

# Start both frontnend and backend
CMD ["sh", "-c", "dragon-runner serve /app/dragon-runner/tests/configs/ --port ${DRAGON_RUNNER_PORT:-5001} & bun run dev --host 0.0.0.0 --port ${FRONTEND_PORT:-5173}"]
