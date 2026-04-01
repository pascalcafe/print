# Fluxo de Aprovacao e Assinatura

## Status do template

- `draft`
- `in_review`
- `approved`
- `published`
- `archived`

## Endpoints

- `GET /api/templates/:id/approvals`
- `POST /api/templates/:id/review`
- `POST /api/templates/:id/approval`
- `POST /api/templates/:id/publish`
- `POST /api/templates/:id/versions/:version/rollback`

## Assinatura eletronica

No corte atual, a assinatura eletronica e uma confirmacao reforcada por senha do proprio usuario autenticado.

Ela gera `ElectronicSignatureRecord` com:

- usuario;
- tenant;
- entidade;
- acao;
- motivo;
- contexto;
- `correlationId`.

## Regras atuais

- apenas `draft` pode ser enviado para revisao;
- apenas `approved` pode ser publicado;
- rollback sempre cria uma nova versao `draft`;
- publicacao, rollback e decisao de aprovacao exigem assinatura.
