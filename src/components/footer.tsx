import React from 'react';

import { SmoothCursorSwitch } from './SmoothCursorSwitch';

function Footer() {
    return (
        <div className='flex h-auto min-h-12 w-full flex-col items-center justify-center gap-6 space-x-4 pt-24 pb-4'>
            <span className='hidden md:block lg:block'>
                <SmoothCursorSwitch />
            </span>
            <h1 className='text-sm font-medium'>©Abhyudaya 2022-2025</h1>
        </div>
    );
}

export default Footer;
