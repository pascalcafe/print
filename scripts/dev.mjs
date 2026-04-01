import { createServer } from "node:net";
import { spawn } from "node:child_process";

const pnpmCommand = process.platform === "win32" ? "pnpm.cmd" : "pnpm";

function ensurePortAvailable(port, label) {
  return new Promise((resolve, reject) => {
    const server = createServer();
    server.unref();
    server.on("error", (error) => {
      if (error.code === "EADDRINUSE") {
        reject(
          new Error(
            `A porta ${port} ja esta em uso. Libere essa porta antes de iniciar o ${label}.`
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

function run(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      stdio: "inherit",
      shell: process.platform === "win32",
      ...options
    });

    child.on("error", reject);
    child.on("exit", (code) => {
      if (code === 0) {
        resolve();
        return;
      }

      reject(new Error(`Comando falhou com codigo ${code ?? "desconhecido"}`));
    });
  });
}

async function main() {
  await ensurePortAvailable(3000, "web app");
  await ensurePortAvailable(4000, "api");

  console.log("");
  console.log("EasyPrint dev");
  console.log("Login:     http://127.0.0.1:3000/login");
  console.log("Templates: http://127.0.0.1:3000/");
  console.log("API:       http://127.0.0.1:4000/api");
  console.log("Bootstrap: admin@easyprint.local / EasyPrint123!");
  console.log("");

  await run(pnpmCommand, ["--filter", "@easyprint/shared", "build"]);

  const child = spawn(
    pnpmCommand,
    [
      "--stream",
      "--parallel",
      "--filter",
      "@easyprint/shared",
      "--filter",
      "@easyprint/web",
      "--filter",
      "@easyprint/api",
      "dev"
    ],
    {
      stdio: "inherit",
      shell: process.platform === "win32"
    }
  );

  const shutdown = (signal) => {
    if (!child.killed) {
      child.kill(signal);
    }
  };

  process.on("SIGINT", () => shutdown("SIGINT"));
  process.on("SIGTERM", () => shutdown("SIGTERM"));

  child.on("error", (error) => {
    console.error("[dev]", error.message);
    process.exit(1);
  });

  child.on("exit", (code) => {
    process.exit(code ?? 0);
  });
}

main().catch((error) => {
  console.error("");
  console.error("[dev]", error.message);
  console.error("Sugestao: feche instancias anteriores do EasyPrint e rode `pnpm dev` novamente.");
  process.exit(1);
});
