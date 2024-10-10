import { cn } from '@/lib/utils'
import { useLocale } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useTransition, type ChangeEvent } from 'react'

interface LocaleSwitcherProps {}

export function LocaleSwitcher({}: LocaleSwitcherProps) {
	const [isPending, startTransition] = useTransition()
	const router = useRouter()
	const localeActive = useLocale()

	const onSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
		const nextLocale = event.target.value
		startTransition(() => {
			router.replace(`/${nextLocale}`)
		})
	}

	return (
		<label className={cn('border-2 rounded')}>
			<p className='sr-only'>change language</p>
			<select
				className='bg-transparent py-2'
				onChange={onSelectChange}
				disabled={isPending}
				defaultValue={localeActive}
			>
				<option value='en'>EN</option>
				<option value='pt'>PT</option>
				<option value='zh'>ZH</option>
				<option value='ar'>AR</option>
			</select>
		</label>
	)
}
