import { cn } from '@/lib/utils'
import { ExclamationTriangleIcon } from '@radix-ui/react-icons'
import { CardWrapper } from './card-wrapper'

interface ErrorCardProps {}

export function ErrorCard({}: ErrorCardProps) {
	return (
		<CardWrapper
			headerLabel='Something went wrong!'
			backButtonLabel='Return to login'
			backButtonHref='/auth/login'
		>
			<div className='flex w-full items-center justify-center'>
				<ExclamationTriangleIcon className={cn('size-8 text-red-500 animate-pulse')} />
			</div>
		</CardWrapper>
	)
}
