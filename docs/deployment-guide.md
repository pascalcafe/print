# Guia de Implantação (Produção)

Este documento descreve passo a passo como preparar, buildar, publicar e lançar o EasyPrint em um ambiente de produção (container registry + Kubernetes / Docker Compose). Inclui também verificações pós-deploy e rollback.

## 1. Pré-requisitos

- Conta em registry (GHCR, Docker Hub, ECR, GCR) com credenciais.
- Cluster Kubernetes (GKE/EKS/AKS/minikube/kind) ou host com `docker compose` para ambientes menores.
- `kubectl` e `helm` (se usar Helm).
- `gh` (opcional) para interagir com GitHub Actions.
- Acesso às variáveis de ambiente sensíveis (secrets manager).

## 2. Artefatos de build

1. Buildar imagens a partir das apps:

```bash
# Na raiz do monorepo
pnpm --filter @easyprint/api build
pnpm --filter @easyprint/web build
pnpm --filter @easyprint/worker build
```

2. (Opcional) Testes e checagens estáticas antes de build:

```bash
pnpm lint
pnpm typecheck
pnpm --filter @easyprint/api test # se houver testes
```

3. Build e tag de imagens Docker

```bash
docker build -f apps/api/Dockerfile -t ghcr.io/<org>/easyprint-api:{{SEMVER}} apps/api
docker build -f apps/web/Dockerfile -t ghcr.io/<org>/easyprint-web:{{SEMVER}} apps/web
docker build -f apps/worker/Dockerfile -t ghcr.io/<org>/easyprint-worker:{{SEMVER}} apps/worker

# Push
docker push ghcr.io/<org>/easyprint-api:{{SEMVER}}
docker push ghcr.io/<org>/easyprint-web:{{SEMVER}}
docker push ghcr.io/<org>/easyprint-worker:{{SEMVER}}
```

Recomendações:
- Use tags semânticas (`v1.2.3`) e `latest` somente para conveniência.
- Inclua metadados de build (`LABEL` com commit/sha) nas imagens.

## 3. CI/CD (exemplo com GitHub Actions)

Fluxo recomendado:
- `push` em `main` ou `releases/*` dispara `build -> test -> build-and-push-images`.
- Workflow separado para `deploy` que roda `kubectl apply` ou `helm upgrade` (protegido por ambiente/segredos).

Exemplo (esboço) GitHub Actions step para build+push:

```yaml
- name: Build and push API image
  uses: docker/build-push-action@v4
  with:
    context: ./apps/api
    file: ./apps/api/Dockerfile
    push: true
    tags: ghcr.io/${{ secrets.REGISTRY_OWNER }}/easyprint-api:${{ env.VERSION }}
```

Em `deploy`:
- Substitua imagens no `Deployment` (imagem: tag) e aplique manifests.
- Rode um `migration` job separado antes do rollout (veja seção 4).

## 4. Migrações de banco de dados

Importante: aplicar migrations antes do rollout para evitar incompatibilidades.

Opções:
- Job Kubernetes que roda `pnpm --filter @easyprint/api prisma:deploy` (imagem de deploy/build).
- Task CI que executa `prisma migrate deploy` contra o DB de produção, seguida por `kubectl rollout restart deployment/api`.

Exemplo de job one-shot (Kubernetes):

```yaml
apiVersion: batch/v1
kind: Job
metadata:
  name: easyprint-migrate
spec:
  template:
    spec:
      containers:
      - name: migrate
        image: ghcr.io/<org>/easyprint-api:{{SEMVER}}
        command: ["sh","-c","pnpm --filter @easyprint/api prisma:deploy"]
        envFrom:
        - secretRef:
            name: easyprint-secrets
      restartPolicy: Never
  backoffLimit: 2
```

Sequência segura:
1. Aplicar `Job` de migração e aguardar conclusão com sucesso.
2. Validar DB (logs, versão, integridade).
3. Atualizar Deployments com as novas imagens.

## 5. Kubernetes: Deploy e estratégia de rollout

Recomendações:
- Use `readinessProbe` e `livenessProbe` nas `Deployments`.
- Configure recursos (`requests/limits`) e `PodDisruptionBudget`.
- Utilize `RollingUpdate` com `maxUnavailable: 1` para zero-downtime simples.
- Para mudanças críticas de DB, prefira `blue/green` ou `canary`.

