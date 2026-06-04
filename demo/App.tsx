/**
 * If CountPanel and UserPanel both log on every keystroke, the selector hook is wrong.
 */
import { useCallback, useEffect, useState } from 'react';
import { createStore, useStoreSelector } from 'react-pubsub-store';

type AppState = {
  count: number;
  user: string;
};

const store = createStore<AppState>({ count: 0, user: '' });

function useRenderLog(name: string, onLog: (entry: string) => void) {
  useEffect(() => {
    onLog(`${name} rendered`);
  });
}

function CountPanel({ onLog }: { onLog: (entry: string) => void }) {
  useRenderLog('CountPanel', onLog);
  const count = useStoreSelector(store, (s) => s.count);

  return (
    <section className="panel" aria-labelledby="count-heading">
      <h2 id="count-heading">CountPanel</h2>
      <p className="value">{count}</p>
      <button
        type="button"
        onClick={() => store.setState((s) => ({ ...s, count: s.count + 1 }))}
      >
        Increment
      </button>
    </section>
  );
}

function UserPanel({ onLog }: { onLog: (entry: string) => void }) {
  useRenderLog('UserPanel', onLog);
  const user = useStoreSelector(store, (s) => s.user);

  return (
    <section className="panel" aria-labelledby="user-heading">
      <h2 id="user-heading">UserPanel</h2>
      <p className="value">{user || '—'}</p>
      <input
        type="text"
        value={user}
        placeholder="Type a name"
        aria-label="User name"
        onChange={(e) => store.setState({ user: e.target.value })}
      />
    </section>
  );
}

function RenderLog({ entries }: { entries: string[] }) {
  return (
    <section className="log" aria-labelledby="log-heading">
      <h2 id="log-heading">Render log (newest first)</h2>
      <ul>
        {entries.length === 0 ? (
          <li>Interact with a panel…</li>
        ) : (
          entries.map((entry, i) => (
            <li key={`${entry}-${i}`}>
              <strong>{entry}</strong>
            </li>
          ))
        )}
      </ul>
    </section>
  );
}

export function App() {
  const [entries, setEntries] = useState<string[]>([]);

  const onLog = useCallback((entry: string) => {
    setEntries((prev) => [entry, ...prev].slice(0, 12));
  }, []);

  return (
    <>
      <h1>react-pubsub-store</h1>
      <p className="lead">
        Two components, one external store. Each subscribes to a slice via{' '}
        <code>useSyncExternalStore</code> — only the panel that owns that slice should log a render.
      </p>
      <div className="grid">
        <CountPanel onLog={onLog} />
        <UserPanel onLog={onLog} />
      </div>
      <RenderLog entries={entries} />
    </>
  );
}
