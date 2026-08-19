'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'next-view-transitions';
import { Client, isSmallLayout } from '@/types/client';
import styles from './Carousel.module.css';

interface CarouselRootProps {
  children?: React.ReactNode;
  isReady: boolean;
  totalSlides: number;
  activeIndex: number;
  onIndexChange: (index: number) => void;
  slidesData: Client[];
}

const Root = ({
  isReady,
  totalSlides,
  activeIndex,
  onIndexChange,
  slidesData
}: CarouselRootProps) => {
  const lastWheelTime = useRef<number>(0);
  const touchStartX = useRef<number>(0);
  const touchStartY = useRef<number>(0);
  
  const [displayIndex, setDisplayIndex] = useState(activeIndex);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    if (activeIndex !== displayIndex) {
      setIsFadingOut(true);
      const timer = setTimeout(() => {
        setDisplayIndex(activeIndex);
        setIsFadingOut(false);
      }, 400); // Wait for fade-out animation to complete
      return () => clearTimeout(timer);
    }
  }, [activeIndex, displayIndex]);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const now = Date.now();
      if (now - lastWheelTime.current < 700) return;

      if (Math.abs(e.deltaY) > 15 || Math.abs(e.deltaX) > 15) {
        lastWheelTime.current = now;
        if (e.deltaY > 0 || e.deltaX > 0) {
          onIndexChange((activeIndex + 1) % totalSlides);
        } else {
          onIndexChange((activeIndex - 1 + totalSlides) % totalSlides);
        }
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        onIndexChange((activeIndex + 1) % totalSlides);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        onIndexChange((activeIndex - 1 + totalSlides) % totalSlides);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.changedTouches[0].clientX;
      touchStartY.current = e.changedTouches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const deltaX = e.changedTouches[0].clientX - touchStartX.current;
      const deltaY = e.changedTouches[0].clientY - touchStartY.current;

      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
        if (deltaX < 0) {
          onIndexChange((activeIndex + 1) % totalSlides);
        } else {
          onIndexChange((activeIndex - 1 + totalSlides) % totalSlides);
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [activeIndex, totalSlides, onIndexChange]);

  const currentSlide = slidesData[displayIndex] || slidesData[0] || {
    slug: 'gwm',
    name: 'GWM',
    subtitle: 'Hello, tomorrow',
    description: 'Asia joga Beatles e Alok no liquidificador para criar a campanha de lançamento da GWM no Brasil.',
    link: '/projetos/hello-tomorrow'
  };

  const isSmall = isSmallLayout(currentSlide);

  return (
    <div className={`${styles.root} ${isReady ? styles.ready : ''}`}>
      <div className={styles.heroLayoutContainer}>
        {/* Fixed Top Header Links Overlay (Right Area 60.2%) */}
        <div className={styles.heroTopHeader}>
          <Link href="/projetos" className={styles.heroNavLink}>
            PROJETOS
          </Link>
          <Link href="/novidades" className={styles.heroNavLink}>
            NOVIDADES
          </Link>
        </div>

        {/* Hero Body */}
        <div className={styles.heroBody}>
          {/* Fixed Independent Title Column (Left - 39.8%) */}
          <div className={styles.columnTitleFixed}>
            {/* Top Fixed Area: [logo, titulo, subtitulo] */}
            <div className={styles.titleTopGroup}>
              <div className={styles.heroLogoBlock}>
                <span className={styles.heroBrandText}>KORE</span>
              </div>

              <div key={`title-${displayIndex}`} className={`${styles.animatedTextWrapper} ${isFadingOut ? styles.fadeOut : ''}`}>
                <h3 className={styles.slideTitle}>
                  <span className={styles.lineMask}>
                    <span className={styles.line1}>{currentSlide.name}</span>
                  </span>
                  {currentSlide.subtitle && (
                    <span className={styles.lineMask}>
                      <span className={styles.line2}>{currentSlide.subtitle}</span>
                    </span>
                  )}
                </h3>
              </div>
            </div>

            {/* Navigation Arrows Minimalistas */}
            <div className={styles.carouselArrows}>
              <button 
                className={styles.arrowBtn}
                onClick={() => onIndexChange((activeIndex - 1 + totalSlides) % totalSlides)}
                aria-label="Anterior"
              >
                &#10094;
              </button>
              <button 
                className={styles.arrowBtn}
                onClick={() => onIndexChange((activeIndex + 1) % totalSlides)}
                aria-label="Próximo"
              >
                &#10095;
              </button>
            </div>

            {/* Pagination fixed statically on the left of the left column */}
            <div className={styles.notionPagination}>
              {Array.from({ length: totalSlides }).map((_, idx) => (
                <button
                  key={idx}
                  className={`${styles.notionLine} ${idx === activeIndex ? styles.notionLineActive : ''}`}
                  onClick={() => onIndexChange(idx)}
                  aria-label={`Slide ${idx + 1}`}
                  title={`Slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Bottom Area: [descrição, link] (Rendered on the left for Big/Horizontal layout) */}
            {!isSmall && (
              <div key={`desc-${displayIndex}`} className={`${styles.descriptionWrapper} ${isFadingOut ? styles.fadeOut : ''}`}>
                {currentSlide.description && (
                  <p className={styles.description}>{currentSlide.description}</p>
                )}
                {currentSlide.link && (
                  <Link href={currentSlide.link} className={styles.link}>
                    <span>+ Ver mais</span>
                  </Link>
                )}
              </div>
            )}
          </div>

          {/* Right Area (60.2%) */}
          <div className={styles.columnImgTrack}>
            <div
              className={styles.wrapper}
              style={{ transform: `translate3d(-${activeIndex * 100}%, 0px, 0px)` }}
            >
              {slidesData.map((slide, idx) => {
                const slideSmall = isSmallLayout(slide);
                return (
                  <div key={slide.slug || idx} className={`${styles.slideImageWrapper} ${slideSmall ? styles.slideImageWrapperSmall : styles.slideImageWrapperBig}`}>
                    {slideSmall ? (
                      /* Dual Column Small Layout for Vertical Media */
                      <div className={styles.verticalSlideGrid}>
                        <div className={styles.verticalImageCol}>
                          <ImageProgressive
                            src={slide.mainImage || ''}
                            alt={slide.mainImageAlt || slide.name || ''}
                            marqueeText={slide.marqueeText}
                            isVertical={true}
                          />
                        </div>
                        <div className={styles.verticalDescCol}>
                          <div key={`desc-${idx}`} className={`${styles.descriptionWrapperVertical} ${activeIndex !== idx ? styles.fadeOut : ''}`}>
                            {slide.description && (
                              <p className={styles.description}>{slide.description}</p>
                            )}
                            {slide.date && (
                              <span className={styles.slideDate}>{slide.date}</span>
                            )}
                            {slide.link && (
                              <Link href={slide.link} className={styles.link}>
                                <span>+ Ver mais</span>
                              </Link>
                            )}
                          </div>
                        </div>
                      </div>
                    ) : (
                      /* Big/Horizontal Full Track Layout */
                      <ImageProgressive
                        src={slide.mainImage || ''}
                        alt={slide.mainImageAlt || slide.name || ''}
                        marqueeText={slide.marqueeText}
                        isVertical={false}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Marquee = ({ text }: { text: string }) => {
  return (
    <div className={styles.marqueeContainer}>
      <div className={styles.marqueeTrack}>
        <span>{text} →&nbsp;</span>
        <span>{text} →&nbsp;</span>
        <span>{text} →&nbsp;</span>
        <span>{text} →&nbsp;</span>
      </div>
    </div>
  );
};

const ImageProgressive = ({
  src,
  alt,
  marqueeText,
  isVertical
}: {
  src: string;
  alt: string;
  marqueeText?: string;
  isVertical?: boolean;
}) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`${styles.imageContainer} ${isVertical ? styles.imageContainerVertical : ''}`}>
      <div className={`${styles.imageMedia} ${isVertical ? styles.imageMediaVertical : ''} ${loaded ? styles.loaded : ''}`}>
        <div className={styles.imageInnerWrapper}>
          <img
            src={src}
            alt={alt}
            className={styles.imgOriginal}
            onLoad={() => setLoaded(true)}
          />
          <Marquee text={marqueeText || "Comunicação focada no que realmente importa."} />
        </div>
      </div>
    </div>
  );
};

export const Carousel = { Root, Marquee, ImageProgressive };

