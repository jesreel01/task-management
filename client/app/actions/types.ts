export type ActionState<T> = {
  success: boolean
  message?: string
  errors?: Record<string, string[]>
  fields: T
}

export type SignInFields = {
  email: string
  password: string
}

export type VerifyEmailField = {
  code: string
}
