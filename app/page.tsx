import fs from 'fs';
import path from 'path';
import { parseClientsCSV } from '@/lib/parseCSV';
import { Client } from '@/types/client';
import { HomeCarousel } from '@/components/ui/Carousel/HomeCarousel';

export const metadata = {
  title: 'Asia - Comunicação focada no que realmente importa.',
  description: 'Agência criativa e cultural que conecta marcas à cultura por meio de experiências.',
};

const truncateText = (text: string, maxLength: number) => {
  const cleanText = text.replace(/\|\|/g, ' ').replace(/<[^>]+>/g, '');
  if (cleanText.length <= maxLength) return cleanText;
  return cleanText.substring(0, maxLength).trim() + '...';
};

export default function Home() {
  const csvPath = path.join(process.cwd(), 'clients.csv');
  let projects: Client[] = [];
  
  try {
    if (fs.existsSync(csvPath)) {
      const csvContent = fs.readFileSync(csvPath, 'utf-8');
      const allProjects = parseClientsCSV(csvContent);
      
      // Os projetos exatos que devem aparecer na Home
      const targetSlugs = ['avabrum', 'cafe-piranga', 'alvorada'];
      
      projects = allProjects
        .filter(p => targetSlugs.includes(p.slug))
        .map(p => ({
          ...p,
          // Comprime a descrição apenas para exibição na Home
          description: truncateText(p.description || '', 150)
        }));
        
      // Opcional: ordenar na mesma sequência do targetSlugs
      projects.sort((a, b) => targetSlugs.indexOf(a.slug) - targetSlugs.indexOf(b.slug));
    }
  } catch (error) {
    console.error('Erro ao ler clients.csv na Home:', error);
  }

  return <HomeCarousel clientsData={projects} />;
}

