'use client';
import { useEffect, useState } from 'react';
import styles from './Preloader.module.css';

export function Preloader() {
  const [phase, setPhase] = useState<'active' | 'done'>('active');

  useEffect(() => {
    // Animação: preto 1s → vermelho 1s → slide up 0.8s ≈ 2.8s
    const timer = setTimeout(() => setPhase('done'), 2800);
    return () => clearTimeout(timer);
  }, []);

  if (phase === 'done') return null;

  return (
    <div className={styles.preloader}>
      <div className={styles.backgroundPanel} />
      <div className={styles.logoWrapper}>
        <img src="/logokoremini_nobg.png" alt="KORE" width={120} height={120} />
      </div>
    </div>
  );
}
