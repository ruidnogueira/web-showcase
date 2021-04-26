import { setupServer } from 'msw/node';
import { mockLoginRequest } from './handlers.mock';

export const server = setupServer(mockLoginRequest());
