import Home from '@/app/page'
// import { LoginForm } from '@/components/auth/login-form'
import { render, screen } from '@testing-library/react'

describe('Home Page', () => {
	it('should render the home page', () => {
		render(<Home />)
		expect(screen.getByText(/A simple authentication service!/)).toBeInTheDocument()
	})
})
// describe('LoginForm', () => {
// 	it('should render the LoginForm component', () => {
// 		render(<LoginForm />)

// 		// Verifica se o título "Welcome Back" está presente
// 		expect(screen.getByText(/Welcome Back/)).toBeInTheDocument()

// 		// Verifica se os campos de email e senha estão presentes
// 		expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
// 		expect(screen.getByLabelText(/password/i)).toBeInTheDocument()

// 		// Verifica se o botão de login está presente
// 		expect(screen.getByText(/login/i)).toBeInTheDocument()
// 	})
// })
