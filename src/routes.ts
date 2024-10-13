// src/routes.ts

/**
 * Um array de rotas públicas
 * Essas rotas não requerem autenticação
 */
export const publicRoutes = ['/', '/auth/new-verification']

/**
 * Um array de rotas de autenticação
 * Essas rotas irão redirecionar usuários logados para /settings
 */
export const authRoutes = [
	'/auth/login',
	'/auth/register',
	'/auth/error',
	'/auth/reset',
	'/auth/new-password',
]

/**
 * Um array de rotas de protegidas
 * Essas rotas irão redirecionar usuários não logados para /auth/login'
 */
export const protectedRoutes = ['/admin', '/settings', '/client', '/server']

/**
 * Prefixo usado para acessar rotas de autorização da API
 * Rotas que começam com este prefixo são usadas para fins de autenticação de API
 */
export const apiAuthPrefix = '/api/auth'

/**
 * Rota padrão de redirecionamento após um login bem-sucedido
 */
export const DEFAULT_LOGIN_REDIRECT = '/settings'
