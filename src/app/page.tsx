import { LoginButton } from '@/components/auth/login-button'
import { Button } from '@/components/ui/button'

export default function Home() {
	return (
		<div className='flex h-full flex-col items-center justify-items-center min-h-screen justify-center bg-sky-700'>
			<div className='space-y-6 text-center'>
				<h1 className='text-6xl font-semibold text-white drop-shadow-sm'>🔐 Auth</h1>
				<p className='text-white text-kg'>A simple authentication service!</p>
				<div className=''>
					<LoginButton asChild>
						<Button className='' variant='secondary' size='lg'>
							Sign in
						</Button>
					</LoginButton>
				</div>
			</div>
		</div>
	)
}
