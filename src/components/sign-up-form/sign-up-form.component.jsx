import React, { useState } from 'react'
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils'
import FormInput from '../form-input/form-input.component'
import Button from '../button/button.component'

import './sign-up-form.styles.scss'

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
}

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields)
  const [passwordError, setPasswordError] = useState('')

  const { displayName, email, password, confirmPassword } = formFields

  const onChangeHandler = (event) => {
    const { name, value } = event.target
    setFormFields({ ...formFields, [name]: value })
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault()

    const { email, password, confirmPassword } = formFields

    if (password !== confirmPassword) {
      setPasswordError('Password and Confirm Password do not match')
      setFormFields({ ...formFields, password: '', confirmPassword: '' })
    } else if (password.length < 6) {
      setPasswordError('Password should be minimum 6 characters long')
      setFormFields({ ...formFields, password: '', confirmPassword: '' })
    } else {
      setPasswordError('')
      try {
        const { user } = await createAuthUserWithEmailAndPassword(
          email,
          password
        )
        await createUserDocumentFromAuth(user, { displayName })

        setFormFields(defaultFormFields)
      } catch (error) {
        if (error.code === 'auth/email-already-in-use') {
          alert('Cannot create user. Email already in use')
        }
        console.log('User creation failed ', error)
      }
    }
  }

  return (
    <div className='sign-up-container'>
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={onSubmitHandler}>
        <FormInput
          label='Display Name'
          name='displayName'
          type='text'
          required
          onChange={onChangeHandler}
          value={displayName}
        />
        <FormInput
          label='Email'
          name='email'
          type='email'
          required
          onChange={onChangeHandler}
          value={email}
        />
        <FormInput
          label='Password'
          name='password'
          type='password'
          required
          onChange={onChangeHandler}
          value={password}
        />
        <FormInput
          label='Confirm Password'
          name='confirmPassword'
          type='password'
          required
          onChange={onChangeHandler}
          value={confirmPassword}
        />
        {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}

        <Button type='submit'>Sign Up</Button>
      </form>
    </div>
  )
}

export default SignUpForm
