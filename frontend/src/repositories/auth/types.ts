import { SuccessResponse } from '@/repositories/types';

export type LoginPayload = {
  username: string;
  password: string;
};

export type LoginResponse = SuccessResponse<{
  data: {
    accessToken: string;
  }
}>;

export type RegisterPayload = {
  username: string;
  password: string;
  confirmPassword: string;
};

export type RegisterResponse = SuccessResponse;

