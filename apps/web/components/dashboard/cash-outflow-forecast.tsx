'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { CashFlowData } from '@/apps/web/data-access/cash-flow';

// Helper to format currency in thousands (e.g., €15k)
const formatK = (value: number) => {
  if (value === 0) return '€0';
  return `€${(value / 1000).toFixed(0)}k`;
};

// Custom Tooltip
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border bg-background p-3 shadow-sm">
        <div className="mb-2 text-sm font-semibold">{label}</div>
        <div className="space-y-1 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Cash Outflow:</span>
            <span className="font-medium">
              {new Intl.NumberFormat('de-DE', {
                style: 'currency',
                currency: 'EUR',
              }).format(payload[0].value)}
            </span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export function CashOutflowForecastChart({ data }: { data: CashFlowData }) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Cash Outflow Forecast</CardTitle>
        <CardDescription>
          Expected payment obligations grouped by due date ranges.
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[200px] w-full p-0 pr-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 5,
              right: 0,
              left: 0,
              bottom: 5,
            }}
          >
            <XAxis
              dataKey="name"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={formatK} // Format as €15k, €30k
            />
            <Tooltip
              cursor={{ fill: 'hsl(var(--muted))' }}
              content={<CustomTooltip />}
            />
            <Bar
              dataKey="value"
              fill="hsl(var(--primary))"
              radius={[4, 4, 0, 0]} // Rounded top corners
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}