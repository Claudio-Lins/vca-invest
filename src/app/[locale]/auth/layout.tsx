import { cn } from '@/lib/utils'

interface AuthLayoutProps {
	children: React.ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
	return (
		<div
			className={cn(
				'w-full flex items-center justify-center h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-500 to-blue-800',
			)}
		>
			{children}
		</div>
	)
}
