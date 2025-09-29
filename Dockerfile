FROM oven/bun:1-alpine AS builder

WORKDIR /app/gazbolt
COPY ./gazbolt .

RUN bun run build

FROM python:3-alpine

WORKDIR /app/gazbolt/build
COPY --from=builder /app/gazbolt/build .

EXPOSE 8000
CMD ["python3", "-m", "http.server", "--directory", "."]
