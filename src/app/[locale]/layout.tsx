import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'

export default async function RootLocaleLayout({
	children,
	params: { locale },
}: {
	children: React.ReactNode
	params: { locale: string }
}) {
	// Providing all messages to the client
	// side is the easiest way to get started
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
