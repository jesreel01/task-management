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

  const [state, dispatch, isPending] = useActionState<
    ActionState<VerifyEmailField>,
    VerifyEmailField
  >(verifyEmail, {
    fields: {
      code: values.join(),
    },
    success: false,
  })

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
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>, index: number) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text")
    const cleanedData = pastedData.replace(/\s/g, "").slice(0, 6)

    const newValues = [...values]
    for (let i = 0; i < cleanedData.length; i++) {
      if (index + i < inputRefs.length) {
        newValues[index + i] = cleanedData[i]
      }
    }
    setValues(newValues)

    // Focus the next empty input or the last input if all are filled
    const nextEmptyIndex = newValues.findIndex((val) => !val)
    const targetIndex = nextEmptyIndex === -1 ? inputRefs.length - 1 : nextEmptyIndex
    inputRefs[targetIndex].current?.focus()
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
            value={values[i]}
            className="w-12 h-12 text-center text-lg"
            onPaste={(e) => handlePaste(e, i)}
            ref={ref}
            key={i}
            onChange={(e) => handleChange(e, i)}
            maxLength={1}
          />
        ))}
      </div>

      <Button
        className="w-full"
        onClick={() => handleSubmit(values.join(""))}
        loading={isPending}
        type="button"
      >
        Verify and Confirm
      </Button>

      <p className="mt-4 text-center text-sm text-gray-500">
        Didn't receive the code? <button className="text-primary hover:underline">Resend</button>
      </p>
    </AuthForm>
  )
}

export default VerifyEmail
