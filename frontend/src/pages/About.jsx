import { useLanguage } from '../i18n.jsx';

export default function About() {
  const { strings } = useLanguage();
  const about = strings.about;

  return (
    <div className="page-shell route-screen">
      <section className="page-wrap page-placeholder">
        <h2>{about.title}</h2>
        <p>{about.intro}</p>
      </section>

      <section className="page-wrap info-grid">
        {about.cards.map((card) => (
          <article key={card.title} className="info-card">
            <strong>{card.title}</strong>
            <p>{card.text}</p>
          </article>
        ))}
      </section>
    </div>
  );
}

