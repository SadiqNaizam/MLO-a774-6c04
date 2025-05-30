import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend as RechartsLegend,
  Tooltip as RechartsTooltip,
} from 'recharts';
import type { LegendProps } from 'recharts';

interface SourceDataEntry {
  name: string;
  value: number; // actual deal value
  leads: number; // number of leads for percentage calculation (hypothetical)
  percentage: number; // display percentage
  color: string; // hex color
}

const sourcesData: SourceDataEntry[] = [
  { name: 'Clutch', value: 3000, leads: 50, percentage: 50, color: '#FB923C' }, // accentOrange
  { name: 'Behance', value: 1000, leads: 40, percentage: 40, color: '#F59E0B' }, // accentYellow
  { name: 'Instagram', value: 1000, leads: 10, percentage: 10, color: '#2563EB' }, // primary (accentBlue)
  { name: 'Dribbble', value: 1000, leads: 10, percentage: 10, color: '#10B981' }, // accentGreen
];

interface SourcesChartCardProps {
  className?: string;
}

const CustomLegend: React.FC<LegendProps & { data: SourceDataEntry[] }> = (props) => {
  const { payload, data } = props;
  if (!payload) return null;

  return (
    <ul className="space-y-2 text-sm mt-4">
      {payload.map((entry, index) => {
        const sourceItem = data.find(d => d.name === entry.value);
        if (!sourceItem) return null;
        return (
          <li key={`item-${index}`} className="grid grid-cols-[auto_1fr_auto_auto] items-center gap-x-2">
            <div style={{ width: 12, height: 12, backgroundColor: entry.color, borderRadius: '2px' }} />
            <span className="text-primaryText">{sourceItem.name}</span>
            <span className="text-secondaryText justify-self-end font-medium">${sourceItem.value.toLocaleString()}</span>
            <div className="justify-self-end text-right">
              <span className="text-secondaryText font-medium">{sourceItem.percentage}%</span>
              {sourceItem.name === 'Dribbble' && (
                <p className="text-xs text-muted-foreground -mt-0.5">from leads total</p>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
};

const SourcesChartCard: React.FC<SourcesChartCardProps> = ({ className }) => {
  return (
    <Card className={cn('w-full', className)}>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-primaryText">Sources</CardTitle>
      </CardHeader>
      <CardContent>
        <div style={{ width: '100%', height: 200 }}>
          <ResponsiveContainer>
            <PieChart>
              <RechartsTooltip
                contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)' }}
                labelStyle={{ color: 'hsl(var(--card-foreground))' }}
                formatter={(value: number, name: string, props: {payload: SourceDataEntry}) => [`$${props.payload.value.toLocaleString()} (${props.payload.percentage}%)`, name]}
              />
              <Pie
                data={sourcesData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                innerRadius={50} // for Donut chart
                fill="#8884d8"
                dataKey="leads" // The pie segment size is based on 'leads' count to match percentages
                stroke="hsl(var(--card))" // uses card background color for stroke creating separation
                strokeWidth={2}
              >
                {sourcesData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <RechartsLegend content={<CustomLegend data={sourcesData} />} />
      </CardContent>
    </Card>
  );
};

export default SourcesChartCard;
