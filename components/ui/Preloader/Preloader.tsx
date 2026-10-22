'use client';
import { useEffect, useState, useRef } from 'react';
import styles from './Preloader.module.css';

export function Preloader() {
  const [phase, setPhase] = useState<'playing' | 'wiping' | 'sliding' | 'done'>('playing');
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Força muted a nível de DOM antes de dar play (exigência estrita do Safari/iOS)
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.defaultMuted = true;
      videoRef.current.play().catch(() => {
        // Se o iOS estiver em Modo de Pouca Energia e bloquear o play, não trava a tela
      });
    }

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
          ref={videoRef}
          src="/preloader-animation.mp4" 
          autoPlay 
          muted 
          playsInline 
          preload="auto"
          controls={false}
          disablePictureInPicture
          className={styles.videoPlayer}
        />
      </div>
    </div>
  );
}
