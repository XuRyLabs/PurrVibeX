import { useState } from 'react';
import { useLanguage } from '../i18n';
import InViewSection from '../components/common/InViewSection.jsx';
import './pages.css';

const MY_POINTS = 4720;

export default function Shop() {
  const { strings } = useLanguage();
  const shop = strings.shop;
  const [cat, setCat] = useState('all');
  const [buying, setBuying] = useState(null);

  const items = shop.items.filter((i) => cat === 'all' || i.cat === cat);

  const handleBuy = (id) => {
    setBuying(id);
    setTimeout(() => setBuying(null), 1200);
  };

  return (
    <div className="page-shell route-screen">
      <div className="page-wrap page-header">
        <div className="page-header-inner">
          <div>
            <h1>{shop.title}</h1>
            <p>{shop.subtitle}</p>
          </div>
          <span className="shop-points-bar">
            🐾 {MY_POINTS.toLocaleString()} {shop.pointsLabel}
          </span>
        </div>
      </div>

      <div className="page-wrap" style={{ paddingBottom: 48 }}>
        <div className="shop-categories">
          {shop.categories.map((c) => (
            <button
              key={c.id}
              className={`shop-cat-btn${cat === c.id ? ' active' : ''}`}
              onClick={() => setCat(c.id)}
            >
              {c.label}
            </button>
          ))}
        </div>

        <InViewSection>
          <div className="shop-grid">
            {items.map((item, i) => (
              <InViewSection key={`${item.name}-${i}`} delay={i * 60}>
                <div className="shop-item-card">
                  <div className="shop-item-thumb">
                    {item.emoji}
                    {item.isNew && <span className="shop-item-new">{shop.newLabel}</span>}
                  </div>
                  <div className="shop-item-info">
                    <h3>{item.name}</h3>
                    <p>{item.desc}</p>
                    <div className="shop-item-footer">
                      <span className="shop-price">🐾 {item.price.toLocaleString()}</span>
                      {item.owned ? (
                        <span style={{ fontSize: '0.8rem', color: '#34d399', fontWeight: 700 }}>
                          {shop.ownedLabel}
                        </span>
                      ) : (
                        <button
                          className="shop-buy-btn"
                          disabled={MY_POINTS < item.price || buying === item.name}
                          onClick={() => handleBuy(item.name)}
                        >
                          {buying === item.name ? shop.done : shop.getIt}
                        </button>
                      )}
                    </div>
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
