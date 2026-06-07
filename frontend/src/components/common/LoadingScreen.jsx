import { useLanguage } from '../../i18n';
import './LoadingScreen.css';

export default function LoadingScreen() {
  const { strings } = useLanguage();
  const loader = strings.loader;

  return (
    <div className="loader-shell" role="status" aria-label={loader.aria}>
      <div className="loader-stage">
        {/* ─── Glow blob ─── */}
        <div className="loader-glow" />

        {/* ─── Cat SVG ─── */}
        <svg
          className="loader-cat"
          viewBox="0 0 220 260"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="lc-fur" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fff7ed" />
              <stop offset="100%" stopColor="#fde68a" />
            </linearGradient>
            <linearGradient id="lc-belly" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#fce7f3" />
            </linearGradient>
          </defs>

          {/* shadow */}
          <ellipse cx="110" cy="245" rx="66" ry="14" fill="rgba(244,114,182,0.18)" />

          {/* ears */}
          <path className="loader-ear-left"  d="M62 76 L44 38 L84 58 Z" fill="url(#lc-fur)" stroke="#f59e0b" strokeWidth="3" />
          <path className="loader-ear-right" d="M158 76 L176 38 L136 58 Z" fill="url(#lc-fur)" stroke="#f59e0b" strokeWidth="3" />

          {/* body */}
          <ellipse cx="110" cy="185" rx="56" ry="60" fill="url(#lc-fur)" stroke="#f59e0b" strokeWidth="3" />
          <ellipse cx="110" cy="200" rx="34" ry="40" fill="url(#lc-belly)" />

          {/* head */}
          <circle cx="110" cy="110" r="62" fill="url(#lc-fur)" stroke="#f59e0b" strokeWidth="3.5" />
          <ellipse cx="110" cy="130" rx="38" ry="32" fill="url(#lc-belly)" />

          {/* eyes - closed blinking */}
          <g className="loader-eyes-open">
            <circle cx="88"  cy="106" r="9" fill="#312e81" />
            <circle cx="132" cy="106" r="9" fill="#312e81" />
            <circle cx="85"  cy="103" r="3" fill="#fff" />
            <circle cx="129" cy="103" r="3" fill="#fff" />
          </g>
          <g className="loader-eyes-blink">
            <path d="M80 106 Q88 99 96 106"  fill="none" stroke="#312e81" strokeWidth="3" strokeLinecap="round" />
            <path d="M124 106 Q132 99 140 106" fill="none" stroke="#312e81" strokeWidth="3" strokeLinecap="round" />
          </g>

          {/* nose + mouth */}
          <ellipse cx="110" cy="118" rx="5" ry="3.5" fill="#fb7185" />
          <path d="M106 122 Q110 128 114 122" fill="none" stroke="#7c2d12" strokeWidth="2.5" strokeLinecap="round" />

          {/* whiskers */}
          <g stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" opacity="0.7">
            <line x1="52"  y1="110" x2="84"  y2="114" />
            <line x1="52"  y1="120" x2="83"  y2="119" />
            <line x1="138" y1="114" x2="168" y2="110" />
            <line x1="137" y1="119" x2="168" y2="120" />
          </g>

          {/* paws */}
          <ellipse cx="78"  cy="238" rx="20" ry="12" fill="url(#lc-fur)" stroke="#f59e0b" strokeWidth="2.5" />
          <ellipse cx="142" cy="238" rx="20" ry="12" fill="url(#lc-fur)" stroke="#f59e0b" strokeWidth="2.5" />

          {/* tail */}
          <path
            className="loader-tail"
            d="M160 220 Q200 200 192 168 Q184 140 166 152"
            fill="none"
            stroke="#f59e0b"
            strokeWidth="14"
            strokeLinecap="round"
          />
        </svg>

        {/* ─── Dots ─── */}
        <div className="loader-dots" aria-hidden="true">
          <span /><span /><span />
        </div>

        <p className="loader-label">{loader.label}</p>
      </div>
    </div>
  );
}
