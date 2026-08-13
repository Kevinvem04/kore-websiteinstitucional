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
          <p>O mercado de comunicação está cheio de ruídos. Nós viemos para trazer clareza.</p>
          <br/>
          <p>A KORE é uma agência de comunicação que atua no ecossistema 360°, mas com um diferencial crucial: calibramos a entrega para o tamanho exato da sua necessidade. Nem mais, nem menos. O equilíbrio perfeito entre estratégia e execução.</p>
        </article>

        {/* Imagem Logo (Substitui a imagem roxa) */}
        <div className={`${styles.galleryItem} ${styles.imageWrapper} ${styles.logoBg}`}>
          <img src="/images/sobre/logo-kore-transparent.png" alt="Logo KORE" className={styles.logoImage} />
        </div>

        {/* Bloco de Texto 2 - O que entregamos */}
        <article className={`${styles.galleryItem} ${styles.galleryText}`}>
          <p><strong>O que entregamos:</strong></p>
          <ul className={styles.bulletList}>
            <li><strong>Estratégia, Criação & Inteligência de Mídia:</strong> Planejamento assertivo para fazer o seu investimento render onde importa.</li>
            <li><strong>Criação & Produção de excelência:</strong> Conteúdo e campanhas que comunicam com impacto e verdade.</li>
            <li><strong>Formatos Flexíveis:</strong> Atendimento personalizado para empresas privadas, órgãos públicos e suporte especializado para agências e marcas com operação In-House.</li>
          </ul>
        </article>
        
        {/* CTA */}
        <article className={`${styles.galleryItem} ${styles.galleryText}`}>
          <p>Se você busca a competência central e o coração estratégico para a sua marca, você encontrou a KORE.</p>
        </article>

      </div>
    </main>
  );
}
