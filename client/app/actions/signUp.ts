import { ActionState } from "./types"
import { z } from "zod"

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

  return {
    success: true,
    fields: {
      email: "",
      password: "",
      first_name: "",
      last_name: "",
    },
    errors: {},
  }
}
