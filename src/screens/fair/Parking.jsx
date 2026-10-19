import { useState } from 'react';
import Screen from '../../components/Screen.jsx';
import { AccordionMenu, MediaCard } from '../../ds/nysf.js';
import { asset } from '../../data/asset.js';
import { DIRECTIONS, PARKING_SECTIONS } from '../../data/fair.js';

export default function Parking() {
  return (
    <Screen theme="fair" header={{ label: 'Parking', back: true }} backTo="/fair/plan">
      <p className="ticker" role="status">RV Parking lot is at Full Capacity</p>
      <div className="gutter stack-24 pad-top">
        <MediaCard
          image={asset('fair/hero-parking.jpg')}
          imageAlt="Aerial view of the Fairgrounds parking lots"
          title="Parking"
          body={`${DIRECTIONS.intro} ${DIRECTIONS.gps}`}
        />
      </div>
      <Accordions sections={PARKING_SECTIONS} />
    </Screen>
  );
}

// Full-bleed accordion list; one row open at a time.
export function Accordions({ sections }) {
  const [open, setOpen] = useState(null);
  return (
    <div className="accordions">
      {sections.map((s, i) => (
        <AccordionMenu key={s.label} label={s.label} open={open === i} onOpenChange={(o) => setOpen(o ? i : null)}>
          {s.body}
        </AccordionMenu>
      ))}
    </div>
  );
}
