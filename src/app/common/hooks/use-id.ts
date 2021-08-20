import { useMemo } from 'react';
import { uniqueId } from '../utils/id.util';

export function useId({ id, prefix }: { id?: string; prefix?: string } = {}) {
  return useMemo(() => id ?? uniqueId(prefix), [id, prefix]);
}
