import { Link } from 'react-router-dom';
import Screen from '../../components/Screen.jsx';
import { asset } from '../../data/asset.js';
import { VENUES } from '../../data/fairgrounds.js';

export default function Venues() {
  return (
    <Screen theme="fairgrounds" header={{ label: 'Venues', back: false }} footer="signup">
      <section className="gutter fg-intro">
        <div className="fg-photo fg-photo-tall">
          <img src={asset('fg/venues-hero.jpg')} alt="Horse show in the Coliseum" />
        </div>
        <h2 className="fg-h2">Host an Event</h2>
        <p className="fg-body">
          If you're considering hosting an event, you’ll want to first review the different spaces we can offer your
          organization. With buildings and meeting/event spaces of all sizes and types, you’ll be able to choose one or
          more that fits your precise needs. The Fairgrounds also offers numerous large outdoor spaces for the biggest
          events, and thousands of convenient and free parking spaces.
        </p>
      </section>

      <section className="fg-sheet fg-venues">
        {VENUES.map((v) => (
          <article key={v.id} className="venue-card">
            <div className="fg-photo">
              <img src={v.img} alt="" />
            </div>
            <p className="fg-eyebrow">{v.eyebrow}</p>
            <h3 className="fg-card-title">{v.title}</h3>
            <p className="fg-body">{v.summary}</p>
            <Link to={`/fairgrounds/venues/${v.id}`} className="nysf-btn nysf-btn-primary">
              <span>Learn more</span>
            </Link>
          </article>
        ))}
      </section>
    </Screen>
  );
}
