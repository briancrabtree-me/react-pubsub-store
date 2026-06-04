import { useCallback, useRef, useSyncExternalStore } from 'react';
import type { Store } from '../store.js';

/**
 * Subscribe to a slice of state. Unrelated updates should not re-render this component.
 * Selectors that return new object/array literals every call need a custom isEqual.
 */
export function useStoreSelector<T extends object, U>(
  store: Store<T>,
  selector: (state: T) => U,
  isEqual: (a: U, b: U) => boolean = Object.is,
): U {
  const sliceRef = useRef<U>(selector(store.getState()));

  const getSnapshot = useCallback(() => {
    const next = selector(store.getState());
    if (isEqual(sliceRef.current, next)) {
      return sliceRef.current;
    }
    sliceRef.current = next;
    return next;
  }, [store, selector, isEqual]);

  return useSyncExternalStore(store.subscribe, getSnapshot, getSnapshot);
}
