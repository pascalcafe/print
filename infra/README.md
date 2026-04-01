# Infra Local

## Servicos

- PostgreSQL
- Redis
- RabbitMQ

## Subir ambiente

```bash
docker compose -f infra/docker-compose.yml up -d
```

## Credenciais padrao

- PostgreSQL: `easyprint / easyprint`
- RabbitMQ: `easyprint / easyprint`

## Proximo passo apos subir

```bash
pnpm db:migrate
pnpm --filter @easyprint/prisma generate
```

