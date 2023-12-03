'use client';

import { useState } from 'react';

import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

import Button from '@/components/elements/Button';
import { login } from '@/repositories/auth';
import { LoginPayload } from '@/repositories/auth/types';

const LoginForm = () => {
  const [errorLogin, setErrorLogin] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginPayload>();

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: ({ data }) => {
      console.log('suc', data);
    },
    onError: (error) => {
      setErrorLogin(error.message);
    }
  });

  const onSubmit = (data: LoginPayload) => {
    loginMutation.mutate(data);
  };

  return (
    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
      {errorLogin ? (
        <div role="alert" className="alert alert-error">
          <span>{errorLogin}</span>
        </div>
      ) : null}

      <div className="flex flex-col gap-2">
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Username</span>
          </div>
          <input
            type="text"
            placeholder="jhondoe"
            className="input input-bordered w-full"
            {...register('username', {
              required: 'Username is required',
              pattern: {
                value: /^\w+$/,
                message: 'Username must be alphabet'
              }
            })}
          />
          {errors?.username ? (
            <div className="label">
              <span className="label-text-alt text-error">{errors.username.message}</span>
            </div>
          ) : null}
        </label>

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Password</span>
          </div>
          <input
            type="password"
            placeholder="Enter your password"
            className="input input-bordered w-full"
            {...register('password', {
              required: 'Password is required'
            })}
          />
          {errors?.password ? (
            <div className="label">
              <span className="label-text-alt text-error">{errors.password.message}</span>
            </div>
          ) : null}
        </label>
      </div>

      <Button
        type="submit"
        className="mt-8 w-full"
        isLoading={loginMutation.isPending}
      >
        Login
      </Button>
    </form>
  );
};

export default LoginForm;
