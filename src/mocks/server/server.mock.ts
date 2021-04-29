import { setupServer } from 'msw/node';
import { handleLoginRequest } from './handlers.mock';

export const server = setupServer(handleLoginRequest());
