"use server"

import {
  CognitoIdentityProviderClient,
  ConfirmSignUpCommand,
  ConfirmSignUpCommandInput,
  InitiateAuthCommand,
  InitiateAuthCommandInput,
} from "@aws-sdk/client-cognito-identity-provider"
import { ActionState, VerifyEmailField } from "./types"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"

const CLIENT_ID = process.env.COGNITO_CLIENT_ID
const REGION = process.env.AWS_REGION

export async function verifyEmail(
  _prevState: any,
  { code }: VerifyEmailField
): Promise<ActionState<VerifyEmailField>> {
  const cookieStore = await cookies()

  const email = cookieStore.get("signup_email")?.value as string
  const password = cookieStore.get("temp_pass")?.value as string

  try {
    const client = new CognitoIdentityProviderClient({ region: REGION })

    const input: ConfirmSignUpCommandInput = {
      Username: email,
      ClientId: CLIENT_ID,
      ConfirmationCode: code,
    }

    const command = new ConfirmSignUpCommand(input)

    await client.send(command)

    const authInput: InitiateAuthCommandInput = {
      AuthFlow: "USER_PASSWORD_AUTH",
      ClientId: CLIENT_ID,
      AuthParameters: {
        USERNAME: email,
        PASSWORD: password,
      },
    }

    const authCommand = new InitiateAuthCommand(authInput)

    const authRes = await client.send(authCommand)

    cookieStore.delete("signup_email")
    cookieStore.delete("temp_pass")
  } catch (error: any) {
    console.log(error)

    return {
      fields: { code: code },
      success: false,
    }
  }

  redirect("/dashboard")
}
