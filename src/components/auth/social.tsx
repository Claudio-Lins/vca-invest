'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { DEFAULT_LOGIN_REDIRECT } from '@/routes'
import { signIn } from 'next-auth/react'
import { FaGithub } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'

interface SocialProps {}

export function Social({}: SocialProps) {
	function onClick(provider: 'google' | 'github') {
		signIn(provider, {
			callbackUrl: DEFAULT_LOGIN_REDIRECT,
		})
	}
	return (
		<div className={cn('w-full flex items-center gap-x-2')}>
			<Button variant='outline' className={cn('w-full')} onClick={() => onClick('google')}>
				<FcGoogle className={cn('size-6')} />
			</Button>
			<Button variant='outline' className={cn('w-full')} onClick={() => onClick('github')}>
				<FaGithub className={cn('size-6')} />
			</Button>
		</div>
	)
}
