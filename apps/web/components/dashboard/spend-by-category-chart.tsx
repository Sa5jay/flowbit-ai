'use client';

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { CategorySpendData } from '@/apps/web/data-access/categories';

// Helper to format currency
const formatCurrency = (value: number) =>
  new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  }).format(value);

// Custom legend component to match Figma
const CustomLegend = ({ payload }: any) => {
  return (
    <ul className="mt-4 flex flex-col gap-2">
      {payload.map((entry: any, index: number) => (
        <li key={`item-${index}`} className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-sm text-muted-foreground">
              {entry.payload.name}
            </span>
          </div>
          <span className="text-sm font-medium">
            {formatCurrency(entry.payload.value)}
          </span>
        </li>
      ))}
    </ul>
  );
};

export function SpendByCategoryChart({ data }: { data: CategorySpendData }) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Spend by Category</CardTitle>
        <CardDescription>
          Distribution of spending across different categories.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip
                formatter={(value: number) => formatCurrency(value)}
                cursor={{ fill: 'hsl(var(--muted))' }}
              />
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={60} // This creates the doughnut hole
                outerRadius={90}
                paddingAngle={5}
                fill="#8884d8"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              {/* We use a custom legend component */}
              <Legend content={<CustomLegend />} layout="vertical" align="left" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}