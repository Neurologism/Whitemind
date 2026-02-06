# Whitemind

Whitemind is a Nuxt 3 web application for building, training, and exploring AI projects in the browser. It provides an interactive UI with data visualization, node-based workflows, and account features backed by the Backmind API.

## Highlights

- Nuxt 3 + Vue 3 app with Pinia state management
- Tailwind CSS styling + Nuxt UI components
- Project editor and training views
- Backmind API integration (auth, profiles, projects)

## Requirements

- Node.js 20+ (recommended)
- pnpm 9+

## Installation

```bash
pnpm install
```

If the install fails due to native dependencies (for example `sharp`), see the troubleshooting section below.

## Development

```bash
pnpm dev
```

The dev server runs on `http://localhost:8000` by default.

## Build & Preview

```bash
pnpm build
pnpm preview
```

## Configuration

The Backmind API host can be overridden with an environment variable:

```bash
BACKMIND_HOST=https://api.whitemind.org
```

Default value (from `nuxt.config.ts`):

- `https://api.whitemind.org`

## Scripts

- `pnpm dev` — start the Nuxt dev server
- `pnpm build` — build for production
- `pnpm preview` — preview the production build
- `pnpm generate` — generate a static build
- `pnpm format` — format code with Prettier
- `pnpm start` / `pnpm stop` — manage the production server via pm2

## Project Structure

- `pages/` — route-based views
- `components/` — reusable UI components
- `layouts/` — Nuxt layouts
- `stores/` — Pinia stores (session, project, training, etc.)
- `assets/` — CSS, images, and static assets
- `public/` — static files and policies

## Troubleshooting

### `sharp` install error on Windows

Some dependencies use native bindings. If you see a `node-gyp` or Visual Studio error:

1. Install **Visual Studio 2022 Build Tools** with the **Desktop development with C++** workload.
2. Re-run:
   ```bash
   pnpm rebuild sharp
   ```

## Contributing

- Format changes with `pnpm format`
- Keep components small and composable
- Prefer store actions for API calls

## License

All rights reserved. See the repository for licensing details.
