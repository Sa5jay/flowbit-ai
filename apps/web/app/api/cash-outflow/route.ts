import { NextResponse } from 'next/server';

export async function GET() {
  // Simulate a network delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  const data = [
    { name: '0-7 days', value: 41000 },
    { name: '8-30 days', value: 38000 },
    { name: '31-60 days', value: 15000 },
    { name: '60+ days', value: 21000 },
  ];

  return NextResponse.json(data);
}