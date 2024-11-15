'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from '@/hooks/utils/use-toast';

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
      router.refresh();
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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center p-4">
        {error}
      </div>
    );
  }

  if (requests.length === 0) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center min-h-[200px]">
          <p className="text-gray-500">No pending friend requests</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>
          People who want to connect with you
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {requests.map((request) => (
          <div 
            key={request.id} 
            className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
          >
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src={request.sender.image || undefined} />
                <AvatarFallback>{getInitials(request.sender.name)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{request.sender.name}</p>
                <p className="text-sm text-gray-500">{request.sender.email}</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button 
                onClick={() => handleAccept(request.id)}
                size="sm"
                className="bg-green-500 hover:bg-green-600 text-white"
                disabled={processingRequests.has(request.id)}
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Accept
              </Button>
              <Button 
                variant="destructive"
                size="sm"
                onClick={() => handleDecline(request.id)}
                disabled={processingRequests.has(request.id)}
              >
                <XCircle className="h-4 w-4 mr-2" />
                Decline
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};