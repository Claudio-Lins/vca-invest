import { NextIntlClientProvider } from 'next-intl'
import { getMessages, unstable_setRequestLocale } from 'next-intl/server'

export default async function LocaleLayout({
	children,
	params: { locale },
}: { children: React.ReactNode; params: { locale: string } }) {
	unstable_setRequestLocale(locale)

	const messages = await getMessages()

	return (
		<html lang={locale}>
			<body className={'antialiased'}>
				<NextIntlClientProvider messages={messages}>
					{children}
				</NextIntlClientProvider>
			</body>
		</html>
	)
}
