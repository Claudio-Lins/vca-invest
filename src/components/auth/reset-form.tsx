'use client'

import { cn } from '@/lib/utils'
import { ResetSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoaderIcon } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import type * as z from 'zod'
import { CardWrapper } from './card-wrapper'

import { login } from '@/actions/login'
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

interface LoginFormProps {}

export function ResetForm({}: LoginFormProps) {
	const [isPending, startTransition] = useTransition()
	const [error, setError] = useState<string | undefined>('')
	const [success, setSuccess] = useState<string | undefined>('')
	const form = useForm<z.infer<typeof ResetSchema>>({
		resolver: zodResolver(ResetSchema),
		defaultValues: {
			email: '',
		},
	})

	const onSubmit = async (values: z.infer<typeof ResetSchema>) => {
		setError('')
		setSuccess('')
		startTransition(async () => {
			try {
				await reset(values).then((data) => {
					setSuccess(data?.success)
					setError(data?.error)
				})
			} catch (error) {}
		})
	}

	return (
		<CardWrapper
			headerLabel='Forgot your Password?'
			backButtonLabel='Back to Login'
			backButtonHref='/auth/login'
			showSocial={false}
		>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
					<div className='space-y-4'>
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
					</div>
					<FormError message={error} />
					<FormSuccess message={success} />
					<Button variant={'default'} className='w-full' disabled={isPending}>
						<LoaderIcon className={!isPending ? 'hidden' : 'animate-spin mr-2'} />
						<span>Send reset email</span>
					</Button>
				</form>
			</Form>
		</CardWrapper>
	)
}
