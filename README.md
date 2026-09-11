# Rehab Program

En liten Vue 3-app för att hålla koll på ett rehabprogram – lägg till övningar, kategorisera dem (ben, rygg, axel/arm, core, rörlighet), logga ansträngningsnivå och följ framstegen. Allt sparas lokalt i webbläsaren via `localStorage`.

Byggd med [Vue 3](https://vuejs.org/) och [Vite](https://vite.dev/).

## Funktioner

- Startsida med progressöversikt, kategorifördelning och genomsnittlig ansträngning
- Programvy för att lägga till, redigera och kategorisera övningar
- Detaljvy per övning med ansträngningsnivå och borttagning
- Profilsida
- Data sparas i `localStorage` – inget konto eller backend krävs

## Kom igång

```sh
npm install
npm run dev
```

Appen körs då på `http://localhost:5173`.

### Bygg för produktion

```sh
npm run build
```

Bygget läggs i `dist/` och driftsätts automatiskt till GitHub Pages via `.github/workflows/deploy.yml` vid push till `main`.

### Förhandsgranska produktionsbygget lokalt

```sh
npm run preview
```

## Tech stack

- [Vue 3](https://vuejs.org/) (Composition API)
- [Vue Router](https://router.vuejs.org/)
- [Vite](https://vite.dev/)

## Rekommenderad IDE-setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (inaktivera Vetur om det är installerat).
