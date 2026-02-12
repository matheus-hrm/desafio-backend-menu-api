---
title: Goomer Menu API
subtitle: Desafio Técnico — Pessoa Desenvolvedora Back-end
---

# Menu API

API para gerenciamento de produtos, promoções e cardápio de restaurante, desenvolvida em Node.js com TypeScript e Fastify.

## Sumário

- [Menu API](#menu-api)
  - [Sumário](#sumário)
  - [Visão geral](#visão-geral)
  - [Escopo do desafio](#escopo-do-desafio)
  - [Status das funcionalidades](#status-das-funcionalidades)
  - [Arquitetura e organização](#arquitetura-e-organização)
    - [Conceitos principais](#conceitos-principais)
  - [Tecnologias](#tecnologias)
  - [Como rodar localmente](#como-rodar-localmente)
    - [Pré-requisitos](#pré-requisitos)
    - [Ambiente de desenvolvimento (com watch)](#ambiente-de-desenvolvimento-com-watch)
    - [Ambiente de produção](#ambiente-de-produção)
    - [Execução local sem Docker](#execução-local-sem-docker)
  - [Variáveis de ambiente](#variáveis-de-ambiente)
  - [Comandos úteis](#comandos-úteis)
    - [Desenvolvimento](#desenvolvimento)
    - [Build](#build)
    - [Start (buildado)](#start-buildado)
  - [Desafios e problemas encontrados](#desafios-e-problemas-encontrados)
  - [Próximos passos](#próximos-passos)

## Visão geral

Este projeto segue uma organização inspirada em Clean Architecture, separando responsabilidades por camadas e usando injeção de dependência para manter o domínio isolado de detalhes de infraestrutura.

## Escopo do desafio

Conforme a proposta do desafio:

- CRUD de produtos
- CRUD de promoções
- Retorno de cardápio consolidado
- Controle de visibilidade do produto
- Promoções aplicadas por dias e horários
- Ordenação de produtos (opcional)
- Tratamento de timezone (opcional)

## Status das funcionalidades

| Funcionalidade | Status |
|---|---|
| Healthcheck HTTP | Implementado |
| Healthcheck de banco | Implementado via porta/injeção |
| CRUD de produtos | Pendente |
| CRUD de promoções | Pendente |
| Cardápio consolidado | Pendente |
| Visibilidade de produto | Pendente |
| Promoções por horário/dia | Pendente |
| Ordenação de produtos | Opcional (pendente) |
| Timezone | Opcional (pendente) |

## Arquitetura e organização

Estrutura de pastas (resumo):

```
src/
	application/
		dtos/
		ports/
		usecases/
	domain/
		entities/
		repositories/
		services/
	infra/
		db/
		http/
		repositories/
	presentation/
		controllers/
		routes/
	main/
		config/
		di/
		factories/
		app.ts
	shared/
		errors/
		utils/
```

### Conceitos principais

- **Ports (application)**: interfaces que definem dependências externas necessárias pelos casos de uso.
- **Infra**: implementações concretas para banco, HTTP e repositórios.
- **Main**: composição de dependências e bootstrap da aplicação.

## Tecnologias

- Node.js
- TypeScript
- Fastify
- MySQL
- Docker e Docker Compose
- Nix (em imagens de build/dev)

## Como rodar localmente

### Pré-requisitos

- Docker e Docker Compose

### Ambiente de desenvolvimento (com watch)

```
docker compose watch app-dev
```

### Ambiente de produção

```
docker compose up --build -d app
```

### Execução local sem Docker

```
npm install
npm run dev
```

## Variáveis de ambiente

As variáveis são usadas a partir do container e/ou .env local.

| Variável | Descrição | Padrão |
|---|---|---|
| DB_HOST | Host do MySQL | db |
| DB_PORT | Porta do MySQL | 3306 |
| DB_USER | Usuário do MySQL | fastify |
| DB_PASSWORD | Senha do MySQL | dev_password |
| DB_NAME | Nome do banco | fastify_db |
| NODE_ENV | Ambiente | development/production |

## Comandos úteis

### Desenvolvimento

```
npm run dev
```

### Build

```
npm run build
```

### Start (buildado)

```
npm start
```

## Desafios e problemas encontrados

- Ajuste do entrypoint após reorganização de pastas (dist/main/app.js).
- Configuração de watch no Docker Compose exigindo build context.
- Tipagem do driver de banco com Fastify e injeção de dependência.

## Próximos passos

1. Definir modelos e migrations no banco.
2. Implementar repositórios SQL com consultas puras.
3. Criar casos de uso (application/usecases).
4. Expor rotas REST completas para produtos e promoções.
5. Consolidar endpoint de cardápio.
6. Adicionar validações e testes automatizados.
