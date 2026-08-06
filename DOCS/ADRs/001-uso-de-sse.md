# ADR 001: Uso de Server-Sent Events (SSE) para Otimização de Animações e Assets

## Contexto
O site antigo possuía um carregamento e estrutura baseados em transições manuais, que resultavam em múltiplos eventos assíncronos ao mudar de tela, impactando a performance e a experiência de animação (LCP > 1s, múltiplas renderizações). Para o novo site, é exigido um tempo de carregamento inferior a 1s e uma experiência "wow", sem renderizações desnecessárias.

## Decisão
Utilizaremos **Server-Sent Events (SSE)** como canal de comunicação unidirecional do servidor (Next.js App Router) para o cliente. Esse canal emitirá eventos ("PRELOAD_ASSETS", "TRIGGER_TRANSITION", "SECTION_READY") que orquestrarão o pré-carregamento assíncrono de assets e dispararão as animações no cliente. Essa abordagem elimina a necessidade do cliente ficar fazendo polling ou despachar múltiplos eventos de fetch ao servidor.

## Consequências Positivas
- Redução extrema do *waterfall* de requisições de assets críticos.
- Otimização das animações complexas, que só serão iniciadas quando o evento respectivo do SSE for recebido, garantindo que o DOM e as fontes estão carregadas.
- Performance de carregamento < 1 segundo na carga inicial e navegação SPA super rápida.

## Consequências Negativas
- Aumento da complexidade na camada do Next.js (necessidade de manter o connection aberto em rotas Edge/Serverless).
- Requer infraestrutura que suporte conexões SSE abertas sem dar timeout rápido (Vercel ou Node server).
