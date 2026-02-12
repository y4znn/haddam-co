import { Skeleton } from "@/components/ui/Skeleton";

export default function Loading() {
    return (
        <div className="container py-8 lg:py-12">
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Sidebar Skeleton */}
                <aside className="w-full lg:w-64 shrink-0 space-y-6">
                    <Skeleton className="h-[300px] w-full rounded-xl" />
                </aside>

                {/* Main Content Skeleton */}
                <div className="flex-1">
                    <div className="flex flex-col gap-2 mb-8">
                        <Skeleton className="h-10 w-2/3 max-w-sm mb-2" />
                        <Skeleton className="h-5 w-1/2 max-w-xs" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div key={i} className="flex flex-col h-full space-y-4">
                                <Skeleton className="aspect-square w-full rounded-2xl" />
                                <div className="space-y-2 p-2">
                                    <Skeleton className="h-4 w-1/3" />
                                    <Skeleton className="h-6 w-3/4" />
                                    <div className="flex justify-between items-center pt-2">
                                        <Skeleton className="h-6 w-1/4" />
                                        <Skeleton className="h-10 w-10 rounded-full" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
