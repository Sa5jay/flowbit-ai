import { NextResponse } from 'next/server';

export async function GET() {
  // Simulate a network delay
  await new Promise((resolve) => setTimeout(resolve, 1500)); // A bit longer delay

  const data = [
    { name: 'Jan', 'Invoice count': 40, 'Total Spend': 6879.25 },
    { name: 'Feb', 'Invoice count': 60, 'Total Spend': 5879.25 },
    { name: 'Mar', 'Invoice count': 35, 'Total Spend': 8879.25 },
    { name: 'Apr', 'Invoice count': 70, 'Total Spend': 4879.25 },
    { name: 'May', 'Invoice count': 50, 'Total Spend': 9879.25 },
    { name: 'Jun', 'Invoice count': 80, 'Total Spend': 6879.25 },
    { name: 'Jul', 'Invoice count': 65, 'Total Spend': 7879.25 },
    { name: 'Aug', 'Invoice count': 55, 'Total Spend': 5879.25 },
    { name: 'Sep', 'Invoice count': 47, 'Total Spend': 8679.25 }, // From Figma
    { name: 'Oct', 'Invoice count': 40, 'Total Spend': 4879.25 },
    { name: 'Nov', 'Invoice count': 35, 'Total Spend': 6879.25 },
    { name: 'Dec', 'Invoice count': 45, 'Total Spend': 7879.25 },
  ];

  return NextResponse.json(data);
}