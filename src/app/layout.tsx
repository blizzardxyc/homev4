import type { ReactNode } from 'react';

import type { Metadata } from 'next';
import localFont from 'next/font/local';

import '@/app/globals.css';
import NavBar from '@/components/NavBar';
import { SmoothCursorWrapper } from '@/components/SmoothCursorWrapper';
import { ScrollProgress } from '@/components/bgComponents/scroll-progress';
import Footer from '@/components/footer';
import { SmoothCursor } from '@/registry/new-york-v4/ui/smooth-cursor';
import { Toaster } from '@/registry/new-york-v4/ui/sonner';

import { ThemeProvider } from '../components/ui/theme-provider';
import { SmoothCursorProvider } from './context/SmoothCursorContext';

const geistSans = localFont({
    src: './fonts/GeistVF.woff',
    variable: '--font-geist-sans',
    weight: '100 900'
});
const geistMono = localFont({
    src: './fonts/GeistMonoVF.woff',
    variable: '--font-geist-mono',
    weight: '100 900'
});

export const metadata: Metadata = {
    title: 'Abhyudaya',
    description: 'Developer Portfolio'
};

// function SmoothCursorWrapper() {
//     const { enabled } = useSmoothCursor();

//     return enabled ? <SmoothCursor /> : null;
// }

const Layout = ({ children }: Readonly<{ children: ReactNode }>) => {
    return (
        // ? https://github.com/pacocoursey/next-themes?tab=readme-ov-file#with-app
        // ? https://react.dev/reference/react-dom/client/hydrateRoot#suppressing-unavoidable-hydration-mismatch-errors
        <html suppressHydrationWarning lang='en'>
            <body
                className={`${geistSans.variable} ${geistMono.variable} bg-background text-foreground overscroll-none antialiased`}>
                <ThemeProvider attribute='class'>
                    <SmoothCursorProvider>
                        {/* ✅ Cursor runs inside client context */}
                        <SmoothCursorWrapper />

                        <NavBar />
                        <ScrollProgress />
                        <main>{children}</main>
                        <Footer />
                        <Toaster />
                    </SmoothCursorProvider>
                </ThemeProvider>
            </body>
        </html>
    );
};

export default Layout;
