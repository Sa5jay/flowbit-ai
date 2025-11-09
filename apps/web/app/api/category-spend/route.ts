import { NextResponse } from 'next/server';

export async function GET() {
  // Simulate a network delay
  await new Promise((resolve) => setTimeout(resolve, 1200));

  const data = [
    { name: 'Operations', value: 7250, color: '#3b82f6' }, // Blue
    { name: 'Marketing', value: 1000, color: '#f97316' }, // Orange
    { name: 'Facilities', value: 1000, color: '#eab308' }, // Yellow/Gold
  ];

  return NextResponse.json(data);
}