import InViewSection from '../components/common/InViewSection.jsx';
import { useAuth } from '../auth.jsx';
import { useLanguage } from '../i18n';
import './pages.css';


export default function Leaderboard() {
  const { userProfile } = useAuth();
  const { strings } = useLanguage();
  const board = strings.leaderboard;

  return (
    <div className="page-shell route-screen">
      <div className="page-wrap page-header">
        <div className="page-header-inner">
          <div>
            <h1>{board.title}</h1>
            <p>{board.subtitle}</p>
          </div>
          <span className="shop-points-bar">🐾 4,720 {board.pointsLabel}</span>
        </div>
      </div>

      <div className="page-wrap" style={{ paddingBottom: 48 }}>
        <InViewSection>
          <div className="leaderboard-podium">
            {board.top3.map((p, i) => (
              <InViewSection key={p.rank} delay={i * 80}>
                <div className={`podium-card rank-${p.rank}`}>
                  {p.rank === 1 && <div className="podium-crown">👑</div>}
                  <div className="podium-avatar">{p.emoji}</div>
                  <div className="podium-name">{p.name}</div>
                  <div className="podium-score">
                    {p.score.toLocaleString()} {board.pointsLabel}
                  </div>
                  <div className="podium-rank-badge">#{p.rank}</div>
                </div>
              </InViewSection>
            ))}
          </div>
        </InViewSection>

        <InViewSection delay={120}>
          <div className="leaderboard-list">
            {board.list.map((row) => (
              <div key={row.rank} className={`leaderboard-row${row.me ? ' me' : ''}`}>
                <span className="lb-rank">#{row.rank}</span>
                <div className="lb-avatar">{row.emoji}</div>
                <div>
                  <div className="lb-name">{row.me && userProfile ? userProfile.displayName : row.name}</div>
                  <div className="lb-sub">{row.me ? board.youLabel : board.memberLabel}</div>
                </div>
                <span className="lb-score">
                  {row.score.toLocaleString()} {board.pointsLabel}
                </span>
              </div>
            ))}
          </div>
        </InViewSection>
      </div>
    </div>
  );
}
