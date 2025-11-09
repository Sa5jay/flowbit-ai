import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();


type RawInvoice = {
  _id: string;
  name: string;
  filePath: string;
  fileSize: { $numberLong: string };
  fileType: string;
  status: string;
  organizationId: string;
  departmentId: string;
  createdAt: { $date: string };
  updatedAt: { $date: string };
  metadata: {
    vendorName?: string;
    category?: string;
    amount?: number;
    invoiceDate?: string;
    dueDate?: string;
  };
  isValidatedByHuman: boolean;
  uploadedById: string;
  extractedData: Record<string, any>;
  processedAt: { $date: string };
  validatedData?: {
    vendorName?: string;
    category?: string;
    amount?: number;
    invoiceDate?: string;
    dueDate?: string;
  };
  analyticsId: string;
};

async function main() {
  console.log('Start seeding...');

  const jsonPath = path.join(__dirname, 'Analytics_Test_Data.json');
  const fileContent = fs.readFileSync(jsonPath, 'utf-8');
  const rawData: RawInvoice[] = JSON.parse(fileContent);

  await prisma.invoice.deleteMany();
  await prisma.vendor.deleteMany();
  await prisma.category.deleteMany();
  console.log('Cleared old data. Seeding new data...');

  for (const inv of rawData) {
    const vendorName = inv.validatedData?.vendorName || inv.metadata?.vendorName || "Unknown Vendor";
    const categoryName = inv.validatedData?.category || inv.metadata?.category || "Uncategorized";
    
    // Create or get vendor
    let vendor = await prisma.vendor.upsert({
      where: { name: vendorName },
      update: {},
      create: { name: vendorName },
    });

    // Create or get category
    let category = await prisma.category.upsert({
      where: { name: categoryName },
      update: {},
      create: { name: categoryName },
    });

    // Extract invoice data from the document metadata and validated data
    const amount = inv.validatedData?.amount || inv.metadata?.amount || 0;
    const invoiceDate = inv.validatedData?.invoiceDate ? new Date(inv.validatedData.invoiceDate) : 
                       inv.metadata?.invoiceDate ? new Date(inv.metadata.invoiceDate) :
                       new Date(inv.createdAt.$date);
    
    const dueDate = inv.validatedData?.dueDate ? new Date(inv.validatedData.dueDate) :
                    inv.metadata?.dueDate ? new Date(inv.metadata.dueDate) :
                    new Date(invoiceDate.getTime() + 30 * 24 * 60 * 60 * 1000);

    await prisma.invoice.create({
      data: {
        invoiceNumber: inv._id, // Using _id as invoice number
        amount: amount,
        issuedAt: invoiceDate,
        dueDate: dueDate,
        status: "PENDING", // Default status
        vendorId: vendor.id,
        categoryId: category.id,
      },
    });
  }
  console.log(`Seeding finished. ${rawData.length} invoices created.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });