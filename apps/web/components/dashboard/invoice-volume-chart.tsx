'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
} from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { TrendData } from '@/apps/web/data-access/trends';

// Helper to format currency
const formatCurrency = (value: number) =>
  new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  }).format(value);

// Custom Tooltip to match Figma design
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="rounded-lg border bg-background p-3 shadow-sm">
        <div className="mb-2 text-sm font-semibold">{`October ${label}`}</div>
        <div className="space-y-1 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Invoice count:</span>
            <span className="font-medium">{data['Invoice count']}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Total Spend:</span>
            <span className="font-medium">
              {formatCurrency(data['Total Spend'])}
            </span>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export function InvoiceVolumeChart({ data }: { data: TrendData }) {
  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader>
        <CardTitle>Invoice Volume + Value Trend</CardTitle>
        <CardDescription>
          Invoice count and total spend over 12 months.
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[300px] w-full p-0 pr-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 20,
              left: 0,
              bottom: 5,
            }}
          >
            {/* We hide the grid to match Figma */}
            <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.5} />

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
              tickFormatter={(value) => `${value}`} // Just the number
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              verticalAlign="top"
              align="right"
              iconType="circle"
              wrapperStyle={{ top: 0, right: 0 }}
            />
            <Line
              type="monotone"
              dataKey="Invoice count"
              stroke="hsl(var(--primary))" // Uses your shadcn primary color
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="Total Spend"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              strokeDasharray="5 5" // Dotted line
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}