export type ApiAuthToken = string;

export interface ApiCreateAuthTokenRequest {
  email: string;
  password: string;
}
