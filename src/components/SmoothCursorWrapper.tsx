'use client';

import { useSmoothCursor } from '@/app/context/SmoothCursorContext';
import { SmoothCursor } from '@/registry/new-york-v4/ui/smooth-cursor';

export function SmoothCursorWrapper() {
    const { enabled } = useSmoothCursor();

    return enabled ? <SmoothCursor /> : null;
}
