'use client'

import { newVerification } from '@/actions/new-verification'
import { cn } from '@/lib/utils'
import { useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { BeatLoader } from 'react-spinners'
import { FormError } from '../form-error'
import { FormSuccess } from '../form-success'
import { CardWrapper } from './card-wrapper'

interface NewVerificationFormProps {}

export function NewVerificationForm({}: NewVerificationFormProps) {
	const [error, setError] = useState<string | undefined>()
	const [success, setSuccess] = useState<string | undefined>()
	const searchParams = useSearchParams()

	const token = searchParams.get('token')

	const onSubmit = useCallback(async () => {
		if (!token) {
			setError('Token not found!')
			return
		}
		newVerification(token)
			.then((data) => {
				setSuccess(data.success)
				setError(data.error)
			})
			.catch(() => {
				setError('Failed to verify your account!')
			})
	}, [token])

	useEffect(() => {
		onSubmit()
	}, [onSubmit])

	return (
		<CardWrapper
			headerLabel='Confirm your verification'
			backButtonLabel='Back to login'
			backButtonHref='/auth/login'
		>
			<div className='flex w-full items-center justify-center flex-col gap-2'>
				{!error && !success && <BeatLoader />}
				<FormError message={error} />
				<FormSuccess message={success} />
			</div>
		</CardWrapper>
	)
}
