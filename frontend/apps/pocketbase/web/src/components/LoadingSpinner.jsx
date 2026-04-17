import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const LoadingSpinner = () => {
    return (
        <div className="min-h-screen bg-background flex items-center justify-center">
            <div className="space-y-4 w-full max-w-md px-4">
                <Skeleton className="h-12 w-3/4 mx-auto" />
                <Skeleton className="h-8 w-1/2 mx-auto" />
                <div className="grid grid-cols-3 gap-4 mt-8">
                    <Skeleton className="h-32" />
                    <Skeleton className="h-32" />
                    <Skeleton className="h-32" />
                </div>
            </div>
        </div>
    );
};

export default LoadingSpinner;