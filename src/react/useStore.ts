import { useSyncExternalStore } from 'react';
import type { Store } from '../store.js';

/**
 * Subscribe to the full store snapshot. Re-renders on any state change.
 */
export function useStore<T extends object>(store: Store<T>): T {
  return useSyncExternalStore(store.subscribe, store.getState, store.getState);
}
