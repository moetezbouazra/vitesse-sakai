<p align="center">
<img src="https://github.com/moetezbouazra/vitesse-sakai/blob/main/public/images/vitesse%20+%20sakai.png?raw=true" width="300"/>
</p>
<h2 align="center">
<a href="https://github.com/antfu/vitesse">Vitesse</a> + <a href="https://github.com/primefaces/sakai-vue">Sakai</a> Template
</h2><br>
<p align="center">
<br>
<a href="https://vitesse-sakai.netlify.app/">🖥 Online Preview</a>
<br><br>
<a href="/"><img src="https://developer.stackblitz.com/img/open_in_stackblitz.svg" alt=""></a>
</p>

## Features
- 💚 [PrimeVue 4](https://primevue.org/) - Rich set of UI components for Vue
- 🎨 [Tailwind CSS V3](https://tailwindcss.com/) - Utility-first CSS framework with PrimeUI integration
- ⚡️ [Vite](https://vitejs.dev/) - Lightning fast build tool with HMR
- 🔥 Vue 3 with `<script setup>` syntax
- 🍍 [State Management via Pinia](https://pinia.vuejs.org/)
- 📑 [Layout system](./app/layouts)
- 📥 APIs auto importing - powered by [unplugin-auto-import](https://github.com/antfu/unplugin-auto-import)
- 🌍 [Vue I18n](https://vue-i18n.intlify.dev/) - Internationalization
- 🧩 [Vue Router](https://router.vuejs.org/) with auto-generated routes
- 📊 [Chart.js](https://www.chartjs.org/) - Simple yet flexible JavaScript charting
- 📦 [Vite SSG](https://github.com/antfu/vite-ssg) - Static site generation
- 📲 PWA support with offline capabilities
- 🦾 TypeScript support
- 🔍 [Bundle visualizer](https://github.com/btd/rollup-plugin-visualizer) for optimizing your build

## Tech Stack
### Frontend
- [Vue 3](https://vuejs.org/)
- [PrimeVue 4](https://primevue.org/)
- [Primeicons](https://primevue.org/icons)
- [Tailwind CSS](https://tailwindcss.com/)
- [VueUse](https://vueuse.org/) - Collection of useful composition APIs
- [Vue Router 4](https://router.vuejs.org/)
- [Vue I18n](https://vue-i18n.intlify.dev/)
- [Pinia](https://pinia.vuejs.org/)

### Development Tools
- [TypeScript](https://www.typescriptlang.org/)
- [ESLint](https://eslint.org/) with [@antfu/eslint-config](https://github.com/antfu/eslint-config)
- [Prettier](https://prettier.io/)
- [Simple Git Hooks](https://github.com/toplenboren/simple-git-hooks)
- [Vite](https://vitejs.dev/)
- [SASS](https://sass-lang.com/)

## IDE
We recommend using [VS Code](https://code.visualstudio.com/) with [Volar](https://github.com/johnsoncodehk/volar) to get the best experience (You might want to disable [Vetur](https://vuejs.github.io/vetur/) if you have it).

## Getting Started

### Online
<a href="https://stackblitz.com/github/moetezbouazra/vitesse-sakai"><img src="https://developer.stackblitz.com/img/open_in_stackblitz.svg" alt=""></a>

### GitHub Template
[Create a repo from this template on GitHub](https://github.com/moetezbouazra/vitesse-sakai/generate).

### Clone to local
If you prefer to do it manually with the cleaner git history:
```bash
npx degit moetezbouazra/vitesse-sakai my-sakai-app
cd my-sakai-app
pnpm i # If you don't have pnpm installed, run: npm install -g pnpm
```

### Development
```bash
# Start the development server
pnpm dev

# Check for linting errors
pnpm lint

# Type check
pnpm typecheck

# Build for production
pnpm build

# Preview the production build
pnpm preview

# Preview with HTTPS
pnpm preview-https

# Check bundle size
pnpm sizecheck

# Update dependencies
pnpm up
```

## Variations
- [vitesse](https://github.com/antfu/vitesse) - Opinionated Vite Starter Template
- [vitesse-lite](https://github.com/antfu/vitesse-lite) - Lightweight version of Vitesse
- [vitesse-webext](https://github.com/antfu/vitesse-webext) - WebExtension Vite starter template
