'use client';

import React from 'react';
import { Provider } from 'react-redux';

import { store } from '../_store';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ReduxProviderProps extends React.PropsWithChildren {}

export const ReduxProvider: React.FC<ReduxProviderProps> = (props) => {
  const { children } = props;

  return <Provider store={store}>{children}</Provider>;
};
