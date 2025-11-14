'use client';

import React, { useEffect, useRef, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { useTheme } from 'next-themes';

import { AnimatedList } from '@/registry/new-york-v4/ui/animated-list';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTrigger
} from '@/registry/new-york-v4/ui/dialog';
import { Input } from '@/registry/new-york-v4/ui/input';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from '@/registry/new-york-v4/ui/sheet';
import { Link001, Link005 } from '@/registry/new-york-v4/ui/skiper';

import { SmoothCursorSwitch } from './SmoothCursorSwitch';
import { TextAnimate } from './bgComponents/text-animate';
import HamburgerToggle from './hambruger';
import { LinkPreview } from './ui/link-preview';
import { ThemeToggleButton } from './ui/themeButton';
import { VercelCMDK } from './vercelCMDK';

function NavBar() {
    const { theme, resolvedTheme, setTheme } = useTheme();

    // ✅ all hooks must be declared before any conditional return
    const [mounted, setMounted] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const sheetRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Close on outside click
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (sheetRef.current && !sheetRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    // Close on resize/orientation
    useEffect(() => {
        const close = () => setIsOpen(false);
        window.addEventListener('resize', close);
        window.addEventListener('orientationchange', close);

        return () => {
            window.removeEventListener('resize', close);
            window.removeEventListener('orientationchange', close);
        };
    }, []);

    const isDark = resolvedTheme === 'dark';

    // ✅ render a lightweight placeholder until mounted
    if (!mounted) {
        return <div className='h-12 w-full' />;
    }

    return (
        <div className='flex h-auto min-h-12 w-full items-center'>
            <div className='flex h-full min-h-12 w-1/6 items-center justify-center py-2'>
                <LinkPreview url='https://abhyudaya.space'>
                    <Link href={'/'}>
                        <img
                            src={isDark ? '/fav-white.png' : '/fav-black.png'}
                            alt='logo'
                            width={100}
                            height={100}
                            draggable={false}
                            onContextMenu={(e) => e.preventDefault()}
                            className='h-12 w-12 rounded-full transition-all hover:scale-110'
                        />
                    </Link>
                </LinkPreview>
            </div>

            <div className='flex h-full min-h-12 w-3/6 items-center justify-center'>
                <Dialog>
                    <DialogTrigger>
                        <Input placeholder='Search...' />
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogDescription>
                                <VercelCMDK />
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </div>

            <div className='flex h-full min-h-12 w-1/6 items-center justify-center'>
                <span className='scale-75'>
                    <ThemeToggleButton variant='polygon' blur={true} start='bottom-center' />
                </span>
            </div>

            <div className='relative flex h-full min-h-12 w-1/6 items-center justify-center'>
                <Sheet>
                    <SheetTrigger>
                        <HamburgerToggle isOpen={isOpen} toggle={() => setIsOpen((prev) => !prev)} />
                    </SheetTrigger>
                    <SheetContent side='right' ref={sheetRef}>
                        <SheetHeader>
                            <SheetTitle></SheetTitle>
                            <SheetDescription>
                                <h1 className='mb-6 text-2xl font-bold text-white/90'>Free Services</h1>
                                <AnimatedList className='mx-3'>
                                    <Link005 className='w-auto' href={'https://deepboards.abhyudaya.space/'}>
                                        <TextAnimate className='py-1 text-lg' animation='slideRight'>
                                            DeepBoards
                                        </TextAnimate>
                                    </Link005>
                                    <Link005 href={'https://deepcanvas.abhyudaya.space/'}>
                                        <TextAnimate className='py-1 text-lg' animation='slideRight'>
                                            DeepCanvas
                                        </TextAnimate>
                                    </Link005>
                                    <Link005 href={'https://editor.deepcodes.abhyudaya.space/'}>
                                        <TextAnimate className='py-1 text-lg' animation='slideRight'>
                                            DeepCodes
                                        </TextAnimate>
                                    </Link005>
                                    <Link005 href={'https://deepfeeds.abhyudaya.space/'}>
                                        <TextAnimate className='py-1 text-lg' animation='slideRight'>
                                            DeepFeeds
                                        </TextAnimate>
                                    </Link005>
                                    <Link005 href={'https://deepforms.abhyudaya.space/'}>
                                        <TextAnimate className='py-1 text-lg' animation='slideRight'>
                                            DeepForms
                                        </TextAnimate>
                                    </Link005>
                                    {/* <Link005 href={'https://github.com/deepabhyudaya'}>
                                        <TextAnimate className='py-1 text-lg' animation='slideRight'>
                                            DeepForms
                                        </TextAnimate>
                                    </Link005> */}
                                    <Link005 href={'https://deepmeets.abhyudaya.space/'}>
                                        <TextAnimate className='py-1 text-lg' animation='slideRight'>
                                            DeepMeets
                                        </TextAnimate>
                                    </Link005>
                                    <Link005 href={'https://deepnotes.abhyudaya.space/'}>
                                        <TextAnimate className='py-1 text-lg' animation='slideRight'>
                                            DeepNotes
                                        </TextAnimate>
                                    </Link005>
                                    <Link005 href={'https://deep.projects.abhyudaya.space/'}>
                                        <TextAnimate className='py-1 text-lg' animation='slideRight'>
                                            DeepProjects
                                        </TextAnimate>
                                    </Link005>
                                    <Link005 href={'https://deeptopics.abhyudaya.space/'}>
                                        <TextAnimate className='py-1 text-lg' animation='slideRight'>
                                            DeepTopics
                                        </TextAnimate>
                                    </Link005>
                                    <Link005 href={'https://deepwebs.builder.abhyudaya.space/'}>
                                        <TextAnimate className='py-1 text-lg' animation='slideRight'>
                                            DeepWebs
                                        </TextAnimate>
                                    </Link005>
                                </AnimatedList>
                                <div className='bg-background/60 absolute bottom-0 left-0 w-full border-t border-white/10 p-4 backdrop-blur-md'>
                                    <SmoothCursorSwitch />
                                </div>
                            </SheetDescription>
                        </SheetHeader>
                    </SheetContent>
                </Sheet>
            </div>
        </div>
    );
}

export default NavBar;
