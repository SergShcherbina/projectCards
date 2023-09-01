import { Navigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'

import { SignUp, SignUpType } from '../../components'
import { useMeQuery, useSignUpMutation } from '../../services/auth'

import s from './sign-up-page.module.scss'

export const SignUpPage = () => {
  const { data, isLoading } = useMeQuery()
  const [signUpQuery, { isLoading: isSubmitting }] = useSignUpMutation()

  const onSubmit = (data: SignUpType) => {
    if (data) {
      signUpQuery({ email: data.email, password: String(data.password) })
        .unwrap()
        .catch(err => {
          toast.error(err.data.errorMessages[0])
        })
    }
  }

  if (isLoading) return <div> Loading... </div>
  if (data) return <Navigate to="/" />

  return (
    <>
      <SignUp className={s.center} onSubmit={onSubmit} isSubmitting={isSubmitting} />
      <ToastContainer position={'top-center'} />
    </>
  )
}
