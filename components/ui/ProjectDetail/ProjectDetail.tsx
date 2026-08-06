import React from 'react';
import styles from './ProjectDetail.module.css';
import { Client } from '@/types/client';
import Link from 'next/link';

interface ProjectDetailProps {
  project: Client;
}

export function ProjectDetail({ project }: ProjectDetailProps) {
  const { name, subtitle, marqueeText, description, mainImage, gallery } = project;

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroLeft}>
          <div className={styles.titleGroup}>
            <Link href="/projetos" className={styles.backButton}>
              ← VOLTAR
            </Link>
            <h1 className={styles.title}>{name}</h1>
            <h2 className={styles.subtitle}>{subtitle || marqueeText}</h2>
          </div>
          
          <div className={styles.descGroup}>
            {description && <p className={styles.description}>{description}</p>}
          </div>
        </div>
        
        <div className={styles.heroRight}>
          <div className={styles.mainImageWrapper}>
            <img 
              src={mainImage || '/logofull1.webp'} 
              alt={name} 
              className={styles.mainImage} 
            />
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      {gallery && gallery.length > 0 && (
        <section className={styles.gallery}>
          {gallery.map((imgUrl, idx) => (
            <div key={idx} className={styles.galleryItem}>
              <img 
                src={imgUrl} 
                alt={`${name} galeria ${idx + 1}`} 
                className={styles.galleryImage} 
                loading="lazy" 
              />
            </div>
          ))}
        </section>
      )}
    </div>
  );
}
