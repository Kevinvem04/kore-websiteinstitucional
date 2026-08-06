---
name: Next.js e React Best Practices
description: Regras e melhores práticas de Next.js e React extraídas do mercado (skills.sh / Rocketseat)
---

# Next.js & React Best Practices

Quando desenvolver componentes ou páginas no ecossistema Next.js, aplique rigidamente as seguintes boas práticas de mercado para garantir alta performance e um código limpo:

## 1. Evitar Estado Derivado Desnecessário
Não crie estados (`useState`) ou `useEffect` apenas para espelhar dados que já podem ser calculados diretamente no render. 
- **Incorreto:** Usar `useEffect` para filtrar uma lista toda vez que o valor de busca muda e salvar no estado.
- **Correto:** Calcular o filtro diretamente no corpo do componente (ou com `useMemo` se for muito pesado).

## 2. Padrão de Composição (Composition Pattern)
Sempre prefira o padrão de composição de componentes em vez de componentes gigantescos inflados de *props* (`if`/`else` infernais).
- Ao invés de: `<Card isHoverable={true} showButton={false} type="primary" />`
- Prefira: 
```tsx
<Card.Root>
  <Card.Image />
  <Card.Content />
  <Card.Actions>
    <Button />
  </Card.Actions>
</Card.Root>
```
Isso ajuda a injetar o componente no layout (como no caso do Asia XP) sem prender a UI a lógicas inflexíveis.

## 3. Suspense Boundaries Eficientes
Em Next.js com App Router, não trave a página inteira esperando dados secundários.
- Isole requisições de dados em componentes assíncronos e envolva-os em um `<Suspense fallback={<Skeleton />}>` para que o resto da página carregue instantaneamente.
- Em *Server Components*, busque os dados o mais próximo de onde são utilizados.

## 4. Dynamic Imports (Code Splitting)
Para componentes pesados que não são exibidos logo na primeira dobra da tela (ou animações muito complexas que só rodam depois do mount), utilize imports dinâmicos do Next.js para melhorar a métrica de LCP.
- Exemplo: `const AnimatedMenu = dynamic(() => import('./AnimatedMenu'))`

## 5. React Cache para Performance
Para Server Components que buscam a mesma informação repetidamente em vários locais da árvore, utilize a função `cache()` do React para deduzir chamadas duplicadas no lado do servidor.
