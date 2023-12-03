import app from '@/config/app';
import fetcher from '@/lib/fetcher';

import { LoginPayload, LoginResponse, RegisterPayload, RegisterResponse } from './types';

export const login = async (payload: LoginPayload) => {
  const response = await fetcher<LoginResponse>(app.apiBaseURL +'/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  return response;
};

export const register = async (payload: RegisterPayload) => {
  const response = await fetcher<RegisterResponse>(app.apiBaseURL +'/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  return response;
};
