'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

import { useLoginMutation } from '../api';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface LoginFormProps {}

export const LoginForm: React.FC<LoginFormProps> = () => {
  const router = useRouter();
  const [login, { isLoading, error }] = useLoginMutation();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get('email')?.toString();
    const password = formData.get('password')?.toString();

    if (!email || !password) {
      return;
    }

    try {
      await login({ email, password }).unwrap();
      router.replace('/my');
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='space-y-4'>
        <div className='space-y-2'>
          <input
            type='email'
            name='email'
            placeholder='Email'
            className='w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none'
          />
          <input
            type='password'
            name='password'
            placeholder='Password'
            className='w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none'
          />
        </div>
        <button
          type='submit'
          disabled={isLoading}
          className='w-full rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50'
        >
          {isLoading ? 'Loading...' : 'Login'}
        </button>
        {error && <div className='text-red-500'>Login failed</div>}
      </div>
    </form>
  );
};
