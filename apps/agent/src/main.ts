type AgentDispatchPayload = {
  dispatchAttemptId: string;
  correlationId: string;
  job: {
    id: string;
    mode: string;
    templateId: string;
    templateVersion: number;
    payload: Record<string, unknown>;
    printer?: {
      id: string;
      name: string;
      code: string;
    } | null;
    printProfile?: {
      id: string;
      name: string;
    } | null;
  };
};

const API_URL = process.env.AGENT_API_URL ?? "http://127.0.0.1:4000/api";
const AGENT_TOKEN = process.env.AGENT_TOKEN ?? "";
const AGENT_VERSION = process.env.AGENT_VERSION ?? "0.1.0";
const POLL_INTERVAL_MS = Number(process.env.AGENT_POLL_INTERVAL_MS ?? 5000);
const HEARTBEAT_INTERVAL_MS = Number(process.env.AGENT_HEARTBEAT_INTERVAL_MS ?? 15000);

if (!AGENT_TOKEN) {
  throw new Error("Defina AGENT_TOKEN para iniciar o agente local do EasyPrint.");
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function agentFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      "x-agent-token": AGENT_TOKEN,
      ...(init?.headers ?? {})
    }
  });

  if (!response.ok) {
    throw new Error(`Agent request failed: ${response.status} ${await response.text()}`);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

async function sendHeartbeat() {
  return agentFetch<{ acknowledged: boolean; serverTime: string }>("/agent-runtime/heartbeat", {
    method: "POST",
    body: JSON.stringify({
      status: "online",
      version: AGENT_VERSION,
      hostname: process.env.COMPUTERNAME ?? "local-host"
    })
  });
}

async function claimNextJob() {
  return agentFetch<AgentDispatchPayload | null>("/agent-runtime/jobs/next", {
    method: "GET"
  });
}

async function reportDispatch(
  dispatchAttemptId: string,
  payload: {
    status: "completed" | "failed";
    retryable?: boolean;
    errorMessage?: string;
    response?: Record<string, unknown>;
  }
) {
  return agentFetch(`/agent-runtime/dispatch-attempts/${dispatchAttemptId}/result`, {
    method: "POST",
    body: JSON.stringify(payload)
  });
}

async function processDispatch(dispatch: AgentDispatchPayload) {
  const startedAt = new Date().toISOString();
  console.log(
    `[agent] processing job=${dispatch.job.id} printer=${dispatch.job.printer?.name ?? "n/a"} correlation=${dispatch.correlationId}`
  );

  await sleep(600);

  const simulateFailure = dispatch.job.payload?.simulateFailure === true;
  if (simulateFailure) {
    await reportDispatch(dispatch.dispatchAttemptId, {
      status: "failed",
      retryable: true,
      errorMessage: "Falha simulada pelo agente local para validacao operacional",
      response: {
        simulated: true,
        startedAt
      }
    });
    return;
  }

  await reportDispatch(dispatch.dispatchAttemptId, {
    status: "completed",
    response: {
      simulated: true,
      printedAt: new Date().toISOString(),
      startedAt,
      printerCode: dispatch.job.printer?.code ?? null,
      templateVersion: dispatch.job.templateVersion
    }
  });
}

async function main() {
  console.log(`[agent] EasyPrint local agent booting against ${API_URL}`);
  let lastHeartbeatAt = 0;

  for (;;) {
    try {
      if (Date.now() - lastHeartbeatAt >= HEARTBEAT_INTERVAL_MS) {
        const heartbeat = await sendHeartbeat();
        lastHeartbeatAt = Date.now();
        console.log(`[agent] heartbeat acknowledged at ${heartbeat.serverTime}`);
      }

      const dispatch = await claimNextJob();
      if (!dispatch) {
        await sleep(POLL_INTERVAL_MS);
        continue;
      }

      await processDispatch(dispatch);
    } catch (error) {
      console.error("[agent] loop failed", error);
      await sleep(POLL_INTERVAL_MS);
    }
  }
}

void main();
