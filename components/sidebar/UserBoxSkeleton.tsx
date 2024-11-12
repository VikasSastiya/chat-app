import { Card, CardContent } from "../ui/card";

export function UserBoxSkeleton() {
  return (
    <Card className="w-full">
        <CardContent className="p-1">
            <div className="relative w-full flex items-center gap-4 p-1 rounded-xl">
                <div className="relative shrink-0">
                    <div className="h-12 w-12 rounded-full bg-gray-200 dark:bg-gray-800 ring-2 ring-offset-2 ring-gray-100 dark:ring-gray-800" />
                </div>

                <div className="min-w-0 flex-1">
                    <div className="flex justify-between items-center mb-1.5">
                        <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-20" />
                        {/* <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-10" /> */}
                    </div>
                    <div className="h-3.5 bg-gray-200 dark:bg-gray-800 rounded w-28" />
                </div>
            </div>
        </CardContent>
    </Card>
  );
}