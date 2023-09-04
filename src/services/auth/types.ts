export type UserType = {
  avatar: string
  id: string
  isEmailVerified: boolean
  created: string
  updated: string
  name: string
  email: string
}

export type requestSignUp = {
  name?: string
  password: string
  email: string
  subject?: string
  sendConfirmationEmail?: false
}
