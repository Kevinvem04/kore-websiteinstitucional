'use client';
import { useEffect, useState } from 'react';

export function useSSE(url: string) {
  const [lastEvent, setLastEvent] = useState<{type: string, data: any} | null>(null);

  useEffect(() => {
    const source = new EventSource(url);

    source.addEventListener('SECTION_READY', (e) => {
      setLastEvent({ type: 'SECTION_READY', data: JSON.parse((e as MessageEvent).data) });
    });

    source.addEventListener('TRIGGER_TRANSITION', (e) => {
      setLastEvent({ type: 'TRIGGER_TRANSITION', data: JSON.parse((e as MessageEvent).data) });
    });

    return () => {
      source.close();
    };
  }, [url]);

  return lastEvent;
}
