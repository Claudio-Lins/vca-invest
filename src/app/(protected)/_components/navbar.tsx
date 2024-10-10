'use client'

import { LogoutButton } from '@/components/auth/logout-button'
import { UserButton } from '@/components/auth/user-button'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NavbarProps {}

export function Navbar({}: NavbarProps) {
	const pathname = usePathname()
	return (
		<nav
			className={cn(
				'bg-secondary flex items-center justify-between p-4 rounded-xl w-[600px] shadow-md text-black mt-10',
			)}
		>
			<div className='flex gap-x-4'>
				<Button
					variant={pathname === '/server' ? 'default' : 'outline'}
					asChild
				>
					<Link href='/server'>Server</Link>
				</Button>
				<Button
					variant={pathname === '/client' ? 'default' : 'outline'}
					asChild
				>
					<Link href='/client'>Client</Link>
				</Button>
				<Button variant={pathname === '/admin' ? 'default' : 'outline'} asChild>
					<Link href='/admin'>Admin</Link>
				</Button>
				<Button
					variant={pathname === '/settings' ? 'default' : 'outline'}
					asChild
				>
					<Link href='/settings'>Settings</Link>
				</Button>
			</div>
			<UserButton />
		</nav>
	)
}
