# Memórias e Regras Globais do Projeto Asia XP

## Regras de Código (Web App)
1. **Performance em 1º Lugar:** O carregamento inicial não deve exceder 1 segundo. Sempre utilize Caching nativo e estratégias de *lazy loading* / *pre-fetching*.
2. **Vanilla CSS Modules:** Para garantir a máxima flexibilidade nas transições complexas, utilizar Vanilla CSS Modules (`.module.css`).
3. **Animações (Wow Factor):** O design deve impressionar. Micro-interações em hovers, transições fluidas entre páginas e estado "alive" devem ser o padrão da UI.
4. **Sem Múltiplos Eventos de Fetch:** Para atualizações em tempo real ou orquestração de carregamento sob demanda, utilize **Server-Sent Events (SSE)** em rotas de API do Next.js App Router em vez de websockets complexos ou client-polling constante.
