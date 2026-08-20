'use client';
import { useEffect, useState } from 'react';
import styles from './Preloader.module.css';

export function Preloader() {
  const [phase, setPhase] = useState<'playing' | 'wiping' | 'sliding' | 'done'>('playing');

  useEffect(() => {
    // 1. Aos 3.0s, a barra vermelha começa a subir e cobre o vídeo
    const wipeTimer = setTimeout(() => {
      setPhase('wiping');
    }, 3000);

    // 2. Aos 3.4s (quando a tela já está vermelha), o preloader inteiro sobe revelando o site
    const slideTimer = setTimeout(() => {
      setPhase('sliding');
    }, 3400);

    // 3. Remove completamente do DOM após a animação de saída terminar
    const doneTimer = setTimeout(() => {
      setPhase('done');
    }, 4200);

    return () => {
      clearTimeout(wipeTimer);
      clearTimeout(slideTimer);
      clearTimeout(doneTimer);
    };
  }, []);

  if (phase === 'done') return null;

  return (
    <div className={`${styles.preloader} ${phase === 'sliding' ? styles.sliding : ''}`}>
      {/* O elemento da barra vermelha que faz a transição */}
      <div className={`${styles.redWipe} ${phase === 'wiping' || phase === 'sliding' ? styles.wiping : ''}`} />
      
      <div className={styles.videoWrapper}>
        <video 
          src="/preloader-animation.mp4" 
          autoPlay 
          muted 
          playsInline 
          className={styles.videoPlayer}
        />
      </div>
    </div>
  );
}
