FROM oven/bun:latest

WORKDIR /frontend

COPY package.json bun.lockb ./

RUN bun install

COPY . ./frontend/

RUN bun run build

EXPOSE 5173
