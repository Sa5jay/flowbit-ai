import { NextResponse } from 'next/server';

export type Invoice = {
  id: string;
  invoiceNumber: string;
  vendor: string;
  date: string;
  amount: number;
  status: 'PAID' | 'PENDING' | 'OVERDUE';
};

export async function GET() {
  // Simulate a network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const data: Invoice[] = [
    { id: 'inv-001', invoiceNumber: 'INV-12345', vendor: 'Phurix GmbH', date: '2025-08-19', amount: 73678.44, status: 'PAID' },
    { id: 'inv-002', invoiceNumber: 'INV-12346', vendor: 'AcmeCorp', date: '2025-08-20', amount: 15000.00, status: 'PENDING' },
    { id: 'inv-003', invoiceNumber: 'INV-12347', vendor: 'DeltaServices', date: '2025-08-18', amount: 5200.50, status: 'PAID' },
    { id: 'inv-004', invoiceNumber: 'INV-12348', vendor: 'Global Supply', date: '2025-07-01', amount: 8000.00, status: 'OVERDUE' },
    { id: 'inv-005', invoiceNumber: 'INV-12349', vendor: 'Phurix GmbH', date: '2025-08-19', amount: 73678.44, status: 'PAID' },
    { id: 'inv-006', invoiceNumber: 'INV-12350', vendor: 'OmegaLtd', date: '2025-08-21', amount: 1200.00, status: 'PENDING' },
    { id: 'inv-007', invoiceNumber: 'INV-12351', vendor: 'Test Solutions', date: '2025-08-22', amount: 9500.00, status: 'PAID' },
    { id: 'inv-008', invoiceNumber: 'INV-12352', vendor: 'Phurix GmbH', date: '2025-08-19', amount: 73678.44, status: 'PAID' },
  ];

  return NextResponse.json(data);
}