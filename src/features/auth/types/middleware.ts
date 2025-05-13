import { NextRequest, NextResponse } from 'next/server';

export type AuthHandler = (
  request: NextRequest,
  context?: unknown
) => NextResponse | Promise<NextResponse>;

/** Configuration options for the authentication middleware. */
export interface AuthMiddlewareConfig {
  /** URL to redirect to after successful authentication */
  authRedirect: string;

  /**
   * Array of routes that are part of the authentication flow (e.g., login,
   * register)
   */
  authRoutes: Array<string>;

  /** Custom names for authentication-related cookies */
  cookieNames: {
    /** Name of the cookie that stores the access token */
    accessToken: string;
    /** Name of the cookie that stores the callback URL */
    callbackUrl: string;
  };

  /** URL to redirect to when authentication is required */
  loginRedirect: string;

  /** Array of routes that require authentication to access */
  privateRoutes: Array<string>;
}
