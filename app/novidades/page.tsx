import fs from 'fs';
import path from 'path';
import { parseClientsCSV } from '@/lib/parseCSV';
import { ProjectsGrid } from '@/components/ui/ProjectsGrid/ProjectsGrid';
import { Client } from '@/types/client';

export const metadata = {
  title: 'Novidades | Kore Comunicação',
  description: 'Acompanhe as ações e novidades da Kore Comunicação. Atualizações sobre projetos, campanhas e o que estamos construindo ao redor do Brasil.',
  keywords: 'Kore Comunicação, ações da Kore, campanhas, agência de comunicação BH, novidades em ia, novidades em branding',
};

export default function Novidades() {
  const csvPath = path.join(process.cwd(), 'news.csv');
  let newsItems: Client[] = [];
  
  try {
    if (fs.existsSync(csvPath)) {
      const csvContent = fs.readFileSync(csvPath, 'utf-8');
      newsItems = parseClientsCSV(csvContent);
    }
  } catch (error) {
    console.error('Erro ao ler news.csv:', error);
  }

  return (
    <main className="page-transition">
      <ProjectsGrid projects={newsItems} title="NOVIDADES" subtitle="ACOMPANHE NOSSAS AÇÕES." />
    </main>
  );
}
