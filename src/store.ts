/** Listener runs after the store commits a new state snapshot. */
export type Listener = () => void;

/** Partial merge or functional update — same idea as setState in React. */
export type SetStateAction<T> = Partial<T> | ((prev: T) => T);

export interface Store<T> {
  getState: () => T;
  setState: (action: SetStateAction<T>) => void;
  subscribe: (listener: Listener) => () => void;
  /** Drop all subscribers — handy in tests or teardown. */
  destroy: () => void;
}

/**
 * External pub/sub store. Lives outside React; components opt in via useSyncExternalStore.
 */
export function createStore<T extends object>(initialState: T): Store<T> {
  let state = initialState;
  const listeners = new Set<Listener>();

  const notify = () => {
    for (const listener of listeners) {
      listener();
    }
  };

  return {
    getState: () => state,

    setState(action: SetStateAction<T>) {
      const next =
        typeof action === 'function'
          ? (action as (prev: T) => T)(state)
          : ({ ...state, ...action } as T);

      if (Object.is(next, state)) {
        return;
      }

      state = next;
      notify();
    },

    subscribe(listener: Listener) {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },

    destroy() {
      listeners.clear();
    },
  };
}
