import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CalendarDays, ChevronDown } from 'lucide-react';

interface PageHeaderProps {
  className?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ className }) => {
  const [activeTab, setActiveTab] = React.useState<string>('leads');
  const [selectedPeriod, setSelectedPeriod] = React.useState<string>('last 6 months');

  return (
    <div className={cn('flex flex-col md:flex-row md:items-center md:justify-between gap-4', className)}>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-muted">
          <TabsTrigger value="sales" className="data-[state=active]:bg-surface data-[state=active]:text-primaryText data-[state=active]:shadow-sm">
            Sales
          </TabsTrigger>
          <TabsTrigger value="leads" className="data-[state=active]:bg-surface data-[state=active]:text-primaryText data-[state=active]:shadow-sm">
            Leads
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="bg-surface text-secondaryText">
            <CalendarDays className="mr-2 h-4 w-4" />
            {selectedPeriod}
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setSelectedPeriod('Last 30 days')}>Last 30 days</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setSelectedPeriod('Last 3 months')}>Last 3 months</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setSelectedPeriod('Last 6 months')}>Last 6 months</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setSelectedPeriod('Last 12 months')}>Last 12 months</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default PageHeader;
