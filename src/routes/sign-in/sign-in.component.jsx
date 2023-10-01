import React from 'react'
import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils'

const SignIn = () => {
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup()
    const userDocRef = await createUserDocumentFromAuth(user)
  }
  return (
    <React.Fragment>
      <h1>Sign In Page</h1>
      <button onClick={logGoogleUser}>Sign In</button>
    </React.Fragment>
  )
}

export default SignIn
