'use client';

import { Label } from '@/registry/new-york-v4/ui/label';
import { Switch } from '@/registry/new-york-v4/ui/switch';

import { useSmoothCursor } from '../app/context/SmoothCursorContext';

export function SmoothCursorSwitch() {
    const { enabled, toggleCursor } = useSmoothCursor();

    return (
        <div className='flex items-center gap-2'>
            <Label className='text-xl text-white/90' htmlFor='cursor-switch'>
                Liquid Cursor
            </Label>
            <Switch id='cursor-switch' checked={enabled} onCheckedChange={toggleCursor} />
        </div>
    );
}
