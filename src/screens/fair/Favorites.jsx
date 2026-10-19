import { Link } from 'react-router-dom';
import Screen from '../../components/Screen.jsx';
import { ListMediaCard, ListCard } from '../../ds/nysf.js';
import { EmptyState } from '../../components/Filters.jsx';
import { useAppState } from '../../state/AppState.jsx';
import { CONCERTS, SCHEDULE, FAIR_DAYS } from '../../data/fair.js';

// The Favorites frame is hidden in the Figma file; this follows its structure
// (list media cards in ink on the yellow page) and fills it from saved hearts.
export default function Favorites() {
  const { isFavorite, toggleFavorite } = useAppState();
  const concerts = CONCERTS.filter((c) => isFavorite(c.id)).sort((a, b) => a.day - b.day);
  const schedule = SCHEDULE.filter((s) => isFavorite(s.id)).sort((a, b) => a.day - b.day);
  const empty = concerts.length + schedule.length === 0;

  return (
    <Screen theme="fair" header={{ label: 'Favorites', back: true }} footer="follow">
      <div className="gutter favorites pad-top pad-bottom">
        {empty && (
          <EmptyState title="No favorites yet">
            Tap the heart on a concert or schedule item and it will show up here.
            <span className="empty-links">
              <Link to="/fair/concerts">Browse concerts</Link>
              <Link to="/fair/schedule">See the daily schedule</Link>
            </span>
          </EmptyState>
        )}

        {concerts.length > 0 && (
          <section className="stack-16">
            <h2 className="section-label">Concerts</h2>
            {concerts.map((c) => (
              <ListMediaCard
                key={c.id}
                image={c.img}
                eyebrow={c.stage}
                title={c.title}
                meta={`${c.date} • ${c.time}`}
                favorite
                onFavorite={() => toggleFavorite(c.id)}
              />
            ))}
          </section>
        )}

        {schedule.length > 0 && (
          <section className="stack-16">
            <h2 className="section-label">Daily Schedule</h2>
            {schedule.map((s) => (
              <ListCard
                key={s.id}
                title={s.title}
                time={`${FAIR_DAYS[s.day].date} • ${s.time}`}
                location={s.location}
                favorite
                onFavorite={() => toggleFavorite(s.id)}
              />
            ))}
          </section>
        )}
      </div>
    </Screen>
  );
}
