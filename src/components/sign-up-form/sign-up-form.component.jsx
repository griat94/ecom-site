import React, { useState } from 'react'
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils'

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
    <React.Fragment>
      <h1>Sign up with your email and password</h1>
      <form onSubmit={onSubmitHandler}>
        <label>Display Name</label>
        <input
          name='displayName'
          type='text'
          required
          onChange={onChangeHandler}
          value={displayName}
        />

        <label>Email</label>
        <input
          name='email'
          type='email'
          required
          onChange={onChangeHandler}
          value={email}
        />

        <label>Password</label>
        <input
          name='password'
          type='password'
          required
          onChange={onChangeHandler}
          value={password}
        />

        <label>Confirm Password</label>
        <input
          name='confirmPassword'
          type='password'
          required
          onChange={onChangeHandler}
          value={confirmPassword}
        />
        {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}

        <button type='submit'>Sign Up</button>
      </form>
    </React.Fragment>
  )
}

export default SignUpForm
