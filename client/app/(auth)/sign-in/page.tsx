"use client"

import { signIn } from "@/app/actions/signIn"
import { ActionState, SignInFields } from "@/app/actions/types"
import AuthForm from "@/components/AuthForm"
import AuthCard from "@/components/AuthForm"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import React, { useActionState } from "react"

const SignInPage = () => {
  const [state, formAction, isPending] = useActionState<ActionState<SignInFields>, FormData>(
    signIn,
    {
      success: false,
      fields: {
        email: "",
        password: "",
      },
    }
  )

  return (
    <AuthForm action={formAction}>
      <h5 className="mb-6 text-2xl">Task Management</h5>
      <h6 className="mb-5">Sign Up</h6>

      <Input
        defaultValue={state.fields.email}
        name="email"
        placeholder="Email"
        type="email"
        className="mb-4"
      />
      <Input
        defaultValue={state.fields.password}
        name="password"
        placeholder="Password"
        type="password"
        className="mb-4"
      />
      {isPending ? (
        "loading"
      ) : (
        <Button type="submit" className="mb-4 w-full">
          Login
        </Button>
      )}
      <div className="text-sm">
        Don't have an account?{" "}
        <Link className="text-primary" href="/sign-up">
          Create an accout
        </Link>
      </div>
    </AuthForm>
  )
}

export default SignInPage
