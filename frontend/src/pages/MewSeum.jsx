import { useState } from 'react';
import { useLanguage } from '../i18n';
import InViewSection from '../components/common/InViewSection.jsx';
import './pages.css';

export default function Gallery() {
  const { strings } = useLanguage();
  const gallery = strings.gallery;
  const [active, setActive] = useState(gallery.tags[0]);

  return (
    <div className="page-shell route-screen">
      <div className="page-wrap page-header">
        <div className="page-header-inner">
          <div>
            <h1>{gallery.title}</h1>
            <p>{gallery.subtitle}</p>
          </div>
          <button className="btn btn-primary" style={{ fontSize: '0.88rem' }}>
            {gallery.shareButton}
          </button>
        </div>
      </div>

      <div className="page-wrap">
        <div className="gallery-filter-row">
          {gallery.tags.map((t) => (
            <button
              key={t}
              className={`gallery-filter${active === t ? ' active' : ''}`}
              onClick={() => setActive(t)}
            >
              {t}
            </button>
          ))}
        </div>

        <InViewSection>
          <div className="gallery-masonry">
            {gallery.photos.map((p, i) => (
              <InViewSection key={`${p.name}-${i}`} delay={i * 50}>
                <div className="gallery-item">
                  <div className="gallery-item-thumb">{p.emoji}</div>
                  <div className="gallery-item-info">
                    <strong>{p.name}</strong>
                    <span>{p.user}</span>
                    <div className="gallery-item-likes">❤️ {p.likes}</div>
                  </div>
                </div>
              </InViewSection>
            ))}
          </div>
        </InViewSection>
      </div>
    </div>
  );
}
