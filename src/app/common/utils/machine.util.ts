/**
 * Workaround. Some environments don't properly assign a name to functions (ex: jest).
 * Remove this once the problem is fixed.
 */
export function fixModelEventNames<T extends Record<string, (...args: any) => any>>(events: T) {
  Object.keys(events).forEach((event) => {
    Object.defineProperty(events[event], 'name', { value: event });
  });

  return events;
}
