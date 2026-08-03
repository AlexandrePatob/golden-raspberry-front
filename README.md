# Golden Raspberry Frontend

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![Tests](https://img.shields.io/badge/Tests-Unit-15C213?logo=vitest&logoColor=white)

Interface web para consulta de indicados e vencedores da categoria **Worst Picture** do Golden Raspberry Awards.

A aplicação possui um dashboard com os indicadores solicitados e uma lista paginada de filmes com filtros por ano e vencedor. Os dados são consumidos de uma API configurada por ambiente.

## Tecnologias

- Node.js
- React
- Vite
- TypeScript
- Tailwind CSS
- React Router
- Vitest e Testing Library
- ESLint e Prettier

## Pré-requisitos

- Node.js 20 ou superior
- npm

## Instalação

```bash
npm install
```

## Configuração

Crie um arquivo `.env` na raiz do projeto com base no `.env.example`.

Exemplo:

```env
VITE_API_BASE_URL=YOUR_API_URL
```

| Variável            | Descrição               | Padrão         |
| ------------------- | ----------------------- | -------------- |
| `VITE_API_BASE_URL` | URL base pública da API | `YOUR_API_URL` |

> Variáveis iniciadas com `VITE_` são expostas no navegador. Não utilize segredos, tokens privados ou credenciais nesse arquivo.

## Executando a aplicação

Modo de desenvolvimento:

```bash
npm run dev
```

Build de produção:

```bash
npm run build
```

A aplicação ficará disponível, por padrão, em:

```text
http://localhost:5173
```

## Rotas

| Rota         | Descrição                                        |
| ------------ | ------------------------------------------------ |
| `/dashboard` | Exibe os indicadores do Golden Raspberry Awards. |
| `/movies`    | Exibe a lista paginada de filmes e filtros.      |

## Funcionalidades

### Dashboard

- Anos com mais de um vencedor.
- Três estúdios com mais vitórias.
- Produtores com menor e maior intervalo entre vitórias.
- Busca de vencedores por ano.

### Lista de filmes

- Paginação de 15 filmes por página.
- Exibição de até cinco números de página por vez.
- Controles de primeira, anterior, próxima e última página.
- Filtro por ano com debounce de 400 ms.
- Filtro por vencedor.

## Integração com a API

| Método | Rota                                        | Uso na aplicação                    |
| ------ | ------------------------------------------- | ----------------------------------- |
| `GET`  | `/api/movies`                               | Lista paginada e filtros de filmes. |
| `GET`  | `/api/movies/yearsWithMultipleWinners`      | Anos com múltiplos vencedores.      |
| `GET`  | `/api/movies/studiosWithWinCount`           | Ranking de estúdios.                |
| `GET`  | `/api/movies/maxMinWinIntervalForProducers` | Intervalos de produtores.           |
| `GET`  | `/api/movies/winnersByYear`                 | Vencedores por ano.                 |

O cliente HTTP usa `fetch` com `AbortController` para cancelar requisições que deixam de ser relevantes, como em mudanças rápidas de filtros.

## Qualidade e testes

Formatar o código:

```bash
npm run format
```

Verificar formatação:

```bash
npm run format:check
```

Executar o lint:

```bash
npm run lint
```

Executar os testes unitários:

```bash
npm run test
```

Os testes cobrem componentes reutilizáveis, componentes das features, hooks de dados, debounce, tratamento de erros e serviços HTTP/API.

## Estrutura do projeto

```text
src/
├── components/
│   ├── common/
│   ├── layout/
│   └── table/
├── features/
│   ├── dashboard/
│   │   ├── components/
│   │   └── hooks/
│   └── movies/
│       ├── components/
│       └── hooks/
├── hooks/
├── pages/
├── services/
│   ├── http/
│   └── movies/
└── test/
```

## Responsividade

O layout suporta a resolução mínima de **768 × 1280**. As tabelas preservam o conteúdo por meio de rolagem horizontal quando necessário, e o dashboard adapta seus painéis conforme a largura disponível.
