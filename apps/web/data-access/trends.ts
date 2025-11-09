// Define the type for our chart data
export type TrendData = {
  name: string; // Month
  'Invoice count': number;
  'Total Spend': number;
}[];

export async function getInvoiceTrends(): Promise<TrendData> {
  // In a real app, you'd fetch from your deployed API URL
  // const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/invoice-trends`);
  // const data = await res.json();

  // For now, we call our own mock API route handler directly
  const { GET } = await import('@/app/api/invoice-trends/route');
  const response = await GET();
  const data = await response.json();

  return data;
}