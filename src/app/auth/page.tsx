import React from 'react';

import { AuthView } from '@/views/auth';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface AuthPageProps {}

const AuthPage: React.FC<AuthPageProps> = () => {
  return <AuthView />;
};

export default AuthPage;
