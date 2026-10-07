'use client';
import { useState } from 'react';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [state, setState] = useState('idle');
  async function submit(e) {
    e.preventDefault();
    if (!email) return;
    setState('loading');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.ok) { setState('ok'); setEmail(''); }
      else setState(data.error || 'error');
    } catch { setState('error'); }
  }
  if (state === 'ok')
    return <p style={{ color: '#1E3A8A', fontWeight: 600, margin: 0 }}>✓ Subscribed. Watch your inbox every week.</p>;
  return (
    <form className="newsletter-form" onSubmit={submit}>
      <input
        className="m-input" type="email" placeholder="you@business.com" value={email}
        onChange={(e) => setEmail(e.target.value)} aria-label="Email address" style={{ flex: '1 1 260px' }}
      />
      <button className="m-btn" type="submit" disabled={state === 'loading'}>
        {state === 'loading' ? 'Subscribing…' : 'Subscribe'}
      </button>
      {state !== 'idle' && state !== 'loading' && state !== 'error' && (
        <p style={{ color: '#1E3A8A', fontSize: '.82rem', width: '100%', margin: '.2rem 0 0' }}>{state}</p>
      )}
    </form>
  );
}
