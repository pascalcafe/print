# Marco 4 - Arquitetura Enterprise

O Marco 4 consolida o EasyPrint como plataforma enterprise sem reescrever a base dos marcos anteriores.

## Frentes implementadas

- identidade corporativa via providers OIDC por tenant;
- governanca formal de templates com `draft`, `in_review`, `approved`, `published` e `archived`;
- assinatura eletronica por confirmacao de senha para acoes criticas;
- observabilidade com `correlationId`, logs estruturados, health checks e metricas;
- agente local oficial para cenarios hibridos de impressao;
- jobs mais resilientes com idempotencia opcional, tentativas maximas e backoff.

## Decisoes centrais

- O RBAC interno continua sendo a autoridade de autorizacao do EasyPrint.
- O login corporativo apenas autentica e vincula o usuario a um tenant; permissoes continuam internas.
- O template JSON continua sendo a fonte unica da verdade para editor, preview, persistencia e impressao.
- Publicacao e rollback deixam de ser acoes "simples" e passam a exigir assinatura eletronica.
- A impressao hibrida usa polling seguro do agente local com token proprio, sem acoplar o agente ao frontend.

## Novas capacidades de banco

- `ExternalIdentityProvider`
- `UserExternalIdentity`
- `ExternalAuthSession`
- `TemplateApproval`
- `ElectronicSignatureRecord`
- `AgentNode`
- `AgentHeartbeat`
- `JobDispatchAttempt`

## Fluxos principais

### Login corporativo

1. tenant cadastra um provider OIDC
2. usuario inicia login no frontend
3. API cria `ExternalAuthSession`
4. provider retorna `code`
5. API valida `id_token`, vincula identidade externa e emite JWT interno

### Governanca de template

1. template em `draft`
2. envio para revisao muda para `in_review`
3. aprovacao formal muda para `approved`
4. publicacao assinada muda para `published`
5. rollback gera nova versao `draft`

### Impressao hibrida

1. API registra `PrintJob`
2. agente local envia heartbeat
3. agente faz polling de jobs elegiveis das impressoras vinculadas
4. API cria `JobDispatchAttempt`
5. agente reporta `completed` ou `failed`
6. API atualiza job, eventos e retry/backoff quando necessario
