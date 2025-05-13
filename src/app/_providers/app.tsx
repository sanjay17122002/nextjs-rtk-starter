'use client';

import React from 'react';

import { ReduxProvider } from './redux';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface AppProviderProps extends React.PropsWithChildren {}

export const AppProvider: React.FC<AppProviderProps> = (props) => {
  const { children } = props;

  return <ReduxProvider>{children}</ReduxProvider>;
};
