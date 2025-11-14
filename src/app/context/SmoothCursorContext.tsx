'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

interface SmoothCursorContextType {
    enabled: boolean;
    toggleCursor: () => void;
}

const SmoothCursorContext = createContext<SmoothCursorContextType | undefined>(undefined);

export const SmoothCursorProvider = ({ children }: { children: React.ReactNode }) => {
    const [enabled, setEnabled] = useState(true);

    // Read cookie when component mounts
    useEffect(() => {
        const cookieValue = document.cookie.split('; ').find((row) => row.startsWith('smoothCursor='));

        if (cookieValue) {
            const value = cookieValue.split('=')[1];
            setEnabled(value === 'true');
        }
    }, []);

    // Write cookie whenever value changes
    useEffect(() => {
        document.cookie = `smoothCursor=${enabled}; path=/; max-age=31536000`;
        // expires in 1 year
    }, [enabled]);

    const toggleCursor = () => setEnabled((prev) => !prev);

    return <SmoothCursorContext.Provider value={{ enabled, toggleCursor }}>{children}</SmoothCursorContext.Provider>;
};

export const useSmoothCursor = () => {
    const context = useContext(SmoothCursorContext);
    if (!context) throw new Error('useSmoothCursor must be used inside SmoothCursorProvider');

    return context;
};
