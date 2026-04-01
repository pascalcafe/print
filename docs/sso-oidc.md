# SSO OIDC

## Escopo atual

O Marco 4 implementa a base real de OIDC e deixa SAML apenas preparado na modelagem.

## Endpoints

- `GET /api/identity/public/providers?tenantSlug=default`
- `POST /api/identity/public/oidc/:providerSlug/start`
- `POST /api/identity/public/oidc/:providerSlug/exchange`
- `GET /api/identity/providers`
- `POST /api/identity/providers`

## Regras

- provider e configurado por tenant;
- o `id_token` e validado contra a discovery/JWKS do provider;
- o EasyPrint preserva o RBAC interno apos a autenticacao;
- `autoLinkByEmail` permite vincular usuario interno existente;
- `autoProvisionUsers` cria usuario interno com papel `operator` por padrao.

## Callback web

- rota: `/login/callback/oidc`
- a pagina conclui o exchange e armazena a sessao JWT interna do EasyPrint.

## Proximo passo recomendado

- adicionar tela de edicao/desativacao de providers;
- suportar mapeamento visual de claims;
- evoluir para SAML quando houver demanda real.
