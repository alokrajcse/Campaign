export interface User {
  id?: number;
  username: string;
  email: string;
  token?: string;
  organizationId?: number;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user?: User;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  organizationId: number;
}

export interface Organization {
  id: number;
  name: string;
}