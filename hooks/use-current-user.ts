import { useSession } from 'next-auth/react'

export function useCurrentUser() {
	const session = useSession()

	if (!session) {
		throw new Error('No session found')
	}

	return session?.data?.user
}
