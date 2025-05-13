import React from 'react';

import { LoginForm } from '@/features/auth';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface AuthViewProps {}

export const AuthView: React.FC<AuthViewProps> = () => {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4'>
      <h1 className='mb-6 text-3xl font-bold text-gray-800'>Login</h1>
      <div className='w-full max-w-md'>
        <LoginForm />
      </div>
    </div>
  );
};
