"use server"

import { ActionState, VerifyEmailField } from "./types"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import {
  authenticateUser,
  clearSignupCookies,
  confirmUserSignUp,
  getCognitoClient,
  setAuthCookies,
} from "@/lib/auth"

export async function verifyEmail(
  _prevState: any,
  { code }: VerifyEmailField
): Promise<ActionState<VerifyEmailField>> {
  const cookieStore = await cookies()

  const email = cookieStore.get("signUpEmail")?.value as string
  const password = cookieStore.get("tempPass")?.value as string

  try {
    const client = getCognitoClient()

    await confirmUserSignUp(client, email, code)

    const authRes = await authenticateUser(client, email, password)

    const accessToken = authRes.AuthenticationResult?.AccessToken
    const refreshToken = authRes.AuthenticationResult?.RefreshToken

    setAuthCookies(cookieStore, accessToken, refreshToken)

    clearSignupCookies(cookieStore)
  } catch (error: any) {
    console.log(error)

    return {
      fields: { code: code },
      success: false,
    }
  }

  redirect("/dashboard")
}
