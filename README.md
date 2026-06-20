# Pluma

React + Tailwind site for [pluma.life](https://pluma.life), deployed via GitHub Pages.

## Stack

- **React 19** + **TypeScript**
- **React Router** — client-side routing
- **Tailwind CSS v4**
- **Vite**
- **GitHub Actions** → GitHub Pages

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Build

```bash
npm run build
npm run preview
```

## Deploy

Pushing to `main` builds the site and publishes the `dist/` folder to the `gh-pages` branch.

**One-time setup:** In repo **Settings → Pages**, set **Source** to **Deploy from a branch**, branch **gh-pages**, folder **/ (root)**. The `gh-pages` branch only contains the built site — not your source code.

Live site: **https://pluma.life**

## Project structure

```
pluma/
├── public/           # Static assets (CNAME, favicon)
├── src/
│   ├── components/   # Shared UI (Header, Layout, etc.)
│   ├── pages/        # Route pages (Home, About, Contact)
│   ├── App.tsx       # Route definitions
│   ├── main.tsx
│   └── index.css     # Tailwind + theme tokens
├── .github/workflows/deploy.yml
└── vite.config.ts
```

## Custom domain

DNS for `pluma.life` is configured at Hostinger. The `public/CNAME` file is included in every build.

| Type  | Name | Value               |
|-------|------|---------------------|
| A     | @    | 185.199.108.153     |
| A     | @    | 185.199.109.153     |
| A     | @    | 185.199.110.153     |
| A     | @    | 185.199.111.153     |
| CNAME | www  | hobo89.github.io    |

## Contact form

For a static deploy, use [Web3Forms](https://web3forms.com) or [Formspree](https://formspree.io) in `src/components/Contact.tsx`.
