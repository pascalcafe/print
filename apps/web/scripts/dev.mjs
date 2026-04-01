import { existsSync, rmSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectDir = resolve(__dirname, "..");
const nextDir = resolve(projectDir, ".next");
const pnpmCommand = process.platform === "win32" ? "pnpm.cmd" : "pnpm";

if (existsSync(nextDir)) {
  rmSync(nextDir, { recursive: true, force: true });
  console.log("[web-dev] cache .next limpo antes de iniciar o Next dev");
}

const child = spawn(
  pnpmCommand,
  ["exec", "next", "dev", "--hostname", "127.0.0.1", "--port", "3000"],
  {
    cwd: projectDir,
    stdio: "inherit",
    shell: process.platform === "win32"
  }
);

child.on("error", (error) => {
  console.error("[web-dev]", error.message);
  process.exit(1);
});

child.on("exit", (code) => {
  process.exit(code ?? 0);
});
