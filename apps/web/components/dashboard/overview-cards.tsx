import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { StatsData } from '@/apps/web/data-access/stats';
import { ArrowDownLeft, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

// Helper to format currency
const formatCurrency = (value: number) =>
  new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  }).format(value);

// Helper to format numbers
const formatCompact = (value: number) =>
  new Intl.NumberFormat('en-US', {
    notation: 'compact',
    compactDisplay: 'short',
  }).format(value);

// Helper for percent change
const ChangeIndicator = ({ change }: { change: number }) => {
  const isPositive = change > 0;
  return (
    <span
      className={cn(
        'flex items-center text-xs text-muted-foreground',
        isPositive ? 'text-green-600' : 'text-red-600'
      )}
    >
      {isPositive ? (
        <ArrowUpRight className="h-4 w-4" />
      ) : (
        <ArrowDownLeft className="h-4 w-4" />
      )}
      {Math.abs(change)}% from last month
    </span>
  );
};

export function OverviewCards({ data }: { data: StatsData }) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {/* Card 1: Total Spend */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Spend (YTD)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {formatCurrency(data.totalSpendYTD.value)}
          </div>
          <ChangeIndicator change={data.totalSpendYTD.change} />
        </CardContent>
      </Card>

      {/* Card 2: Total Invoices */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total Invoices Processed
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.totalInvoices.value}</div>
          <ChangeIndicator change={data.totalInvoices.change} />
        </CardContent>
      </Card>

      {/* Card 3: Documents Uploaded */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Documents Uploaded
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {data.documentsUploaded.value}
          </div>
          <ChangeIndicator change={data.documentsUploaded.change} />
        </CardContent>
      </Card>

      {/* Card 4: Average Invoice Value */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Average Invoice Value
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {formatCurrency(data.averageInvoiceValue.value)}
          </div>
          <ChangeIndicator change={data.averageInvoiceValue.change} />
        </CardContent>
      </Card>
    </div>
  );
}