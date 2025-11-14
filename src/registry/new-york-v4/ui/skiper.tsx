'use client';

import React, { useState } from 'react';

import Link from 'next/link';

import { cn } from '@/lib/utils';

const isMobile = () => typeof window !== 'undefined' && window.innerWidth <= 768;

// Small helper that delays navigation on mobile to play animation
function useMobileNavigate(href: string, target?: string) {
    const [tap, setTap] = useState(false);

    const handleClick = (e: any) => {
        if (!isMobile()) return; // desktop = normal hover
        e.preventDefault();

        setTap(true);

        setTimeout(() => {
            if (target === '_blank') {
                window.open(href, '_blank');
            } else {
                window.location.href = href;
            }
        }, 300); // matches your animation duration
    };

    return { tap, handleClick };
}

const Skiper40 = () => {
    return (
        <section className='h-full snap-y snap-mandatory overflow-y-scroll'>
            <div className='relative flex h-full w-full flex-col items-center justify-center gap-5'>
                <Link001 href='mailto:hi@skiper-ui.com'>hi@skiper-ui.com</Link001>
                <Link002 href='mailto:hi@skiper-ui.com'>hi@skiper-ui.com</Link002>
                <Link003 href='mailto:hi@skiper-ui.com'>hi@skiper-ui.com</Link003>
                <Link004 href='mailto:hi@skiper-ui.com'>hi@skiper-ui.com</Link004>
                <Link005 href='mailto:hi@skiper-ui.com'>hi@skiper-ui.com</Link005>
            </div>
        </section>
    );
};

export { Link000, Link001, Link002, Link003, Link004, Link005, Skiper40 };

const Link000 = ({ children, href, className }: any) => {
    const { tap, handleClick } = useMobileNavigate(href);

    return (
        <Link
            href={href}
            onClick={handleClick}
            className={cn(
                'group relative flex items-center',
                tap && 'before:scale-x-100',
                className,
                "before:pointer-events-none before:absolute before:bottom-0 before:left-0 before:h-[0.05em] before:w-full before:bg-current before:content-['']",
                'before:origin-right before:scale-x-0 before:transition-transform before:duration-300 before:ease-[cubic-bezier(0.4,0,0.2,1)]',
                'hover:before:origin-left hover:before:scale-x-100'
            )}>
            {children}
        </Link>
    );
};

const Link001 = ({ children, href, className }: any) => {
    const { tap, handleClick } = useMobileNavigate(href, '_blank');

    return (
        <a
            href={href}
            onClick={handleClick}
            rel='noreferrer'
            target='_blank'
            className={cn(
                'group relative flex items-center',
                tap && '!opacity-100 before:scale-x-100 [&>svg]:translate-y-0 [&>svg]:opacity-100',
                "before:pointer-events-none before:absolute before:top-[1.5em] before:left-0 before:h-[0.05em] before:w-full before:bg-current before:content-['']",
                'before:origin-right before:scale-x-0 before:transition-transform before:duration-300 before:ease-[cubic-bezier(0.4,0,0.2,1)]',
                'hover:before:origin-left hover:before:scale-x-100',
                className
            )}>
            {children}
            <svg
                className='mt-[0em] ml-[0.3em] size-[0.55em] translate-y-1 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100'
                fill='none'
                viewBox='0 0 10 10'>
                <path
                    d='M1.004 9.166 9.337.833m0 0v8.333m0-8.333H1.004'
                    stroke='currentColor'
                    strokeWidth='1.25'
                    strokeLinecap='round'
                    strokeLinejoin='round'></path>
            </svg>
        </a>
    );
};

const Link002 = ({ children, href, className }: any) => {
    const { tap, handleClick } = useMobileNavigate(href);

    return (
        <a
            href={href}
            onClick={handleClick}
            className={cn(
                'group relative flex items-center',
                tap && 'before:scale-x-100 [&>svg]:translate-y-0 [&>svg]:opacity-100',
                className,
                "before:pointer-events-none before:absolute before:top-[1.5em] before:left-0 before:h-[0.05em] before:w-full before:bg-current before:content-['']",
                'before:origin-right before:scale-x-0 before:transition-transform before:duration-300 before:ease-[cubic-bezier(0.4,0,0.2,1)]',
                'before:origin-left',
                'hover:before:origin-right hover:before:scale-x-100'
            )}>
            {children}
            <svg
                className='mt-[0em] ml-[0.3em] size-[0.55em] translate-y-1 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100'
                fill='none'
                viewBox='0 0 10 10'>
                <path
                    d='M1.004 9.166 9.337.833m0 0v8.333m0-8.333H1.004'
                    stroke='currentColor'
                    strokeWidth='1.25'
                    strokeLinecap='round'
                    strokeLinejoin='round'></path>
            </svg>
        </a>
    );
};

