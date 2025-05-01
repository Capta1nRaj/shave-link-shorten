import { useEffect, useRef, useState } from 'react';

interface UseIntervalSyncProps {
    url: string;
    initialInterval?: number;
    fastInterval?: number;
    slowInterval?: number;
    onSuccess?: (data: unknown) => void;
    onError?: (error: Error) => void;
}

export const useIntervalSync = ({
    url,
    initialInterval = 5000,
    fastInterval = 5000,
    slowInterval = 60000,
    onSuccess,
    onError
}: UseIntervalSyncProps) => {
    const [intervalTime, setIntervalTime] = useState(initialInterval);
    const intervalRef = useRef<NodeJS.Timeout>();

    useEffect(() => {
        const syncData = () => {
            fetch(url, {
                credentials: 'include'
            })
                .then(response => response.json())
                .then(data => {
                    const newIntervalTime = data.isMore ? fastInterval : slowInterval;
                    if (newIntervalTime !== intervalTime) {
                        setIntervalTime(newIntervalTime);
                        // Clear existing interval
                        if (intervalRef.current) {
                            clearInterval(intervalRef.current);
                        }
                        // Set new interval
                        intervalRef.current = setInterval(syncData, newIntervalTime);
                    }
                    onSuccess?.(data);
                })
                .catch((error) => {
                    console.error("Error syncing data:", error);
                    onError?.(error);
                });
        };

        // Initial call
        syncData();

        // Set initial interval
        intervalRef.current = setInterval(syncData, intervalTime);

        // Cleanup function to clear the interval when component unmounts
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return { intervalTime };
}; 