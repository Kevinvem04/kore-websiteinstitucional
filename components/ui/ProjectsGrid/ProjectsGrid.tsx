'use client';

import React, { useState, useMemo } from 'react';
import { Link } from 'next-view-transitions';
import styles from './ProjectsGrid.module.css';
import { Client } from '@/types/client';

interface ProjectsGridProps {
  projects: Client[];
  title?: string;
  subtitle?: React.ReactNode;
}

const CATEGORIES = [
  'TODOS',
  'SOCIAL',
  'CULTURA',
  'DESIGN',
  'MÚSICA',
  'TECNOLOGIA'
];

export function ProjectsGrid({ projects, title, subtitle }: ProjectsGridProps) {
  const [activeCategory, setActiveCategory] = useState('TODOS');


  // Filtra projetos
  const filteredProjects = projects.filter(project => {
    if (activeCategory === 'TODOS') return true;
    return project.category?.toUpperCase() === activeCategory;
  });

  return (
    <div className={styles.container}>
      {/* Cabeçalho da Aba Projetos */}
      <div className={styles.projectsHeader}>
        <h1 className={styles.heroBrandText}>{title || 'KORE'}</h1>
        <p className={styles.headerCopy}>
          {subtitle || (
            <>
              NÃO CRIAMOS APENAS O QUE APARECE.<br/>
              CRIAMOS O QUE SUSTENTA.
            </>
          )}
        </p>
      </div>

      {/* Barra de Filtros */}
      <nav className={styles.filterBar}>
        <ul className={styles.filterList}>
          {CATEGORIES.map(cat => (
            <li key={cat} className={styles.filterItem}>
              <button
                className={`${styles.filterButton} ${activeCategory === cat ? styles.active : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Grid de Projetos */}
      <div className={styles.grid}>
        {filteredProjects.map((project, index) => (
          <Link
            key={project.slug}
            href={project.link || `/projetos/${project.slug}`}
            className={styles.card}
            data-aos="fade-up"
            data-aos-delay={index * 50}
          >
            <div className={styles.imageWrapper}>
              <img
                src={project.mainImage || '/logofull1.webp'}
                alt={project.mainImageAlt || project.name}
                className={styles.image}
                loading="lazy"
                style={{ 
                  viewTransitionName: `projeto-${project.slug}`,
                  objectPosition: project.slug === 'profissionais' ? 'top center' : undefined 
                }}
              />
            </div>

            <div className={styles.overlay}>
              <div className={styles.overlayContent}>
                <h2 className={styles.projectName}>{project.name}</h2>
                {project.subtitle && (
                  <p className={styles.projectSubtitle}>{project.subtitle}</p>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
