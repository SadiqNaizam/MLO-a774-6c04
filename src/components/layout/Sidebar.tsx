import React from 'react';
import { cn } from '@/lib/utils';
import {
  LayoutGrid,
  Users,
  UserCircle2,
  FileText,
  FileSpreadsheet,
  Package,
  Mail,
  Archive,
  CalendarDays,
  HelpCircle,
  Settings,
  Menu,
  CircleDot
} from 'lucide-react';

// Assuming a Link component from react-router-dom or similar for navigation
// For standalone, we'll use <a> with preventDefault or placeholder href
interface NavItemProps {
  href: string;
  icon: React.ElementType;
  label: string;
  isActive?: boolean;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
}

const NavItem: React.FC<NavItemProps> = ({ href, icon: Icon, label, isActive, onClick }) => {
  return (
    <li>
      <a
        href={href}
        onClick={onClick}
        className={cn(
          'flex items-center py-2 px-3 rounded-md text-sm font-medium transition-colors',
          isActive
            ? 'bg-sidebar-primary text-sidebar-primary-foreground'
            : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring'
        )}
      >
        <Icon className="mr-3 h-5 w-5 flex-shrink-0" />
        {label}
      </a>
    </li>
  );
};

interface SidebarProps {
  className?: string;
}

const mainNavigationItems = [
  { href: '#', icon: LayoutGrid, label: 'Dashboard', isActive: true },
  { href: '#', icon: Users, label: 'Leads' },
  { href: '#', icon: UserCircle2, label: 'Customers' },
  { href: '#', icon: FileText, label: 'Proposals' },
  { href: '#', icon: FileSpreadsheet, label: 'Invoices' },
  { href: '#', icon: Package, label: 'Items' },
  { href: '#', icon: Mail, label: 'Mail' },
  { href: '#', icon: Archive, label: 'Shoebox' },
  { href: '#', icon: CalendarDays, label: 'Calendar' },
];

const supportNavigationItems = [
  { href: '#', icon: HelpCircle, label: 'Help' },
  { href: '#', icon: Settings, label: 'Settings' },
];

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const handleLinkClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    // In a real app, this would be handled by a router or state management
    // For now, prevent default for '#' hrefs
    if (event.currentTarget.getAttribute('href') === '#') {
      event.preventDefault();
      // Simulate navigation or state change if needed
      console.log(`Navigating to ${event.currentTarget.textContent}`);
    }
  };

  return (
    <aside
      className={cn(
        'fixed top-0 left-0 z-40 w-64 h-screen bg-sidebar border-r border-sidebar-border',
        'flex flex-col',
        className
      )}
    >
      <div className="flex items-center justify-between h-16 px-4 border-b border-sidebar-border">
        <a href="#" onClick={handleLinkClick} className="flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring rounded-sm">
          <CircleDot className="h-8 w-8 text-primary" /> 
          <span className="text-xl font-semibold text-primaryText">DO</span>
        </a>
        {/* Placeholder for menu toggle, not functional as per fixed width requirement */}
        <button className="p-1 rounded-md text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring md:hidden">
          <Menu className="h-6 w-6" />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto p-4 space-y-1">
        <ul className="space-y-1">
          {mainNavigationItems.map((item) => (
            <NavItem key={item.label} {...item} onClick={handleLinkClick} />
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <ul className="space-y-1">
          {supportNavigationItems.map((item) => (
            <NavItem key={item.label} {...item} onClick={handleLinkClick} />
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
