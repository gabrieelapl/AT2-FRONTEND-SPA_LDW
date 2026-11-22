## 🖥️ Frontend (AT2)

SPA em **React + TypeScript + Vite**, com **shadcn/ui**, **Tailwind CSS** e **React Router DOM**, consumindo a API REST desta AT1 com operações completas de CRUD.

### Como executar

1. Suba o banco e a API (veja as seções anteriores) — a API deve responder em `http://localhost:3000`.
2. Em outro terminal:

```bash
cd frontend
pnpm install
cp .env.example .env   # ajuste VITE_API_URL se necessário
pnpm dev
```

A aplicação abrirá em `http://localhost:5173`.

### Estrutura

```
frontend/src
├── components/   # layout, componentes de filmes e components/ui (shadcn)
├── hooks/        # useFilmes (estado, loading, erros, toasts)
├── lib/          # cliente HTTP e utilitários
├── pages/        # FilmesPage, SobrePage, NotFoundPage
├── services/     # filmeService (GET, POST, PUT, DELETE)
└── types/        # interfaces TypeScript
```
