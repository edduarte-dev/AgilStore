# AgilStore — Gerenciamento de Produtos (CLI)

## Visão Geral

O **AgilStore** é uma aplicação de linha de comando (CLI) desenvolvida em **Node.js** para o gerenciamento de produtos de uma loja de eletrônicos. A solução permite controlar o inventário de forma simples e eficiente, oferecendo funcionalidades completas de **cadastro, listagem, busca, atualização e exclusão de produtos**, com persistência de dados em arquivo JSON.

O projeto foi desenvolvido como exercício prático, priorizando clareza de código, boas práticas e decisões técnicas alinhadas a sistemas reais.

---

## Funcionalidades

- Adicionar produtos com geração automática de ID único
- Listar todos os produtos cadastrados
- Buscar produtos por ID ou por parte do nome
- Atualizar informações de um produto existente
- Excluir produtos por ID com confirmação do usuário
- Persistência automática dos dados em arquivo JSON
- Validação de preço no padrão brasileiro (aceita vírgula, ponto e separador de milhar)

---

## Tecnologias Utilizadas

- **JavaScript**
- **Node.js**
- Módulos nativos do Node.js:
  - `fs` (File System)
  - `path`
  - `readline`
- **Git** e **GitHub** para versionamento de código

> O projeto não utiliza bibliotecas externas, priorizando soluções nativas para manter a aplicação simples, leve e fácil de executar.

---

## Estrutura do Projeto

```text
agilstore/
├── data/
│   └── produtos.json
├── src/
│   ├── services/
│   │   └── produtoService.js
│   ├── utils/
│   │   └── fileHandler.js
│   └── index.js
├── package.json
└── README.md
```

---

## Como Executar o Projeto

### Pré-requisitos

- Node.js instalado (versão 18 ou superior recomendada)
- Git (opcional, para clonar o repositório)

### Passo a passo

1. **Clonar o repositório**

```bash
git clone https://github.com/seu-usuario/agilstore.git
```

2. **Acessar a pasta do projeto**

```bash
cd agilstore
```

3. **Executar a aplicação**

```bash
node src/index.js
```

Após executar o comando acima, utilize o menu interativo exibido no terminal para gerenciar os produtos.

---

## Decisões Técnicas

### Persistência em JSON
Os dados são armazenados em um arquivo JSON para garantir que as informações não sejam perdidas ao encerrar a aplicação, simulando um banco de dados simples.

### IDs únicos e não reutilizáveis
Os IDs dos produtos são gerados automaticamente e não são reorganizados após exclusão, seguindo o comportamento comum de sistemas reais de persistência.

### Validação de preço no padrão brasileiro
O sistema aceita preços informados com vírgula ou ponto como separador decimal, além de separador de milhar (exemplos: `119,99` | `119.99` | `1.199,99`), normalizando a entrada antes de salvar os dados.

### Separação de responsabilidades
A aplicação foi estruturada para separar claramente:
- Interação com o usuário (CLI)
- Regras de negócio (services)
- Persistência de dados (utils)

---

## Próximos Passos

Este projeto pode ser expandido futuramente, incluindo:

- Transformação em uma API REST utilizando Express ou NestJS
- Integração com banco de dados relacional (PostgreSQL, MySQL) ou NoSQL (MongoDB)
- Criação de interface gráfica com React, Vue ou Angular
- Migração do código para TypeScript
- Implementação de testes automatizados (Jest, Mocha)
- Autenticação e controle de usuários

---

## Autor

**Eduardo Duarte Cunha**

Projeto desenvolvido como exercício de programação para o programa de tecnologia da **PUCRS – Aceleradora Ágil**.

---

## Licença

Este projeto foi desenvolvido para fins educacionais.
