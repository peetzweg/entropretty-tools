
![Hero Image](hero.gif)

# entropretty-tools

This repository is a monorepository consisting of the following projects:

+ `packages/entropretty-editor` - web schema renderer
+ `packages/entropretty-utils` - collection of helper functions to use during drawing
+ `packages/entropretty-cli` - cli tool for bundling, testing, hosting the editor locally
+ `packages/create-entropretty` - cli tool to create new entropretty workspaces
+ `apps/entropretty-gallery` - the website informing about entropretty and exploring submitted designs

## Getting Started

This monorepo is using [`pnpm`](https://pnpm.io/).

```sh
pnpm install
```

---

Working on the `editor`:

```sh
pnpm dev:entropretty-editor
```

Working on the `website`:

```sh
pnpm dev:entropretty-gallery
```

Working on the `utils`:

```
pnpm watch
```

Working on the `cli`:

```
pnpm watch
```