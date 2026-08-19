import fs from 'fs';
import path from 'path';
import { parseClientsCSV } from '@/lib/parseCSV';
import { ProjectsGrid } from '@/components/ui/ProjectsGrid/ProjectsGrid';
import { Client } from '@/types/client';

export const metadata = {
  title: 'Projetos | Kore Comunicação – Categorias de projetos',
  description: 'Conheça os projetos da Kore Comunicação. Campanhas de impacto em social, cultura, design, música e tecnologia. Não criamos apenas o que aparece. Criamos o que sustenta e performa.',
  keywords: 'projetos agência de comunicação, campanhas publicitárias, cases de comunicação, agência criativa BH, projetos de branding, campanhas de impacto',
};

export default function Projetos() {
  // Lemos o CSV diretamente no servidor no build/request
  const csvPath = path.join(process.cwd(), 'clients.csv');
  let projects: Client[] = [];
  
  try {
    if (fs.existsSync(csvPath)) {
      const csvContent = fs.readFileSync(csvPath, 'utf-8');
      projects = parseClientsCSV(csvContent);
    }
  } catch (error) {
    console.error('Erro ao ler clients.csv:', error);
  }

  return (
    <main className="page-transition">
      <ProjectsGrid projects={projects} />
    </main>
  );
}
