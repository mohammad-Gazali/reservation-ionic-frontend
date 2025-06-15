// apiClient.ts
import {
  RegisterRequest,
  LoginRequest,
  UpdateAvatarRequest,
  AuthResponse,
  User,
} from '../types/auth';
import { API_URL, handleResponse } from './config';

export const registerUser = async (
  payload: RegisterRequest
): Promise<AuthResponse> => {
  const formData = new FormData();

  formData.append('first_name', payload.firstName);
  formData.append('last_name', payload.lastName);
  formData.append('email', payload.email);
  formData.append('password', payload.password);

  if (payload.fingerprint !== undefined && payload.fingerprint !== null) {
    formData.append('fingerprint', payload.fingerprint);
  }

  if (payload.avatar) {
    formData.append('avatar', payload.avatar);
  }

  const response = await fetch(`${API_URL}/api/user/register`, {
    method: 'POST',
    body: formData,
  });

  return handleResponse<AuthResponse>(response);
};

export const loginUser = async (
  payload: LoginRequest
): Promise<AuthResponse> => {
  const { email, password, fingerprint } = payload;

  const body: Record<string, any> = { email };

  if (password !== null && password !== undefined) {
    body.password = password;
  }

  if (fingerprint !== null && fingerprint !== undefined) {
    body.fingerprint = fingerprint;
  }

  const response = await fetch(`${API_URL}/api/user/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  return handleResponse<AuthResponse>(response);
};

export const uploadAvatar = async (
  payload: UpdateAvatarRequest
): Promise<{ message: string; avatar_url: string }> => {
  const formData = new FormData();
  formData.append('avatar', payload.avatar);

  const response = await fetch(`${API_URL}/api/user/update`, {
    method: 'POST',
    body: formData,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
    },
  });

  return handleResponse<{ message: string; avatar_url: string }>(response);
};

export const logoutUser = async (): Promise<{
  success: boolean;
  message: string;
}> => {
  const response = await fetch(`${API_URL}/api/user/logout`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
    },
  });

  return handleResponse(response);
};

export const getUser = async (): Promise<{
  success?: boolean;
  user: User;
  image: string | null;
}> => {
  const response = await fetch(`${API_URL}/api/user/profile`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
    },
  });

  return handleResponse<{
    success?: boolean;
    user: User;
    image: string | null;
  }>(response);
};