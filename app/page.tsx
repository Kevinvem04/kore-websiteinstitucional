'use client';

import { Carousel } from '@/components/ui/Carousel';
import { useSSE } from '@/hooks/useSSE';
import { useState, useEffect } from 'react';
import { Client } from '@/types/client';

const clientsData: Client[] = [
  {
    slug: 'hello-tomorrow',
    name: 'GWM',
    subtitle: 'Hello, tomorrow',
    description: 'Asia joga Beatles e Alok no liquidificador para criar a campanha de lançamento da GWM no Brasil. Filme foi produzido pela Untitled com direção dos Jungle.',
    date: '2023',
    link: '/projetos/hello-tomorrow',
    mainImage: 'https://asiaxp.co/images/uploads/banners/desktop/hello-tomorrow.webp',
    mainImageAlt: 'Hello, tomorrow.',
    mainImageWidth: 700,
    mainImageHeight: 517,
    layoutVariant: 'big',
    marqueeText: 'Hello, tomorrow. → GWM',
    color: '#ff3900'
  },
  {
    slug: 'guerreiros-asia',
    name: 'Guerreiros Asia',
    description: 'Na ASIA, buscamos diariamente ideias que se conectem com a cultura por meio de experiências físicas e digitais. Vigilantes e aguerridos, eles representam as 7 avenidas culturais.',
    date: '2024',
    link: '/projetos/guerreiros-asia',
    mainImage: 'https://asiaxp.co/images/uploads/banners/desktop/capa.webp',
    mainImageAlt: 'Guerreiros Asia',
    mainImageWidth: 1212,
    mainImageHeight: 933,
    layoutVariant: 'big',
    marqueeText: 'Guerreiros ASIA',
    color: '#ff3900'
  },
  {
    slug: 'esse-e-o-nosso-esporte',
    name: 'ENGIE',
    subtitle: 'ESSE É O NOSSO ESPORTE',
    description: 'Partindo do insight de que a energia da natureza, que está transformando o mundo, é a mesma que transforma o ser humano através do esporte, criamos a nova campanha institucional da ENGIE sob o conceito "Transição energética, esse é o nosso esporte".',
    date: '2023',
    link: '/projetos/esse-e-o-nosso-esporte',
    mainImage: 'https://asiaxp.co/images/uploads/banners/desktop/thumbspsd.webp',
    mainImageAlt: 'ENGIE - ESSE É O NOSSO ESPORTE',
    mainImageWidth: 700,
    mainImageHeight: 517,
    layoutVariant: 'small', // Design com foto compacta na esquerda e texto descritivo na direita (sob SOBRE)
    color: '#2ac500'
  },
  {
    slug: '100-eletrizante',
    name: 'ORA 03',
    subtitle: '100% ELETRIZANTE',
    description: 'Para turbinar o lançamento do ORA 03, buscamos inspiração no trabalho do artista taiwanês Damon Hsieh para criar visuais impactantes.',
    date: '2023',
    link: '/projetos/100-eletrizante',
    mainImage: 'https://asiaxp.co/images/uploads/banners/desktop/thumbs-destaque.webp',
    mainImageAlt: 'ORA 03 - 100% ELETRIZANTE',
    mainImageWidth: 900,
    mainImageHeight: 506,
    layoutVariant: 'big',
    marqueeText: '0RA 03. 100% ELETRIZANTE',
    color: '#ff3900'
  },
  {
    slug: 'street-poetry',
    name: 'MV BILL E SENNA',
    subtitle: 'QUE CONEXÃO É ESSA?',
    description: 'O novo filme da campanha Busque Sua Verdade traz o rapper carioca MV Bill apresentando Senna para gerações que não viram o piloto correr.',
    date: '2024',
    link: '/projetos/street-poetry',
    mainImage: 'https://asiaxp.co/images/uploads/banners/desktop/mv-bill.webp',
    mainImageAlt: 'MV BILL E SENNA',
    mainImageWidth: 700,
    mainImageHeight: 517,
    layoutVariant: 'big',
    marqueeText: 'MV BILL E SENNA, QUE CONEXÃO É ESSA?',
    color: '#ff3900'
  },
  {
    slug: 'asia-merch',
    name: 'ASIA MERCH',
    description: 'PORQUE A CRIATIVIDADE NUNCA SAI DE MODA. Criamos uma coleção de roupas e acessórios que une moda, design e outras avenidas culturais.',
    date: '2024',
    link: '/projetos/asia-merch',
    mainImage: 'https://asiaxp.co/images/uploads/banners/desktop/sem-titulo-1.webp',
    mainImageAlt: 'ASIA MERCH',
    mainImageWidth: 1861,
    mainImageHeight: 1188,
    layoutVariant: 'small',
    marqueeText: 'ASIA MERCH',
    color: '#ff3900'
  }
];

export default function Home() {
  const event = useSSE('/api/events');
  const [isReady, setIsReady] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (event?.type === 'SECTION_READY') {
      setIsReady(true);
    } else if (event?.type === 'TRIGGER_TRANSITION') {
      if (typeof event.data?.index === 'number') {
        setActiveIndex(event.data.index);
      }
    }
  }, [event]);

  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-0">
      <Carousel.Root
        isReady={isReady}
        totalSlides={clientsData.length}
        activeIndex={activeIndex}
        onIndexChange={setActiveIndex}
        slidesData={clientsData}
      />
    </main>
  );
}

