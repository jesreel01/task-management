import {
  CognitoIdentityProviderClient,
  ConfirmSignUpCommand,
  ConfirmSignUpCommandInput,
  InitiateAuthCommand,
  InitiateAuthCommandInput,
  SignUpCommand,
  SignUpCommandInput,
} from "@aws-sdk/client-cognito-identity-provider"
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies"

const CLIENT_ID = process.env.COGNITO_CLIENT_ID
const REGION = process.env.AWS_REGION

export function getCognitoClient() {
  return new CognitoIdentityProviderClient({ region: REGION })
}

export async function signUpUser(
  client: CognitoIdentityProviderClient,
  email: string,
  password: string
) {
  const input: SignUpCommandInput = {
    ClientId: CLIENT_ID,
    Username: email,
    Password: password,
    UserAttributes: [{ Name: "email", Value: email }],
  }
  return client.send(new SignUpCommand(input))
}

export async function confirmUserSignUp(
  client: CognitoIdentityProviderClient,
  email: string,
  code: string
) {
  const input: ConfirmSignUpCommandInput = {
    Username: email,
    ClientId: CLIENT_ID,
    ConfirmationCode: code,
  }
  return client.send(new ConfirmSignUpCommand(input))
}

export async function authenticateUser(
  client: CognitoIdentityProviderClient,
  email: string,
  password: string
) {
  const input: InitiateAuthCommandInput = {
    AuthFlow: "USER_PASSWORD_AUTH",
    ClientId: CLIENT_ID,
    AuthParameters: { USERNAME: email, PASSWORD: password },
  }
  return client.send(new InitiateAuthCommand(input))
}

export function setAuthCookies(
  cookieStore: ReadonlyRequestCookies,
  accessToken?: string,
  refreshToken?: string
) {
  if (accessToken) {
    cookieStore.set("access_token", accessToken, { httpOnly: true })
  }
  if (refreshToken) {
    cookieStore.set("refresh_token", refreshToken, { httpOnly: true })
  }
}

export function setSignUpCookies(
  cookieStore: ReadonlyRequestCookies,
  email: string,
  password: string
) {
  const expires = new Date(Date.now() + 15 * 60 * 1000)
  cookieStore.set("signup_email", email, { expires, httpOnly: true })
  cookieStore.set("temp_pass", password, { expires, httpOnly: true })
}

export function clearSignupCookies(cookieStore: ReadonlyRequestCookies) {
  cookieStore.delete("signup_email")
  cookieStore.delete("temp_pass")
}
