import { clsx, type ClassValue } from "clsx"
import { redirect } from "next/navigation"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function redirectToSignIn() {
  redirect("/sign-in")
}

export function redirectToDashboard() {
  redirect("/dashboard")
}
