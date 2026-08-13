import fs from 'fs';
import path from 'path';
import { parseClientsCSV } from '@/lib/parseCSV';
import { ProjectsGrid } from '@/components/ui/ProjectsGrid/ProjectsGrid';
import { Client } from '@/types/client';

export const metadata = {
  title: 'Novidades - Kore',
  description: 'Fique por dentro das novidades da Kore.',
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
