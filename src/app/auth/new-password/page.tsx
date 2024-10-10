import { NewPasswordForm } from '@/components/auth/new-password-form'
import { Suspense } from 'react'
import { BeatLoader } from 'react-spinners'

interface NewPasswordProps {}

export default function NewPassword({}: NewPasswordProps) {
	return (
		<Suspense
			fallback={
				<div className='w-full h-full flex items-center justify-center'>
					<BeatLoader color='#2563EB' />
				</div>
			}
		>
			<NewPasswordForm />
		</Suspense>
	)
}
