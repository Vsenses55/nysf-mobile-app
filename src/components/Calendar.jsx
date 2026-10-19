import { Glyph } from '../ds/nysf.js';

const DOW = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
const pad = (n) => String(n).padStart(2, '0');

/**
 * Month grid from the Fairgrounds calendar view. Days with events are slate
 * squares; the selected day is French Blue.
 * month: { year, month (0-based), long }
 */
export default function Calendar({ month, eventDays, selected, onSelect, onPrev, onNext, canPrev, canNext }) {
  const first = new Date(month.year, month.month, 1).getDay();
  const count = new Date(month.year, month.month + 1, 0).getDate();
  const cells = [...Array(first).fill(null), ...Array.from({ length: count }, (_, i) => i + 1)];
  while (cells.length % 7) cells.push(null);
  const weeks = Array.from({ length: cells.length / 7 }, (_, w) => cells.slice(w * 7, w * 7 + 7));

  return (
    <div className="calendar">
      <div className="calendar-head">
        <p className="calendar-month">
          <strong>{month.long}</strong> {month.year}
        </p>
        <div className="calendar-arrows">
          <button type="button" aria-label="Previous month" onClick={onPrev} disabled={!canPrev}>
            <Glyph name="chevLeft" />
          </button>
          <button type="button" aria-label="Next month" onClick={onNext} disabled={!canNext}>
            <Glyph name="chevRight" />
          </button>
        </div>
      </div>
      <div className="calendar-dow" aria-hidden="true">
        {DOW.map((d) => (
          <span key={d}>{d}</span>
        ))}
      </div>
      <div className="calendar-grid" role="grid">
        {weeks.map((week, w) => (
          <div className="calendar-week" role="row" key={w}>
            {week.map((d, i) => {
              if (!d) return <span key={i} className="calendar-cell" role="gridcell" />;
              const iso = `${month.year}-${pad(month.month + 1)}-${pad(d)}`;
              const has = eventDays.has(iso);
              const isSel = selected === iso;
              return (
                <span key={i} className="calendar-cell" role="gridcell">
                  <button
                    type="button"
                    className={`calendar-day ${has ? 'has-event' : ''} ${isSel ? 'is-selected' : ''}`}
                    aria-label={`${month.long} ${d}${has ? ', has events' : ''}`}
                    aria-pressed={isSel}
                    disabled={!has}
                    onClick={() => onSelect(isSel ? null : iso)}
                  >
                    {d}
                  </button>
                </span>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
