"use server"

import { ActionState, SignInFields } from "./types"



export async function signIn(
  prevState: ActionState<SignInFields>,
  payload: FormData
): Promise<ActionState<SignInFields>> {
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

