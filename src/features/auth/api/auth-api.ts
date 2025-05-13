import type { AppDispatch } from '@/app/_store';
import { clearUser, setUser } from '@/entities/user';
import { baseApi } from '@/shared/api/base-api';

import type {
  LoginRequest,
  LoginResponse,
  ProfileResponse,
  RefreshResponse,
} from '../types';

const handleUserOnSuccess = async (
  queryFulfilled: Promise<{ data: LoginResponse }>,
  dispatch: AppDispatch
) => {
  try {
    const { data } = await queryFulfilled;
    dispatch(setUser(data.user));
  } catch {
    dispatch(clearUser());
  }
};

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({
        url: '/auth/login/',
        method: 'POST',
        body,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await handleUserOnSuccess(queryFulfilled, dispatch);
      },
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: '/auth/logout/',
        method: 'POST',
      }),
      async onQueryStarted(_, { dispatch }) {
        dispatch(clearUser());
      },
    }),
    refresh: builder.mutation<RefreshResponse, void>({
      query: () => ({
        url: '/auth/refresh/',
        method: 'POST',
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await handleUserOnSuccess(queryFulfilled, dispatch);
      },
    }),
    getProfile: builder.query<ProfileResponse, void>({
      query: () => '/auth/profile/',
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await handleUserOnSuccess(queryFulfilled, dispatch);
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRefreshMutation,
  useGetProfileQuery,
} = authApi;
