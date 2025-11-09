// We'll define the type for our stats
export type StatsData = {
  totalSpendYTD: { value: number; change: number };
  totalInvoices: { value: number; change: number };
  documentsUploaded: { value: number; change: number };
  averageInvoiceValue: { value: number; change: number };
};

// This function fetches the data.
// In a real app, this might live on a server, but for this Next.js
// app, we can fetch directly or call our route handler.
export async function getStats(): Promise<StatsData> {
  // For now, we call our own mock API route.
  // We use a dynamic import to ensure we're using Node.js fetch if available
  const { GET } = await import('@/app/api/stats/route');

  // In production, you'd fetch from your deployed API URL
  // const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/stats`);
  // const data = await res.json();
  
  // For the Vercel deployment, calling the route handler directly is efficient.
  const response = await GET();
  const data = await response.json();

  return data;
}