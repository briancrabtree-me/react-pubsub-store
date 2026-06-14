# react-pubsub-store

Minimal **pub/sub external store** for React 19 using [`useSyncExternalStore`](https://react.dev/reference/react/useSyncExternalStore). No Zustand, no signals package — just TypeScript and React.

[![License: MIT](https://img.shields.io/badge/License-MIT-ccff00?style=flat-square)](LICENSE)
[![React 19](https://img.shields.io/badge/React-19-ccff00?style=flat-square)](https://react.dev/)
[![Starter](https://img.shields.io/badge/starter-pure_react_19-ccff00?style=flat-square)](https://github.com/briancrabtree-me/pure-react-19-vanilla-starter)
[![Tokens](https://img.shields.io/badge/css-vanilla_css_tokens-ccff00?style=flat-square)](https://github.com/briancrabtree-me/vanilla-css-tokens)

**[snippet-library](https://github.com/briancrabtree-me/snippet-library)** · **[pure-react-19-vanilla-starter](https://github.com/briancrabtree-me/pure-react-19-vanilla-starter)** · **[vanilla-css-tokens](https://github.com/briancrabtree-me/vanilla-css-tokens)**

---

## Why

- Store lives **outside** React — you choose what re-renders
- **Selective subscriptions** via `useStoreSelector` — unrelated slices skip updates
- Shows how React 19 subscribes to external data without importing a state framework

---

## Install

Copy [`src/`](src/) into your project, or clone this repo. Peer dependency: `react` ^19.

```bash
git clone https://github.com/briancrabtree-me/react-pubsub-store.git
cd react-pubsub-store
npm install
```

---

## Quick start

```typescript
import { createStore, useStoreSelector } from './src/index.js';

type State = { count: number; label: string };

const store = createStore<State>({ count: 0, label: '' });

function Counter() {
  const count = useStoreSelector(store, (s) => s.count);
  return (
    <button type="button" onClick={() => store.setState((s) => ({ count: s.count + 1 }))}>
      {count}
    </button>
  );
}
```

---

## API

| Export | Role |
|--------|------|
| `createStore(initial)` | External store with `getState`, `setState`, `subscribe`, `destroy` |
| `useStore(store)` | Full snapshot — re-renders on any change |
| `useStoreSelector(store, selector, isEqual?)` | Slice subscription — default equality `Object.is` |

`setState` accepts a partial object or `(prev) => next`. Notify is skipped when the next state reference is unchanged.

---

## Demo

```bash
npm install
npm run dev
```

Open the URL Vite prints. Use **CountPanel** and **UserPanel** separately — the render log should only show the panel you interacted with.

```bash
npm run typecheck
npm run test
npm run build
```

---

## Layout

| Path | Role |
|------|------|
| `src/store.ts` | Framework-agnostic pub/sub store |
| `src/react/useStore.ts` | Full-state hook |
| `src/react/useStoreSelector.ts` | Slice hook with stable snapshot |
| `demo/App.tsx` | Selective subscription demo + render log |
| `tests/store.test.ts` | Store unit tests |

---

## License

MIT — [LICENSE](LICENSE).
