import { AsyncLocalStorage } from "node:async_hooks";

export interface RequestContextState {
  correlationId: string;
  method: string;
  path: string;
  startedAt: number;
}

const storage = new AsyncLocalStorage<RequestContextState>();

export function runWithRequestContext<T>(
  context: RequestContextState,
  callback: () => T
): T {
  return storage.run(context, callback);
}

export function getRequestContext() {
  return storage.getStore();
}

export function getCorrelationId() {
  return storage.getStore()?.correlationId;
}
