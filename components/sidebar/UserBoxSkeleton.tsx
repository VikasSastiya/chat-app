import { Card, CardContent } from "../ui/card";
import { Search } from "lucide-react";

export function UserBoxSkeleton() {
  return (
    <aside className="fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-y-auto border-r border-gray-200 block w-full left-0">
      <div className="px-5">
        <div className="sticky top-0 pt-4 pb-2 bg-white dark:bg-gray-900 z-10">
          {/* Search Bar Skeleton */}
          <div className="relative flex items-center mb-6">
            <div className="absolute left-3 flex items-center pointer-events-none">
              <Search className="text-gray-400 dark:text-gray-500" size={20} />
            </div>
            <div className="pl-10 h-10 w-full bg-gray-200 dark:bg-gray-800 rounded-md animate-pulse" />
          </div>

          {/* Friends Header Skeleton */}
          <div className="flex items-center justify-between mb-6">
            <div className="h-6 w-24 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
            <div className="h-6 w-8 bg-gray-200 dark:bg-gray-800 rounded-full animate-pulse" />
          </div>
        </div>

        {/* Friend List Skeleton Items */}
        <nav className="space-y-2 pb-6">
          {[1, 2, 3].map((index) => (
            <Card key={index} className="w-full transition-shadow duration-300 ease-in-out">
              <CardContent className="p-1">
                <div className="relative w-full flex items-center gap-4 p-1 rounded-xl">
                  <div className="relative shrink-0">
                    <div className="h-12 w-12 rounded-full bg-gray-200 dark:bg-gray-800 animate-pulse ring-2 ring-offset-2 ring-gray-100 dark:ring-gray-800" />
                  </div>

                  <div className="min-w-0 flex-1 relative">
                    <div className="flex flex-col">
                      <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-24 mb-2" />
                      <div className="h-3.5 bg-gray-200 dark:bg-gray-800 rounded w-32" />
                    </div>
                    <div className="absolute top-0 right-0 h-3 bg-gray-200 dark:bg-gray-800 rounded w-10" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </nav>
      </div>
    </aside>
  );
}
