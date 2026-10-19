import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Screen from '../../components/Screen.jsx';
import Calendar from '../../components/Calendar.jsx';
import { FavoritesChip, EmptyState } from '../../components/Filters.jsx';
import { DayButton, EventPost, Glyph, IconButton, SearchField, Button } from '../../ds/nysf.js';
import { useAppState } from '../../state/AppState.jsx';
import { asset } from '../../data/asset.js';
import { href } from '../../data/href.js';
import { EVENTS, EVENT_CATEGORIES, MONTHS, eventDateLine } from '../../data/fairgrounds.js';

const monthOf = (iso) => iso.slice(0, 7);

export default function UpcomingEvents() {
  const { isFavorite, toggleFavorite } = useAppState();
  const [params, setParams] = useSearchParams();
  const view = params.get('view') === 'calendar' ? 'calendar' : 'list';
  const [monthIdx, setMonthIdx] = useState(0);
  const [query, setQuery] = useState('');
  const [favsOnly, setFavsOnly] = useState(false);
  const [categories, setCategories] = useState(new Set());
  const [sheet, setSheet] = useState(false);
  const [day, setDay] = useState(null);

  const month = MONTHS[monthIdx];
  const q = query.trim().toLowerCase();

  // Events in the selected month (or on the selected calendar day) that pass
  // the search, category and favorites filters.
  const filtered = useMemo(
    () =>
      EVENTS.filter(
        (e) =>
          (!q || `${e.title} ${e.venue} ${e.category}`.toLowerCase().includes(q)) &&
          (categories.size === 0 || categories.has(e.category)) &&
          (!favsOnly || isFavorite(e.id)),
      ),
    [q, categories, favsOnly, isFavorite],
  );
  const inMonth = filtered.filter((e) => e.days.some((d) => monthOf(d) === month.id));
  const shown = day ? inMonth.filter((e) => e.days.includes(day)) : inMonth;
  const eventDays = new Set(inMonth.flatMap((e) => e.days.filter((d) => monthOf(d) === month.id)));

  const pickMonth = (i) => {
    setMonthIdx(i);
    setDay(null);
  };
  const toggleView = () => {
    setParams(view === 'list' ? { view: 'calendar' } : {}, { replace: true });
    setDay(null);
  };

  return (
    <Screen theme="fairgrounds" header={{ label: 'Upcoming Events', back: false }}>
      <div className="fg-toolbar gutter">
        <button type="button" className="fg-filters-btn" onClick={() => setSheet(true)} aria-haspopup="dialog">
          <img src={asset('fair/filters-icon.svg')} alt="" width="24" height="15" />
          <span>Filters{categories.size > 0 ? ` (${categories.size})` : ''}</span>
        </button>
        <IconButton
          icon={view === 'list' ? 'calendar' : 'list'}
          label={view === 'list' ? 'Show calendar view' : 'Show list view'}
          onClick={toggleView}
        />
      </div>

      <div className="gutter">
        <SearchField placeholder="Search Events" label="Search events" value={query} onChange={setQuery} />
      </div>

      <div className="day-scroller month-scroller" role="group" aria-label="Choose a month">
        {MONTHS.map((m, i) => (
          <DayButton key={m.id} eyebrow={String(m.year)} label={m.short} selected={i === monthIdx} onClick={() => pickMonth(i)} />
        ))}
      </div>

      {view === 'calendar' && (
        <div className="gutter">
          <Calendar
            month={month}
            eventDays={eventDays}
            selected={day}
            onSelect={setDay}
            onPrev={() => pickMonth(monthIdx - 1)}
            onNext={() => pickMonth(monthIdx + 1)}
            canPrev={monthIdx > 0}
            canNext={monthIdx < MONTHS.length - 1}
          />
        </div>
      )}

      <section className="fg-sheet fg-events">
        <div className="filter-row">
          <FavoritesChip active={favsOnly} onClick={() => setFavsOnly((v) => !v)} />
        </div>
        {shown.map((e) => (
          <EventPost
            key={e.id}
            href={href(`/fairgrounds/events/${e.id}`)}
            image={e.img}
            date={eventDateLine(e, day || e.days.find((d) => monthOf(d) === month.id))}
            title={e.title}
            favorite={isFavorite(e.id)}
            onFavorite={(ev) => {
              ev.preventDefault();
              ev.stopPropagation();
              toggleFavorite(e.id);
            }}
          />
        ))}
        {shown.length === 0 && (
          <EmptyState title={favsOnly ? 'No favorite events this month' : `No events in ${month.long}`}>
            {favsOnly ? 'Tap the heart on an event photo to save it.' : 'Try another month or clear your filters.'}
          </EmptyState>
        )}
      </section>

      {sheet && (
        <FilterSheet
          selected={categories}
          onApply={(next) => {
            setCategories(next);
            setSheet(false);
          }}
          onClose={() => setSheet(false)}
        />
      )}
    </Screen>
  );
}

// Bottom sheet with category checkboxes. Not designed in Figma; built from the
// Fairgrounds tokens (slate, porcelain, French Blue, square corners).
function FilterSheet({ selected, onApply, onClose }) {
  const [draft, setDraft] = useState(new Set(selected));
  const toggle = (c) =>
    setDraft((prev) => {
      const next = new Set(prev);
      if (next.has(c)) next.delete(c);
      else next.add(c);
      return next;
    });

  return (
    <div className="sheet-backdrop" onClick={onClose}>
      <div className="sheet" role="dialog" aria-modal="true" aria-label="Filter events" onClick={(e) => e.stopPropagation()}>
        <div className="sheet-head">
          <h2 className="sheet-title">Filter Events</h2>
          <button type="button" className="sheet-close" aria-label="Close filters" onClick={onClose}>
            <Glyph name="close" />
          </button>
        </div>
        <ul className="sheet-options">
          {EVENT_CATEGORIES.map((c) => (
            <li key={c}>
              <label className="check">
                <input type="checkbox" checked={draft.has(c)} onChange={() => toggle(c)} />
                <span className="check-box" aria-hidden="true" />
                <span>{c}</span>
              </label>
            </li>
          ))}
        </ul>
        <div className="sheet-actions">
          <button type="button" className="text-button" onClick={() => setDraft(new Set())}>
            Clear all
          </button>
          <Button variant="primary" onClick={() => onApply(draft)}>
            Show results
          </Button>
        </div>
      </div>
    </div>
  );
}
