import { ChangeEvent, FormEvent, useState } from 'react'
import { Link } from 'react-router-dom'

import { signUp, signInWithGoogle } from '../../utils/firebase/userAuth'
import { createUserProfileDocument } from '../../utils/firebase/controller'
import FormInput from '../../components/form-input/FormInput'
import CustomButton from '../../components/custom-button/CustomButton'
import './SignUp.sass'
import { UserCredential } from 'firebase/auth'

function SignUp() {
  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setError("Passwords don't match!")
      return
    }

    setError('')

    try {
      const { user } = (await signUp(email, password)) as UserCredential

      createUserProfileDocument(user, { name: displayName })

      setDisplayName('')
      setEmail('')
      setPassword('')
      setConfirmPassword('')
    } catch (err) {
      console.error(err)
      setError('Failed to create account. Please try again.')
    }
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    switch (name) {
      case 'email':
        setEmail(value)
        break
      case 'displayName':
        setDisplayName(value)
        break
      case 'password':
        setPassword(value)
        break
      case 'confirmPassword':
        setConfirmPassword(value)
        break
      default:
        break
    }
  }

  return (
    <div className="sign-up page">
      <h2 className="title">Sign up with your email and password</h2>
      <span>
        Already have an account?{' '}
        <Link to="/signin" className="orange-link">
          Sign In!
        </Link>
      </span>

      {error && <p role="alert" className="error-message">{error}</p>}

      <form className="sign-up-form" onSubmit={handleSubmit} method="POST">
        <FormInput
          type="text"
          name="displayName"
          value={displayName}
          handleChange={handleChange}
          label="Display Name"
          required
        />
        <FormInput
          type="email"
          name="email"
          value={email}
          handleChange={handleChange}
          label="Email"
          required
        />
        <FormInput
          type="password"
          name="password"
          value={password}
          handleChange={handleChange}
          label="Password"
          required
        />
        <FormInput
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          handleChange={handleChange}
          label="Confirm Password"
          required
        />
        <div className="buttons">
          <CustomButton type="submit">SIGN UP</CustomButton>
          <CustomButton onClick={signInWithGoogle} google>
            Sign In With Google
          </CustomButton>
        </div>
      </form>
    </div>
  )
}

export default SignUp
