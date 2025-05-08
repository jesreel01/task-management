"use server"

import {
  CognitoIdentityProviderClient,
  SignUpCommand,
  SignUpCommandInput,
} from "@aws-sdk/client-cognito-identity-provider"
import { ActionState } from "./types"
import { z } from "zod"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"

const CLIENT_ID = process.env.COGNITO_CLIENT_ID
const REGION = process.env.AWS_REGION

const signUpSchema = z.object({
  first_name: z.string().min(1, { message: "First name is required" }),
  last_name: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
})

export type SignUpFields = z.infer<typeof signUpSchema>

export async function signUp(
  prevState: ActionState<SignUpFields>,
  payload: FormData
): Promise<ActionState<SignUpFields>> {
  const cookieStore = await cookies()

  const values: SignUpFields = {
    first_name: payload.get("first_name") as string,
    last_name: payload.get("last_name") as string,
    email: payload.get("email") as string,
    password: payload.get("password") as string,
  }

  const result = signUpSchema.safeParse(values)

  if (!result.success) {
    return {
      success: false,
      message: "Validation failed",
      fields: {
        first_name: values.first_name,
        last_name: values.last_name,
        email: values.email,
        password: values.password,
      },
      errors: result.error.flatten().fieldErrors,
    }
  }

  try {
    const client = new CognitoIdentityProviderClient({
      region: REGION,
    })

    const input: SignUpCommandInput = {
      ClientId: CLIENT_ID,
      Username: values.email,
      Password: values.password,
      UserAttributes: [
        {
          Name: "email",
          Value: values.email,
        },
      ],
    }

    const command = new SignUpCommand(input)
    const response = await client.send(command)

    cookieStore.set("signup_email", values.email, {
      expires: new Date(Date.now() + 15 * 60 * 1000),
      httpOnly: true,
    })

    cookieStore.set("temp_pass", values.password, {
      expires: new Date(Date.now() + 15 * 60 * 1000),
      httpOnly: true,
    })

    if (!response.UserSub) {
      return {
        success: false,
        message: "Sign up failed, please try again.",
        fields: {
          first_name: values.first_name,
          last_name: values.last_name,
          email: values.email,
          password: values.password,
        },
      }
    }
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to sign up.",
      fields: {
        first_name: values.first_name,
        last_name: values.last_name,
        email: values.email,
        password: values.password,
      },
    }
  }

  redirect(`/sign-up/verify-email`)
}
