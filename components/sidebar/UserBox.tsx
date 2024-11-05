'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { User } from '@prisma/client'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

interface UserBoxProps {
  data: User
}

export default function UserBox({ data }: UserBoxProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleChat = useCallback(() => {
    setIsLoading(true)
    axios
      .post('/api/conversations', { userId: data.id })
      .then((response) => {
        router.push(`/conversations/${response.data.id}`)
      })
      .finally(() => setIsLoading(false))
  }, [data.id, router])

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:bg-gray-50 group">
      <CardContent className="p-3">
        <Button
          variant="ghost"
          className="w-full justify-start gap-4 p-2 transition-all duration-300 hover:bg-transparent"
          onClick={handleChat}
          disabled={isLoading}
        >
          <div className="relative">
            <Avatar className="h-12 w-12 transition-transform duration-300 group-hover:scale-110 ring-2 ring-offset-2 ring-gray-100">
              <AvatarImage src={data.image || undefined} alt={data.name || 'User'} />
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                {data.name?.[0] || 'U'}
              </AvatarFallback>
            </Avatar>
          </div>

          <div className="flex flex-col items-start overflow-hidden space-y-1">
            {isLoading ? (
              <>
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-4 w-32" />
              </>
            ) : (
              <>
                <span className="text-sm font-semibold truncate max-w-[180px] text-gray-900">
                  {data.name}
                </span>
                {data.email && (
                  <span className="text-xs text-gray-500 truncate max-w-[180px]">
                    {data.email}
                  </span>
                )}
              </>
            )}
          </div>
        </Button>
      </CardContent>
    </Card>
  )
}
