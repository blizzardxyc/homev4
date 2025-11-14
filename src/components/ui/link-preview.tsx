'use client';

import React from 'react';

import { cn } from '@/lib/utils';
import * as HoverCardPrimitive from '@radix-ui/react-hover-card';
import * as PopoverPrimitive from '@radix-ui/react-popover';

import { AnimatePresence, motion, useMotionValue, useSpring } from 'motion/react';
import { encode } from 'qss';

type LinkPreviewProps = {
    children: React.ReactNode;
    url: string;
    className?: string;
    width?: number;
    height?: number;
    quality?: number;
    layout?: string;
} & ({ isStatic: true; imageSrc: string } | { isStatic?: false; imageSrc?: never });

export const LinkPreview = ({
    children,
    url,
    className,
    width = 200,
    height = 125,
    quality = 50,
    layout = 'fixed',
    isStatic = false,
    imageSrc = ''
}: LinkPreviewProps) => {
    const isTouch = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;

    const src = isStatic
        ? imageSrc
        : `https://api.microlink.io/?${encode({
              url,
              screenshot: true,
              meta: false,
              embed: 'screenshot.url',
              colorScheme: 'dark',
              'viewport.isMobile': true,
              'viewport.deviceScaleFactor': 1,
              'viewport.width': width * 3,
              'viewport.height': height * 3
          })}`;

    const [isOpen, setIsOpen] = React.useState(false);
    const [isMounted, setIsMounted] = React.useState(false);

    React.useEffect(() => setIsMounted(true), []);

    /** ---------- Desktop Parallax ---------- */
    const x = useMotionValue(0);
    const translateX = useSpring(x, { stiffness: 100, damping: 15 });

    const handleMouseMove = (e: any) => {
        if (isTouch) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        const delta = (offsetX - rect.width / 2) / 2;
        x.set(delta);
    };

    /** ---------- Mobile Long-Press ---------- */
    const longPressTimeout = React.useRef<any>(null);
    const touchStartY = React.useRef(0);

    const onTouchStart = (e: React.TouchEvent) => {
        if (!isTouch) return;

        touchStartY.current = e.touches[0].clientY;

        longPressTimeout.current = setTimeout(() => {
            setIsOpen(true);
        }, 650);
    };

    const onTouchMove = (e: React.TouchEvent) => {
        if (!isTouch) return;

        const currentY = e.touches[0].clientY;

        // cancel if the user is scrolling
        if (Math.abs(currentY - touchStartY.current) > 10) {
            clearTimeout(longPressTimeout.current);
        }
    };

    const onTouchEnd = () => {
        if (!isTouch) return;
        clearTimeout(longPressTimeout.current);
    };

    /** ---------- Shared Preview Card ---------- */
    const PreviewCard = (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.6 }}
                    animate={{
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        transition: { type: 'spring', stiffness: 260, damping: 20 }
                    }}
                    exit={{ opacity: 0, y: 20, scale: 0.6 }}
                    style={!isTouch ? { x: translateX } : undefined}
                    className='z-[9999] rounded-xl shadow-xl'>
                    <a
                        href={url}
                        className='block rounded-xl border-2 border-transparent bg-white p-1 dark:bg-black'
                        style={{ fontSize: 0 }}>
                        <img src={src} width={width} height={height} className='rounded-lg' alt='preview' />
                    </a>
                </motion.div>
            )}
        </AnimatePresence>
    );

    return (
        <>
            {isMounted && (
                <div className='hidden'>
                    <img src={src} width={width} height={height} alt='hidden preloader' />
                </div>
            )}

            {/* ---------- DESKTOP (HoverCard) ---------- */}
            {!isTouch ? (
                <HoverCardPrimitive.Root openDelay={50} closeDelay={100} onOpenChange={setIsOpen}>
                    <HoverCardPrimitive.Trigger asChild>
                        <a
                            href={url}
                            onMouseMove={handleMouseMove}
                            className={cn('cursor-pointer text-black dark:text-white', className)}>
                            {children}
                        </a>
                    </HoverCardPrimitive.Trigger>

                    <HoverCardPrimitive.Content
                        side='top'
                        align='center'
                        sideOffset={10}
                        className='pointer-events-none z-[9999]'>
                        {PreviewCard}
                    </HoverCardPrimitive.Content>
                </HoverCardPrimitive.Root>
            ) : (
                /* ---------- MOBILE (Popover with Long-Press) ---------- */
                <PopoverPrimitive.Root open={isOpen} onOpenChange={setIsOpen}>
                    <PopoverPrimitive.Trigger asChild>
                        <a
                            href={url}
                            className={cn('cursor-pointer text-black dark:text-white', className)}
                            onTouchStart={onTouchStart}
                            onTouchMove={onTouchMove}
                            onTouchEnd={onTouchEnd}>
                            {children}
                        </a>
                    </PopoverPrimitive.Trigger>

                    <PopoverPrimitive.Content
                        side='top'
                        align='center'
                        sideOffset={10}
                        className='z-[9999] border-none bg-transparent shadow-none'>
                        {PreviewCard}
                    </PopoverPrimitive.Content>
                </PopoverPrimitive.Root>
            )}
        </>
    );
};
