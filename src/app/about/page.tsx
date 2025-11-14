import React from 'react';

import { TextAnimate } from '@/components/bgComponents/text-animate';
import FeatureSection from '@/components/features';
import DynamicText from '@/components/kokonutui/dynamic-text';
import { Tooltip } from '@/components/ui/tooltip-card';
import { RainbowButton } from '@/registry/new-york-v4/ui/rainbow-button';

function About() {
    return (
        <div className='flex h-auto min-h-screen w-full flex-col items-center justify-center p-12'>
            <DynamicText />
            <span className='hidden lg:block'>
            <Tooltip
                containerClassName='text-neutral-600 dark:text-neutral-400'
                content='Programming, Drawing, and Volleyball.'>
                <RainbowButton className='mb-6' variant='outline'>
                    Hobbies
                </RainbowButton>
            </Tooltip>
                </span>
            <span className='mt-12 opacity-20'>
                <TextAnimate
                    className='text-md font-bold tracking-tight text-black dark:text-white'
                    animation={'blurInUp'}>
                    Features
                </TextAnimate>
                <TextAnimate
                    className='text-xl font-bold tracking-tight text-black sm:text-xl dark:text-white'
                    animation={'blurInDown'}>
                    for your Upcoming WebApp
                </TextAnimate>
            </span>

            <FeatureSection />
        </div>
    );
}

export default About;

