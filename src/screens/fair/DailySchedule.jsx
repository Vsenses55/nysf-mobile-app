import { useMemo, useState } from 'react';
import Screen from '../../components/Screen.jsx';
import { DayButton, DropdownButton, ListCard, MediaCard } from '../../ds/nysf.js';
import { FavoritesChip, EmptyState } from '../../components/Filters.jsx';
import { useAppState } from '../../state/AppState.jsx';
import { asset } from '../../data/asset.js';
import { FAIR_DAYS, SCHEDULE, SCHEDULE_CATEGORIES } from '../../data/fair.js';

export default function DailySchedule() {
  const { isFavorite, toggleFavorite } = useAppState();
  const [day, setDay] = useState(0);
  const [category, setCategory] = useState(SCHEDULE_CATEGORIES[0]);
  const [favsOnly, setFavsOnly] = useState(false);
  const [open, setOpen] = useState(false);

  const items = useMemo(
    () =>
      SCHEDULE.filter(
        (s) =>
          s.day === day &&
          (category === SCHEDULE_CATEGORIES[0] || s.category === category) &&
          (!favsOnly || isFavorite(s.id)),
      ),
    [day, category, favsOnly, isFavorite],
  );

  return (
    <Screen theme="fair" header={{ label: 'Daily Schedule', back: false }}>
      <div className="gutter stack-24 pad-top">
        <MediaCard
          image={asset('fair/hero-schedule.jpg')}
          imageAlt="Fairgoers with a giant stuffed koala"
          title="Daily Schedule"
          body="There’s no shortage of things to see and do at the 2025 Great New York State Fair!"
        />
      </div>

      <div className="day-scroller" role="group" aria-label="Choose a day">
        {FAIR_DAYS.map((d) => (
          <DayButton key={d.id} eyebrow={d.date} label={d.label} selected={d.index === day} onClick={() => setDay(d.index)} />
        ))}
      </div>

      <div className="gutter">
        <DropdownButton
          label={category === SCHEDULE_CATEGORIES[0] ? 'Categories' : category}
          options={SCHEDULE_CATEGORIES}
          open={open}
          onOpenChange={setOpen}
          onSelect={(o) => {
            setCategory(o);
            setOpen(false);
          }}
        />
      </div>

      <section className="panel panel-green panel-schedule">
        <div className="filter-row">
          <FavoritesChip active={favsOnly} onClick={() => setFavsOnly((v) => !v)} />
        </div>
        <div className="list list-cards">
          {items.map((s) => (
            <ListCard
              key={s.id}
              title={s.title}
              time={s.time}
              location={s.location}
              favorite={isFavorite(s.id)}
              onFavorite={() => toggleFavorite(s.id)}
            />
          ))}
          {items.length === 0 && (
            <EmptyState title={favsOnly ? 'No favorites on this day' : 'Nothing in this category today'}>
              {favsOnly ? 'Tap a heart to save an event to your favorites.' : 'Try another day or category.'}
            </EmptyState>
          )}
        </div>
      </section>
    </Screen>
  );
}
