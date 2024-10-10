'use client'

import { cn } from '@/lib/utils'
import { LoginSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoaderIcon } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import type * as z from 'zod'
import { CardWrapper } from './card-wrapper'

import { login } from '@/actions/login'
import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { FormError } from '../form-error'
import { FormSuccess } from '../form-success'

interface LoginFormProps {}

export function LoginForm({}: LoginFormProps) {
	const searchParams = useSearchParams()
	const urlError =
		searchParams.get('error') === 'OAuthAccountNotLinked'
			? 'Email is already use with different provider!'
			: ''
	const [showTwoFactor, setShowTwoFactor] = useState(false)
	const [isPending, startTransition] = useTransition()
	const [error, setError] = useState<string | undefined>('')
	const [success, setSuccess] = useState<string | undefined>('')
	const form = useForm<z.infer<typeof LoginSchema>>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: '',
			password: '',
			code: '',
		},
	})

	const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
		setError('')
		setSuccess('')
		startTransition(async () => {
			try {
				await login(values).then((data) => {
					if (data?.error) {
						form.reset()
						setError(data?.error)
					}
					if (data?.success) {
						form.reset()
						setSuccess(data?.success)
					}
					if (data?.twoFactor) {
						setShowTwoFactor(true)
						setError('')
						setSuccess('')
					}
				})
			} catch (error) {
				setError('An error occurred while logging in!')
			}
		})
	}

	return (
		<CardWrapper
			headerLabel='Welcome Back'
			backButtonLabel='Do not have a account? '
			backButtonHref='/auth/register'
			showSocial={true}
		>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
					<div className='space-y-4'>
						{showTwoFactor && (
							<FormField
								control={form.control}
								name='code'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Two Factor Code</FormLabel>
										<FormControl>
											<Input
												{...field}
												placeholder='123456'
												disabled={isPending}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						)}
						{!showTwoFactor && (
							<>
								<FormField
									control={form.control}
									name='email'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Email</FormLabel>
											<FormControl>
												<Input
													{...field}
													type='email'
													placeholder='john.doe@exemplo.com'
													disabled={isPending}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='password'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Password</FormLabel>
											<FormControl>
												<Input
													{...field}
													type='password'
													placeholder='******'
													disabled={isPending}
												/>
											</FormControl>
											<Button variant='link' asChild className='px-1'>
												<Link href='/auth/reset' className='text-xs'>
													Forgot Password?
												</Link>
											</Button>
											<FormMessage />
										</FormItem>
									)}
								/>
							</>
						)}
					</div>
					<FormError message={error || urlError} />
					<FormSuccess message={success} />
					<Button variant={'default'} className='w-full' disabled={isPending}>
						<LoaderIcon
							className={!isPending ? 'hidden' : 'animate-spin mr-2'}
						/>
						<span>{showTwoFactor ? 'Confirm' : 'Login'}</span>
					</Button>
				</form>
			</Form>
		</CardWrapper>
	)
}
