'use client'

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { PlusCircle, UserPlus } from "lucide-react"

export const TempButton = () => {
  const router = useRouter()

  const handleAddRedirect = () => {
    router.push("/conversations/add")
  }

  const handleRequestsRedirect = () => {
    router.push("/conversations/requests")
  }
  
  return (
    <div className="flex flex-col sm:flex-row gap-4 mt-6">
      <Button
        onClick={handleAddRedirect}
        className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground"
      >
        <PlusCircle className="mr-2 h-4 w-4" />
        Add a friend
      </Button>
      <Button
        onClick={handleRequestsRedirect}
        variant="outline"
        className="w-full sm:w-auto border-primary text-primary hover:bg-primary/10"
      >
        <UserPlus className="mr-2 h-4 w-4" />
        Friend requests
      </Button>
    </div>
  )
}