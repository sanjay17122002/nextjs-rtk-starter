import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { clearUser, setUser } from '@/entities/user';
import type { RefreshResponse } from '@/features/auth';

import { config } from '../config';

const getCookie = (name: string): string | null => {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? decodeURIComponent(match[2]) : null;
};

const baseQuery = fetchBaseQuery({
  baseUrl: config.NEXT_PUBLIC_API_URL,
  credentials: 'include',
  prepareHeaders: (headers) => {
    if (typeof window !== 'undefined') {
      const csrfToken = getCookie('csrf_token');
      if (csrfToken) {
        headers.set('X-CSRF-Token', csrfToken);
      }
    }
    return headers;
  },
});

const baseQueryWithRefresh: typeof baseQuery = async (
  args,
  api,
  extraOptions
) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result?.error?.status === 401) {
    const refreshResult = await baseQuery('/refresh', api, extraOptions);

    if (refreshResult.data) {
      const data = refreshResult.data as RefreshResponse;

      api.dispatch(setUser(data.user));
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(clearUser());
    }
  }
  return result;
};

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithRefresh,
  endpoints: () => ({}),
});
