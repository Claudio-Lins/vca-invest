'use client'

import { UserInfo } from '@/components/user-info'
import { currentUser } from '@/lib/auth'
import { cn } from '@/lib/utils'
import { useCurrentUser } from '../../../../hooks/use-current-user'

interface ClientPageProps {}

export default function ClientPage({}: ClientPageProps) {
	const user = useCurrentUser()
	return <UserInfo user={user} label='🙋🏻 Client Component' />
}
