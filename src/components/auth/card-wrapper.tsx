import { Header } from '@/components/auth/header'
import { Social } from '@/components/auth/social'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { BackButton } from './back-button'

interface CardWrapperProps {
	children: React.ReactNode
	headerLabel: string
	backButtonLabel: string
	backButtonHref: string
	showSocial?: boolean
}

export function CardWrapper({
	children,
	headerLabel,
	backButtonHref,
	backButtonLabel,
	showSocial,
}: CardWrapperProps) {
	return (
		<Card className={cn('w-[400px] max-w-xs sm:max-w-sm shadow-md')}>
			<CardHeader>
				<Header label={headerLabel} />
			</CardHeader>
			<CardContent>{children}</CardContent>
			{showSocial && (
				<CardFooter>
					<Social />
				</CardFooter>
			)}
			<CardFooter>
				<BackButton label={backButtonLabel} href={backButtonHref} />
			</CardFooter>
		</Card>
	)
}
