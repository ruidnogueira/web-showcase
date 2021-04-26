import { setupWorker } from 'msw';
import { mockLoginRequest } from './handlers.mock';

export const worker = setupWorker(mockLoginRequest({ delay: 1000 }));
