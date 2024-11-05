import { Card, CardContent } from "../ui/card";

export function UserBoxSkeleton() {
    return (
        <div className="space-y-4 py-1">
            <Card className="overflow-hidden animate-pulse">
                <CardContent className="p-2">
                    <div className="flex items-center gap-5 p-2">
                    <div className="relative">
                        <div className="h-12 w-12 rounded-full bg-gray-200" />
                    </div>
                    <div className="flex flex-col space-y-2 flex-1">
                        <div className="h-4 bg-gray-200 rounded w-3/4" />
                        <div className="h-3 bg-gray-200 rounded w-1/2" />
                    </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
  }
  
  