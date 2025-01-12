# Pinkmind

Welcome to the frontend repository for our innovative educational AI project, [Brainet](https://github.com/Neurologism/brainet)! Our goal is to empower users to build artificial intelligence systems using a visual, block-based interface similar to Scratch or LEGO, making AI development accessible and fun for everyone.

## Table of Contents

Already know where you're going? We've got you covered.

- [What is Brainet ?](#what-is-brainet)
- [Technical Stack](#technical-stack)
- [Installation](#installation)

## What is Brainet?

[Brainet](https://github.com/Neurologism/brainet) is designed to simplify the process of creating and experimenting with AI models by using a modular, block-based approach. This method enables users to construct complex AI systems intuitively, without needing deep programming knowledge. Our platform provides an engaging and interactive way to learn about AI and machine learning by manipulating blocks that represent different components and functions.

## Technical Stack

The frontend of Brainet is built using a cutting-edge technology stack that emphasizes modern web standards, reactivity, and maintainability. The combination of these tools ensures a seamless user experience, ease of development, and high performance.

### Vue 3 with Composition API

Vue 3 is a progressive JavaScript framework used to build user interfaces, offering simplicity, flexibility, and reactivity. With the Composition API, Vue 3 introduces a more modular and function-based approach to component logic, making it easier to organize and reuse code. This results in better maintainability and scalability for complex applications, like Brainet.

### Pinia

Pinia is the official state management library for Vue 3. It simplifies global state management, offering a developer-friendly API for managing shared state across components. With a minimal footprint and strong TypeScript integration, Pinia ensures that Brainet’s frontend remains fast and maintainable, even as the application grows in complexity.

### TypeScript

As with the backend, TypeScript plays a crucial role in the frontend by enabling static typing and type-checking for JavaScript. This helps catch errors during the development phase, leading to more robust and reliable code. The strong typing ensures smoother collaboration between frontend and backend, especially when dealing with APIs.

### Nuxt

Nuxt is a powerful framework built on top of Vue.js, designed to create modern, server-rendered web applications with ease. It enhances Vue with features like automatic routing, server-side rendering (SSR), and static site generation (SSG), which improves Brainet’s SEO, performance, and scalability.
[Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction)

### Nuxt UI

Nuxt UI is a set of pre-built, customizable components for the Nuxt framework that speed up development without sacrificing flexibility. By using Nuxt UI, Brainet’s frontend achieves a consistent design system, improving the user interface and user experience (UI/UX) while also reducing the time spent on repetitive tasks like creating UI components from scratch.

## Installation

### 1. Install Required Tools

You can either install Node using your package manager or using [this convenient helper](https://nodejs.org/en/download/package-manager) if you haven't installed it already. Then, install pnpm. Afterwards, verify that you've installed Node.js and pnpm by running:

```bash
node -v # should print something like `v.20.17.0`
pnpm -v # should print something like `9.7.1`
```

### 2. Cloning the Pinkmind Repository

Navigate to or create a directory where you want to store pinkmind and run the following commands.

```bash
git clone https://github.com/Neurologism/pinkmind
cd pinkmind
pnpm install
```

### Running for Development

Use the following pnpm scripts for development.

```bash
pnpm run pretty # formats the code
pnpm run dev # to start a local dev server
```

### Running for Deployment

Use the following npm scripts for development.

```bash
pnpm run build # build the application for production
pnpm run preview # locally preview the build
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
