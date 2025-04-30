"use server"

export type Fields = {
  email: string
  password: string
}

export type ActionState = {
  success: boolean
  message?: string
  errors?: Record<string, string>
  fields: Fields
}

export async function signIn(prevState: ActionState, payload: FormData): Promise<ActionState> {
  

  await new Promise((resolve) => setTimeout(resolve, 2000))

  return {
    success: true,
    message: "success",
    fields: {
      email: payload.get("email") as string,
      password: payload.get("password") as string,
    },
  }
}
