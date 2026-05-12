import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n.jsx';
import { useAuth } from '../auth.jsx';
import { useMouseParallax } from '../hooks/useMouseParallax.js';
import InViewSection from '../components/common/InViewSection.jsx';
import catControllerImg from '../assets/home/cat-controller.png';

function StatPill({ children }) {
  return <span className="stat-pill">{children}</span>;
}

function QuickLinkCard({ item, to, accentClass }) {
  return (
    <Link to={to} className={`quick-link-card ${accentClass}`}>
      <div className="quick-link-art" aria-hidden="true">
        <span className="quick-link-icon">{item.icon}</span>
        <span className="quick-link-spark spark-1">✦</span>
        <span className="quick-link-spark spark-2">✧</span>
        <span className="quick-link-spark spark-3">✦</span>
      </div>
      <div className="quick-link-copy">
        <h3>{item.title}</h3>
        <p>{item.description}</p>
      </div>
      <span className="quick-link-arrow">→</span>
    </Link>
  );
}

function TestimonialCard({ item }) {
  return (
    <article className="testimonial-card">
      <div className="testimonial-top">
        <div className="testimonial-avatar">{item.avatar}</div>
        <div>
          <strong>{item.name}</strong>
          <div>{item.role}</div>
        </div>
        <div className="testimonial-stars" aria-hidden="true">
          ★★★★★
        </div>
      </div>
      <p>"{item.quote}"</p>
    </article>
  );
}

export default function Home() {
  const { strings, lang, toggleLang } = useLanguage();
  const { user } = useAuth();
  const home = strings.home;
  const featureIcons = ['🐾', '🎧', '🧶', '🎀'];

  const parallax = useMouseParallax(12);

  return (
    <div className="page-shell home-page">
      {/* ─── HERO ─── */}
      <section
        className="page-wrap hero"
        onMouseMove={parallax.onMouseMove}
        onMouseLeave={parallax.onMouseLeave}
      >
        <div className="hero-copy">
          <h1>
            {home.titleLead} <span>{home.titleHighlight}</span>.
          </h1>
          <p>{home.intro}</p>

          {user && (
            <div className="hero-actions">
              <Link className="btn btn-primary" to="/purrlounge">{home.primary}</Link>
              <Link className="btn btn-secondary" to="/mewseum">{home.secondary}</Link>
            </div>
          )}

          <div className="hero-badges" aria-label="Feature highlights">
            {home.badgeRow.map((label) => (
              <StatPill key={label}>{label}</StatPill>
            ))}
          </div>

          <div className="hero-blurb">
            <h2>{home.heroTitle}</h2>
            <p>{home.heroSubtitle}</p>
          </div>
        </div>

        {/* cat-stage gets the parallax ref */}
        <div
          className="cat-stage"
          ref={parallax.ref}
          aria-label="Cartoon cat holding a game controller"
        >
          <div className="cat-glow" />
          <div className="cat-card">
            <div className="sparkles" aria-hidden="true">
              <span>✦</span><span>✧</span><span>✦</span><span>✧</span>
            </div>

            <div className="cat-card-head">
              <span className="cat-live-dot" />
              <span>{home.reelTitle}</span>
            </div>

            <img
              src={catControllerImg}
              alt="Cartoon cat with a game controller"
              className="cat-illustration"
            />

            <div className="reel-strip" aria-hidden="true">
              {home.reelLabels.map((label, index) => (
                <div key={label} className={`reel-frame reel-frame-${index + 1}`}>
                  <span>{featureIcons[index]}</span>
                  <small>{label}</small>
                </div>
              ))}
            </div>
          </div>

          <div className="cat-mini-card cat-mini-card-left">
            <div className="mini-bubble">🐟</div>
            <div>
              <strong>{home.loopingMotionTitle}</strong>
              <p>{home.reelSubtitle}</p>
            </div>
          </div>

          <div className="cat-mini-card cat-mini-card-right">
            <div className="mini-bubble">✨</div>
            <div>
              <strong>{home.softTransitionsTitle}</strong>
              <p>{home.heroNotes[0]}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FEATURES ─── */}
      <InViewSection className="page-wrap content-section">
        <div className="section-title fancy-title">
          <div>
            <h2>{home.featureTitle}</h2>
            <p>{home.featureSubtitle}</p>
          </div>
        </div>
        <div className="feature-strip feature-strip-rich">
          {home.highlights.map((item, index) => (
            <InViewSection key={item.title} delay={index * 80}>
              <article className="feature-card feature-card-playful">
                <div className="feature-icon-row">
                  <span className="feature-icon">{featureIcons[index]}</span>
                  <span className="feature-icon-float">{index === 1 ? '🎶' : index === 2 ? '😺' : '💖'}</span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            </InViewSection>
          ))}
        </div>
      </InViewSection>

      {/* ─── TESTIMONIALS ─── */}
      <InViewSection className="page-wrap content-section" delay={80}>
        <div className="section-title fancy-title">
          <div>
            <h2>{home.proofTitle}</h2>
            <p>{home.proofSubtitle}</p>
          </div>
        </div>
        <div className="testimonial-grid">
          {home.testimonials.slice(0, 2).map((item, index) => (
            <InViewSection key={item.name} delay={index * 100}>
              <TestimonialCard item={item} />
            </InViewSection>
          ))}
        </div>
      </InViewSection>

      {/* ─── FOOTER CARD ─── */}
      <InViewSection className="page-wrap footer-card" delay={40}>
        <div>
          <strong>{home.footerTitle}</strong>
          <p>{home.footerText}</p>
        </div>
        <div className="footer-sticker">🐾🌸😺</div>
      </InViewSection>
    </div>
  );
}
