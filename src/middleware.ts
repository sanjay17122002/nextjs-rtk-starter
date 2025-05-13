import { authMiddleware, type AuthMiddlewareConfig } from './features/auth';

const defaultAuthMiddlewareConfig = {
  authRedirect: '/auth',
  loginRedirect: '/my',
  authRoutes: ['/', '/auth', '/auth/sign-up'],
  privateRoutes: ['/auth/new', '/auth/sign-out', '/my/*'],
  cookieNames: {
    accessToken: 'access_token',
    callbackUrl: 'callback_url',
  },
} as const satisfies AuthMiddlewareConfig;

export default authMiddleware(undefined, defaultAuthMiddlewareConfig);

export const config = { matcher: [{ source: '/((?!api|_next|.*\\..*).*)' }] };
