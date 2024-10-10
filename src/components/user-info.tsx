import { cn } from '@/lib/utils'
import type { ExtendedUser } from '../../next-auth'
import { Badge } from './ui/badge'
import { Card, CardContent, CardHeader } from './ui/card'

interface UserInfoProps {
	user?: ExtendedUser
	label: string
}

export function UserInfo({ user, label }: UserInfoProps) {
	return (
		<Card className={cn('w-full max-w-sm md:max-w-2xl shadow-sm')}>
			<CardHeader>
				<p className='text-2xl font-semibold text-center'>{label}</p>
			</CardHeader>
			<CardContent className='space-y-4'>
				<div className='flex items-center justify-between rounded-lg p-3 border shadow-sm'>
					<p className='text-sm font-semibold'>ID</p>
					<p className='font-mono truncate text-xs bg-zinc-100 py-1 px-3 rounded-md'>
						{user?.id}
					</p>
				</div>
				<div className='flex items-center justify-between rounded-lg p-3 border shadow-sm'>
					<p className='text-sm font-semibold'>Name</p>
					<p className='font-mono truncate text-xs bg-zinc-100 py-1 px-3 rounded-md'>
						{user?.name}
					</p>
				</div>
				<div className='flex items-center justify-between rounded-lg p-3 border shadow-sm'>
					<p className='text-sm font-semibold'>Email</p>
					<p className='font-mono truncate text-xs bg-zinc-100 py-1 px-3 rounded-md'>
						{user?.email}
					</p>
				</div>
				<div className='flex items-center justify-between rounded-lg p-3 border shadow-sm'>
					<p className='text-sm font-semibold'>Role</p>
					<p className='font-mono truncate text-xs bg-zinc-100 py-1 px-3 rounded-md'>
						{user?.role}
					</p>
				</div>
				<div className='flex items-center justify-between rounded-lg p-3 border shadow-sm'>
					<p className='text-sm font-semibold'>Two Factor Authentication</p>
					<Badge variant={user?.isTwoFactorEnabled ? 'default' : 'destructive'}>
						{user?.isTwoFactorEnabled ? 'ON' : 'OFF'}
					</Badge>
				</div>
			</CardContent>
		</Card>
	)
}
