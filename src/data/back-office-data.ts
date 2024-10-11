import type { BackOfficeUser } from '@/types'

export async function getBackOfficeClientByEmail(email: string) {
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_BACK_OFFICE_USER_BY_EMAIL_URL}${email}`,
		)
		if (!res.ok) throw new Error(`HTTP error status: ${res.status}`)

		const user: BackOfficeUser = await res.json()
		return user
	} catch (error) {
		console.log('Fetch getBackOfficeClientByEmail failed', error)
	}
}
