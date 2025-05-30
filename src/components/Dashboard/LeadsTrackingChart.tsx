import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend as RechartsLegend,
  ResponsiveContainer,
} from 'recharts';
import { CalendarDays, ChevronDown } from 'lucide-react';

interface MonthlyLeadData {
  month: string;
  closedWon: number;
  closedLost: number;
}

const leadsTrackingData: MonthlyLeadData[] = [
  { month: 'March', closedWon: 68, closedLost: 55 },
  { month: 'April', closedWon: 38, closedLost: 25 }, 
  { month: 'May', closedWon: 95, closedLost: 40 },
  { month: 'June', closedWon: 62, closedLost: 10 }, 
  { month: 'July', closedWon: 75, closedLost: 45 },
  { month: 'August', closedWon: 32, closedLost: 98 }, 
];

interface LeadsTrackingChartProps {
  className?: string;
}

const LeadsTrackingChart: React.FC<LeadsTrackingChartProps> = ({ className }) => {
  const [selectedPeriod, setSelectedPeriod] = React.useState<string>('last 6 months');

  const totalClosed = leadsTrackingData.reduce((sum, item) => sum + item.closedWon, 0);
  const totalLost = leadsTrackingData.reduce((sum, item) => sum + item.closedLost, 0);

  return (
    <Card className={cn('w-full', className)}>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <CardTitle className="text-lg font-semibold text-primaryText mb-2 sm:mb-0">Leads tracking</CardTitle>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                <Button variant="outline" className="bg-surface text-secondaryText w-full sm:w-auto">
                    <CalendarDays className="mr-2 h-4 w-4" />
                    {selectedPeriod}
                    <ChevronDown className="ml-auto sm:ml-2 h-4 w-4" />
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
        <div className="flex items-baseline space-x-4 mt-2">
            <div>
                <span className="text-3xl font-bold text-primaryText">{totalClosed}</span>
                <span className="ml-1 text-sm text-secondaryText">total closed</span>
            </div>
            <div>
                <span className="text-3xl font-bold text-primaryText">{totalLost}</span>
                <span className="ml-1 text-sm text-secondaryText">total lost</span>
            </div>
        </div>
      </CardHeader>
      <CardContent>
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <LineChart data={leadsTrackingData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis 
                dataKey="month" 
                tickLine={false} 
                axisLine={false} 
                tick={{ fill: 'hsl(var(--secondary-text))', fontSize: 12 }}
              />
              <YAxis 
                tickLine={false} 
                axisLine={false} 
                tick={{ fill: 'hsl(var(--secondary-text))', fontSize: 12 }}
                domain={[0, 'dataMax + 10']}
              />
              <RechartsTooltip 
                contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)' }}
                labelStyle={{ color: 'hsl(var(--card-foreground))', fontWeight: 'bold' }}
                itemStyle={{ color: 'hsl(var(--card-foreground))' }}
              />
              <RechartsLegend 
                iconType="square"
                iconSize={10}
                wrapperStyle={{ paddingTop: '20px', color: 'hsl(var(--primary-text))' }}
                formatter={(value) => <span className="text-sm text-primaryText ml-1">{value}</span>}
              />
              <Line 
                type="monotone" 
                dataKey="closedWon" 
                name="Closed won"
                stroke="#10B981" // accentGreen
                strokeWidth={2} 
                dot={{ r: 4, fill: '#10B981', strokeWidth: 2, stroke: 'hsl(var(--card))' }}
                activeDot={{ r: 6, fill: '#10B981', strokeWidth: 2, stroke: 'hsl(var(--card))' }}
              />
              <Line 
                type="monotone" 
                dataKey="closedLost" 
                name="Closed lost"
                stroke="#E53E3E" // destructive (accentRed)
                strokeWidth={2} 
                dot={{ r: 4, fill: '#E53E3E', strokeWidth: 2, stroke: 'hsl(var(--card))' }}
                activeDot={{ r: 6, fill: '#E53E3E', strokeWidth: 2, stroke: 'hsl(var(--card))' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default LeadsTrackingChart;
