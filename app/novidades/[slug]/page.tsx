import fs from 'fs';
import path from 'path';
import { parseClientsCSV } from '@/lib/parseCSV';
import { ProjectDetail } from '@/components/ui/ProjectDetail/ProjectDetail';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `Novidade: ${slug} - Kore`,
  };
}

export default async function NewsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const csvPath = path.join(process.cwd(), 'news.csv');
  
  if (!fs.existsSync(csvPath)) {
    return notFound();
  }

  const csvContent = fs.readFileSync(csvPath, 'utf-8');
  const newsItems = parseClientsCSV(csvContent);
  
  const newsItem = newsItems.find(p => {
    if (p.slug === slug) return true;
    if (p.link && p.link.endsWith(`/${slug}`)) return true;
    const nameSlug = p.name?.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
    return nameSlug === slug;
  });

  if (!newsItem) {
    return notFound();
  }

  return (
    <main className="page-transition">
      <ProjectDetail project={newsItem} />
    </main>
  );
}
