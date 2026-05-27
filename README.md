# AuthLab

Treinamento interativo e visual de OAuth2, OpenID Connect, SSO e Keycloak — do básico ao avançado.

## O que é

AuthLab é um laboratório prático onde você aprende autenticação e autorização de forma visual e interativa, com um Keycloak real rodando localmente para experimentar.

## Trilhas

| # | Trilha | Descrição |
|---|--------|-----------|
| 1 | Fundamentos | OAuth2, OIDC, JWT, autenticação vs autorização |
| 2 | Instalação e Arquitetura | Keycloak local, realms, estrutura |
| 3 | Fluxos OAuth2/OIDC | Authorization Code, Client Credentials, Direct Grant |
| 4 | Clients | Confidential vs Public, configuração, troubleshooting |
| 5 | Usuários e Identidade | Federation, Identity Providers, social login |
| 6 | Segurança e Políticas | Brute force, rotação de chaves, CORS, auditoria |
| 7 | Integração | Spring Boot, Node.js, React, proteção de APIs |
| 8 | Operação em Produção | Cluster, proxy reverso, monitoramento, upgrade |
| 9 | Avançado | Custom themes, SPIs, Terraform, multi-tenancy |

## Requisitos

- Docker e Docker Compose
- Navegador moderno
- (Opcional) Node.js 20+ para os exemplos de backend

## Como rodar

```bash
# Subir o Keycloak
cd docker
docker compose up -d

# Acessar o treinamento
# Abra src/index.html no navegador

# Keycloak Admin Console
# http://localhost:8080 (admin/admin)
```

## Estrutura do projeto

```
auth-lab/
├── docker/              # Keycloak + PostgreSQL
├── src/                 # Treinamento (HTML/CSS/JS)
│   ├── css/
│   ├── js/
│   ├── assets/
│   └── trilhas/         # Conteúdo de cada trilha
└── examples/            # Apps de exemplo (backend/frontend)
```

## Licença

MIT
