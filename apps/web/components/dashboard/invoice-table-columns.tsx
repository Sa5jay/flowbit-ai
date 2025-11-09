'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Invoice } from '@/apps/web/data-access/invoices';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { ArrowUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';

// Helper to format currency
const formatCurrency = (value: number) =>
  new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  }).format(value);

export const columns: ColumnDef<Invoice>[] = [
  // 1. Select Checkbox Column
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  
  // 2. Vendor Column (Searchable)
  {
    accessorKey: 'vendor',
    header: 'Vendor',
  },
  
  // 3. Date Column (Sortable)
  {
    accessorKey: 'date',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue('date'));
      return <div className="ml-4">{date.toLocaleDateString('de-DE')}</div>; // Format as 19.08.2025
    }
  },

  // 4. Invoice Number Column
  {
    accessorKey: 'invoiceNumber',
    header: 'Invoice Number',
  },

  // 5. Amount Column (Sortable)
  {
    accessorKey: 'amount',
    header: ({ column }) => {
      return (
        <div className="text-right">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Amount
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('amount'));
      return <div className="text-right font-medium">{formatCurrency(amount)}</div>;
    },
  },

  // 6. Status Column
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('status') as string;
      return (
        <Badge
          variant="outline"
          className={cn({
            'border-green-600 text-green-600': status === 'PAID',
            'border-yellow-500 text-yellow-500': status === 'PENDING',
            'border-red-600 text-red-600': status === 'OVERDUE',
          })}
        >
          {status}
        </Badge>
      );
    },
  },
];