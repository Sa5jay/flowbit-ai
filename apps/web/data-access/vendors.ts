// Define the type for our chart data
export type TopVendorData = {
  name: string;
  spend: number;
}[];

export async function getTopVendors(): Promise<TopVendorData> {
  // In a real app, you'd fetch from your deployed API URL
  // const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/vendors/top10`);
  // const data = await res.json();

  // For now, we call our own mock API route handler directly
  const { GET } = await import('@/app/api/vendors/top10/route');
  const response = await GET();
  const data = await response.json();

  return data;
}