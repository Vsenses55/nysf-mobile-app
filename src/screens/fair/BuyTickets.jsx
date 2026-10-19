import { useState } from 'react';
import Screen from '../../components/Screen.jsx';
import { Button, DayButton, Glyph, MediaCard } from '../../ds/nysf.js';
import { asset } from '../../data/asset.js';
import { FAIR_DAYS, TICKETS } from '../../data/fair.js';

// The Buy Tickets frame is hidden/unfinished in Figma, so this screen is
// composed from the design system. Checkout is simulated.
export default function BuyTickets() {
  const [day, setDay] = useState(0);
  const [qty, setQty] = useState({ 't-ga': 2 });
  const [confirmed, setConfirmed] = useState(null);

  const count = Object.values(qty).reduce((a, b) => a + b, 0);
  const total = TICKETS.reduce((sum, t) => sum + (qty[t.id] || 0) * t.price, 0);
  const change = (id, delta) => setQty((q) => ({ ...q, [id]: Math.max(0, Math.min(10, (q[id] || 0) + delta)) }));

  if (confirmed) {
    return (
      <Screen theme="fair" header={{ label: 'Buy Tickets', back: true }} footer="follow">
        <section className="gutter tickets-done pad-top pad-bottom" aria-live="polite">
          <p className="tickets-done-eyebrow">Order #NYSF-{confirmed.order}</p>
          <h2 className="tickets-done-title">See you at The Fair!</h2>
          <p className="tickets-done-text">
            {confirmed.count} {confirmed.count === 1 ? 'item' : 'items'} for {FAIR_DAYS[confirmed.day].date} — ${confirmed.total}.
            Your tickets would be emailed and saved to this app. (Prototype: no payment was taken.)
          </p>
          <Button variant="primary" onClick={() => { setConfirmed(null); setQty({}); }}>
            Buy more
          </Button>
        </section>
      </Screen>
    );
  }

  return (
    <Screen theme="fair" header={{ label: 'Buy Tickets', back: true }}>
      <div className="gutter stack-24 pad-top">
        <MediaCard
          image={asset('fair/hero-plan.jpg')}
          imageAlt="Crowds on the Fair midway"
          title="Buy Tickets"
          body="Save at the gate: buy admission and parking ahead. Tickets are good for one day unless noted."
        />
        <p className="section-label">Pick your day</p>
      </div>
      <div className="day-scroller" role="group" aria-label="Choose a day">
        {FAIR_DAYS.map((d) => (
          <DayButton key={d.id} eyebrow={d.date} label={d.label} selected={d.index === day} onClick={() => setDay(d.index)} />
        ))}
      </div>

      <div className="gutter tickets">
        {TICKETS.map((t) => (
          <div key={t.id} className="ticket-row">
            <div className="ticket-info">
              <p className="ticket-title">{t.title}</p>
              <p className="ticket-note">{t.note}</p>
              <p className="ticket-price">{t.price ? `$${t.price}` : 'Free'}</p>
            </div>
            <div className="stepper" role="group" aria-label={`${t.title} quantity`}>
              <button type="button" aria-label={`Fewer ${t.title}`} onClick={() => change(t.id, -1)} disabled={!qty[t.id]}>
                <Glyph name="minus" />
              </button>
              <span aria-live="polite">{qty[t.id] || 0}</span>
              <button type="button" aria-label={`More ${t.title}`} onClick={() => change(t.id, 1)}>
                <Glyph name="plus" />
              </button>
            </div>
          </div>
        ))}

        <div className="ticket-total">
          <span>Total</span>
          <span>${total}</span>
        </div>
        <Button
          variant="primary"
          disabled={count === 0}
          onClick={() => setConfirmed({ count, total, day, order: String(Date.now()).slice(-6) })}
        >
          Buy tickets
        </Button>
      </div>
    </Screen>
  );
}
