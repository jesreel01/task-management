"use client"

import { ActionState, VerifyEmailField } from "@/app/actions/types"
import { verifyEmail } from "@/app/actions/verifyEmail"
import AuthForm from "@/components/AuthForm"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import React, { startTransition, useActionState, useRef, useState } from "react"

const VerifyEmail = ({ email }: { email: string }) => {
  const inputRefs = Array.from({ length: 6 }, () => useRef<HTMLInputElement>(null))

  const [values, setValues] = useState<string[]>(Array(6).fill(""))

  const [state, dispatch] = useActionState<ActionState<VerifyEmailField>, VerifyEmailField>(
    verifyEmail,
    {
      fields: {
        code: values.join(),
      },
      success: false,
    }
  )

  const handleSubmit = (code: string) => {
    startTransition(() =>
      dispatch({
        code: code,
      })
    )
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const val = e.target.value
    if (val.length > 1) return

    const updatedValues = [...values]
    updatedValues[index] = val
    setValues(updatedValues)

    if (val && index < inputRefs.length - 1) {
      inputRefs[index + 1].current?.focus()
    }

    // if (updatedValues.every((char) => char !== "")) {
    //   handleSubmit(updatedValues.join(""))
    // }
  }

  return (
    <AuthForm>
      <h5 className="mb-6 text-2xl">Verify Email</h5>

      <p className="mb-6 text-center text-sm text-gray-500">
        We've sent a verification code to your email. Please enter the code below to verify your
        email address.
      </p>

      <div className="mb-6 flex justify-between w-full gap-2">
        {inputRefs.map((ref, i) => (
          <Input
            className="w-12 h-12 text-center text-lg"
            ref={ref}
            key={i}
            onChange={(e) => handleChange(e, i)}
            maxLength={1}
          />
        ))}
      </div>

      <Button className="w-full" onClick={() => handleSubmit(values.join(""))} type="button">
        Verify and Confirm
      </Button>

      <p className="mt-4 text-center text-sm text-gray-500">
        Didn't receive the code? <button className="text-primary hover:underline">Resend</button>
      </p>
    </AuthForm>
  )
}

export default VerifyEmail
