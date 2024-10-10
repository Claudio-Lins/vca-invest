import { ErrorCard } from '@/components/auth/error-card'
import { cn } from '@/lib/utils'
import Link from 'next/link'

interface ErrorPageProps {}

export default function ErrorPage({}: ErrorPageProps) {
	return <ErrorCard />
}