const Link003 = ({ children, href, className }: any) => {
    const { tap, handleClick } = useMobileNavigate(href);

    return (
        <a
            href={href}
            onClick={handleClick}
            className={cn(
                'group relative flex items-center',
                tap && 'before:scale-x-100 [&>svg]:translate-y-0 [&>svg]:opacity-100',
                className,
                "before:pointer-events-none before:absolute before:top-[1.5em] before:left-0 before:h-[0.05em] before:w-full before:bg-current before:content-['']",
                'before:origin-right before:scale-x-0 before:transition-transform before:duration-300 before:ease-[cubic-bezier(0.4,0,0.2,1)]',
                'before:origin-center',
                'hover:before:scale-x-100'
            )}>
            {children}
            <svg
                className='mt-[0em] ml-[0.3em] size-[0.55em] translate-y-1 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100'
                fill='none'
                viewBox='0 0 10 10'>
                <path
                    d='M1.004 9.166 9.337.833m0 0v8.333m0-8.333H1.004'
                    stroke='currentColor'
                    strokeWidth='1.25'
                    strokeLinecap='round'
                    strokeLinejoin='round'></path>
            </svg>
        </a>
    );
};

const Link004 = ({ children, href, className }: any) => {
    const { tap, handleClick } = useMobileNavigate(href);

    return (
        <a
            href={href}
            onClick={handleClick}
            className={cn(
                'group relative flex items-center',
                tap && 'before:h-[1.4em] [&>svg]:translate-y-0 [&>svg]:rotate-45 [&>svg]:opacity-100',
                className,
                "before:pointer-events-none before:absolute before:left-0 before:w-full before:bg-white before:content-['']",
                'before:origin-right before:scale-x-0 before:transition-all before:duration-300 before:ease-[cubic-bezier(0.4,0,0.2,1)]',
                'before:origin-center md:before:bottom-0',
                'px-2 before:z-1 before:h-0 before:scale-x-100 before:mix-blend-difference hover:before:h-[1.4em]'
            )}>
            {children}
            <svg
                className='z-0 mt-[0em] ml-[0.6em] size-[0.55em] translate-y-1 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:rotate-45 group-hover:opacity-100'
                fill='none'
                viewBox='0 0 10 10'>
                <path
                    d='M1.004 9.166 9.337.833m0 0v8.333m0-8.333H1.004'
                    stroke='currentColor'
                    strokeWidth='1.25'
                    strokeLinecap='round'
                    strokeLinejoin='round'></path>
            </svg>
        </a>
    );
};

const Link005 = ({ children, href, className }: any) => {
    const { tap, handleClick } = useMobileNavigate(href);

    return (
        <a
            href={href}
            onClick={handleClick}
            className={cn(
                className,
                'group relative flex items-center',
                tap && 'before:scale-x-100 [&>svg]:translate-x-0 [&>svg]:opacity-100',
                "before:pointer-events-none before:absolute before:left-0 before:w-full before:bg-white before:content-['']",
                'before:scale-x-1 before:transition-all before:duration-300 before:ease-[cubic-bezier(0.4,0,0.2,1)]',
                'before:origin-left md:before:top-0',
                'px-2 before:z-1 before:h-full before:scale-x-0 before:mix-blend-difference hover:before:scale-x-100'
            )}>
            {children}
            <svg
                className='z-0 mt-[0em] ml-[0.6em] size-[0.55em] -translate-x-1 rotate-45 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100'
                fill='none'
                viewBox='0 0 10 10'>
                <path
                    d='M1.004 9.166 9.337.833m0 0v8.333m0-8.333H1.004'
                    stroke='currentColor'
                    strokeWidth='1.25'
                    strokeLinecap='round'
                    strokeLinejoin='round'></path>
            </svg>
        </a>
    );
};
