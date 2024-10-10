'use client'

import { cn } from '@/lib/utils'
import { RegisterSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoaderIcon } from 'lucide-react'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import type * as z from 'zod'
import { CardWrapper } from './card-wrapper'

import { login } from '@/actions/login'
import { register } from '@/actions/register'
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

interface RegisterFormProps {}

export function RegisterForm({}: RegisterFormProps) {
	const [isPending, startTransition] = useTransition()
	const [error, setError] = useState<string | undefined>('')
	const [success, setSuccess] = useState<string | undefined>('')
	const form = useForm<z.infer<typeof RegisterSchema>>({
		resolver: zodResolver(RegisterSchema),
		defaultValues: {
			name: '',

			email: '',
			password: '',
		},
	})

	const onSubmit = async (values: z.infer<typeof RegisterSchema>) => {
		setError('')
		setSuccess('')
		startTransition(async () => {
			try {
				await register(values).then((data) => {
					setSuccess(data.success)
					setError(data.error)
				})
				// const resp = await login(values)
				// if (resp?.error) setError(resp.error)
				// form.reset()
			} catch (error) {
				// setError('Something went wrong!')
				// form.reset()
			}
		})
	}

	return (
		<CardWrapper
			headerLabel='Create a account'
			backButtonLabel='Already have a account? '
			backButtonHref='/auth/login'
			showSocial={true}
		>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
					<div className='space-y-4'>
						<FormField
							control={form.control}
							name='name'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Full name</FormLabel>
									<FormControl>
										<Input {...field} type='text' placeholder='John Doe' disabled={isPending} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
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
										<Input {...field} type='password' placeholder='******' disabled={isPending} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<FormError message={error} />
					<FormSuccess message={success} />
					<Button variant={'default'} className='w-full' disabled={isPending}>
						<LoaderIcon className={!isPending ? 'hidden' : 'animate-spin mr-2'} />
						<span>Create a account</span>
					</Button>
				</form>
			</Form>
		</CardWrapper>
	)
}
