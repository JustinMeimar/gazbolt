FROM oven/bun:1-alpine AS frontend
WORKDIR /app/gazbolt
COPY ./gazbolt .
ARG VITE_BACKEND_URI
RUN VITE_BACKEND_URI="$VITE_BACKEND_URI" bun run build

FROM python:3.10-slim AS backend

# Create user
RUN useradd -m -u 1000 gazbolt

# Copy and set binary permissions as root
WORKDIR /usr/bin/gazbolt
COPY ./bin .
RUN chmod 111 * && chown root:root *

# Install dragon-runner as root (installs to system PATH)
WORKDIR /app/dragon-runner
COPY ./dragon-runner .
RUN pip install .

# Copy frontend build
COPY --from=frontend /app/gazbolt/build /app/gazbolt/build

# Switch to non-root user for runtime
USER gazbolt

ENV DR_SERVER_MODE=PROD
ENV DR_STATIC_DIR="/app/gazbolt/build"
EXPOSE 8001

CMD ["dragon-runner", "serve", "--port", "8001", "./tests/configs/gazbolt-configs"]
