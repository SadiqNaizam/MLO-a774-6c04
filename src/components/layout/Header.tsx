import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  return (
    <header
      className={cn(
        'flex items-center justify-between px-6 bg-surface h-16 fixed top-0 left-64 right-0 z-30 border-b border-border',
        className
      )}
    >
      <h1 className="text-2xl font-semibold text-primaryText">Dashboard</h1>
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Create
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-surface border-border">
            <DropdownMenuItem className="text-primaryText hover:bg-muted">New Lead</DropdownMenuItem>
            <DropdownMenuItem className="text-primaryText hover:bg-muted">New Contact</DropdownMenuItem>
            <DropdownMenuItem className="text-primaryText hover:bg-muted">New Task</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
