import VerifyEmail from "@/components/pages/VerifyEmail"
import { cookies } from "next/headers"
import { notFound } from "next/navigation"

const VerifyEmailPage = async () => {
  const cookieStore = await cookies()
  const email = cookieStore.get("signup_email")?.value

  if (!email) {
    notFound()
  }

  return <VerifyEmail email={email} />
}

export default VerifyEmailPage
