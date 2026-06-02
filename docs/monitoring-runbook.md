# Runbook de Monitoramento, Logs e Alertas — Nível Sênior

Visão geral
- Objetivo: garantir observabilidade completa (métricas, traces, logs) para detectar regressões de performance, falhas funcionais e riscos operacionais; permitir resposta e recuperação rápidas.
- Escopo: `apps/api`, `apps/web`, `apps/worker`, infra (Postgres, Redis, RabbitMQ), k8s deployments/Jobs, migration job.

Pilares
- Métricas de infraestrutura: CPU, memória, uso de disco, latência de rede, I/O de disco.
- Métricas de aplicação: latências (p95/p99), throughput (req/s), taxa de erros (4xx/5xx), conexões DB ativas, pool wait time, filas (len), retries.
- Logs estruturados: JSON com fields: timestamp, level, service, trace_id, span_id, request_id, user_id (quando aplicável), route, duration_ms, error.code, error.message.
- Tracing distribuído: instrumentar com OpenTelemetry, propagar traceparent entre serviços.
- Alertas e SLOs: definir SLOs claros e alertas com runbooks acionáveis.

Recomendações de stack (opcional/produção)
- Métricas: Prometheus + Alertmanager
- Dashboards: Grafana (Loki/Grafana Tempo integração)
- Logs: Grafana Loki (ou ELK/Opensearch se já existente)
- Traces: Grafana Tempo ou Jaeger
- Instrumentação: OpenTelemetry SDK (Node.js) + OTLP exporter (OTLP/gRPC para collector)
- Collector: Otel Collector como sidecar ou centralizado para processamento e exportação

Instrumentação (aplicações Node.js)
- Adicionar `@opentelemetry/sdk-node` + `@opentelemetry/instrumentation-http`, `@opentelemetry/instrumentation-express` (ou NestJS), `@opentelemetry/instrumentation-pg`, `@opentelemetry/instrumentation-redis`, `@opentelemetry/instrumentation-amqplib`.
- Gerar e propagar `traceId`/`spanId` e incluir nos logs. Exemplo de fields de log JSON: `{"ts":"...","level":"info","svc":"api","trace_id":"...","req_id":"...","msg":"..."}`.
- Expor métricas prometheus via `/metrics` endpoint (use `prom-client`), incluir histogramas para latência de handler e resumo de DB query durations.

Prometheus & Alertmanager
- Scrape targets: `api:4000/metrics`, `web:3000/metrics` (se aplicável), `kube-state-metrics`, `node-exporter`.
- Rules sugeridas:
  - High error rate: `increase(http_requests_total{job="api",status=~"5.."}[5m]) / increase(http_requests_total{job="api"}[5m]) > 0.01` → P1
  - Latency SLO breach: `histogram_quantile(0.95, sum(rate(http_request_duration_seconds_bucket[5m])) by (le,job,route)) > 0.5` (ajustar por rota)
  - DB connection exhaustion: `pg_connections > 0.8 * max_connections`
  - Migration Job failed: alert on k8s job failed status
- Rotas de alerta: PagerDuty (P1), Slack (P2/P3), email (informativo)
- Escalonamento: P1 (15m nocturnal, 5m business), P2 (30m), P3 (inform)

Dashboards (Grafana)
- API Overview: RPS, 5xx rate, p50/p95/p99 latencies, active requests, DB connections
- DB Dashboard: slow queries, locks, long transactions, connections, replication lag (se aplicável)
- Worker Dashboard: queue depth, process uptime, failed jobs, retries
- Infra: CPU/mem/disk for DB, redis, rabbitmq

Logging
- Formato: JSON estruturado, nível por ambiente (info in prod, debug in staging)
- Retenção: 30d para logs de produção por padrão; index apenas campos críticos (service, level, trace_id, request_id, timestamp, error.code)
- Rotas: ingest via OTEL collector → Loki/ELK; configurar rate-limits e sampling nos traces para reduzir volume.

Tracing
- Amostragem: 100% em staging, 5-10% em produção (aumentar na investigação)
- Conectar traces com logs via `trace_id` e `span_id` para triagem mais eficiente

Runbooks de incidentes (exemplos resumidos)
1) API 5xx spike
- Verificar dashboards: qual rota tem maior p95/p99
- Checar logs filtrando `level=error` e rota/trace_id
- Identificar se é DB/resource exhaustion → conectar ao Postgres (psql) e inspecionar locks/long transactions
- Se rollback necessário: usar imagem anterior via k8s rollout undo (ver abaixo)

2) Migration falhou e bloqueou deploy
- Verificar logs do Job: `kubectl -n <ns> logs job/migrate` ou `docker compose logs migration`
- Reverter migration se suporte; se não, restaurar DB a partir de backup e aplicar migração incremental localmente
- Abortar rollout: `kubectl rollout pause deployment/api` e investigar

3) DB connection exhausted
- Verificar pool config (`prisma` client pool settings), aumento temporário de replicas não resolve
- Escalar verticalmente a instância DB ou ajustar `max_connections`

Runbook: rollback rápido (k8s)
- `kubectl -n <ns> rollout undo deployment/api --to-revision=<n-1>`
- Validar endpoints health and metrics after rollback; if rollback fails, redeploy last known good image tag

Checklist pré-deploy de produção
- Backups de banco feitos e verificados (snapshot + logical dump)
- Migration testadas em staging com dataset representativo
- Alerting e dashboards configurados e validados
- Secrets e config map atualizados e revisados

Ações recomendadas imediatas para este repositório
- Adicionar `/metrics` endpoint em `apps/api` (prom-client) e instrumentar handlers.
- Instrumentar DB queries e adicionar `prom-client` histograms for query durations.
- Instalar OpenTelemetry collector em staging e rodar a pequena pipeline: OTLP -> tempo/Loki/Prometheus remote write.
- Criar dashboards mínimos em Grafana e importar alert rules básicas.
- Automatizar backups antes de migrations (`pre-migration` job).

Conclusão
- Este runbook é um ponto de partida técnico: implemente instrumentação mínima (metrics + traces + structured logs) e adicione Alertmanager rules prioritárias. Após a instrumentação, revisar SLOs e ajustar thresholds com base em tráfego real.

Arquivo de referência rápido
- `infra/docker-compose.prod.yml` — migration job e serviços
- `k8s/job-migrate.yaml` — job k8s para migrar
- `k8s/deployment-api.yaml` — health probes e resources

-- Fim --
