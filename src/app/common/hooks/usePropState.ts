import { Dispatch, SetStateAction, useCallback, useRef, useState } from 'react';

// TODO TEST

/**
 * Same as `useState` hook but updates the state if the provided initial state changes.
 */
export function usePropState<T>(currentState: T) {
  const [, setState] = useState(currentState);
  const propRef = useRef(currentState);
  const stateRef = useRef(currentState);

  if (propRef.current !== currentState) {
    propRef.current = currentState;
    stateRef.current = currentState;
  }

  const setPropState: Dispatch<SetStateAction<T>> = useCallback(
    (value: T | ((previousValue: T) => T)) => {
      const nextState = isSetterFunction(value) ? value(stateRef.current) : value;

      stateRef.current = nextState;
      setState(nextState);
    },
    []
  );

  return [stateRef.current, setPropState] as const;
}

function isSetterFunction<T>(
  value: T | ((previousValue: T) => T)
): value is (previousValue: T) => T {
  return typeof value === 'function';
}
