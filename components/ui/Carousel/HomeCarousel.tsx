'use client';

import { Carousel } from '@/components/ui/Carousel';
import { useSSE } from '@/hooks/useSSE';
import { useState, useEffect } from 'react';
import { Client } from '@/types/client';

interface HomeCarouselProps {
  clientsData: Client[];
}

export function HomeCarousel({ clientsData }: HomeCarouselProps) {
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
    <main className="flex min-h-screen flex-col items-center justify-between p-0 page-transition">
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
