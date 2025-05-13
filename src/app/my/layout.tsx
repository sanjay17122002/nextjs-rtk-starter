import React from 'react';

import { AuthBootstrap } from '@/features/auth';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface MyLayoutProps extends React.PropsWithChildren {}

const MyLayout: React.FC<MyLayoutProps> = (props) => {
  const { children } = props;

  return (
    <>
      <AuthBootstrap />
      {children}
    </>
  );
};

export default MyLayout;
