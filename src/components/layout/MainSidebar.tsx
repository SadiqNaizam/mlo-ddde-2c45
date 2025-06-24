import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  Activity,
  LayoutDashboard,
  Star,
  Briefcase,
  ChevronLeft,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface NavItemProps {
  to: string;
  icon: React.ElementType;
  label: string;
  isCollapsed: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon: Icon, label, isCollapsed }) => {
  const linkContent = (
    <div className="flex items-center gap-3">
      <Icon className="h-5 w-5" />
      <span className={cn('font-medium whitespace-nowrap', isCollapsed && 'sr-only')}>
        {label}
      </span>
    </div>
  );

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    cn(
      'flex items-center rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground',
      isActive && 'bg-accent text-accent-foreground hover:bg-accent/90 hover:text-accent-foreground',
      isCollapsed ? 'justify-center' : ''
    );

  if (isCollapsed) {
    return (
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <NavLink to={to} className={navLinkClasses}>
            {linkContent}
          </NavLink>
        </TooltipTrigger>
        <TooltipContent side="right">
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
    );
  }

  return (
    <NavLink to={to} className={navLinkClasses}>
      {linkContent}
    </NavLink>
  );
};

const MainSidebar: React.FC = () => {
  console.log('MainSidebar loaded');
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        'hidden md:flex flex-col border-r bg-card h-screen sticky top-0 transition-all duration-300 ease-in-out',
        isCollapsed ? 'w-20' : 'w-64'
      )}
    >
      <div className="flex h-16 items-center border-b px-4 lg:px-6 justify-between">
        <Link to="/" className={cn('flex items-center gap-2 font-bold', isCollapsed && 'opacity-0 select-none')}>
           <Activity className="h-6 w-6 text-primary" />
           Stox
        </Link>
        <Button variant="ghost" size="icon" onClick={() => setIsCollapsed(!isCollapsed)}>
          <ChevronLeft
            className={cn(
              'h-5 w-5 transition-transform duration-300 ease-in-out',
              isCollapsed && 'rotate-180'
            )}
          />
        </Button>
      </div>

      <nav className="flex-1 space-y-2 p-4">
        <NavItem to="/" icon={LayoutDashboard} label="Dashboard" isCollapsed={isCollapsed} />
        <NavItem to="/watchlistpage" icon={Star} label="Watchlist" isCollapsed={isCollapsed} />
        <NavItem to="/portfoliopage" icon={Briefcase} label="Portfolio" isCollapsed={isCollapsed} />
      </nav>
    </aside>
  );
};

export default MainSidebar;