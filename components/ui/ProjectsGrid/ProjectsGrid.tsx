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

export function ProjectsGrid({ projects, title, subtitle }: ProjectsGridProps) {
  const [activeCategory, setActiveCategory] = useState('TODOS');

  // Compute available categories dynamically so no filters are empty
  const categories = useMemo(() => {
    const cats = new Set<string>();
    projects.forEach(p => {
      if (p.category) {
        cats.add(p.category.toUpperCase());
      }
    });
    return ['TODOS', ...Array.from(cats).sort()];
  }, [projects]);


  // Filtra projetos
  const filteredProjects = projects.filter(project => {
    if (activeCategory === 'TODOS') return true;
    return project.category?.toUpperCase() === activeCategory;
  });

  return (
    <div className={styles.container}>
      {/* Cabeçalho da Aba Projetos */}
      <div className={styles.projectsHeader}>
        <Link href="/" className={styles.backButton}>
          ← VOLTAR PARA HOME
        </Link>
        <h1 className={styles.heroBrandText}>
          {title ? title : <img src="/logo-kore-texto.webp" alt="KORE" className={styles.brandImage} />}
        </h1>
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
          {categories.map(cat => (
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
                  viewTransitionName: `projeto-${project.slug}`
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
