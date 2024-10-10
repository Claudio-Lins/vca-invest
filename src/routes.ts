/**
 * An Array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes = ['/', '/auth/new-verification']

/**
 * An Array of routes that are used for authentication
 * These routes will redirect logged users to  /settings endpoint
 * @type {string[]}
 */
export const authRoutes = [
	'/auth/login',
	'/auth/register',
	'/auth/error',
	'/auth/reset',
	'/auth/new-password',
]

/**
 * The prefix used to access the API authorization routes
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string}
 */
export const apiAuthPrefix = '/api/auth'

/**
 * The default redirect route after a successful login
 * @type {string[]}
 */
export const DEFAULT_LOGIN_REDIRECT = '/settings'
