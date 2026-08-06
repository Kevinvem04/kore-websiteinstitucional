---
name: Frontend Animations with SSE
description: Como implementar e orquestrar animações sofisticadas usando Server-Sent Events (SSE) no Next.js
---

# Frontend Animations with SSE

Ao construir transições de página ou carrosséis animados no site Asia XP, siga este fluxo:

1. **Escute ao Evento SSE:**
   Crie um hook personalizado `useSSE(url: string)` que escuta um endpoint de eventos, como `/api/events`.

2. **Gatilhos Condicionais:**
   Em vez de iniciar a animação no `useEffect` de mount (que pode causar stutters ou FOUC), inicie as animações pesadas (ex: GSAP, Framer Motion) apenas quando o evento `SECTION_READY` ou `START_ANIMATION` for recebido pelo hook SSE.

3. **CSS Modules:**
   Mantenha a base da estilização em `.module.css`. Caso utilize Framer Motion, misture `className` das classes CSS puras com o prop `variants` ou `animate`.
