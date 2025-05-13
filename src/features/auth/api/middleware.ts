import { NextRequest, NextResponse } from 'next/server';

import { checkRoute } from '../lib';
import type { AuthHandler, AuthMiddlewareConfig } from '../types';

const defaultAuthMiddlewareConfig = {
  authRedirect: '/',
  loginRedirect: '/my',
  authRoutes: ['/', '/auth', '/auth/sign-up'],
  privateRoutes: ['/auth/new', '/auth/sign-out', '/my/*'],
  cookieNames: {
    accessToken: 'access_token',
    callbackUrl: 'callback_url',
  },
} as const satisfies AuthMiddlewareConfig;

export const authMiddleware = (
  next?: AuthHandler,
  config?: Partial<AuthMiddlewareConfig>
): ((request: NextRequest) => Promise<NextResponse<unknown>>) => {
  const {
    authRedirect,
    loginRedirect,
    authRoutes,
    privateRoutes,
    cookieNames,
  } = {
    ...defaultAuthMiddlewareConfig,
    ...config,
  };

  return async (request) => {
    const response = (await next?.(request)) || NextResponse.next();
    const { origin, pathname } = request.nextUrl;

    const accessToken = request.cookies.get(cookieNames.accessToken)?.value;
    const isLoggedIn = Boolean(accessToken);

    const isAuthRoute = authRoutes.some((route) =>
      checkRoute({ pathname, route })
    );

    const isPrivateRoute = privateRoutes.some((route) =>
      checkRoute({ pathname, route })
    );

    const callbackUrlCookie = request.cookies.get(cookieNames.callbackUrl);
    const callbackUrl = callbackUrlCookie?.value;

    if (isLoggedIn) {
      if (isAuthRoute) {
        if (callbackUrl) {
          response.cookies.delete(cookieNames.callbackUrl);

          return NextResponse.redirect(new URL(callbackUrl, origin), {
            headers: response.headers,
          });
        }

        return NextResponse.redirect(new URL(loginRedirect, origin), {
          headers: response.headers,
        });
      }

      return response;
    }

    if (isPrivateRoute) {
      const isPrefetch = request.headers.get('next-router-prefetch') === '1';

      if (!isPrefetch && pathname !== '/auth/sign-out') {
        response.cookies.set(cookieNames.callbackUrl, pathname, {
          path: '/',
          httpOnly: true,
          sameSite: 'lax',
        });
      }

      return NextResponse.redirect(new URL(authRedirect, origin), {
        headers: response.headers,
      });
    }

    return response;
  };
};
