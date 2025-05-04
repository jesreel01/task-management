"use client"

import { signUp, SignUpFields } from "@/app/actions/signUp"
import { ActionState } from "@/app/actions/types"
import AuthForm from "@/components/AuthForm"
import { Button } from "@/components/ui/button"
import { GoogleButton } from "@/components/ui/google-button"
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
        required
      />

      <Input
        defaultValue={fields.last_name}
        name="last_name"
        placeholder="Last name"
        className="mb-4"
        required
      />
      <Input
        defaultValue={fields.email}
        name="email"
        placeholder="Email"
        type="email"
        className="mb-4"
        required
      />
      <Input
        defaultValue={fields.password}
        name="password"
        placeholder="Password"
        type="password"
        className="mb-4"
        required
      />

      <Button loading={isPending} type="submit" className="mb-4 w-full">
        Sign Up
      </Button>
      
      <div className="relative my-4 w-full">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-card px-2 text-gray-500">or</span>
        </div>
      </div>
      
      <GoogleButton 
        className="mb-4" 
        onClick={() => {
          console.log("Google sign-up clicked");
          // This will be replaced with actual Google auth implementation
          // window.location.href = "/api/auth/google";
        }}
      >
        Sign up with Google
      </GoogleButton>
      
      <div className="text-sm">
        Already have an account?{" "}
        <Link className="text-primary" href="/sign-in">
          Sign in
        </Link>
      </div>
    </AuthForm>
  )
}

export default SignUpPage
