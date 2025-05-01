"use client"

import { signUp, SignUpFields } from "@/app/actions/signUp"
import { ActionState } from "@/app/actions/types"
import AuthForm from "@/components/AuthForm"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import React, { useActionState } from "react"

const SignUpPage = () => {
  const [{ fields, errors }, formAction, isPending] = useActionState<
    ActionState<SignUpFields>,
    FormData
  >(signUp, {
    success: false,
    fields: {
      email: "",
      password: "",
      first_name: "",
      last_name: "",
    },
  })

  return (
    <AuthForm action={formAction}>
      <h5 className="mb-6 text-2xl">Task Management</h5>
      <h6 className="mb-5">Sign Up</h6>
      <Input
        defaultValue={fields.first_name}
        name="first_name"
        placeholder="First name"
        className="mb-4"
      />

      <Input
        defaultValue={fields.last_name}
        name="last_name"
        placeholder="Last name"
        className="mb-4"
      />
      <Input
        defaultValue={fields.email}
        name="email"
        placeholder="Email"
        type="email"
        className="mb-4"
      />
      <Input
        defaultValue={fields.password}
        name="password"
        placeholder="Password"
        type="password"
        className="mb-4"
      />

      <Button loading={isPending} type="submit" className="mb-4 w-full">
        Sign Up
      </Button>
      <div className="text-sm">
        Don't have an account?{" "}
        <Link className="text-primary" href="/sign-up">
          Create an accout
        </Link>
      </div>
    </AuthForm>
  )
}

export default SignUpPage
