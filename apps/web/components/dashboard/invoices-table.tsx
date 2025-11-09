import { getInvoices, Invoice } from '@/apps/web/data-access/invoices';
import { columns } from './invoice-table-columns';
import { DataTable } from './data-table';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export async function InvoicesTable() {
  // This is a Server Component, so we can fetch data directly
  const data = await getInvoices();

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Invoices by Vendor</CardTitle>
        <CardDescription>
          Top invoices by vendor count and net value.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={data} />
      </CardContent>
    </Card>
  );
}