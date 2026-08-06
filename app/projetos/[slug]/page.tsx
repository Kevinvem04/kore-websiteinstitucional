import fs from 'fs';
import path from 'path';
import { parseClientsCSV } from '@/lib/parseCSV';
import { ProjectDetail } from '@/components/ui/ProjectDetail/ProjectDetail';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return {
    title: `Projeto ${slug} - Asia`,
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  
  // Leitura do CSV (igual na página de grid)
  const csvPath = path.join(process.cwd(), 'clients.csv');
  
  if (!fs.existsSync(csvPath)) {
    return notFound();
  }

  const csvContent = fs.readFileSync(csvPath, 'utf-8');
  const projects = parseClientsCSV(csvContent);
  
  // O link no CSV geralmente está como "/projetos/cafe-piranga"
  // Vamos buscar comparando o final do link com o slug, ou se tiver coluna slug, usamos ela.
  const project = projects.find(p => {
    // Se o CSV tiver coluna "slug" exata:
    if (p.slug === slug) return true;
    
    // Se tiver apenas a coluna "link" ex: "/projetos/cafe-piranga"
    if (p.link && p.link.endsWith(`/${slug}`)) return true;
    
    // Fallback: normaliza o nome para slug
    const nameSlug = p.name?.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
    return nameSlug === slug;
  });

  if (!project) {
    return notFound();
  }

  return (
    <main className="page-transition">
      <ProjectDetail project={project} />
    </main>
  );
}
