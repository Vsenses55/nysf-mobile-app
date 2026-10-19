import { Navigate, useParams } from 'react-router-dom';
import Screen from '../../components/Screen.jsx';
import { Button, FavoriteButton } from '../../ds/nysf.js';
import { useAppState } from '../../state/AppState.jsx';
import { EVENTS, eventDateLine, formatDay } from '../../data/fairgrounds.js';

export default function EventDetail() {
  const { id } = useParams();
  const { isFavorite, toggleFavorite, showToast } = useAppState();
  const event = EVENTS.find((e) => e.id === id);
  if (!event) return <Navigate to="/fairgrounds/events" replace />;
  const [first, ...more] = event.days;

  return (
    <Screen theme="fairgrounds" header={{ label: 'Upcoming Events', back: true }} backTo="/fairgrounds/events" footer="signup">
      <article className="fg-detail">
        <div className="fg-detail-image">
          <img src={event.img} alt="" />
          <FavoriteButton
            className="nysf-post-fav"
            selected={isFavorite(event.id)}
            onClick={() => toggleFavorite(event.id)}
          />
        </div>
        <header className="fg-detail-head">
          <p className="fg-detail-date">{eventDateLine(event, first)}</p>
          <h2 className="fg-detail-title">{event.title}</h2>
        </header>

        <div className="fg-prose">
          <p>{event.body.intro}</p>
          {event.body.bullets && (
            <ul>
              {event.body.bullets.map(([b, rest]) => (
                <li key={b}>
                  <strong>{b}</strong>
                  {rest}
                </li>
              ))}
            </ul>
          )}
          {event.body.outro && <p>{event.body.outro}</p>}
        </div>

        <Button variant="primary" external onClick={() => showToast('Ticketing would open in a new tab on the live site.')}>
          Buy tickets
        </Button>

        <div className="fg-contact">
          <p className="fg-contact-label">Contact Information</p>
          <a href={`https://${event.website}`} target="_blank" rel="noopener">visit website</a>
          <a href="mailto:events@nysfair.ny.gov">email</a>
        </div>

        <div className="fg-prose">
          {more.length > 0 && (
            <>
              <h3>Additional Dates and Times</h3>
              {more.map((d) => (
                <p key={d} className="tight">
                  {formatDay(d)} at {event.hours}
                </p>
              ))}
            </>
          )}
          <h3>Venue</h3>
          <ul>
            <li>{event.venue}</li>
          </ul>
          <h3>Admission</h3>
          <ul>
            <li>{event.admission}</li>
          </ul>
          <h3>Website</h3>
          <ul>
            <li>
              <a href={`https://${event.website}`} target="_blank" rel="noopener">
                {event.website}
              </a>
            </li>
          </ul>
        </div>
      </article>
    </Screen>
  );
}
