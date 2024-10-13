import { cn } from '@/lib/utils'
import { Navbar } from './_components/navbar'

interface ProtectLayoutProps {
	children: React.ReactNode
}

export default async function ProtectLayout({ children }: ProtectLayoutProps) {
	return (
		<div
			className={cn(
				'w-full flex flex-col items-center space-y-10 h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-700 to-blue-900',
			)}
		>
			<Navbar />
			{children}
		</div>
	)
}
