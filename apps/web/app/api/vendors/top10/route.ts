import { NextResponse } from 'next/server';

export async function GET() {
  // Simulate a network delay
  await new Promise((resolve) => setTimeout(resolve, 500)); // Shorter delay

  const data = [
    { name: 'AcmeCorp', spend: 43500.0 },
    { name: 'Test Solutions', spend: 31000.0 },
    { name: 'PrimeVendors', spend: 28000.0 },
    { name: 'DeltaServices', spend: 25000.0 },
    { name: 'OmegaLtd', spend: 22000.0 },
    { name: 'Global Supply', spend: 18679.25 }, // From Figma
    { name: 'BetaWorks', spend: 15000.0 },
    { name: 'AlphaInc', spend: 12000.0 },
    { name: 'Zeta Co', spend: 9000.0 },
    { name: 'ServiceNow', spend: 5000.0 },
  ];

  // Data for a horizontal bar chart should be sorted ascending
  // so the largest bar is at the top.
  return NextResponse.json(data.sort((a, b) => a.spend - b.spend));
}