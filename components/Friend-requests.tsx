'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, Users } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from '@/hooks/utils/use-toast';
import { motion, AnimatePresence } from 'framer-motion';

interface User {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
}

interface FriendRequest {
  id: string;
  senderId: string;
  receiverId: string;
  sender: User;
  receiver: User;
  createdAt: string;
}

interface FriendRequestsProps {
  userId: string;
}

export const FriendRequests = ({ userId }: FriendRequestsProps) => {
  const [requests, setRequests] = useState<FriendRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [processingRequests, setProcessingRequests] = useState<Set<string>>(new Set());
  const router = useRouter();

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch('/api/friends/pending');
        if (!response.ok) {
          throw new Error('Failed to fetch requests');
        }
        const data = await response.json();
        
        const incomingRequests = data.filter((request: FriendRequest) => 
          request.receiverId === userId
        );
        
        setRequests(incomingRequests);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load friend requests"
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (userId) {
      fetchRequests();
    }
  }, [userId]);

  const handleAccept = async (requestId: string) => {
    setProcessingRequests(prev => new Set(prev).add(requestId));
    try {
      const response = await fetch('/api/friends/accept', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ requestId }),
      });

      if (!response.ok) {
        throw new Error('Failed to accept request');
      }

      setRequests(prev => prev.filter(req => req.id !== requestId));
      window.location.reload();
      toast({
        title: "Success",
        description: "Friend request accepted"
      });
    } catch {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to accept friend request"
      });
    } finally {
      setProcessingRequests(prev => {
        const newSet = new Set(prev);
        newSet.delete(requestId);
        return newSet;
      });
    }
  };

  const handleDecline = async (requestId: string) => {
    setProcessingRequests(prev => new Set(prev).add(requestId));
    try {
      const response = await fetch('/api/friends/decline', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ requestId }),
      });

      if (!response.ok) {
        throw new Error('Failed to decline request');
      }

      setRequests(prev => prev.filter(req => req.id !== requestId));
      router.refresh();
      toast({
        title: "Success",
        description: "Friend request declined"
      });
    } catch {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to decline friend request"
      });
    } finally {
      setProcessingRequests(prev => {
        const newSet = new Set(prev);
        newSet.delete(requestId);
        return newSet;
      });
    }
  };

  const getInitials = (name: string | null) => {
    if (!name) return '?';
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="h-full w-full px-4 md:px-8 pt-8 md:pt-12 lg:pt-16">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto"
      >
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 md:mb-8"
        >
          <h2 className="text-xl md:text-3xl font-bold flex items-center gap-2 md:gap-3 mb-1 md:mb-2">
            <Users className="h-5 w-5 md:h-8 md:w-8 text-purple-600" />
            Friend Requests
          </h2>
          <p className="text-sm md:text-base text-gray-500 md:text-gray-600">
            Manage your incoming friend requests
          </p>
        </motion.div>

        {/* Content Section */}
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center items-center min-h-[200px]"
            >
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600" />
            </motion.div>
          ) : error ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-red-500 text-center p-4"
            >
              {error}
            </motion.div>
          ) : requests.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center p-6 md:p-8 text-gray-500 bg-white dark:bg-gray-900 rounded-xl shadow-sm"
            >
              No pending friend requests
            </motion.div>
          ) : (
            <motion.div className="space-y-3 md:space-y-4">
              {requests.map((request, index) => (
                <motion.div
                  key={request.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.01 }}
                  className="transform-gpu" // Performance optimization
                >
                  <Card className="overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-3 md:p-6 flex items-center justify-between">
                      <div className="flex items-center gap-2 md:gap-4">
                        <Avatar className="h-10 w-10 md:h-12 md:w-12">
                          <AvatarImage src={request.sender.image || undefined} />
                          <AvatarFallback>{getInitials(request.sender.name)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium md:font-semibold text-sm md:text-lg text-gray-800">
                            {request.sender.name}
                          </p>
                          <p className="text-xs md:text-sm text-gray-500">
                            {request.sender.email}
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-1 md:gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleAccept(request.id)}
                          disabled={processingRequests.has(request.id)}
                          className="h-8 md:h-10 px-2 md:px-4 bg-green-500 hover:bg-green-600 text-white"
                        >
                          <CheckCircle className="h-4 w-4 md:mr-2" />
                          <span className="hidden md:inline">Accept</span>
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDecline(request.id)}
                          disabled={processingRequests.has(request.id)}
                          className="h-8 md:h-10 px-2 md:px-4"
                        >
                          <XCircle className="h-4 w-4 md:mr-2" />
                          <span className="hidden md:inline">Decline</span>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};