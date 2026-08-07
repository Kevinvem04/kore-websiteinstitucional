import React from 'react';
import styles from './ProjectDetail.module.css';
import { Client } from '@/types/client';
import { Link } from 'next-view-transitions';

interface ProjectDetailProps {
  project: Client;
}

export function ProjectDetail({ project }: ProjectDetailProps) {
  const { name, subtitle, marqueeText, description, mainImage, gallery, slug } = project;

  const paragraphs = description ? description.split('||') : [];
  const heroParagraphs = paragraphs.slice(0, 2);
  const galleryParagraphs = paragraphs.slice(2);

  let galleryClass = '';
  if (slug === 'alvorada') galleryClass = styles.fullGallery;
  if (slug === 'puff-dog' || slug === 'avabrum') galleryClass = styles.masonryGallery;

  return (
    <div className={`${styles.container} ${galleryClass}`}>
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
            {heroParagraphs.length > 0 && (
              <div className={styles.description}>
                {heroParagraphs.map((p, i) => (
                  <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
                ))}
              </div>
            )}
          </div>
        </div>
        
        <div className={styles.heroRight}>
          <div className={styles.mainImageWrapper}>
            <img 
              src={mainImage || '/logofull1.webp'} 
              alt={name} 
              className={styles.mainImage} 
              style={{ viewTransitionName: `projeto-${slug}` }}
            />
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      {(gallery?.length > 0 || galleryParagraphs.length > 0) && (
        <section className={styles.gallery}>
          {gallery?.map((imgUrl, idx) => (
            <React.Fragment key={idx}>
              <div className={styles.galleryItem}>
                <img 
                  src={imgUrl} 
                  alt={`${name} galeria ${idx + 1}`} 
                  className={styles.galleryImage} 
                  loading="lazy" 
                />
              </div>
              
              {galleryParagraphs[idx] && (
                <article className={`${styles.galleryItem} ${styles.galleryText}`}>
                  <p dangerouslySetInnerHTML={{ __html: galleryParagraphs[idx] }} />
                </article>
              )}
            </React.Fragment>
          ))}
          
          {/* Parágrafos restantes (se houver mais texto do que imagem) */}
          {galleryParagraphs.slice(gallery?.length || 0).map((p, idx) => (
             <article key={`text-${idx}`} className={`${styles.galleryItem} ${styles.galleryText}`}>
                <p dangerouslySetInnerHTML={{ __html: p }} />
             </article>
          ))}
        </section>
      )}
    </div>
  );
}
