import { NewVerificationForm } from '@/components/auth/new-verification-form'
import { Suspense } from 'react'
import { BeatLoader } from 'react-spinners'

interface NewVerificationProps {}

export default function NewVerification({}: NewVerificationProps) {
	return (
		<Suspense
			fallback={
				<div className='w-full h-full flex items-center justify-center'>
					<BeatLoader color='#2563EB' />
				</div>
			}
		>
			<NewVerificationForm />
		</Suspense>
	)
}
