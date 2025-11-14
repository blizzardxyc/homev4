'use client';

import React, { useEffect, useRef, useState } from 'react';

import { cn } from '@/lib/utils';

import { AnimatePresence, motion } from 'motion/react';

export const Tooltip = ({
    content,
    children,
    containerClassName
}: {
    content: string | React.ReactNode;
    children: React.ReactNode;
    containerClassName?: string;
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const [height, setHeight] = useState(0);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const contentRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const isTouchDevice = typeof window !== 'undefined' ? window.matchMedia('(hover: none)').matches : false;

    useEffect(() => {
        if (isVisible && contentRef.current) {
            setHeight(contentRef.current.scrollHeight);
        }
    }, [isVisible, content]);

    // ----- FINAL SMART TOUCH POSITIONING -----
    const calcSmartMobilePosition = (clientX: number, clientY: number) => {
        if (!contentRef.current || !containerRef.current) return { x: 0, y: 0 };

        const tooltipWidth = 240;
        const tooltipHeight = contentRef.current.scrollHeight;

        // padding from finger
        const offset = 18;

        let x = clientX - tooltipWidth / 2; // center horizontally
        let y;

        // ------ Prefer ABOVE
        const aboveY = clientY - tooltipHeight - offset;
        if (aboveY > 0) {
            y = aboveY;
        } else {
            // Otherwise place BELOW
            const belowY = clientY + offset;
            y = belowY + tooltipHeight < window.innerHeight ? belowY : 12;
        }

        // Prevent overflow left
        if (x < 8) x = 8;

        // Prevent overflow right
        if (x + tooltipWidth > window.innerWidth) {
            x = window.innerWidth - tooltipWidth - 8;
        }

        return { x, y };
    };

    // Desktop simple follow
    const calcDesktopPosition = (mouseX: number, mouseY: number) => ({
        x: mouseX + 14,
        y: mouseY + 14
    });

    // ----- EVENT HANDLERS -----

    const handleMouseEnter = () => {
        if (isTouchDevice) return;
        setIsVisible(true);
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (isTouchDevice || !isVisible) return;

        const rect = e.currentTarget.getBoundingClientRect();
        const pos = calcDesktopPosition(e.clientX - rect.left, e.clientY - rect.top);
        setPosition(pos);
    };

    const handleMouseLeave = () => {
        if (isTouchDevice) return;
        setIsVisible(false);
    };

    // ----- TOUCH -----

    const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
        if (!isTouchDevice) return;

        const touch = e.touches[0];
        const pos = calcSmartMobilePosition(touch.clientX, touch.clientY);
        setPosition(pos);
        setIsVisible(true);
    };

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isTouchDevice) return;

        if (isVisible) {
            setIsVisible(false);

            return;
        }

        const pos = calcSmartMobilePosition(e.clientX, e.clientY);
        setPosition(pos);
        setIsVisible(true);
    };

    return (
        <div
            ref={containerRef}
            className={cn('relative inline-block', containerClassName)}
            onMouseEnter={handleMouseEnter}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onClick={handleClick}>
            {children}

            <AnimatePresence>
                {isVisible && (
                    <motion.div
                        key='tooltip'
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height, opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                        className='pointer-events-none absolute z-50 min-w-[15rem] overflow-hidden rounded-md border border-transparent bg-white shadow-sm ring-1 shadow-black/5 dark:bg-neutral-900 dark:shadow-white/10 dark:ring-white/5'
                        style={{
                            left: position.x,
                            top: position.y
                        }}>
                        <div ref={contentRef} className='p-2 text-sm text-neutral-600 md:p-4 dark:text-neutral-400'>
                            {content}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
