'use client'
import { admin } from '@/actions/admin'
import { RoleGate } from '@/components/auth/role-gate'
import { FormSuccess } from '@/components/form-success'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { UserInfo } from '@/components/user-info'
import { UserCurrentRole } from '@/hooks/use-current-role'
import { currentRole, currentUser } from '@/lib/auth'
import { cn } from '@/lib/utils'
import { UserRole } from '@prisma/client'
import { toast } from 'sonner'
import { useCurrentUser } from '../../../../hooks/use-current-user'

interface AdminPageProps {}

export default function AdminPage({}: AdminPageProps) {
	function onServerActionClick() {
		admin().then((data) => {
			if (data.success) {
				toast.success('You are authorized to view this page.')
			} else {
				toast.error('You are not authorized to view this page.')
			}
		})
	}

	function onApiRouteClick() {
		fetch('/api/admin').then((response) => {
			if (response.ok) {
				toast.success('API Route Success')
			} else {
				toast.error('Forbidden API Route')
			}
		})
	}

	return (
		<Card className={cn('w-full max-w-sm md:max-w-2xl shadow-sm')}>
			<CardHeader>
				<p className='text-2xl font-semibold text-center'>🧑🏽‍💼 Admin</p>
			</CardHeader>
			<CardContent className='space-y-4'>
				<RoleGate allowedRoles={UserRole.ADMIN}>
					<FormSuccess message='You are allowed to see this content!' />
				</RoleGate>
				<div className='flex items-center justify-between rounded-lg p-3 border shadow-sm'>
					<p className='text-sm font-semibold'>Admin-only API Route</p>
					<Button onClick={onApiRouteClick}>Click to test</Button>
				</div>
				<div className='flex items-center justify-between rounded-lg p-3 border shadow-sm'>
					<p className='text-sm font-semibold'>Admin-only Server Actions</p>
					<Button onClick={onServerActionClick}>Click to test</Button>
				</div>
			</CardContent>
		</Card>
	)
}
