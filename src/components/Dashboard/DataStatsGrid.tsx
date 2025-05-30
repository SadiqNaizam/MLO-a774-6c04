import React from 'react';
import { cn } from '@/lib/utils';
import StatCard, { StatItem } from './StatCard';
import { Info } from 'lucide-react';

const reasonsLostData: StatItem[] = [
  { id: 'reason1', value: '40%', description: 'The proposal is unclear' },
  { id: 'reason2', value: '20%', description: 'However venture pursuit' },
  { id: 'reason3', value: '10%', description: 'Other' },
  { id: 'reason4', value: '30%', description: 'The proposal is unclear' },
];

const otherDataStats: StatItem[] = [
  { id: 'other1', value: '900', description: 'total leads count' },
  { id: 'other2', value: '12', description: 'days in average to convert lead' },
  {
    id: 'other3',
    value: '30',
    description: 'inactive leads',
    icon: <Info className="w-3 h-3 text-secondaryText inline-block ml-1" />,
  },
];

interface DataStatsGridProps {
  className?: string;
}

const DataStatsGrid: React.FC<DataStatsGridProps> = ({ className }) => {
  return (
    <div className={cn('grid grid-cols-1 lg:grid-cols-2 gap-6', className)}>
      <StatCard title="Reasons of leads lost" stats={reasonsLostData} layout="grid" />
      <StatCard title="Other data" stats={otherDataStats} layout="row" />
    </div>
  );
};

export default DataStatsGrid;
