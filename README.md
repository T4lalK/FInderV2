# project-starter

Starter project for the TNM040 React/TypeScript project. Built with Vite, React, TypeScript and Firebase Realtime Database.

## Getting started

```
npm install
npm run dev
```

## Firebase setup

The app talks to Firebase, so it needs a real project to connect to. See the **Firebase Setup** guide under **Project** on the course website for step-by-step instructions on creating a project and pasting your config into `src/firebase.ts`.

`src/components/FirebaseExample.tsx` is a small demo that writes to a `students` node in the database and reads it back live with `onValue`, so you can confirm the connection works. Once you've confirmed it works, delete the demo from `App.tsx` and start building your own project.

## Scripts

- `npm run dev` - start the dev server with hot module reloading
- `npm run build` - type-check the project and build it for production
- `npm run lint` - check formatting (Prettier) and run ESLint
- `npm run lint-fix` - auto-fix formatting and auto-fixable lint issues
- `npm run preview` - preview the production build locally

## Passing

A submission is only considered passing if both of the following succeed with no errors:

```
npm run lint
npm run build
```

`npm run lint` runs Prettier in check mode first, then ESLint. If Prettier reports formatting issues, run `npm run lint-fix` to fix them automatically before addressing any remaining ESLint errors.

## Linting

ESLint is configured with type-aware TypeScript rules on top of the recommended React and React Hooks rule sets. A few things worth knowing:

- Suppressing an error with an `eslint-disable` comment is not allowed - the linter itself will flag the disable comment. If a rule seems wrong for what you're doing, ask instead of suppressing it.
- Filenames and folders under `src/` follow a naming convention (components in PascalCase, folders in kebab-case) that ESLint enforces.
