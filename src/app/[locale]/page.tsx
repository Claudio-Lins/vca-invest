import { LoginButton } from '@/components/auth/login-button'
import { Button } from '@/components/ui/button'
import { auth, signOut } from 'auth'

export default async function Home() {
	const session = await auth()
	return (
		<div className='flex h-full flex-col items-center justify-items-center min-h-screen justify-center bg-sky-700'>
			<div className='space-y-6 text-center'>
				<h1 className='text-6xl font-semibold text-white drop-shadow-sm'>
					🔐 Auth
				</h1>
				<p className='text-white text-kg'>A simple authentication service!</p>
				<div className='gap-4'>
					<LoginButton asChild>
						<Button className='' variant='secondary' size='lg'>
							SingIn
						</Button>
					</LoginButton>
				</div>
				{session && (
					<div className='gap-4 mt-4'>
						<form
							action={async () => {
								'use server'
								await signOut()
							}}
						>
							<button type='submit' className='w-full'>
								Sign Out
							</button>
						</form>
						<pre className='text-white text-sm font-bold text-left mt-6'>
							Logged in as {JSON.stringify(session, null, 2)}
						</pre>
					</div>
				)}
			</div>
		</div>
	)
}
