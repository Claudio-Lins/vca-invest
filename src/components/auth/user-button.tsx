'use client'

import { cn } from '@/lib/utils'
import { ExitIcon } from '@radix-ui/react-icons'
import { FaUser } from 'react-icons/fa'
import { useCurrentUser } from '../../../hooks/use-current-user'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { LogoutButton } from './logout-button'

interface UserButtonProps {}

export function UserButton({}: UserButtonProps) {
	const user = useCurrentUser()
	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<Avatar>
					<AvatarImage src={user?.image || ''} alt='User' />
					<AvatarFallback className='bg-sky-600'>
						<FaUser className='text-white' />
					</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='w-28' align='end'>
				<LogoutButton>
					<DropdownMenuItem className='flex items-center justify-between'>
						<span>Logout</span>
						<ExitIcon className='size-4' />
					</DropdownMenuItem>
				</LogoutButton>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
