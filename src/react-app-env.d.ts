/// <reference types="react-scripts" />

declare namespace NodeJS {
  interface ProcessEnv {
    PUBLIC_URL: string;
    NODE_ENV: 'development' | 'production' | 'test';
    REACT_APP_NAME: string;
    REACT_APP_BASE_PATH: string;
    REACT_APP_API_PATH: string;
  }
}