Comando de deploy:

```bash
kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/secrets.yaml
kubectl apply -f k8s/configmap.yaml
kubectl apply -f k8s/deployment-api.yaml
kubectl apply -f k8s/deployment-web.yaml
kubectl apply -f k8s/deployment-worker.yaml
```

Verificações:

```bash
kubectl -n easyprint rollout status deployment/api
kubectl -n easyprint get pods -w
kubectl -n easyprint logs deploy/api -c api
```

## 6. Secrets e configuração

- Armazene `DATABASE_URL`, `JWT_SECRET`, `NEXT_PUBLIC_API_URL`, e credenciais de registry em um secrets manager (Vault, AWS Secrets Manager, Kubernetes Secrets criptografados).
- Não versionar `infra/env.production` com segredos em repositório.

Exemplo de criação de secret no k8s:

```bash
kubectl create secret generic easyprint-secrets \
  --from-literal=DATABASE_URL='postgresql://user:pass@db:5432/dbname' \
  --from-literal=JWT_SECRET='...'
```

## 7. Verificações pós-deploy (smoke tests)

- Endpoints de health devem responder:

```bash
curl -fS http://<API_HOST>/api/health
```

- Executar smoke tests automatizados (curl + verificações básicas de API):

```bash
# exemplo
pnpm --filter @easyprint/api run test:smoke
```

- Verificar logs de erros e métricas (latência, erros 5xx).

## 8. Rollback e mitigação

- Se `kubectl rollout status` falhar, reverter para a revisão anterior:

```bash
kubectl -n easyprint rollout undo deployment/api
```

- Para problemas de dados, reverter a aplicação pode não ser suficiente; considere restaurar backup do DB.
- Tenha tags de imagem bem definidas para facilitar o rollback:

```bash
kubectl set image deployment/api api=ghcr.io/<org>/easyprint-api:previous-tag
```

## 9. Backups e migrações seguras

- Faça backups regulares do PostgreSQL (pg_dump ou solução gerenciada).

```bash
PGPASSWORD=$DB_PASS pg_dump -h $DB_HOST -U $DB_USER -d $DB_NAME -F c -b -v -f dump_$(date +%F).dump
```

- Teste sempre migrations em staging antes de production.

## 10. Observabilidade e alertas

- Configure logs centralizados (ELK/Fluentd/Datadog) e métricas (Prometheus/Grafana).
- Defina alertas para alta taxa de erros 5xx, aumentos de latência, pods crashlooping, e falha de migrations.

## 11. Monitoramento de saúde e SLAs

- Health endpoint `/api/health` deve incluir checks: DB, conexões externas e readiness.
- Tenha dashboards para:
  - taxa de erros por endpoint
  - latência p95/p99
  - utilização de CPU/mem do DB

## 12. Checklist de pré-deploy (resumido)

- [ ] Código revisado e testes automáticos verdes
- [ ] Imagens buildadas e empurradas ao registry
- [ ] Migrações testadas em staging
- [ ] Backups recentes criados
- [ ] Secrets atualizados em production
- [ ] Monitoramento e alertas configurados

## 13. Comandos úteis

```bash
# Aplicar manifests
kubectl apply -f k8s/

# Verificar rollout
kubectl -n easyprint rollout status deployment/api

# Logs
kubectl -n easyprint logs -l app=api --since=10m

# Rollback
kubectl -n easyprint rollout undo deployment/api
```

## 14. Troubleshooting rápido

- Migration falhou: verificar logs do job `kubectl logs job/easyprint-migrate` e restaurar backup se necessário.
- Pods crashloop: `kubectl describe pod <pod>` e `kubectl logs <pod>`.
- Timeouts/latência alta: aumentar recursos ou verificar conexões com DB.

---

Se desejar, eu posso:
- Gerar um `k8s/` inicial com `deployment-api.yaml`, `service.yaml`, `ingress.yaml` e `job-migrate.yaml` baseado nas práticas acima; ou
- Criar GitHub Actions workflow `ci/build-and-push.yml` e `ci/deploy.yml` como exemplos prontos para usar.
