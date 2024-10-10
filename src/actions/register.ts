'use server'

import { prisma } from '@/lib/prisma'
import { generateVerificationToken } from '@/lib/tokens'
import bcryptjs from 'bcryptjs'

import { getUserByEmail } from '@/data/user'
import { sendVerificationEmail } from '@/lib/mail'
import { RegisterSchema } from '@/schemas'
import type { z } from 'zod'

export async function register(values: z.infer<typeof RegisterSchema>) {
	console.table(values)
	const validatedFields = RegisterSchema.safeParse(values)

	if (!validatedFields.success) {
		return { error: 'Invalid fields!' }
	}
	const { name, email, password } = validatedFields.data
	const hashedPassword = await bcryptjs.hash(password, 10)

	const existingUser = await getUserByEmail(email)

	if (existingUser) {
		return { error: 'Email already exists!' }
	}

	await prisma.user.create({
		data: {
			name,
			email,
			password: hashedPassword,
		},
	})

	const verificationToken = await generateVerificationToken(email)

	await sendVerificationEmail(verificationToken.email, verificationToken.token)

	return { success: 'Confirmation email sent!' }
}
