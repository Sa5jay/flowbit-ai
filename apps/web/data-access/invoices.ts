// Re-use the type from the API route for consistency
import { Invoice } from '@/app/api/invoices/route';
export type { Invoice }; // Re-export the type

export async function getInvoices(): Promise<Invoice[]> {
  // In a real app, you'd fetch from your deployed API URL
  // const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/invoices`);
  // const data = await res.json();

  // For now, we call our own mock API route handler directly
  const { GET } = await import('@/app/api/invoices/route');
  const response = await GET();
  const data = await response.json();

  return data;
}