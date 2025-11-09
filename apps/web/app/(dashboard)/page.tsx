import { getStats } from '@/apps/web/data-access/stats';
import { OverviewCards } from '@/components/dashboard/overview-cards';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

import { getInvoiceTrends } from '@/apps/web/data-access/trends';
import { InvoiceVolumeChart } from '@/components/dashboard/invoice-volume-chart';

import { getTopVendors } from '@/apps/web/data-access/vendors';
import { SpendByVendorChart } from '@/components/dashboard/spend-by-vendor-chart';

import { getCategorySpend } from '@/apps/web/data-access/categories';
import { SpendByCategoryChart } from '@/components/dashboard/spend-by-category-chart';

import { getCashOutflow } from '@/apps/web/data-access/cash-flow';
import { CashOutflowForecastChart } from '@/components/dashboard/cash-outflow-forecast';

// 1. Import the new component
import { InvoicesTable } from '@/components/dashboard/invoices-table';

export default async function DashboardPage() {
  // 2. Fetch all data in parallel
  const statsDataPromise = getStats();
  const trendDataPromise = getInvoiceTrends();
  const topVendorsPromise = getTopVendors();
  const categorySpendPromise = getCategorySpend();
  const cashOutflowPromise = getCashOutflow();
  // Note: The InvoicesTable component fetches its own data

  const [
    statsData,
    trendData,
    topVendorsData,
    categorySpendData,
    cashOutflowData,
  ] = await Promise.all([
    statsDataPromise,
    trendDataPromise,
    topVendorsPromise,
    categorySpendPromise,
    cashOutflowPromise,
  ]);

  return (
    <div className="flex flex-col gap-6">
      <OverviewCards data={statsData} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Suspense
          fallback={
            <Skeleton className="col-span-1 h-[350px] w-full lg:col-span-2" />
          }
        >
          <InvoiceVolumeChart data={trendData} />
        </Suspense>

        <Suspense fallback={<Skeleton className="h-[350px] w-full" />}>
          <SpendByVendorChart data={topVendorsData} />
        </Suspense>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Suspense fallback={<Skeleton className="h-[300px] w-full" />}>
          <SpendByCategoryChart data={categorySpendData} />
        </Suspense>

        <Suspense fallback={<Skeleton className="h-[300px] w-full" />}>
          <CashOutflowForecastChart data={cashOutflowData} />
        </Suspense>

        {/* 3. Replace the final Skeleton with our new table component
               We give it a larger min-height in the skeleton.
        */}
        <Suspense fallback={<Skeleton className="h-[400px] w-full" />}>
          <InvoicesTable />
        </Suspense>
      </div>
    </div>
  );
}