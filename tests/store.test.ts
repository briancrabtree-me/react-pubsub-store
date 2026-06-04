import { describe, expect, it, vi } from 'vitest';
import { createStore } from '../src/store.js';

describe('createStore', () => {
  it('returns initial state', () => {
    const store = createStore({ count: 0, user: 'a' });
    expect(store.getState()).toEqual({ count: 0, user: 'a' });
  });

  it('merges partial updates', () => {
    const store = createStore({ count: 0, user: 'a' });
    store.setState({ count: 1 });
    expect(store.getState()).toEqual({ count: 1, user: 'a' });
  });

  it('accepts functional updates', () => {
    const store = createStore({ count: 2 });
    store.setState((prev) => ({ count: prev.count + 3 }));
    expect(store.getState().count).toBe(5);
  });

  it('skips notify when reference unchanged', () => {
    const store = createStore({ count: 0 });
    const listener = vi.fn();
    store.subscribe(listener);
    store.setState((prev) => prev);
    expect(listener).not.toHaveBeenCalled();
  });

  it('notifies subscribers on change', () => {
    const store = createStore({ n: 0 });
    const listener = vi.fn();
    store.subscribe(listener);
    store.setState({ n: 1 });
    expect(listener).toHaveBeenCalledTimes(1);
    store.setState({ n: 2 });
    expect(listener).toHaveBeenCalledTimes(2);
  });

  it('unsubscribe stops notifications', () => {
    const store = createStore({ n: 0 });
    const listener = vi.fn();
    const off = store.subscribe(listener);
    off();
    store.setState({ n: 1 });
    expect(listener).not.toHaveBeenCalled();
  });

  it('destroy clears listeners', () => {
    const store = createStore({ n: 0 });
    const listener = vi.fn();
    store.subscribe(listener);
    store.destroy();
    store.setState({ n: 1 });
    expect(listener).not.toHaveBeenCalled();
  });
});
