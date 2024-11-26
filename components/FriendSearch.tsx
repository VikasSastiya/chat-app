"use client"

import React, { useState, FormEvent, useEffect } from 'react'
import { Search, UserPlus, Clock, User, Users, Sparkles, AlertCircle, Check } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { motion, AnimatePresence } from "framer-motion"
import Image from 'next/image'

interface User {
  id: string
  name: string | null
  email: string | null
  image: string | null
  isFriend: boolean
  friendRequestStatus: {
    status: RequestStatus | null
    senderId: string | null
  }
}

type RequestStatus = 'PENDING' | 'ACCEPTED' | 'REJECTED'

interface FriendRequestResponse {
  error?: string
  id?: string
  senderId?: string
  receiverId?: string
  status?: RequestStatus
}

interface PendingRequest {
  id: string
  senderId: string
  receiverId: string
  status: RequestStatus
}

export default function FriendSearch() {
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [searchResults, setSearchResults] = useState<User[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
      
      setSearchResults(prevResults =>
        prevResults.map(user =>
          user.id === userId
            ? {
                ...user,
                friendRequestStatus: {
                  status: 'PENDING',
                  senderId: result.senderId || null
                }
              }
            : user
        )
      )
      
      setSuccessMessage('Friend request sent successfully!')
    } catch (error) {
      console.error("Send request error:", error)
      setError(error instanceof Error ? error.message : 'Failed to send friend request')
    }
  }

  const getUserStatus = (user: User) => {
    if (user.isFriend) {
      return 'friends'
    }

    if (user.friendRequestStatus?.status === 'PENDING') {
      return user.friendRequestStatus.senderId === user.id ? 'received' : 'sent'
    }

    return 'none'
  }

  const renderButton = (user: User) => {
    const status = getUserStatus(user)

    return (
      <Button
        variant={status === 'friends' ? "default" : status !== 'none' ? "secondary" : "default"}
        disabled={status !== 'none'}
        onClick={() => status === 'none' && handleSendRequest(user.id)}
        className={`${
          status === 'none' 
            ? 'bg-purple-600 hover:bg-purple-700 text-white' 
            : status === 'friends'
            ? 'bg-green-500 hover:bg-green-600 text-white'
            : 'bg-gray-300 text-gray-600'
        } h-8 md:h-10 px-3 md:px-6 rounded-full text-xs md:text-sm`}
      >
        {status === 'friends' ? (
          <>
            <Check className="w-4 h-4 md:mr-2" />
            <span className="hidden md:inline">Friends</span>
          </>
        ) : status === 'sent' ? (
          <>
            <Clock className="w-4 h-4 md:mr-2" />
            <span className="hidden md:inline">Request Sent</span>
          </>
        ) : status === 'received' ? (
          <>
            <UserPlus className="w-4 h-4 md:mr-2" />
            <span className="hidden md:inline">Accept Request</span>
          </>
        ) : (
          <>
            <UserPlus className="w-4 h-4 md:mr-2" />
            <span className="hidden md:inline">Add Friend</span>
          </>
        )}
      </Button>
    )
  }

  return (
    <div className="h-full w-full px-4 md:px-8 pt-8 md:pt-12 lg:pt-16">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-[95%] md:max-w-5xl mx-auto"
      >
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 md:mb-8 bg-gradient-to-r from-purple-600 to-indigo-600 p-4 md:p-0 md:bg-none rounded-xl md:rounded-none text-white md:text-inherit"
        >
          <h2 className="text-lg md:text-3xl font-bold flex items-center gap-2 md:gap-3 mb-1 md:mb-2">
            <Users className="w-5 h-5 md:w-8 md:h-8 text-white md:text-purple-600" />
            Find New Friends
          </h2>
          <p className="text-xs md:text-base opacity-90 md:opacity-100 flex items-center md:text-gray-600">
            <Sparkles className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
            Discover and connect with people around you
          </p>
        </motion.div>

        {/* Search Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="mb-6 md:mb-8"
        >
          <form onSubmit={handleSearch} className="relative">
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.15 }}
            >
              <Input
                type="text"
                placeholder="Search by email or username..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pr-16 pl-9 md:pl-12 py-2 md:py-6 text-sm md:text-lg rounded-full border-2 border-purple-100 focus:border-purple-300 transition-all duration-200"
              />
              <Search className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 text-purple-400 w-4 h-4 md:w-6 md:h-6" />
            </motion.div>
            <Button 
              type="submit" 
              disabled={loading} 
              className="absolute right-1 md:right-2 top-1/2 transform -translate-y-1/2 bg-purple-600 hover:bg-purple-700 text-white rounded-full h-8 md:h-auto px-3 md:px-6 py-0 md:py-2 text-sm md:text-base"
            >
              {loading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <span className="block w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                </motion.div>
              ) : 'Search'}
            </Button>
          </form>
        </motion.div>

        {/* Alerts Section */}
        <AnimatePresence>
          {(error || successMessage) && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-2xl mx-auto mb-6 md:mb-8"
            >
              {error && (
                <Alert variant="destructive" className="bg-red-50 border-l-4 border-red-500 rounded-lg shadow-md">
                  <AlertCircle className="w-4 h-4 md:w-5 md:h-5 mr-2 text-red-500" />
                  <AlertDescription className="text-sm md:text-base text-red-700 font-medium">{error}</AlertDescription>
                </Alert>
              )}

              {successMessage && (
                <Alert variant="default" className="bg-green-100 border-green-400 text-green-700">
                  <Sparkles className="w-4 h-4 mr-2" />
                  <AlertDescription className="text-sm md:text-base">{successMessage}</AlertDescription>
                </Alert>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results Section */}
        <AnimatePresence mode="wait">
          {searchResults.length > 0 && (
            <motion.div 
              className="space-y-3 md:space-y-4 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {searchResults.map((user: User, index) => {
                return (
                  <motion.div
                    key={user.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ scale: 1.01 }}
                    className="transform-gpu"
                  >
                    <Card className="overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
                      <CardContent className="p-3 md:p-6 flex items-center justify-between">
                        <div className="flex items-center gap-2 md:gap-4">
                          {user.image ? (
                            <Image
                              src={user.image}
                              alt={user.name || 'User'}
                              width={40}
                              height={40}
                              className="w-10 h-10 md:w-14 md:h-14 rounded-full border-2 border-purple-400 object-cover"
                            />
                          ) : (
                            <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-purple-400 to-indigo-400 flex items-center justify-center text-white text-sm md:text-xl font-bold">
                              {user.name?.[0]?.toUpperCase() || <User className="w-5 h-5 md:w-7 md:h-7" />}
                            </div>
                          )}
                          <div>
                            <p className="font-semibold text-sm md:text-lg text-gray-800 dark:text-gray-200">{user.name}</p>
                            {user.email && (
                              <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                                {user.email}
                              </p>
                            )}
                          </div>
                        </div>

                        {renderButton(user)}
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
