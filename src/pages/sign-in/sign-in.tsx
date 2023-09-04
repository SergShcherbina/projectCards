import { Navigate, useNavigate } from 'react-router-dom'

import { SignIn } from '../../components'
import { useLoginMutation, useMeQuery } from '../../services/auth'

export const SignInPage = () => {
  const { data, isLoading } = useMeQuery()
  const [signIn, { isLoading: isSignIn }] = useLoginMutation()
  const navigate = useNavigate()

  if (isLoading) return <div>Loading...</div>
  if (data) return <Navigate to="/" />

  const handleSignIn = (data: any) => {
    signIn(data)
      .unwrap()
      .then(() => {
        navigate('/')
      })
  }

  return <SignIn onSubmit={handleSignIn} isSubmitting={isSignIn} />
}
