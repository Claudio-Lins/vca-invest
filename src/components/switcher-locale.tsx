'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState, useTransition } from 'react'

export function SwitcherLocale() {
	const [isPending, startTransition] = useTransition()
	const router = useRouter()
	const pathname = usePathname()
	const [headerTop, setHeaderTop] = useState(true)
	const [showLocale, setShowLocale] = useState(false)
	const [nextLocale, setNextLocale] = useState('')

	function scrollHeader() {
		if (window.scrollY >= 80) {
			setHeaderTop(false)
		} else {
			setHeaderTop(true)
		}
	}

	useEffect(() => {
		window.addEventListener('scroll', scrollHeader)

		return () => {
			window.addEventListener('scroll', scrollHeader)
		}
	}, [])

	async function handleSelectLocale(lang: string) {
		startTransition(() => {
			if (pathname.includes('/privacy-policy')) {
				const policyLang = pathname.split('/')[1]
				switch (policyLang) {
					case 'pt':
						setNextLocale('en')
						break
					case 'en':
						setNextLocale('pt')
						break
					case 'zh':
						setNextLocale('ar')
						break
					case 'ar':
						setNextLocale('zh')
						break
					default:
						setNextLocale('/')
				}
				router.push(`/${lang}/privacy-policy`)
				return
			}
			router.push(`/${lang}`)
		})
		setShowLocale(false)
	}

	return (
		<div
			className='relative'
			onClick={() => setShowLocale(!showLocale)}
			onMouseEnter={() => setShowLocale(true)}
			onMouseLeave={() => setShowLocale(false)}
		>
			<button
				type='button'
				className={cn(
					'uppercase transition-all duration-300',
					!headerTop ? 'text-black' : 'text-white',
				)}
			>
				{pathname.includes('/pt') && 'pt'}
				{pathname.includes('/en') && 'en'}
				{pathname.includes('/zh') && 'zh'}
				{pathname.includes('/ar') && 'ar'}
			</button>
			<div
				className={cn(
					'absolute -right-3 z-10 origin-top flex-col rounded-md shadow-md',
					showLocale
						? 'flex h-28 bg-white transition-all duration-300 '
						: 'invisible h-0 overflow-hidden transition-all duration-300',
				)}
			>
				<Button
					className={cn(pathname.includes('en') && 'hidden')}
					variant='ghost'
					onClick={() => handleSelectLocale('en')}
				>
					EN
				</Button>
				<Button
					className={cn(pathname.includes('pt') && 'hidden')}
					variant='ghost'
					onClick={() => handleSelectLocale('pt')}
				>
					{/* <ReactCountryFlag countryCode="PT" /> */}
					PT
				</Button>
				<Button
					className={cn(pathname.includes('zh') && 'hidden')}
					variant='ghost'
					onClick={() => handleSelectLocale('zh')}
				>
					{/* <ReactCountryFlag countryCode="CN" /> */}
					ZH
				</Button>
				<Button
					className={cn(pathname.includes('ar') && 'hidden')}
					variant='ghost'
					onClick={() => handleSelectLocale('ar')}
				>
					{/* <ReactCountryFlag countryCode="AE" /> */}
					AR
				</Button>
			</div>
		</div>
	)
}
