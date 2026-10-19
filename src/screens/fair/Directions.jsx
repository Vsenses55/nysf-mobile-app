import Screen from '../../components/Screen.jsx';
import { MediaCard } from '../../ds/nysf.js';
import { asset } from '../../data/asset.js';
import { DIRECTIONS } from '../../data/fair.js';

export default function Directions() {
  return (
    <Screen theme="fair" header={{ label: 'Directions', back: true }} backTo="/fair/plan">
      <div className="gutter stack-24 pad-top">
        <MediaCard image={asset('fair/hero-directions.jpg')} imageAlt="Draft horse team in the Coliseum" title="Directions" />
        <div className="prose">
          <p>
            {DIRECTIONS.intro}
            <br />
            <a href={`https://maps.google.com/?q=${DIRECTIONS.gps}`} target="_blank" rel="noopener">
              {DIRECTIONS.gps}
            </a>
          </p>
          {DIRECTIONS.routes.map(([from, how]) => (
            <p key={from}>
              {from}
              <br />
              {how}
            </p>
          ))}
          <p>
            <a href="https://511ny.org" target="_blank" rel="noopener">
              Click here
            </a>
            {DIRECTIONS.outro.replace(/^Click here/, '')}
          </p>
        </div>
      </div>
    </Screen>
  );
}
