import { useMemo, useState } from 'react';
import Screen from '../../components/Screen.jsx';
import { DropdownButton, ListMediaCard, PrevNextButton } from '../../ds/nysf.js';
import { FavoritesChip, ResetFilters, EmptyState } from '../../components/Filters.jsx';
import { useAppState } from '../../state/AppState.jsx';
import { asset } from '../../data/asset.js';
import { CONCERTS, CONCERT_GENRES, CONCERT_STAGES, FAIR_DAYS } from '../../data/fair.js';

const DATE_OPTIONS = ['All Dates', ...FAIR_DAYS.map((d) => d.date)];
const PAGE = 4;

export default function Concerts() {
  const { isFavorite, toggleFavorite } = useAppState();
  const [date, setDate] = useState(DATE_OPTIONS[0]);
  const [genre, setGenre] = useState(CONCERT_GENRES[0]);
  const [stage, setStage] = useState(CONCERT_STAGES[0]);
  const [favsOnly, setFavsOnly] = useState(false);
  const [shown, setShown] = useState(PAGE);
  const [open, setOpen] = useState(null);

  const list = useMemo(
    () =>
      CONCERTS.filter(
        (c) =>
          (date === DATE_OPTIONS[0] || c.date === date) &&
          (genre === CONCERT_GENRES[0] || c.genre === genre) &&
          (stage === CONCERT_STAGES[0] || c.stage === stage) &&
          (!favsOnly || isFavorite(c.id)),
      ).sort((a, b) => a.day - b.day),
    [date, genre, stage, favsOnly, isFavorite],
  );

  const reset = () => {
    setDate(DATE_OPTIONS[0]);
    setGenre(CONCERT_GENRES[0]);
    setStage(CONCERT_STAGES[0]);
    setFavsOnly(false);
    setShown(PAGE);
  };

  // One dropdown open at a time; picking an option closes it.
  const dropdown = (key, label, value, options, set) => (
    <DropdownButton
      label={value === options[0] ? label : value}
      options={options}
      open={open === key}
      onOpenChange={(isOpen) => setOpen(isOpen ? key : null)}
      onSelect={(o) => {
        set(o);
        setOpen(null);
        setShown(PAGE);
      }}
    />
  );

  return (
    <Screen theme="fair" header={{ label: 'Concert', back: false }}>
      <header className="page-title">
        <h2 className="page-title-main">Chevrolet<br />Music Series</h2>
        <p className="page-title-sub">Aug 21 - Sept 2</p>
      </header>
      <div className="gutter">
        <div className="hero-frame">
          <img src={asset('fair/hero-concerts.jpg')} alt="Crowd at the Chevy Court stage" />
        </div>
      </div>

      <section className="panel panel-green">
        <div className="filter-row">
          <FavoritesChip active={favsOnly} onClick={() => setFavsOnly((v) => !v)} />
          <ResetFilters onClick={reset} />
        </div>
        <div className="dropdown-pair">
          {dropdown('date', 'Date', date, DATE_OPTIONS, setDate)}
          {dropdown('genre', 'Genre', genre, CONCERT_GENRES, setGenre)}
        </div>
        {dropdown('stage', 'Concerts', stage, CONCERT_STAGES, setStage)}

        <div className="list list-media">
          {list.slice(0, shown).map((c) => (
            <ListMediaCard
              key={c.id}
              image={c.img}
              imageAlt=""
              eyebrow={c.stage}
              title={c.title}
              meta={`${c.date} • ${c.time}`}
              favorite={isFavorite(c.id)}
              onFavorite={() => toggleFavorite(c.id)}
            />
          ))}
          {list.length === 0 && (
            <EmptyState title={favsOnly ? 'No favorites yet' : 'No concerts match'}>
              {favsOnly ? 'Tap the heart on any concert to save it here.' : 'Try another date or genre.'}
            </EmptyState>
          )}
        </div>

        {shown < list.length && (
          <PrevNextButton direction="next" label="Load More" onClick={() => setShown((n) => n + PAGE)} />
        )}
      </section>
    </Screen>
  );
}
