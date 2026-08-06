/**
 * Interface de Cliente / Projeto para o carrossel e páginas de projeto.
 * Todos os campos são opcionais exceto `slug`.
 */
export interface Client {
  /** Identificador único do projeto (obrigatório) */
  slug: string;

  /** Nome do projeto ou cliente */
  name?: string;

  /** Subtítulo do projeto (segunda linha do título) */
  subtitle?: string;

  /** Texto descritivo do projeto */
  description?: string;

  /** Data do projeto (formato livre) */
  date?: string;

  /** Link para a página do projeto (CTA "+ Ver mais") */
  link?: string;

  /** URL da imagem principal (banner hero) */
  mainImage?: string;

  /** Alt text da imagem principal */
  mainImageAlt?: string;

  /** Largura intrínseca da imagem principal em pixels */
  mainImageWidth?: number;

  /** Altura intrínseca da imagem principal em pixels */
  mainImageHeight?: number;

  /** Variante de layout do slide no carrossel: 'big' (banner amplo) ou 'small' (quadro compacto com texto à direita) */
  layoutVariant?: 'big' | 'small' | 'auto';

  /** Texto do ticker marquee infinito */
  marqueeText?: string;

  /** Cor de destaque do slide (background/accent) */
  color?: string;

  /** Cor do texto no slide */
  textColor?: string;

  /** Galeria de imagens adicionais */
  gallery?: string[];

  /** Categoria do projeto (cultura, esporte, etc.) */
  category?: string;

  /** Tags do projeto */
  tags?: string[];
}

/**
 * Limiar de proporção para decidir o layout se layoutVariant for 'auto' ou não especificado.
 * 457 / 606 ≈ 0.754
 * - < ASPECT_RATIO_THRESHOLD → Imagem VERTICAL (Layout 'small': foto esq, desc dir)
 * - >= ASPECT_RATIO_THRESHOLD → Imagem HORIZONTAL (Layout 'big': foto ocupa 60.2%)
 */
export const ASPECT_RATIO_THRESHOLD = 457 / 606; // ≈ 0.7541...

/**
 * Determina se o slide deve usar o layout 'small' (dual-column com texto à direita).
 */
export function isSmallLayout(client: Client): boolean {
  if (client.layoutVariant === 'small') return true;
  if (client.layoutVariant === 'big') return false;
  
  if (client.mainImageWidth && client.mainImageHeight && client.mainImageHeight > 0) {
    return (client.mainImageWidth / client.mainImageHeight) < ASPECT_RATIO_THRESHOLD;
  }
  
  return false;
}

