"use server"

import {
  CognitoIdentityProviderClient,
  ConfirmSignUpCommand,
  ConfirmSignUpCommandInput,
} from "@aws-sdk/client-cognito-identity-provider"
import { ActionState, VerifyEmailField } from "./types"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"

const CLIENT_ID = process.env.COGNITO_CLIENT_ID
const REGION = process.env.AWS_REGION

export async function verifyEmail(
  prevState: any,
  { email, code }: VerifyEmailField
): Promise<ActionState<VerifyEmailField>> {
  const cookieStore = await cookies()

  try {
    const client = new CognitoIdentityProviderClient({ region: REGION })

    const input: ConfirmSignUpCommandInput = {
      Username: email,
      ClientId: CLIENT_ID,
      ConfirmationCode: code,
    }

    const command = new ConfirmSignUpCommand(input)

    await client.send(command)

    cookieStore.delete("signup_email")
  } catch (error: any) {
    console.log(error)

    return {
      fields: { code: code, email: email },
      success: false,
    }
  }

  redirect("/dashboard")
}
