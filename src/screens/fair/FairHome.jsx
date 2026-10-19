import { Link } from 'react-router-dom';
import Screen from '../../components/Screen.jsx';
import { asset } from '../../data/asset.js';
import { HOME_TILES, SPONSORS } from '../../data/fair.js';

export default function FairHome() {
  return (
    <Screen theme="fair" header="nav" className="fair-home">
      <div className="fair-home-hero" style={{ backgroundImage: `url(${asset('fair/home-bg.jpg')})` }}>
        <Link to="/" className="fair-home-logo" aria-label="Back to the start screen">
          <img src={asset('fair/logo-hero.svg')} alt="The Great New York State Fair" />
        </Link>
        <nav className="fair-home-tiles" aria-label="Fair features">
          {HOME_TILES.map((tile) => (
            <Link key={tile.to} to={tile.to} className="fair-home-tile">
              <img src={tile.img} alt={tile.label} width="140" height="133" />
            </Link>
          ))}
        </nav>
      </div>

      <section className="sponsors" aria-labelledby="sponsors-title">
        <h2 id="sponsors-title" className="sponsors-title">App Sponsors</h2>
        <div className="sponsors-track">
          {SPONSORS.map((s) => (
            <div key={s.name} className="sponsor-card">
              {s.img ? <img src={s.img} alt={s.name} /> : <span className="sponsor-name">{s.name}</span>}
            </div>
          ))}
        </div>
      </section>
    </Screen>
  );
}
