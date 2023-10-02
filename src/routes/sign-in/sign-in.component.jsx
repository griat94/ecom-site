import React from 'react'
import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils'
import SignUpForm from '../../components/sign-up-form/sign-up-form.component'

const SignIn = () => {
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup()
    const userDocRef = await createUserDocumentFromAuth(user)
  }

  return (
    <React.Fragment>
      <h1>Sign In Page</h1>
      <button onClick={logGoogleUser}>Sign In With Popup</button>
      <SignUpForm />
    </React.Fragment>
  )
}

export default SignIn
