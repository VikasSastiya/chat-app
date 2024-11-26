import { Card, CardContent } from "../ui/card";
import { Search } from "lucide-react";
import { Skeleton } from "../ui/skeleton";

export function UserBoxSkeleton() {
  return (
    <aside className="fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-y-auto border-r border-gray-200 dark:border-gray-800 block w-full left-0 bg-white dark:bg-gray-900/90">
      <div className="px-5">
        {/* Search and Conversations Header */}
        <div className="sticky top-0 pt-4 pb-2 z-10">
          <div className="relative flex items-center mb-4">
            <div className="absolute left-3 flex items-center pointer-events-none">
              <Search className="text-gray-500" size={20} />
            </div>
            <Skeleton className="pl-10 h-10 w-full" />
          </div>
          
          {/* Conversations Header */}
          <div className="flex items-center justify-between mb-4">
            <Skeleton className="h-6 w-28" />
            <Skeleton className="h-6 w-6 rounded-full" />
          </div>
        </div>

        {/* Groups Section */}
        <div className="mb-6">
          <div className="text-sm font-semibold mb-2">
            <Skeleton className="h-4 w-16" />
          </div>
          <nav className="space-y-1">
            {[1, 2, 3].map((index) => (
              <Card key={`group-${index}`} className="w-full bg-gray-50 dark:bg-gray-800/50">
                <CardContent className="p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Skeleton variant="avatar" className="h-10 w-10" />
                      <div className="flex flex-col space-y-1">
                        <Skeleton variant="text" className="w-24 h-3.5" />
                        <Skeleton variant="text" className="w-32 h-3" />
                      </div>
                    </div>
                    <Skeleton variant="time" className="w-10 h-3" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </nav>
        </div>

        {/* Direct Messages Section */}
        <div>
          <div className="text-sm font-semibold mb-2">
            <Skeleton className="h-4 w-32" />
          </div>
          <nav className="space-y-1">
            {[1, 2, 3, 4].map((index) => (
              <Card key={`dm-${index}`} className="w-full bg-gray-50 dark:bg-gray-800/50">
                <CardContent className="p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Skeleton variant="avatar" className="h-10 w-10" />
                      <div className="flex flex-col space-y-1">
                        <Skeleton variant="text" className="w-24 h-3.5" />
                        <Skeleton variant="text" className="w-32 h-3" />
                      </div>
                    </div>
                    <Skeleton variant="time" className="w-10 h-3" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </nav>
        </div>
      </div>
    </aside>
  );
}
