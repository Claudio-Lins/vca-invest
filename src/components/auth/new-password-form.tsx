'use client'

import { cn } from '@/lib/utils'
import { NewPasswordSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoaderIcon } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import type * as z from 'zod'
import { CardWrapper } from './card-wrapper'

import { login } from '@/actions/login'
import { newPassword } from '@/actions/new-password'
import { reset } from '@/actions/reset'
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

interface NewPasswordFormProps {}

export function NewPasswordForm({}: NewPasswordFormProps) {
	const searchParams = useSearchParams()
	const token = searchParams.get('token')
	const [isPending, startTransition] = useTransition()
	const [error, setError] = useState<string | undefined>('')
	const [success, setSuccess] = useState<string | undefined>('')
	const form = useForm<z.infer<typeof NewPasswordSchema>>({
		resolver: zodResolver(NewPasswordSchema),
		defaultValues: {
			password: '',
		},
	})

	const onSubmit = async (values: z.infer<typeof NewPasswordSchema>) => {
		setError('')
		setSuccess('')
		startTransition(async () => {
			try {
				await newPassword(values, token).then((data) => {
					setSuccess(data?.success)
					setError(data?.error)
				})
			} catch (error) {}
		})
	}

	return (
		<CardWrapper
			headerLabel='Enter a new password'
			backButtonLabel='Back to Login'
			backButtonHref='/auth/login'
			showSocial={false}
		>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
					<div className='space-y-4'>
						<FormField
							control={form.control}
							name='password'
							render={({ field }) => (
								<FormItem>
									<FormLabel>New password</FormLabel>
									<FormControl>
										<Input
											{...field}
											type='password'
											placeholder='******'
											disabled={isPending}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<FormError message={error} />
					<FormSuccess message={success} />
					<Button variant={'default'} className='w-full' disabled={isPending}>
						<LoaderIcon
							className={!isPending ? 'hidden' : 'animate-spin mr-2'}
						/>
						<span>Create new password</span>
					</Button>
				</form>
			</Form>
		</CardWrapper>
	)
}
