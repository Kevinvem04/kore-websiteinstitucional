import { Link } from 'next-view-transitions';

export default function LadoB() {
  return (
    <main className="page-transition" style={{ padding: '4rem 2rem' }}>
      <Link href="/" style={{ color: '#fff', textDecoration: 'none', opacity: 0.5, marginBottom: '2rem', display: 'block', textTransform: 'uppercase', fontSize: '0.85rem' }}>
        ← VOLTAR PARA HOME
      </Link>
      <h1>Lado B</h1>
    </main>
  );
}
