"use client";

import React, { useState, FormEvent } from 'react';
import { Search, UserPlus, Clock } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Define interfaces for type safety
interface User {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
}

// interface SearchResponse {
//   error?: string;
//   users?: User[];
// }

const FriendSearch = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [sentRequests, setSentRequests] = useState<Set<string>>(new Set());
  const [successMessage, setSuccessMessage] = useState<string>('');  // New state for success message

  // Search for users
  const searchUsers = async (query: string): Promise<User[]> => {
    console.log("Searching with query:", query);
    const response = await fetch(`/api/friends/search?q=${encodeURIComponent(query)}`);
    const data = await response.json();
    console.log("API Response:", data);
    
    if (data.error) {
      throw new Error(data.error);
    }
    
    return data || [];
  };

  const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setLoading(true);
    setError('');
    setSuccessMessage('');  // Clear the success message before a new search

    try {
      const users = await searchUsers(searchQuery);
      console.log("Search results:", users[0].name);
      setSearchResults(users);
      
      // If users are found, display success message
      if (users.length > 0) {
        setSuccessMessage(`${users.length} user(s) found`);
      } else {
        setSuccessMessage(''); // Reset if no users found
      }
    } catch (error) {
      console.error("Search error:", error);
      setError('Failed to search for users');
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  // Send friend request
  const sendFriendRequest = async (receiverId: string): Promise<{ error?: string }> => {
    const response = await fetch('/api/friends/request', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ receiverId })
    });
    return response.json();
  };
  
  const handleSendRequest = async (userId: string) => {
    try {
      const result = await sendFriendRequest(userId);
      if (result.error) {
        throw new Error(result.error);
      }
      setSentRequests(new Set([...Array.from(sentRequests), userId]));
    } catch {
      setError('Failed to send friend request');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-4">
      {/* Search Form */}
      <form onSubmit={handleSearch} className="flex gap-2">
        <Input
          type="text"
          placeholder="Search by email or username..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1"
        />
        <Button type="submit" disabled={loading}>
          <Search className="w-4 h-4 mr-2" />
          Search
        </Button>
      </form>

      {/* Error Message */}
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Success Message */}
      {successMessage && (
        <Alert variant="default">
          <AlertDescription>{successMessage}</AlertDescription>
        </Alert>
      )}

      {/* Search Results */}
      <div className="space-y-2">
        {searchResults.length > 0 ? (
            searchResults.map((user: User) => (
            <Card key={user.id} className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                {user.image ? (
                    <img
                    src={user.image}
                    alt={user.name || 'User'}
                    className="w-8 h-8 rounded-full"
                    />
                ) : (
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                    {user.name?.[0]?.toUpperCase()}
                    </div>
                )}
                <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-gray-500">
                    {user.email ? user.email : 'No email available'}
                    </p>
                </div>
                </div>

                <Button
                variant={sentRequests.has(user.id) ? "secondary" : "default"}
                onClick={() => !sentRequests.has(user.id) && handleSendRequest(user.id)}
                disabled={sentRequests.has(user.id)}
                >
                {sentRequests.has(user.id) ? (
                    <>
                    <Clock className="w-4 h-4 mr-2" />
                    Sent
                    </>
                ) : (
                    <>
                    <UserPlus className="w-4 h-4 mr-2" />
                    Add Friend
                    </>
                )}
                </Button>
            </Card>
            ))
        ) : (
            !loading && searchQuery && (
            <p className="text-center text-gray-500">No users found</p>
            )
        )}
    </div>

      {/* No Results Message */}
      {searchResults.length === 0 && !loading && searchQuery && (
        <p className="text-center text-gray-500">No users found</p>
      )}
    </div>
  );
};

export default FriendSearch;
