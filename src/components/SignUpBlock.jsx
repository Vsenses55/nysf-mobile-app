import { useState } from 'react';
import { SignUp } from '../ds/nysf.js';

// The design system's sign-up form, with a thank-you state after submit.
// (Prototype only — nothing is sent anywhere.)
export default function SignUpBlock() {
  const [email, setEmail] = useState(null);

  if (email) {
    return (
      <section className="nysf-signup signup-done" aria-live="polite">
        <h2 className="nysf-signup-title">You’re on the list!</h2>
        <p className="signup-done-text">We’ll send news and deals to {email}.</p>
        <button type="button" className="signup-done-reset" onClick={() => setEmail(null)}>
          Use a different email
        </button>
      </section>
    );
  }

  return (
    <SignUp
      onSubmit={(e) => {
        const value = e.currentTarget.querySelector('input[type="email"]')?.value;
        setEmail(value || 'your inbox');
      }}
    />
  );
}
