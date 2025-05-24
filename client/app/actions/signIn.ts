"use server"

import { getCognitoClient, authenticateUser, setAuthCookies } from "@/lib/auth"
import { ActionState } from "./types"
import * as z from "zod"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
const signInSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
})

export type SignInFields = z.infer<typeof signInSchema>

export async function signIn(
  _prevState: ActionState<SignInFields>,
  payload: FormData
): Promise<ActionState<SignInFields>> {
  const values: SignInFields = {
    email: payload.get("email") as string,
    password: payload.get("password") as string,
  }

  try {
    const client = getCognitoClient()
    const response = await authenticateUser(client, values.email, values.password)

    const accessToken = response.AuthenticationResult?.AccessToken
    const refreshToken = response.AuthenticationResult?.RefreshToken

    if (accessToken && refreshToken) {
      const cookieStore = await cookies()
      setAuthCookies(cookieStore, accessToken, refreshToken)
    }
  } catch (error) {
    return {
      success: false,
      message: "login failed",
      fields: {
        email: payload.get("email") as string,
        password: payload.get("password") as string,
      },
    }
  }

  redirect("/dashboard")

  return {
    success: true,
    message: "success",
    fields: {
      email: "",
      password: "",
    },
  }
}
