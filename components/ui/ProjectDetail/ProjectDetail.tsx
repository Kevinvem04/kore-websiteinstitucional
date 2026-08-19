'use client';
import React, { useState, useEffect } from 'react';
import styles from './ProjectDetail.module.css';
import { Client } from '@/types/client';
import { Link } from 'next-view-transitions';
import { AudioPlayer } from '../AudioPlayer/AudioPlayer';

interface ProjectDetailProps {
  project: Client;
  isNews?: boolean;
}

export function ProjectDetail({ project, isNews = false }: ProjectDetailProps) {
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (slug === 'profissionais') {
    return (
      <div className={styles.container}>
        <section className={styles.profSplit}>
          <div className={styles.profLeft}>
            <Link href="/novidades" className={styles.backButton}>
              ← VOLTAR
            </Link>
            <h1 className={styles.title}>{name}</h1>
            <h2 className={styles.subtitle}>{subtitle}</h2>
            <div className={styles.profCopy}>
              {paragraphs.map((p, i) => (
                <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
              ))}
            </div>
          </div>
          <div className={styles.profRight}>
            <img src={mainImage || ''} alt="Equipe KORE" className={styles.profImageLarge} />
          </div>
        </section>
      </div>
    );
  }

  let rightParagraphs: string[] = [];

  if (slug === 'avabrum') {
    const mid = Math.ceil(paragraphs.length / 2);
    heroParagraphs = paragraphs.slice(0, mid);
    rightParagraphs = paragraphs.slice(mid);
    galleryParagraphs = [];
  } else if (slug === 'dr-pads' || slug === 'sigla' || slug === 'cafe-piranga' || slug === 'forte-brumadinho' || slug === 'meio-ambiente' || slug === 'museu-feb') {
    heroParagraphs = paragraphs;
    galleryParagraphs = [];
  }

  let galleryClass = '';
  if (slug === 'alvorada' || slug === 'cafe-piranga' || slug === 'sigla' || slug === 'forte-brumadinho' || slug === 'dr-pads' || slug === 'meio-ambiente') galleryClass = styles.fullGallery;
  if (slug === 'avabrum') galleryClass = styles.masonryGallery;
  if (slug === 'puff-dog') galleryClass = styles.puffDogGallery;
  if (slug === 'museu-feb') galleryClass = styles.fullGallery;

  const isCoverRemoved = !isNews && ['cafe-piranga', 'alvorada', 'sigla', 'forte-brumadinho'].includes(slug);

  return (
    <div className={`${styles.container} ${galleryClass}`}>
      {/* Hero Section */}
      <section className={`${styles.hero} ${isCoverRemoved ? styles.heroCentered : ''}`}>
        <div className={`${styles.heroLeft} ${isCoverRemoved ? styles.centered : ''}`}>
          <div className={styles.titleGroup}>
            <Link href="/projetos" className={styles.backButton}>
              ← VOLTAR
            </Link>
            <h1 className={styles.title}>{name}</h1>
            <h2 className={styles.subtitle}>{subtitle || marqueeText}</h2>
          </div>
          
          <div className={`${styles.descGroup} ${isCoverRemoved ? styles.centered : ''}`}>
            {heroParagraphs.length > 0 && (
              <div className={`${styles.description} ${isCoverRemoved ? styles.centered : ''}`}>
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
        
        {!isCoverRemoved && (
          <div className={`${styles.heroRight} ${slug === 'avabrum' ? styles.heroRightAvabrum : ''}`}>
            <div className={styles.mainImageWrapper}>
              <img 
                src={mainImage || '/logofull1.webp'} 
                alt={name} 
                className={styles.mainImage} 
                style={{ viewTransitionName: `projeto-${slug}` }}
              />
            </div>
            {slug === 'avabrum' && rightParagraphs.length > 0 && (
              <div className={styles.rightCopy}>
                {rightParagraphs.map((p, i) => (
                  <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
                ))}
              </div>
            )}
          </div>
        )}
      </section>

      {/* Video Section (exclusivo AVABRUM) */}
      {slug === 'avabrum' && (
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

      {/* GALLERY SECTION */}
      {(galleryParagraphs.length > 0 || (gallery && gallery.length > 0)) && (
        <section className={`${styles.gallery} ${slug === 'puff-dog' ? styles.puffDogFix : ''}`}>
          {gallery?.map((imgUrl, idx) => {
            const isYoutube = imgUrl.includes('youtube.com') || imgUrl.includes('youtu.be');
            const isVideo = imgUrl.endsWith('.mp4');
            const isShorts = imgUrl.includes('hRDu6w7s6Pk') || imgUrl.includes('shorts');
            const isSmallImage = imgUrl.includes('cafeipirangasenhor');

            let itemStyle: React.CSSProperties = {};
            if (isYoutube || isVideo) {
              if (isShorts) {
                itemStyle = {
                  aspectRatio: '9 / 16',
                  maxHeight: '85vh',
                  width: 'auto',
                  margin: '0 auto',
                };
              } else {
                itemStyle = {
                  aspectRatio: '16 / 9',
                  width: '100%',
                };
              }
            } else if (isSmallImage) {
              itemStyle = {
                gridColumn: 'span 1',
                maxWidth: '350px',
                margin: '0 auto',
                backgroundColor: 'transparent',
              };
            }
            
            const isRafael = imgUrl.includes('novidades/profissionais/main.webp');
            if (isRafael) {
              itemStyle = {
                gridColumn: '1 / -1',
                aspectRatio: 'auto',
                width: '100%',
                maxHeight: '90vh',
                backgroundColor: 'transparent',
              };
            }

            return (
              <React.Fragment key={idx}>
                <div className={styles.galleryItem} style={itemStyle}>
                  {isYoutube ? (
                    <iframe 
                      src={imgUrl.includes('youtube.com/embed') ? imgUrl : `https://www.youtube.com/embed/${imgUrl.split('v=')[1]?.split('&')[0] || imgUrl.split('shorts/')[1]?.split('?')[0] || imgUrl.split('/').pop()?.split('?')[0]}`}
                      title="YouTube video player" 
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    ></iframe>
                  ) : isVideo ? (
                    <video 
                      src={imgUrl}
                      controls
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                      <img 
                        src={imgUrl} 
                        alt={`${name} galeria ${idx + 1}`} 
                        className={styles.galleryImage} 
                        style={isRafael ? { height: '100%', maxHeight: '80vh', width: 'auto', objectFit: 'contain' } : {}}
                        loading="lazy" 
                      />
                      {isRafael && (
                        <span style={{ textAlign: 'center', marginTop: '1.5rem', color: '#c0c0c0', fontSize: '1.1rem', fontWeight: 300 }}>
                          Rafael Correia - Dir. Executivo.
                        </span>
                      )}
                    </div>
                  )}
                </div>
              
              {galleryParagraphs[idx] && (
                <article className={`${styles.galleryItem} ${styles.galleryText}`}>
                  <p dangerouslySetInnerHTML={{ __html: galleryParagraphs[idx] }} />
                </article>
              )}
            </React.Fragment>
            );
          })}
          
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
