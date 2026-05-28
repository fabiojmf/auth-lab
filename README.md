# auth·lab

Treinamento interativo e visual de OAuth2, OpenID Connect, SSO e Keycloak — do básico ao avançado.

🔗 **[Acessar o treinamento](https://fabiojmf.github.io/auth-lab/)**

## O que é

AuthLab é um laboratório prático onde você aprende autenticação e autorização de forma visual e interativa, com um Keycloak real rodando localmente para experimentar.

## Funcionalidades

- 📚 **9 trilhas** com 48 módulos de conteúdo
- 🎯 **Elementos interativos** — step-by-step animados, comparações, wizards de decisão
- 🧪 **Labs práticos** — exercícios com curl no Keycloak local
- 🧠 **Quizzes** — perguntas de fixação ao final dos módulos
- 📋 **Glossário** — termos-chave com busca
- 🌙 **Dark mode**
- 📱 **Responsivo**

## Trilhas

| # | Trilha | Módulos |
|---|--------|---------|
| 1 | Fundamentos | 4 |
| 2 | Instalação e Arquitetura | 5 |
| 3 | Fluxos OAuth2/OIDC | 5 |
| 4 | Clients | 6 |
| 5 | Usuários e Identidade | 5 |
| 6 | Segurança e Políticas | 5 |
| 7 | Integração | 6 |
| 8 | Operação em Produção | 6 |
| 9 | Avançado | 6 |

## Como rodar localmente

```bash
# Subir o Keycloak (necessário para os labs práticos)
cd docker
docker compose up -d

# Keycloak Admin Console
# http://localhost:8080 (admin/admin)

# Realm pré-configurado: authlab
# Usuários: maria/senha123 (admin) | joao/senha123 (viewer)
# Client confidential: app-teste-confidential (secret: meu-secret-super-seguro)
# Client public: app-teste-public (PKCE)
```

O treinamento em si é HTML estático — abra `src/index.html` no browser ou acesse via GitHub Pages.

## Requisitos

- Docker e Docker Compose (para os labs)
- Navegador moderno

## Estrutura

```
auth-lab/
├── .github/workflows/   # Deploy GitHub Pages
├── docker/              # Keycloak + PostgreSQL
│   ├── docker-compose.yml
│   └── realm-export/    # Realm pré-configurado
└── src/                 # Treinamento (publicado no Pages)
    ├── css/
    ├── js/
    ├── trilhas/
    └── glossario.html
```

## Licença

MIT
