import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export interface StatItem {
  id: string;
  value: string;
  description: string;
  subDescription?: string;
  icon?: React.ReactNode;
}

interface StatCardProps {
  title: string;
  stats: StatItem[];
  layout?: 'grid' | 'row'; // default to vertical list if not specified
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  stats,
  layout = 'row',
  className,
}) => {
  const renderStatItem = (stat: StatItem) => (
    <div key={stat.id}>
      <p className="text-3xl lg:text-4xl font-bold text-primaryText">
        {stat.value}
      </p>
      <p className="text-sm text-secondaryText mt-1">
        {stat.description}
        {stat.icon}
      </p>
      {stat.subDescription && (
        <p className="text-xs text-muted-foreground mt-0.5">
          {stat.subDescription}
        </p>
      )}
    </div>
  );

  return (
    <Card className={cn('w-full', className)}>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-primaryText">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {layout === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
            {stats.map(renderStatItem)}
          </div>
        ) : layout === 'row' ? (
          <div className="flex flex-col sm:flex-row sm:justify-between gap-6 sm:gap-4">
            {stats.map(renderStatItem)}
          </div>
        ) : (
          <div className="space-y-6">
            {stats.map(renderStatItem)}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StatCard;
