
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import styles from './index.module.css';

const cards = [
  {
    title: 'Get Started',
    text: 'Install the interpreter, run programs, and understand package roots.',
    to: '/docs/getting-started/installation-and-running',
  },
  {
    title: 'Language',
    text: 'Execution model, types, syntax, collections, nullability, and autoflow.',
    to: '/docs/language/language-overview',
  },
  {
    title: 'Hya & HYX',
    text: 'Server-first UI, routing, component patterns, and fine-grained rendering milestones.',
    to: '/docs/hya/hya-overview',
  },
  {
    title: 'Packages',
    text: 'Explore the official package ecosystem and per-package surface maps.',
    to: '/docs/packages/overview',
  },
  {
    title: 'Tooling',
    text: 'LSP, testing strategy, diagnostics, traces, and developer workflows.',
    to: '/docs/tooling/lsp',
  },
  {
    title: 'Internals',
    text: 'Architecture, roadmap, and long-horizon implementation plans.',
    to: '/docs/internals/architecture',
  },
];

export default function Home(): JSX.Element {
  return (
    <Layout title="Detian Wiki" description="Detailed English documentation for the Detian language and Hya ecosystem">
      <header className={styles.heroBanner}>
        <div className="container">
          <h1 className={styles.heroTitle}>Detian Wiki</h1>
          <p className={styles.heroSubtitle}>
            A detailed English knowledge base for the Detian language, runtime, package ecosystem, and Hya framework.
          </p>
          <div className={styles.heroActions}>
            <Link className="button button--primary button--lg" to="/docs/intro">Open the docs</Link>
            <Link className="button button--secondary button--lg" to="/docs/hya/fine-grained-reactivity">Fine-grained Hya</Link>
          </div>
        </div>
      </header>
      <main className="container margin-vert--lg">
        <section className={styles.grid}>
          {cards.map((card) => (
            <Link key={card.title} to={card.to} className={clsx('card', styles.card)}>
              <div className="card__body">
                <h2>{card.title}</h2>
                <p>{card.text}</p>
              </div>
            </Link>
          ))}
        </section>
      </main>
    </Layout>
  );
}
