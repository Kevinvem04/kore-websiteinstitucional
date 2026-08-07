import styles from './Sobre.module.css';

export const metadata = {
  title: 'Quem Somos - Kore',
  description: 'Antes da forma, a ideia. Antes da comunicação, a estratégia.',
};

export default function Sobre() {
  return (
    <main className={`page-transition ${styles.container}`}>
      {/* Cabeçalho */}
      <div className={styles.header}>
        <h1 className={styles.title}>QUEM SOMOS</h1>
        <p className={styles.subtitle}>
          ANTES DA FORMA, A IDEIA. ANTES DA COMUNICAÇÃO, A ESTRATÉGIA.
        </p>
      </div>

      <div className={styles.masonryGallery}>
        
        {/* Imagem do Fundador (Prioridade #1) */}
        <div className={`${styles.galleryItem} ${styles.imageWrapper}`}>
          <img src="/images/sobre/fundador.webp" alt="Rafa Correia - Sócio Fundador KORE" className={styles.image} />
        </div>

        {/* Bloco de Texto 1 */}
        <article className={`${styles.galleryItem} ${styles.galleryText}`}>
          <p>KORE vem de <em>core</em>: núcleo, essência. A competência central e o motivo real da sua empresa existir.</p>
          <br/>
          <p>O mercado está cheio de ruído. Nós trabalhamos a ideia antes dela virar forma: mergulhamos no core da marca para construir estratégia e comunicação com direção — não decoração.</p>
        </article>

        {/* Bloco de Texto 2 */}
        <article className={`${styles.galleryItem} ${styles.galleryText}`}>
          <p>Atuamos no ecossistema 360°, mas calibramos a entrega para o tamanho exato da sua necessidade. O equilíbrio perfeito entre estratégia e execução.</p>
          <br/>
          <p>Não criamos apenas o que aparece. <strong>Criamos o que sustenta.</strong></p>
        </article>
        
        {/* Nova Imagem Adicionada */}
        <div className={`${styles.galleryItem} ${styles.imageWrapper}`}>
          <img src="/images/sobre/sobre-2.webp" alt="Kore Cultura" className={styles.image} />
        </div>

        {/* Bloco de Texto 3 - O que entregamos */}
        <article className={`${styles.galleryItem} ${styles.galleryText}`}>
          <p><strong>O que entregamos:</strong></p>
          <p>Estratégia, criação e inteligência de mídia. Produção de excelência com impacto e verdade.</p>
          <br/>
          <p>Formatos flexíveis para empresas privadas, órgãos públicos e suporte especializado in-house.</p>
        </article>
        
        {/* Logo Block (Simulating Image) */}
        <div className={`${styles.galleryItem} ${styles.logoBlock}`}>
          <span className={styles.logoText}>KORE</span>
        </div>
        
        {/* CTA */}
        <article className={`${styles.galleryItem} ${styles.galleryText}`}>
          <p>Se você busca a competência central e o coração estratégico para sua marca, encontrou a KORE.</p>
        </article>

      </div>
    </main>
  );
}
