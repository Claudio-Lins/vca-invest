import { LoginForm } from '@/components/auth/login-form'
import { RegisterForm } from '@/components/auth/register-form'
import { cn } from '@/lib/utils'

interface RegisterProps {}

export default function Register({}: RegisterProps) {
	return (
		<>
			<RegisterForm />
		</>
	)
}
