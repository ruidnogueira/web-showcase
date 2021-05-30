import { useEffect, useRef } from 'react';

/**
 * Sets timeout and clears it on component unmount or timeout change.
 * Does not execute callback if no timeout is provided.
 *
 * @param timeout timeout in ms
 */
export function useTimeout(callback: () => any, timeout?: number | null) {
  const callbackRef = useRef<() => any>(callback);
  callbackRef.current = callback;

  useEffect(() => {
    if (typeof timeout === 'number') {
      const runLatestCallback = () => {
        callbackRef.current();
      };

      const timer = setTimeout(runLatestCallback, timeout);
      return () => clearTimeout(timer);
    }
  }, [timeout]);
}
