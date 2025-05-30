import React from 'react';
import { cn } from '@/lib/utils';
import Sidebar from './Sidebar';
import Header from './Header';

interface MainAppLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const MainAppLayout: React.FC<MainAppLayoutProps> = ({ children, className }) => {
  return (
    <div className={cn('min-h-screen bg-background text-foreground', className)}>
      <Sidebar />
      {/* Header is fixed and handles its own positioning relative to the viewport (left-64) */}
      <Header />
      {/* Main content area needs to be offset for the fixed Sidebar and Header */}
      <main className="ml-64 pt-16 min-w-0">
        {/* This div handles the p-6 from layout requirements and provides the scroll context if needed */}
        {/* The overall.sizing.mainContent includes overflow-y-auto which should be on a container that can grow */}
        {/* Making this inner div the scroll container: */}
        <div className="p-6 h-[calc(100vh-theme(spacing.16))] overflow-y-auto">
           {/* This div is the mainContent.container with flex flex-col gap-6 */}
          <div className="flex flex-col gap-6">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default MainAppLayout;
