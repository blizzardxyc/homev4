'use client';

/**
 * @author: @dorian_baffier
 * @description: Dynamic Text (Looping Version)
 * @version: 1.0.1
 * @date: 2025-06-26
 * @license: MIT
 * @website: https://kokonutui.com
 * @github: https://github.com/kokonut-labs/kokonutui
 */
import { useEffect, useState } from 'react';

import { AnimatePresence, motion } from 'motion/react';

interface Greeting {
    text: string;
    language: string;
}

const greetings: Greeting[] = [
    { text: 'I am Abhyudaya, a 1st-year B-Tech student.', language: 'English' },
    { text: 'I like coffee and to code. I enjoy dynamic, and functional programming.', language: 'Japanese' },
    { text: 'Connect with me, if you want a WebApp with uncommon design.', language: 'French' }
];

const DynamicText = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // LOOP animation: update index every 3.5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % greetings.length);
        }, 3500);

        return () => clearInterval(interval);
    }, []);

    const textVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 },
        exit: { y: -40, opacity: 0 }
    };

    return (
        <section
            className='flex min-h-[200px] items-center justify-center gap-1 p-4'
            aria-label='Looped rotating intro text'>
            <div className='relative flex h-16 w-full items-center justify-center overflow-visible'>
                <AnimatePresence mode='popLayout'>
                    <motion.div
                        key={currentIndex}
                        className='flex items-center gap-2 text-2xl font-medium text-gray-800 dark:text-gray-200'
                        aria-live='off'
                        initial={textVariants.hidden}
                        animate={textVariants.visible}
                        exit={textVariants.exit}
                        transition={{ duration: 0.4, ease: 'easeOut' }}>
                        {greetings[currentIndex].text}
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
};

export default DynamicText;
