import { NextResponse } from 'next/server';

// This is our mock API endpoint
export async function GET() {
  // Simulate a network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Return the mock data based on the Figma design
  return NextResponse.json({
    totalSpendYTD: {
      value: 12679.25,
      change: 8.2,
    },
    totalInvoices: {
      value: 64,
      change: 8.2,
    },
    documentsUploaded: {
      value: 17,
      change: -8.0, // Figma shows a red "less from last month"
    },
    averageInvoiceValue: {
      value: 2455.0,
      change: 8.2,
    },
  });
}