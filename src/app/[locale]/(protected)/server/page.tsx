import { UserInfo } from '@/components/user-info'
import { currentUser } from '@/lib/auth'
import { cn } from '@/lib/utils'

interface ServerPageProps {}

export default async function ServerPage({}: ServerPageProps) {
	const user = (await currentUser()) || undefined // Ensure user is undefined if null
	return <UserInfo user={user} label='💻 Server Component' />
}
