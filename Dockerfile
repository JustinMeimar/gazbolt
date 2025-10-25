FROM oven/bun:1-alpine AS frontend
WORKDIR /app/gazbolt
COPY ./gazbolt .
ARG VITE_BACKEND_URI
RUN bun add -D vite
RUN VITE_BACKEND_URI="$VITE_BACKEND_URI" bun run build

# fooey
FROM python:3.11-slim AS backend
RUN apt-get update && apt-get install -y llvm-19 llvm-19-tools && rm -rf /var/lib/apt/lists/*
RUN ln -s /usr/bin/lli-19 /usr/bin/lli && ln -s /usr/bin/clang-19 /usr/bin/clang
RUN useradd -m -u 1000 gazbolt

WORKDIR /usr/bin/gazbolt
COPY --chown=gazbolt:gazbolt ./bin /usr/bin
COPY --chown=gazbolt:gazbolt ./lib /usr/lib

WORKDIR /app/dragon-runner
COPY --chown=gazbolt:gazbolt ./dragon-runner .
RUN pip install .

COPY --chown=gazbolt:gazbolt --from=frontend /app/gazbolt/build /app/gazbolt/build

USER gazbolt
ENV DR_SERVER_MODE=PROD
ENV DR_STATIC_DIR="/app/gazbolt/build"
EXPOSE 8000
CMD ["dragon-runner", "serve", "--port", "8000", "./tests/configs/gazbolt-configs"]
