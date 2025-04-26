"use client"

import { useParams } from "next/navigation"

const page = () => {
  const { id } = useParams<{ id: string }>()

  return <div>testing if you can find me</div>
}

export default page
