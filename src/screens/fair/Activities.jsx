import { Link } from 'react-router-dom';
import Screen from '../../components/Screen.jsx';
import { asset } from '../../data/asset.js';

const ACTIVITIES = [
  { id: 'butterizer', label: 'Butterizer', img: asset('fair/activity-butterizer.jpg') },
  { id: 'fair-match', label: 'Fair Match', img: asset('fair/activity-fair-match.jpg') },
];

export default function Activities() {
  return (
    <Screen theme="fair" header={{ label: 'Activities & AG Facts', back: false }} footer="none">
      <div className="activities">
        {ACTIVITIES.map((a) => (
          <Link key={a.id} to={`/fair/activities/${a.id}`} className="activity-card">
            <img src={a.img} alt={a.label} />
          </Link>
        ))}
      </div>
    </Screen>
  );
}
