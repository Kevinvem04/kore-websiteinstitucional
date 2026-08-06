'use client';
import { useState } from 'react';
import Link from 'next/link';
import styles from './Header.module.css';

const mapa = require('../../DOCS/IMAGES/mapa.json');

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Obrigado por se inscrever!');
  };

  return (
    <>
      <header className={`${styles.sidebarHeader} ${isOpen ? styles.menuActive : ''}`}>
        <button
          className={styles.btMenu}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          <svg viewBox="0 0 33 25.6" className={styles.svgIcon}>
            <g className={styles.btMenuBars}>
              <rect className={`${styles.bar} ${styles.topbar}`} y="2.5" width="33" height="3" />
              <rect className={`${styles.bar} ${styles.middlebar}`} y="12.3" width="33" height="3" />
              <rect className={`${styles.bar} ${styles.bottombar}`} y="22.2" width="33" height="3" />
            </g>
          </svg>
        </button>

        <div className={styles.columnSlogan}>
          <span>CREATIVE & CULTURAL AGENCY</span>
        </div>

        <div className={styles.logo}>
          <Link href="/" onClick={() => setIsOpen(false)} aria-label="Kore">
            <img src="/logokoremini_nobg.png" alt="Kore" className={styles.logoImg} />
          </Link>
        </div>
      </header>

      <div className={`${styles.menuExpanded} ${isOpen ? styles.open : ''}`}>
        <div className={styles.menuContainer}>
          <div className={styles.columnNavMenu}>
            <nav className={styles.navMenu}>
              <ul className={styles.menuList}>
                {mapa.menu.map((item: any, index: number) => (
                  <li key={index} className={styles.menuItem}>
                    <Link
                      href={item.path}
                      className={styles.menuLink}
                      data-letter={item.label}
                      onClick={() => setIsOpen(false)}
                    >
                      <span className={styles.linkText}>{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className={styles.columnSocialMenu}>
            <div className={styles.topRow}>
              <div className={styles.formTitle}>Receba nossas novidades</div>
              <form onSubmit={handleSubmit} className={styles.newsletterForm}>
                <div className={styles.inputWrapper}>
                  <input
                    type="email"
                    placeholder="Seu e-mail aqui..."
                    required
                    className={styles.emailInput}
                  />
                  <button type="submit" className={styles.submitBtn}>
                    →
                  </button>
                </div>
              </form>
            </div>

            <div className={styles.bottomRow}>
              <div className={styles.socialTitle}>Social & Contato</div>
              <ul className={styles.socialList}>
                {mapa.socials.map((item: any, index: number) => (
                  <li key={index} className={styles.socialItem}>
                    <a href={item.url} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                      <span>{item.label}</span>
                    </a>
                  </li>
                ))}
                <li className={styles.socialItem}>
                  <a href="mailto:contato@asiaxp.co" className={styles.socialLink}>
                    <span>contato@asiaxp.co</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
