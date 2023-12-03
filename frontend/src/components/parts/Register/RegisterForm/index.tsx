'use client';

import { useState } from 'react';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import Button from '@/components/elements/Button';
import { register } from '@/repositories/auth';
import { RegisterPayload } from '@/repositories/auth/types';

const RegisterForm = () => {
  const [errorRegister, setErrorRegister] = useState<string | null>(null);
  const router = useRouter();

  const {
    register: formRegister,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterPayload>();

  const registerMutation = useMutation({
    mutationFn: register,
    onSuccess: () => {
      router.push('/auth/login');
    },
    onError: (error) => {
      setErrorRegister(error.message);
    }
  });

  const onSubmit = (data: RegisterPayload) => {
    setErrorRegister(null);
    registerMutation.mutate(data);
  };

  return (
    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
      {errorRegister ? (
        <div role="alert" className="alert alert-error">
          <span>{errorRegister}</span>
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
            {...formRegister('username', {
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
            {...formRegister('password', {
              required: 'Password is required'
            })}
          />
          {errors?.password ? (
            <div className="label">
              <span className="label-text-alt text-error">{errors.password.message}</span>
            </div>
          ) : null}
        </label>

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Confirm password</span>
          </div>
          <input
            type="password"
            placeholder="Confirm password"
            className="input input-bordered w-full"
            {...formRegister('confirmPassword', {
              required: 'Connfirm passsword is required'
            })}
          />
          {errors?.confirmPassword ? (
            <div className="label">
              <span className="label-text-alt text-error">{errors.confirmPassword.message}</span>
            </div>
          ) : null}
        </label>
      </div>

      <Button
        type="submit"
        className="mt-8 w-full"
        isLoading={registerMutation.isPending}
      >
        Register
      </Button>
    </form>
  );
};

export default RegisterForm;
