import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n.jsx';
import { useAuth } from '../auth.jsx';
import { useMouseParallax } from '../hooks/useMouseParallax.js';
import InViewSection from '../components/common/InViewSection.jsx';

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

            <svg className="cat-illustration" viewBox="0 0 420 420" role="img" aria-label="Cartoon cat with a game controller">
              <defs>
                <linearGradient id="fur" x1="0%" x2="100%" y1="0%" y2="100%">
                  <stop offset="0%" stopColor="#fff7ed" />
                  <stop offset="100%" stopColor="#fde68a" />
                </linearGradient>
                <linearGradient id="belly" x1="0%" x2="100%" y1="0%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="100%" stopColor="#fce7f3" />
                </linearGradient>
                <linearGradient id="pad" x1="0%" x2="100%" y1="0%" y2="100%">
                  <stop offset="0%" stopColor="#fb7185" />
                  <stop offset="100%" stopColor="#a855f7" />
                </linearGradient>
              </defs>
              <ellipse cx="210" cy="335" rx="128" ry="42" fill="rgba(244,114,182,0.15)" />
              <g>
                <path d="M114 129 L80 74 L139 89 Z" fill="url(#fur)" stroke="#f59e0b" strokeWidth="4" />
                <path d="M306 129 L341 74 L281 89 Z" fill="url(#fur)" stroke="#f59e0b" strokeWidth="4" />
                <circle cx="210" cy="200" r="108" fill="url(#fur)" stroke="#f59e0b" strokeWidth="5" />
                <ellipse cx="210" cy="247" rx="72" ry="64" fill="url(#belly)" />
                <circle cx="170" cy="196" r="10" fill="#312e81" />
                <circle cx="250" cy="196" r="10" fill="#312e81" />
                <circle cx="166" cy="192" r="3" fill="#fff" />
                <circle cx="246" cy="192" r="3" fill="#fff" />
                <path d="M208 210 C202 218, 196 220, 190 219" fill="none" stroke="#7c2d12" strokeWidth="4" strokeLinecap="round" />
                <path d="M208 210 C214 218, 220 220, 226 219" fill="none" stroke="#7c2d12" strokeWidth="4" strokeLinecap="round" />
                <path d="M198 229 C205 238, 215 238, 222 229" fill="none" stroke="#7c2d12" strokeWidth="4" strokeLinecap="round" />
                <g stroke="#f59e0b" strokeWidth="4" strokeLinecap="round">
                  <path d="M125 197 L71 186" /><path d="M125 215 L70 215" /><path d="M125 233 L71 244" />
                  <path d="M295 197 L349 186" /><path d="M295 215 L350 215" /><path d="M295 233 L349 244" />
                </g>
                <path d="M156 292 C147 268, 144 253, 137 233" fill="none" stroke="#f59e0b" strokeWidth="18" strokeLinecap="round" />
                <path d="M266 292 C275 268, 278 253, 285 233" fill="none" stroke="#f59e0b" strokeWidth="18" strokeLinecap="round" />
                <g className="controller" transform="translate(124 270)">
                  <rect x="0" y="0" width="172" height="78" rx="24" fill="#1f2937" />
                  <rect x="10" y="10" width="152" height="58" rx="18" fill="#374151" />
                  <circle cx="52" cy="39" r="16" fill="#9ca3af" />
                  <circle cx="52" cy="39" r="6" fill="#4b5563" />
                  <circle cx="122" cy="28" r="8" fill="#fb7185" />
                  <circle cx="139" cy="39" r="8" fill="#60a5fa" />
                  <circle cx="122" cy="50" r="8" fill="#34d399" />
                  <circle cx="105" cy="39" r="8" fill="#fbbf24" />
                  <rect x="71" y="18" width="12" height="24" rx="4" fill="url(#pad)" />
                  <rect x="66" y="23" width="22" height="12" rx="4" fill="url(#pad)" />
                  <circle cx="26" cy="28" r="7" fill="#111827" />
                  <circle cx="146" cy="55" r="7" fill="#111827" />
                </g>
              </g>
            </svg>

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
