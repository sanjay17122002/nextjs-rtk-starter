'use client';

import React from 'react';

import { useGetProfileQuery } from '../api';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface AuthBootstrapProps {}

export const AuthBootstrap: React.FC<AuthBootstrapProps> = () => {
  useGetProfileQuery();

  return null;
};
