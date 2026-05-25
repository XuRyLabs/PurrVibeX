import { useState } from 'react';
import { useLanguage } from '../i18n';
import InViewSection from '../components/common/InViewSection.jsx';
import './pages.css';

export default function Rooms() {
  const { strings } = useLanguage();
  const roomsText = strings.rooms;
  const [filter, setFilter] = useState('all');

  const filters = ['all', 'live', 'chill'];
  const rooms = roomsText.list.filter((r) => filter === 'all' || (filter === 'live' ? r.live : !r.live));

  return (
    <div className="page-shell route-screen">
      <div className="page-wrap page-header">
        <div className="page-header-inner">
          <div>
            <h1>{roomsText.title}</h1>
            <p>{roomsText.subtitle}</p>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {filters.map((f) => (
              <button
                key={f}
                className={`gallery-filter${filter === f ? ' active' : ''}`}
                onClick={() => setFilter(f)}
              >
                {roomsText.filters[f]}
              </button>
            ))}
          </div>
        </div>
      </div>

      <InViewSection className="page-wrap" style={{ paddingBottom: 48 }}>
        <div className="rooms-grid">
          {rooms.map((room, i) => (
            <InViewSection key={`${room.title}-${i}`} delay={i * 60}>
              <div className="room-card" role="button" tabIndex={0}>
                <div className={`room-card-badge${room.live ? ' live' : ''}`}>
                  {room.live ? roomsText.liveLabel : roomsText.chillLabel} · {room.tag}
                </div>
                <h3>{room.title}</h3>
                <p>{room.desc}</p>
                <div className="room-card-meta">
                  <div className="room-avatars">
                    {room.members.map((m, j) => (
                      <div key={`${room.title}-${j}`} className="room-avatar-dot">
                        {m}
                      </div>
                    ))}
                  </div>
                  <span className="room-count">
                    {room.count} {roomsText.inRoom}
                  </span>
                </div>
              </div>
            </InViewSection>
          ))}
        </div>
      </InViewSection>
    </div>
  );
}
