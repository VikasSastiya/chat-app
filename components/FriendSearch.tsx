"use client"

import React, { useState, FormEvent, useEffect } from 'react'
import { Search, UserPlus, Clock, User, Users, Sparkles, AlertCircle } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { motion, AnimatePresence } from "framer-motion"

interface User {
  id: string
  name: string | null
  email: string | null
  image: string | null
}

interface FriendRequestResponse {
  error?: string
  id?: string
  senderId?: string
  receiverId?: string
}

interface PendingRequest {
  id: string
  senderId: string
  receiverId: string
}

export default function FriendSearch() {
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [searchResults, setSearchResults] = useState<User[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const [pendingRequests, setPendingRequests] = useState<PendingRequest[]>([])
  const [successMessage, setSuccessMessage] = useState<string>('')

  useEffect(() => {
    fetchPendingRequests()
  }, [])

  const fetchPendingRequests = async () => {
    try {
      const response = await fetch('/api/friends/pending')
      const data = await response.json()
      if (response.ok) {
        setPendingRequests(data)
      }
    } catch (error) {
      console.error("Error fetching pending requests:", error)
    }
  }

  const searchUsers = async (query: string): Promise<User[]> => {
    const response = await fetch(`/api/friends/search?q=${encodeURIComponent(query)}`)
    const data = await response.json()
    
    if (data.error) {
      throw new Error(data.error)
    }
    
    return data || []
  }

  const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!searchQuery.trim()) return

    setLoading(true)
    setError('')
    setSuccessMessage('')

    try {
      const users = await searchUsers(searchQuery)
      setSearchResults(users)
    } catch (error) {
      console.error("Search error:", error)
      setError('Failed to search for users')
      setSearchResults([])
    } finally {
      setLoading(false)
    }
  }

  const sendFriendRequest = async (receiverId: string): Promise<FriendRequestResponse> => {
    try {
      const response = await fetch('/api/friends/request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          receiverId: receiverId
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || response.statusText)
      }

      setPendingRequests(prev => [...prev, data])
      return data
    } catch (error) {
      console.error("Friend request error:", error)
      throw error
    }
  }
  
  const handleSendRequest = async (userId: string) => {
    try {
      setError('')
      const result = await sendFriendRequest(userId)
      
      if (result.error) {
        throw new Error(result.error)
      }
      
      setSuccessMessage('Friend request sent successfully!')
      await fetchPendingRequests()
    } catch (error) {
      console.error("Send request error:", error)
      setError(error instanceof Error ? error.message : 'Failed to send friend request')
    }
  }

  const getUserStatus = (userId: string) => {
    const pendingRequest = pendingRequests.find(
      request => request.senderId === userId || request.receiverId === userId
    )

    if (!pendingRequest) return 'none'
    return pendingRequest.senderId === userId ? 'received' : 'sent'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <Card className="max-w-4xl mx-auto overflow-hidden shadow-xl">
        <CardContent className="p-0">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white">
            <h2 className="text-3xl font-bold mb-2 flex items-center">
              <Users className="w-8 h-8 mr-3" />
              Find New Friends
            </h2>
            <p className="text-sm opacity-90 flex items-center">
              <Sparkles className="w-4 h-4 mr-2" />
              Discover and connect with people around you
            </p>
          </div>
          <div className="p-8">
            <form onSubmit={handleSearch} className="relative mb-8">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search by email or username..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pr-12 pl-12 py-6 bg-white/80 backdrop-blur-sm border-2 border-blue-200 focus:border-blue-400 transition-all duration-300 text-lg rounded-full shadow-inner"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400 w-5 h-5" />
              </div>
              <Button 
                type="submit" 
                disabled={loading} 
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6 py-2 transition-all duration-300"
              >
                {loading ? 'Searching...' : 'Search'}
              </Button>
            </form>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-6"
              >
                <Alert variant="destructive" className="bg-red-50 border-l-4 border-red-500 rounded-r-lg shadow-md">
                  <div className="flex items-center">
                    <AlertCircle className="w-5 h-5 mr-2 text-red-500" />
                    <AlertDescription className="text-red-700 font-medium">{error}</AlertDescription>
                  </div>
                </Alert>
              </motion.div>
            )}

            {successMessage && (
              <Alert variant="default" className="mb-4 bg-green-100 border-green-400 text-green-700">
                <Sparkles className="w-4 h-4 mr-2" />
                <AlertDescription>{successMessage}</AlertDescription>
              </Alert>
            )}

            <AnimatePresence>
              {searchResults.length > 0 ? (
                <motion.div 
                  className="space-y-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  {searchResults.map((user: User) => {
                    const status = getUserStatus(user.id)
                    
                    return (
                      <motion.div
                        key={user.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                          <CardContent className="p-6 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              {user.image ? (
                                <img
                                  src={user.image}
                                  alt={user.name || 'User'}
                                  className="w-16 h-16 rounded-full border-2 border-blue-400"
                                />
                              ) : (
                                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-indigo-400 flex items-center justify-center text-white text-2xl font-bold">
                                  {user.name?.[0]?.toUpperCase() || <User className="w-8 h-8" />}
                                </div>
                              )}
                              <div>
                                <p className="font-semibold text-lg text-gray-800">{user.name}</p>
                                {user.email && (
                                  <p className="text-sm text-gray-600 flex items-center">
                                    <User className="w-4 h-4 mr-1" />
                                    {user.email}
                                  </p>
                                )}
                              </div>
                            </div>

                            <Button
                              variant={status !== 'none' ? "secondary" : "default"}
                              disabled={status !== 'none'}
                              onClick={() => status === 'none' && handleSendRequest(user.id)}
                              className={`${
                                status === 'none' 
                                  ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                                  : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                              } px-4 py-2 rounded-full transition-all duration-300`}
                            >
                              {status === 'sent' ? (
                                <>
                                  <Clock className="w-4 h-4 mr-2" />
                                  Request Pending
                                </>
                              ) : status === 'received' ? (
                                <>
                                  <UserPlus className="w-4 h-4 mr-2" />
                                  Accept Request
                                </>
                              ) : (
                                <>
                                  <UserPlus className="w-4 h-4 mr-2" />
                                  Add Friend
                                </>
                              )}
                            </Button>
                          </CardContent>
                        </Card>
                      </motion.div>
                    )
                  })}
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
