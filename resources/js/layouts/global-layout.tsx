import { ThemeProvider } from '@/components/theme-provider';
import { ReactNode } from 'react';

export default function GlobalLayout({ children }: { children: ReactNode }) {
    return (
        <div className="">
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                {children}
            </ThemeProvider>
        </div>
    );
}
