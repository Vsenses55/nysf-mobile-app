import { Link } from 'react-router-dom';
import Screen from '../../components/Screen.jsx';
import Carousel from '../../components/Carousel.jsx';
import { asset } from '../../data/asset.js';
import { FEATURED } from '../../data/fairgrounds.js';

export default function FgHome() {
  return (
    <Screen theme="fairgrounds" header="nav">
      <h1 className="fg-band">Upcoming Events</h1>
      <Carousel slides={FEATURED} />

      <section className="fg-sheet fg-home-links">
        <Link to="/fairgrounds/events" className="fg-tile fg-tile-wide">
          <span className="fg-tile-label">More Events</span>
          <img src={asset('fg/more-events.jpg')} alt="" />
        </Link>
        <div className="fg-tile-pair">
          <Link to="/fairgrounds/venues" className="fg-tile">
            <span className="fg-tile-label">Venues</span>
            <img src={asset('fg/venues.jpg')} alt="" />
          </Link>
          <Link to="/fairgrounds/rentals" className="fg-tile">
            <span className="fg-tile-label">Rental Opportunities</span>
            <img src={asset('fg/rental.jpg')} alt="" />
          </Link>
        </div>
      </section>
    </Screen>
  );
}
