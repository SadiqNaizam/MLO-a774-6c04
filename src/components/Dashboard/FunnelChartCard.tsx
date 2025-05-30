import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface FunnelStage {
  id: string;
  name: string;
  count: number;
  value: number;
  duration: string;
  color: string; // Tailwind bg color class e.g., 'bg-accentOrange'
  textColor?: string; // Tailwind text color class for contrast if needed
}

const funnelData: FunnelStage[] = [
  {
    id: 'discovery',
    name: 'Discovery',
    count: 200,
    value: 200,
    duration: '2 days',
    color: 'bg-accentOrange',
  },
  {
    id: 'qualified',
    name: 'Qualified',
    count: 100,
    value: 100,
    duration: '2 days',
    color: 'bg-accentYellow',
  },
  {
    id: 'inConversation',
    name: 'In conversation',
    count: 50,
    value: 100,
    duration: 'average time on this stage',
    color: 'bg-primary',
    textColor: 'text-primary-foreground'
  },
  {
    id: 'negotiations',
    name: 'Negotiations',
    count: 20,
    value: 50,
    duration: '8 days',
    color: 'bg-accentGreen',
  },
  {
    id: 'closedWon',
    name: 'Closed won',
    count: 20,
    value: 50,
    duration: '10 days',
    color: 'bg-accentPurple',
    textColor: 'text-primary-foreground'
  },
];

const totalFunnelCount = funnelData.reduce((sum, stage) => sum + stage.count, 0);

interface FunnelChartCardProps {
  className?: string;
}

const FunnelChartCard: React.FC<FunnelChartCardProps> = ({ className }) => {
  return (
    <Card className={cn('w-full', className)}>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-primaryText">Funnel count</CardTitle>
        <div className="flex items-baseline">
          <span className="text-3xl font-bold text-primaryText">600</span>
          <span className="ml-2 text-sm text-secondaryText">active leads</span>
        </div>
      </CardHeader>
      <CardContent>
        <TooltipProvider>
          <div className="mb-4 flex h-3 rounded-full overflow-hidden">
            {funnelData.map((stage) => (
              <div
                key={stage.id}
                className={cn('h-full', stage.color)}
                style={{ width: `${(stage.count / totalFunnelCount) * 100}%` }}
              />
            ))}
          </div>
          <ul className="space-y-3">
            {funnelData.map((stage) => (
              <li key={stage.id} className="grid grid-cols-[auto_1fr_auto_auto_auto] items-center gap-x-3 text-sm">
                <div className={cn('w-3 h-3 rounded-sm', stage.color)} />
                <span className="text-primaryText whitespace-nowrap">{stage.name}</span>
                <span className="text-secondaryText justify-self-end font-medium">{stage.count}</span>
                <span className="text-secondaryText justify-self-end font-medium">${stage.value}</span>
                {stage.id === 'inConversation' ? (
                   <Tooltip delayDuration={100}>
                    <TooltipTrigger asChild>
                      <span className={cn("text-xs px-2 py-0.5 rounded justify-self-end", stage.color, stage.textColor ? stage.textColor : 'text-primaryText')}>{stage.duration}</span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Average time leads spend in the "In conversation" stage.</p>
                    </TooltipContent>
                  </Tooltip>
                ) : (
                  <span className="text-secondaryText justify-self-end whitespace-nowrap">{stage.duration}</span>
                )}
              </li>
            ))}
          </ul>
        </TooltipProvider>
      </CardContent>
    </Card>
  );
};

export default FunnelChartCard;
