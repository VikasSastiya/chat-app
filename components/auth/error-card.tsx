import Link from "next/link"
import { AlertTriangle } from "lucide-react"

import { Button } from "@/components/ui/button"

export const ErrorCard = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="relative w-full max-w-md mx-auto">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-grid-primary/5 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
        
        <div className="relative bg-card text-card-foreground rounded-lg shadow-lg p-8 border border-primary/10">
          <div className="flex flex-col items-center text-center space-y-6">
            <AlertTriangle className="w-16 h-16 text-destructive" />
            
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter">Oops, something went wrong</h1>
              <p className="text-muted-foreground">We're sorry, but an error has occurred.</p>
            </div>
            
            <Button asChild className="px-6 py-2 text-sm font-medium transition-all duration-300 ease-in-out">
              <Link href="/auth/login" className="inline-flex items-center">
                Back to Login
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}