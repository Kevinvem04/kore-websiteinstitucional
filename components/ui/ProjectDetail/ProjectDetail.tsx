'use client';
import React, { useState } from 'react';
import styles from './ProjectDetail.module.css';
import { Client } from '@/types/client';
import { Link } from 'next-view-transitions';
import { AudioPlayer } from '../AudioPlayer/AudioPlayer';

interface ProjectDetailProps {
  project: Client;
}

export function ProjectDetail({ project }: ProjectDetailProps) {
  const { name, subtitle, marqueeText, description, mainImage, gallery, slug } = project;
  const [isMuted, setIsMuted] = useState(true);
  
  const iframeRef = React.useRef<HTMLIFrameElement>(null);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);

    // YouTube Iframe Control
    if (iframeRef.current && iframeRef.current.contentWindow) {
      const command = nextMuted ? 'mute' : 'unMute';
      iframeRef.current.contentWindow.postMessage(JSON.stringify({
        event: 'command',
        func: command,
        args: []
      }), '*');
    }

    // Native Video Control
    if (videoRef.current) {
      videoRef.current.muted = nextMuted;
    }
  };

  const paragraphs = description ? description.split('||') : [];
  let heroParagraphs = paragraphs.slice(0, 2);
  let galleryParagraphs = paragraphs.slice(2);

  if (slug === 'dr-pads' || slug === 'sigla' || slug === 'avabrum' || slug === 'cafe-piranga' || slug === 'forte-brumadinho' || slug === 'profissionais' || slug === 'meio-ambiente') {
    heroParagraphs = paragraphs;
    galleryParagraphs = [];
  }

  let galleryClass = '';
  if (slug === 'alvorada' || slug === 'cafe-piranga' || slug === 'sigla' || slug === 'forte-brumadinho' || slug === 'dr-pads' || slug === 'meio-ambiente') galleryClass = styles.fullGallery;
  if (slug === 'avabrum') galleryClass = styles.masonryGallery;
  if (slug === 'puff-dog' || slug === 'museu-feb') galleryClass = styles.puffDogGallery;

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
            
            {slug === 'alvorada' && (
              <AudioPlayer src="/audio/alvorada-spot.wav" title="Ouvir Campanha" />
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

      {/* Video Section (exclusivo AVABRUM e CAFE PIRANGA) */}
      {(slug === 'avabrum' || slug === 'cafe-piranga') && (
        <section className={styles.videoSection}>
          <div className={styles.videoWrapper}>
            <iframe 
              ref={iframeRef}
              src={`https://www.youtube.com/embed/${slug === 'avabrum' ? '8U9vlni8Yuc' : 'sI9B9C6l8P8'}?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&loop=1&playlist=${slug === 'avabrum' ? '8U9vlni8Yuc' : 'sI9B9C6l8P8'}&enablejsapi=1`} 
              title="YouTube video player" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
              className={styles.youtubeIframe}
            ></iframe>
            <div className={styles.videoOverlay}></div>
            <button className={styles.muteButton} onClick={toggleMute} aria-label="Toggle Volume">
              {isMuted ? '🔇 Ativar Som' : '🔊 Mudo'}
            </button>
          </div>
        </section>
      )}

      {/* Video Local (exclusivo MEIO AMBIENTE) */}
      {slug === 'meio-ambiente' && (
        <section className={styles.videoSection}>
          <div className={styles.videoWrapper}>
            <video 
              ref={videoRef}
              src="/images/novidades/meio-ambiente/video.mp4" 
              className={styles.youtubeIframe}
              autoPlay
              loop
              muted
              playsInline
              style={{ objectFit: 'cover' }}
            />
            <button className={styles.muteButton} onClick={toggleMute} aria-label="Toggle Volume">
              {isMuted ? '🔇 Ativar Som' : '🔊 Mudo'}
            </button>
          </div>
        </section>
      )}

      {/* Gallery Section */}
      {((gallery && gallery.length > 0) || galleryParagraphs.length > 0) && (
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
