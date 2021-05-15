import { setupWorker } from 'msw';
import { handleLoginRequest } from './handlers.mock';

export const worker = setupWorker(handleLoginRequest({ delay: 1000 }));
