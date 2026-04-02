import { createServer } from "node:net";
import { existsSync, readFileSync, rmSync, unlinkSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectDir = resolve(__dirname, "..");
const nextDir = resolve(projectDir, ".next");
const tsBuildInfo = resolve(projectDir, "tsconfig.tsbuildinfo");
const lockFile = resolve(projectDir, ".web-dev.lock");
const pnpmCommand = process.platform === "win32" ? "pnpm.cmd" : "pnpm";

function ensurePortAvailable(port, label) {
  return new Promise((resolve, reject) => {
    const server = createServer();
    server.unref();
    server.on("error", (error) => {
      if (error.code === "EADDRINUSE") {
        reject(
          new Error(
            `A porta ${port} ja esta em uso. Feche a instancia atual antes de iniciar outro ${label}.`
          )
        );
        return;
      }

      reject(error);
    });

    server.listen(port, "127.0.0.1", () => {
      server.close((closeError) => {
        if (closeError) {
          reject(closeError);
          return;
        }

        resolve();
      });
    });
  });
}

function isProcessAlive(pid) {
  try {
    process.kill(pid, 0);
    return true;
  } catch {
    return false;
  }
}

function releaseLock() {
  if (existsSync(lockFile)) {
    unlinkSync(lockFile);
  }
}

if (existsSync(lockFile)) {
  try {
    const lock = JSON.parse(readFileSync(lockFile, "utf8"));
    if (lock?.pid && isProcessAlive(lock.pid)) {
      console.error(
        `[web-dev] Ja existe um launcher ativo para o web app (pid ${lock.pid}). Feche a instancia atual antes de iniciar outra.`
      );
      process.exit(1);
    }

    releaseLock();
  } catch {
    releaseLock();
  }
}

await ensurePortAvailable(3000, "web app");

writeFileSync(
  lockFile,
  JSON.stringify(
    {
      pid: process.pid,
      startedAt: new Date().toISOString()
    },
    null,
    2
  )
);

if (existsSync(nextDir)) {
  rmSync(nextDir, { recursive: true, force: true });
  console.log("[web-dev] cache .next limpo antes de iniciar o Next dev");
}

if (existsSync(tsBuildInfo)) {
  rmSync(tsBuildInfo, { force: true });
  console.log("[web-dev] cache tsconfig.tsbuildinfo limpo antes de iniciar o Next dev");
}

const child = spawn(
  pnpmCommand,
  ["exec", "next", "dev", "--turbopack", "--hostname", "127.0.0.1", "--port", "3000"],
  {
    cwd: projectDir,
    stdio: "inherit",
    shell: process.platform === "win32"
  }
);

child.on("error", (error) => {
  releaseLock();
  console.error("[web-dev]", error.message);
  process.exit(1);
});

child.on("exit", (code) => {
  releaseLock();
  process.exit(code ?? 0);
});

const shutdown = (signal) => {
  releaseLock();
  if (!child.killed) {
    child.kill(signal);
  }
};

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
