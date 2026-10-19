import { useState } from 'react';
import Screen from '../../components/Screen.jsx';
import { Button, TextField } from '../../ds/nysf.js';
import { asset } from '../../data/asset.js';

export default function RentalOpportunities() {
  const [form, setForm] = useState({ name: '', title: '', company: '' });
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  function submit(e) {
    e.preventDefault();
    if (!form.company.trim()) {
      setError('Please enter your company or organization.');
      return;
    }
    setError('');
    setSent(true);
  }

  return (
    <Screen theme="fairgrounds" header={{ label: 'Rental Opportunities', back: false }} footer="follow">
      <section className="gutter fg-intro">
        <div className="fg-photo fg-photo-tall">
          <img src={asset('fg/rental-hero.jpg')} alt="The Exposition Center" />
        </div>
        <h2 className="fg-h2">Book Your Event</h2>
        <div className="fg-body">
          <p>To book an event, use the form below to get in touch with us or contact:</p>
          <p>
            <strong>
              The New York State Fairgrounds
              <br />
              Events Department
            </strong>
            <br />
            581 State Fair Blvd.
            <br />
            Syracuse, NY 13209
          </p>
          <p>
            <a href="https://maps.google.com/?q=581+State+Fair+Blvd,+Syracuse,+NY+13209" target="_blank" rel="noopener" className="fg-link">
              Get Directions
            </a>
            <br />
            <a href="tel:18004753247" className="fg-phone">800.475.FAIR</a>
          </p>
        </div>
      </section>

      <section className="fg-form-wrap">
        {sent ? (
          <div className="fg-form-done" aria-live="polite">
            <h2 className="fg-h2">Thanks, {form.name.trim() || 'friend'}!</h2>
            <p className="fg-body">
              The Events Department will reach out to {form.company} within two business days. (Prototype: nothing was
              sent.)
            </p>
            <Button variant="primary" onClick={() => { setSent(false); setForm({ name: '', title: '', company: '' }); }}>
              Send another
            </Button>
          </div>
        ) : (
          <form className="fg-form" onSubmit={submit} noValidate>
            <TextField label="Name" name="name" autoComplete="name" value={form.name} onChange={set('name')} />
            <TextField label="Title" name="title" autoComplete="organization-title" value={form.title} onChange={set('title')} />
            <TextField
              label="Company/Organization*"
              name="company"
              autoComplete="organization"
              required
              value={form.company}
              onChange={set('company')}
            />
            {error && (
              <p className="form-error" role="alert">
                {error}
              </p>
            )}
            <Button type="submit" variant="primary">
              Submit
            </Button>
          </form>
        )}
      </section>
    </Screen>
  );
}
