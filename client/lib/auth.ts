import {
  CognitoIdentityProviderClient,
  ConfirmSignUpCommand,
  ConfirmSignUpCommandInput,
  InitiateAuthCommand,
  InitiateAuthCommandInput,
  SignUpCommand,
  SignUpCommandInput,
} from "@aws-sdk/client-cognito-identity-provider"
import { createRemoteJWKSet, decodeJwt, jwtVerify } from "jose"
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

const CLIENT_ID = process.env.COGNITO_CLIENT_ID!
const REGION = process.env.AWS_REGION!
const USER_POOL_ID = process.env.COGNITO_USER_POOL_ID

const issuer = `https://cognito-idp.${REGION}.amazonaws.com/${USER_POOL_ID}`
const jwks = createRemoteJWKSet(new URL(`${issuer}/.well-known/jwks.json`))

export function getCognitoClient() {
  return new CognitoIdentityProviderClient({ region: REGION })
}

export async function verifySession() {
  const cookieStore = await cookies()

  const accessToken = cookieStore.get("accessToken")?.value
  if (!accessToken) throw new Error("No access token")

  const unverified = decodeJwt(accessToken)
  if (unverified.token_use !== "access") {
    throw new Error("Expected an access token")
  }

  try {
    const { payload } = await jwtVerify(accessToken, jwks, {
      issuer,
      algorithms: ["RS256"],
    })

    return payload
  } catch (error) {
    console.error(error)

    redirect("/sign-in")
  }
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
    cookieStore.set("accessToken", accessToken, { httpOnly: true })
  }
  if (refreshToken) {
    cookieStore.set("refreshToken", refreshToken, { httpOnly: true })
  }
}

export function setSignUpCookies(
  cookieStore: ReadonlyRequestCookies,
  email: string,
  password: string
) {
  const expires = new Date(Date.now() + 15 * 60 * 1000)
  cookieStore.set("signUpEmail", email, { expires, httpOnly: true })
  cookieStore.set("tempPass", password, { expires, httpOnly: true })
}

export function clearSignupCookies(cookieStore: ReadonlyRequestCookies) {
  cookieStore.delete("signUpEmail")
  cookieStore.delete("tempPass")
}
