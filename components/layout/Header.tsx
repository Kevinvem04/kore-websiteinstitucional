'use client';
import { useState } from 'react';
import { Link } from 'next-view-transitions';
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
          <span>Comunicação focada no que realmente importa.</span>
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
            {/* ROW 1: Socials & Idioma */}
            <div className={styles.gridRow1}>
              <div className={styles.sigaNosBlock}>
                <div className={styles.verticalLabel}>SIGA NOS</div>
                <div className={styles.linksContainer}>
                  {mapa.socials.map((item: any, index: number) => (
                    <a key={index} href={item.url} target="_blank" rel="noopener noreferrer" className={styles.gridLink}>
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>
              <div className={styles.idiomaBlock}>
                <div className={styles.verticalLabel}>IDIOMA</div>
                <div className={styles.linksContainer}>
                  <a href="#" className={styles.gridLink}>POR</a>
                  <a href="#" className={styles.gridLink}>ENG</a>
                </div>
              </div>
            </div>

            {/* ROW 2: Search */}
            <div className={styles.gridRow2}>
              <div className={styles.searchIconWrapper}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className={styles.searchIcon}>
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </div>
            </div>

            {/* ROW 3 & 4: Contact & Form */}
            <div className={styles.gridRow3}>
              <div className={styles.helloText}>HELLO</div>
              <div className={styles.emailText}>@KORE.CO</div>
              
              <form onSubmit={handleSubmit} className={styles.gridForm}>
                <div className={styles.formInputs}>
                  <div className={styles.inputGroup}>
                    <label>NOME</label>
                    <input type="text" />
                  </div>
                  <div className={styles.inputRow}>
                    <div className={styles.inputGroup}>
                      <label>E-MAIL</label>
                      <input type="email" />
                    </div>
                    <div className={styles.inputGroup}>
                      <label>TELEFONE</label>
                      <input type="tel" />
                    </div>
                  </div>
                  <div className={styles.inputGroup}>
                    <label>MENSAGEM</label>
                    <input type="text" />
                  </div>
                  <div className={styles.formFooter}>
                    DSG: PETRIKÓR | DEV: PROGRAMATÓRIO
                  </div>
                </div>
                
                <div className={styles.submitWrapper}>
                  <button type="submit" className={styles.gridSubmitBtn}>
                    ENVIAR
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
