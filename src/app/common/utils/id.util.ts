import { v4 as uuid } from 'uuid';

export function uniqueId(prefix?: string) {
  return prefix ? prefix + '-' + uuid() : uuid();
}
