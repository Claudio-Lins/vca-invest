'use client'

import { cn } from '@/lib/utils'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'

interface LogoutButtonProps {
	children: React.ReactNode
}

export function LogoutButton({ children }: LogoutButtonProps) {
	const router = useRouter()

	function handleSingOut() {
		signOut()
	}

	return (
		<span onClick={handleSingOut} className='cursor-pointer'>
			{children}
		</span>
	)
}
