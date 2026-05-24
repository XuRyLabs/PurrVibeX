import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import './DatePicker.css';

// ── Locale data ──────────────────────────────────────────────────────────────
const MONTHS = {
  en: ['January','February','March','April','May','June','July','August','September','October','November','December'],
  vi: ['Tháng 1','Tháng 2','Tháng 3','Tháng 4','Tháng 5','Tháng 6','Tháng 7','Tháng 8','Tháng 9','Tháng 10','Tháng 11','Tháng 12'],
};
const MONTHS_SHORT = {
  en: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
  vi: ['T1','T2','T3','T4','T5','T6','T7','T8','T9','T10','T11','T12'],
};
const DAYS = {
  en: ['Mo','Tu','We','Th','Fr','Sa','Su'],
  vi: ['T2','T3','T4','T5','T6','T7','CN'],
};

// ── Helpers ───────────────────────────────────────────────────────────────────
function daysInMonth(y, m) { return new Date(y, m + 1, 0).getDate(); }
// Returns 0=Mon … 6=Sun offset for the first cell
function firstOffset(y, m) { const d = new Date(y, m, 1).getDay(); return d === 0 ? 6 : d - 1; }
function toISO(y, m, d) {
  return `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
}
function parseISO(str) {
  if (!str) return null;
  const s = String(str).substring(0, 10);
  const [y, m, d] = s.split('-').map(Number);
  if (!y || !m || !d) return null;
  return { year: y, month: m - 1, day: d };
}
function formatDisplay(parsed, locale) {
  if (!parsed) return '';
  const { year, month, day } = parsed;
  const mm = String(month + 1).padStart(2, '0');
  const dd = String(day).padStart(2, '0');
  return locale === 'vi' ? `${dd}/${mm}/${year}` : `${mm}/${dd}/${year}`;
}

// ── DatePicker ───────────────────────────────────────────────────��────────────
export function DatePicker({
  value,
  onChange,
  max,
  placeholder,
  locale = 'en',
  disabled = false,
}) {
  const loc = MONTHS[locale] ? locale : 'en';
  const parsed   = parseISO(value);
  const maxParsed = parseISO(max);

  const today = new Date();
  const todayISO = toISO(today.getFullYear(), today.getMonth(), today.getDate());

  // ── State ──────────────────────────────────────────────────────────────────
  const [open, setOpen]   = useState(false);
  const [view, setView]   = useState('day');          // 'day' | 'month' | 'year'
  const [cursor, setCursor] = useState(() => ({
    year:  parsed?.year  ?? today.getFullYear(),
    month: parsed?.month ?? today.getMonth(),
  }));
  const [yearBase, setYearBase] = useState(
    () => Math.floor((parsed?.year ?? today.getFullYear()) / 12) * 12
  );

  const wrapRef    = useRef(null);
  const triggerRef = useRef(null);
  const [dropPos, setDropPos] = useState({ top: 0, left: 0, width: 0 });

  // Recalculate dropdown position whenever it opens or window scrolls/resizes
  useEffect(() => {
    if (!open || !triggerRef.current) return;

    const update = () => {
      const r = triggerRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - r.bottom;
      const dropH = 340; // approx dropdown height

      setDropPos({
        width: r.width,
        left:  r.left + window.scrollX,
        // open upward if not enough space below
        ...(spaceBelow < dropH
          ? { top: r.top  + window.scrollY - dropH - 6, openUp: true }
          : { top: r.bottom + window.scrollY + 6,       openUp: false }),
      });
    };

    update();
    window.addEventListener('scroll', update, true);
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update, true);
      window.removeEventListener('resize', update);
    };
  }, [open]);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const h = (e) => {
      // wrapRef covers the trigger; the portal div is outside, so check data attr
      if (
        wrapRef.current && !wrapRef.current.contains(e.target) &&
        !e.target.closest('[data-dp-portal]')
      ) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, [open]);

  // Sync cursor when value changes externally
  useEffect(() => {
    if (parsed) {
      setCursor({ year: parsed.year, month: parsed.month });
      setYearBase(Math.floor(parsed.year / 12) * 12);
    }
  }, [value]);

  // ── Handlers ───────────────────────────────────────────────────────────────
  const openPicker = () => {
    if (disabled) return;
    if (parsed) {
      setCursor({ year: parsed.year, month: parsed.month });
      setYearBase(Math.floor(parsed.year / 12) * 12);
    }
    setView('day');
    setOpen(true);
  };

  const selectDay = (y, m, d) => {
    const iso = toISO(y, m, d);
    if (maxParsed && iso > max) return;
    onChange(iso);
    setOpen(false);
  };

  const moveCursorMonth = (delta) => {
    setCursor(c => {
      let m = c.month + delta;
      let y = c.year;
      if (m > 11) { m -= 12; y++; }
      if (m < 0)  { m += 12; y--; }
      return { year: y, month: m };
    });
  };

  // ── Day grid ───────────────────────────────────────────────────────────────
  const buildCells = () => {
    const { year, month } = cursor;
    const offset = firstOffset(year, month);
    const count  = daysInMonth(year, month);
    const cells  = [];
    const prevM  = month === 0 ? 11 : month - 1;
    const prevY  = month === 0 ? year - 1 : year;
    const nextM  = month === 11 ? 0 : month + 1;
    const nextY  = month === 11 ? year + 1 : year;
    const prevCount = daysInMonth(prevY, prevM);

    for (let i = offset - 1; i >= 0; i--)
      cells.push({ y: prevY, m: prevM, d: prevCount - i, outside: true });
    for (let d = 1; d <= count; d++)
      cells.push({ y: year, m: month, d, outside: false });
    while (cells.length < 42)
      cells.push({ y: nextY, m: nextM, d: cells.length - offset - count + 1, outside: true });
    return cells;
  };

  const cells = buildCells();

  const isSelected = (y, m, d) =>
    parsed && parsed.year === y && parsed.month === m && parsed.day === d;
  const isToday = (y, m, d) => toISO(y, m, d) === todayISO;
  const isDisabled = (y, m, d) => !!maxParsed && toISO(y, m, d) > max;

  // ── Render ─────────────────────────────────────────────────────────────────
  const mNames   = MONTHS[loc];
  const msNames  = MONTHS_SHORT[loc];
  const dayNames = DAYS[loc];
  const ph = placeholder ?? (loc === 'vi' ? 'dd/mm/yyyy' : 'mm/dd/yyyy');

  return (
    <div className="dp-wrap" ref={wrapRef}>

      {/* ── Trigger field ── */}
      <button
        ref={triggerRef}
        type="button"
        className={`dp-trigger ep-input${open ? ' dp-trigger--open' : ''}${disabled ? ' dp-trigger--disabled' : ''}`}
        onClick={openPicker}
        disabled={disabled}
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        <span className={`dp-trigger-text${!parsed ? ' dp-placeholder' : ''}`}>
          {parsed ? formatDisplay(parsed, loc) : ph}
        </span>
        <span className="dp-icon" aria-hidden="true">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <rect x="1" y="3" width="14" height="12" rx="2.5" stroke="currentColor" strokeWidth="1.4"/>
            <path d="M5 1v4M11 1v4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
            <path d="M1 7h14" stroke="currentColor" strokeWidth="1.2"/>
            <rect x="4" y="9.5" width="2" height="2" rx=".5" fill="currentColor"/>
            <rect x="7" y="9.5" width="2" height="2" rx=".5" fill="currentColor"/>
            <rect x="10" y="9.5" width="2" height="2" rx=".5" fill="currentColor"/>
          </svg>
        </span>
      </button>

      {/* ── Dropdown rendered in <body> via portal to escape overflow:hidden ── */}
      {open && createPortal(
        <div
          data-dp-portal
          className="dp-dropdown"
          style={{
            position: 'absolute',
            top:   dropPos.top,
            left:  dropPos.left,
            width: Math.max(dropPos.width, 288),
          }}
          role="dialog"
          aria-label="Date picker"
        >
          {/* ── DAY VIEW ── */}
          {view === 'day' && (
            <>
              <div className="dp-header">
                <button type="button" className="dp-nav" onClick={() => moveCursorMonth(-1)} aria-label="Previous month">‹</button>
                <button type="button" className="dp-title" onClick={() => setView('month')}>
                  {mNames[cursor.month]} <strong>{cursor.year}</strong>
                  <span className="dp-caret">▾</span>
                </button>
                <button type="button" className="dp-nav" onClick={() => moveCursorMonth(1)} aria-label="Next month">›</button>
              </div>

              <div className="dp-weekdays">
                {dayNames.map(d => <span key={d} className="dp-weekday">{d}</span>)}
              </div>

              <div className="dp-grid">
                {cells.map((c, i) => (
                  <button
                    key={i}
                    type="button"
                    className={[
                      'dp-day',
                      c.outside  ? 'dp-day--out'   : '',
                      isSelected(c.y, c.m, c.d) ? 'dp-day--sel'   : '',
                      isToday(c.y, c.m, c.d) && !isSelected(c.y, c.m, c.d) ? 'dp-day--today' : '',
                      isDisabled(c.y, c.m, c.d) ? 'dp-day--dis'   : '',
                    ].filter(Boolean).join(' ')}
                    onClick={() => selectDay(c.y, c.m, c.d)}
                    disabled={isDisabled(c.y, c.m, c.d)}
                    tabIndex={c.outside ? -1 : 0}
                  >
                    {c.d}
                  </button>
                ))}
              </div>

              <div className="dp-footer">
                <button
                  type="button"
                  className="dp-today-btn"
                  onClick={() => !isDisabled(today.getFullYear(), today.getMonth(), today.getDate()) && selectDay(today.getFullYear(), today.getMonth(), today.getDate())}
                >
                  {loc === 'vi' ? 'Hôm nay' : 'Today'}
                </button>
                {parsed && (
                  <button type="button" className="dp-clear-btn" onClick={() => { onChange(''); setOpen(false); }}>
                    {loc === 'vi' ? 'Xóa' : 'Clear'}
                  </button>
                )}
              </div>
            </>
          )}

          {/* ── MONTH VIEW ── */}
          {view === 'month' && (
            <>
              <div className="dp-header">
                <button type="button" className="dp-nav" onClick={() => setCursor(c => ({...c, year: c.year - 1}))}>‹</button>
                <button type="button" className="dp-title" onClick={() => setView('year')}>
                  <strong>{cursor.year}</strong>
                  <span className="dp-caret">▾</span>
                </button>
                <button type="button" className="dp-nav" onClick={() => setCursor(c => ({...c, year: c.year + 1}))}>›</button>
              </div>
              <div className="dp-month-grid">
                {msNames.map((name, i) => (
                  <button
                    key={i}
                    type="button"
                    className={`dp-month-btn${cursor.month === i ? ' dp-month-btn--active' : ''}${parsed?.month === i && parsed?.year === cursor.year ? ' dp-month-btn--sel' : ''}`}
                    onClick={() => { setCursor(c => ({...c, month: i})); setView('day'); }}
                  >
                    {name}
                  </button>
                ))}
              </div>
            </>
          )}

          {/* ── YEAR VIEW ── */}
          {view === 'year' && (
            <>
              <div className="dp-header">
                <button type="button" className="dp-nav" onClick={() => setYearBase(y => y - 12)}>‹</button>
                <span className="dp-title dp-title--static">{yearBase} – {yearBase + 11}</span>
                <button type="button" className="dp-nav" onClick={() => setYearBase(y => y + 12)}>›</button>
              </div>
              <div className="dp-month-grid">
                {Array.from({ length: 12 }, (_, i) => yearBase + i).map(y => (
                  <button
                    key={y}
                    type="button"
                    className={`dp-month-btn${cursor.year === y ? ' dp-month-btn--active' : ''}${parsed?.year === y ? ' dp-month-btn--sel' : ''}`}
                    onClick={() => { setCursor(c => ({...c, year: y})); setView('month'); }}
                  >
                    {y}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>,
        document.body
      )}
    </div>
  );
}
