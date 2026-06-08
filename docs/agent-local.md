# Agente Local

## Objetivo

Permitir impressao em cenarios hibridos onde a impressora esta acessivel apenas localmente.

## Estrutura

- app oficial: `apps/agent`
- gestao administrativa: `/api/agents`
- runtime do agente: `/api/agent-runtime`

## Fluxo

1. admin cria um `AgentNode`
2. sistema emite token unico do agente
3. agente sobe com `AGENT_TOKEN`
4. agente envia heartbeat
5. agente faz polling de jobs elegiveis
6. agente reporta resultado da tentativa

## Variaveis principais

- `AGENT_API_URL`
- `AGENT_TOKEN`
- `AGENT_VERSION`
- `AGENT_POLL_INTERVAL_MS`
- `AGENT_HEARTBEAT_INTERVAL_MS`

## Execucao local

```bash
pnpm --filter @easyprint/agent dev
```

## Observacao

No Marco 4, o agente ainda simula a impressao local. A arquitetura ja esta pronta para substituir a simulacao por adaptadores reais de impressora sem mexer no frontend.
