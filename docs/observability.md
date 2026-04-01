# Observabilidade

## O que entrou no Marco 4

- `correlationId` por request;
- log estruturado de request concluido/falhado;
- `GET /health`
- `GET /health/live`
- `GET /health/ready`
- `GET /observability/metrics`

## Sinais principais

Metricas atuais:

- templates por status;
- jobs por status;
- impressoras ativas;
- agentes online;
- aprovacoes pendentes;
- falhas recentes.

## Correlacao

O `correlationId` e propagado para:

- request log;
- `AuditLog`;
- `PrintJob`;
- `PrintJobEvent`;
- `JobDispatchAttempt`;
- `ElectronicSignatureRecord`.

## Evolucao recomendada

- exportar metricas para Prometheus/OpenTelemetry;
- separar logs tecnicos e logs de negocio;
- adicionar tracing distribuido entre API, worker, agente e integracoes.
