import React from "react"

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return  <div className="flex items-center justify-center min-h-dvh bg-white">{children}</div>
}
