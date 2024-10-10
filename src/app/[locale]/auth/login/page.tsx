import { LoginForm } from '@/components/auth/login-form'
import { Suspense } from 'react'
import { BeatLoader } from 'react-spinners'

export default function LoginPage() {
	return (
		<Suspense
			fallback={
				<div className='w-full h-full flex items-center justify-center'>
					<BeatLoader color='#00040a' />
				</div>
			}
		>
			<LoginForm />
		</Suspense>
	)
}
