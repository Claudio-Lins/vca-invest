'use client'

import { cn } from '@/lib/utils'
import { useLocale } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

interface CounterProps {
	locale: string
}

export function BackToHome() {
	const [counter, setCounter] = useState(3)
	const router = useRouter()

	useEffect(() => {
		const interval = setInterval(() => {
			setCounter((prevCounter) => {
				if (prevCounter === 1) {
					clearInterval(interval)
					router.push('/')
					return 0
				}
				return prevCounter - 1
			})
		}, 1000)
		return () => clearInterval(interval)
	}, [])

	return <div className={cn('')}>{counter}</div>
}
