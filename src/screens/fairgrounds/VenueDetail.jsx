import { Navigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Screen from '../../components/Screen.jsx';
import { VENUES } from '../../data/fairgrounds.js';

export default function VenueDetail() {
  const { id } = useParams();
  const venue = VENUES.find((v) => v.id === id);
  if (!venue) return <Navigate to="/fairgrounds/venues" replace />;

  return (
    <Screen theme="fairgrounds" header={{ label: 'Venue Details', back: true }} backTo="/fairgrounds/venues" footer="signup">
      <article className="gutter fg-venue-detail">
        <div className="fg-photo">
          <img src={venue.img} alt="" />
        </div>
        <p className="fg-eyebrow">{venue.detailEyebrow}</p>
        <h2 className="fg-h2">{venue.title}</h2>
        <p className="fg-body">{venue.body}</p>
        <dl className="specs">
          <p className="specs-label">Specifications</p>
          {venue.specs.map(([k, v]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
        <Link to="/fairgrounds/rentals" className="nysf-btn nysf-btn-primary">
          <span>Book this space</span>
        </Link>
      </article>
    </Screen>
  );
}
