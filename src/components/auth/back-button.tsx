'use client'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'

interface BackButtonProps {
	label: string
	href: string
}

export function BackButton({ label, href }: BackButtonProps) {
	return (
		<Button variant='link' className={cn('font-normal w-full')} size='sm' asChild>
			<Link href={href}>{label}</Link>
		</Button>
	)
}
