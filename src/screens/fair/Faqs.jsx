import Screen from '../../components/Screen.jsx';
import { MediaCard } from '../../ds/nysf.js';
import { Accordions } from './Parking.jsx';
import { asset } from '../../data/asset.js';
import { FAQS } from '../../data/fair.js';

// Not designed in Figma; built from the Parking screen's pattern.
export default function Faqs() {
  return (
    <Screen theme="fair" header={{ label: 'FAQs', back: true }} backTo="/fair/plan">
      <div className="gutter stack-24 pad-top pad-bottom">
        <MediaCard
          image={asset('fair/hero-plan.jpg')}
          imageAlt="Crowds on the Fair midway"
          title="Frequently Asked Questions"
          body="Quick answers to the questions we hear most. Still stuck? Stop by any Information Booth."
        />
      </div>
      <Accordions sections={FAQS} />
    </Screen>
  );
}
