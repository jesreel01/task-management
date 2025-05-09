
import { verifySession } from "@/lib/auth"
import React from "react"

const  DashboardPage = async  () => {
  const payload = await verifySession()
  return <div>DashboardPage</div>
}

export default DashboardPage
