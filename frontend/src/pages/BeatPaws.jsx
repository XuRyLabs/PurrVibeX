import { useState } from 'react';
import { useLanguage } from '../i18n';
import InViewSection from '../components/common/InViewSection.jsx';
import './pages.css';


export default function MusicRoom() {
  const { strings } = useLanguage();
  const music = strings.music;
  const [playing, setPlaying] = useState(false);
  const [progress] = useState(38);

  return (
    <div className="page-shell route-screen">
      <div className="page-wrap page-header">
        <div className="page-header-inner">
          <div>
            <h1>{music.title}</h1>
            <p>{music.subtitle}</p>
          </div>
          <span className={`room-card-badge${playing ? ' live' : ''}`}>
            {playing ? music.live : music.paused}
          </span>
        </div>
      </div>

      <div className="page-wrap" style={{ paddingBottom: 48 }}>
        <InViewSection>
          <div className="music-layout">
            <div className="music-player-card">
              <div className={`music-artwork${playing ? ' playing' : ''}`}>🎵</div>

              <div className="music-track-info">
                <h2>{music.queue[0].track}</h2>
                <p>{music.queue[0].artist}</p>
              </div>

              <div className="music-progress">
                <time>{music.currentTime}</time>
                <div className="music-progress-bar">
                  <div className="music-progress-fill" style={{ width: `${progress}%` }} />
                </div>
                <time>{music.totalTime}</time>
              </div>

              <div className="music-controls">
                <button className="music-ctrl-btn" aria-label={music.previous} title={music.previous}>⏮</button>
                <button className="music-ctrl-btn" aria-label={music.shuffle} title={music.shuffle}>🔀</button>
                <button
                  className="music-ctrl-btn play"
                  aria-label={playing ? music.pause : music.play}
                  onClick={() => setPlaying((p) => !p)}
                >
                  {playing ? '⏸' : '▶'}
                </button>
                <button className="music-ctrl-btn" aria-label={music.repeat} title={music.repeat}>🔁</button>
                <button className="music-ctrl-btn" aria-label={music.next} title={music.next}>⏭</button>
              </div>
            </div>

            <div className="music-queue-panel">
              <h3>{music.upNext}</h3>
              <div className="queue-list">
                {music.queue.map((q, i) => (
                  <div key={`${q.track}-${i}`} className={`queue-item${q.active ? ' active' : ''}`}>
                    <div className="queue-thumb">{q.emoji}</div>
                    <div>
                      <div className="queue-track">{q.track}</div>
                      <div className="queue-artist">{q.artist}</div>
                    </div>
                    <span className="queue-dur">{q.dur}</span>
                  </div>
                ))}
              </div>

              <button className="btn btn-secondary" style={{ width: '100%', marginTop: 14, fontSize: '0.88rem' }}>
                {music.addToQueue}
              </button>
            </div>
          </div>
        </InViewSection>
      </div>
    </div>
  );
}
