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
import { TopVendorData } from '@/apps/web/data-access/vendors';

// Helper to format currency
const formatCurrency = (value: number) =>
  new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  }).format(value);

// Helper to format currency in thousands (e.g., €15k)
const formatK = (value: number) => {
  return `€${(value / 1000).toFixed(0)}k`;
};

// Custom Tooltip to match Figma design
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border bg-background p-3 shadow-sm">
        <div className="mb-2 text-sm font-semibold">{label}</div>
        <div className="space-y-1 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Vendor Spend:</span>
            <span className="font-medium">
              {formatCurrency(payload[0].value)}
            </span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export function SpendByVendorChart({ data }: { data: TopVendorData }) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Spend by Vendor (Top 10)</CardTitle>
        <CardDescription>
          Vendor spend with cumulative percentage distribution.
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[250px] w-full p-0 pr-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical" // This makes it a horizontal bar chart
            data={data}
            margin={{
              top: 0,
              right: 0,
              left: 20, // Add left margin for Y-axis labels
              bottom: 5,
            }}
          >
            {/* We hide the grid */}
            <XAxis
              type="number"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={formatK} // Format as €15k, €30k
            />
            <YAxis
              type="category"
              dataKey="name" // Use vendor name as the category
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              width={80} // Give space for vendor names
            />
            <Tooltip
              cursor={{ fill: 'hsl(var(--muted))' }}
              content={<CustomTooltip />}
            />
            <Bar
              dataKey="spend"
              fill="hsl(var(--primary))"
              radius={[4, 4, 4, 4]} // Rounded corners
              barSize={12} // Thinner bars
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}