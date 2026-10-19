import Screen from '../../components/Screen.jsx';
import { MediaCard, PageButton } from '../../ds/nysf.js';
import { asset } from '../../data/asset.js';
import { href } from '../../data/href.js';

const LINKS = [
  { to: '/fair/plan/directions', label: 'Directions' },
  { to: '/fair/plan/parking', label: 'Parking' },
  { to: '/fair/plan/faqs', label: 'FAQs' },
];

export default function PlanYourVisit() {
  return (
    <Screen theme="fair" header={{ label: 'Plan Your Visit', back: true }}>
      <div className="gutter stack-24 pad-top">
        <MediaCard
          image={asset('fair/hero-plan.jpg')}
          imageAlt="Crowds on the Fair midway"
          title="Plan Your Visit"
          body="Everything you need before you go: how to get here, where to park, and answers to the questions we hear most."
        />
      </div>
      <nav className="gutter page-links" aria-label="Plan your visit">
        {LINKS.map((l) => (
          <PageButton key={l.to} label={l.label} href={href(l.to)} />
        ))}
      </nav>
    </Screen>
  );
}
