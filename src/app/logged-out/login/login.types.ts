export enum LoginError {
  Invalid = 'INVALID',
  Unexpected = 'UNEXPECTED',
}

export interface LoginForm {
  email: string;
  password: string;
}
