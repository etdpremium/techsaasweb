'use client';
import { useState } from 'react';

// Form booking demo — client component (ada onSubmit handler)
export default function BookingForm({ demo }) {
  const [state, setState] = useState('idle');
  async function submit(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    setState('saving');
    try {
      await fetch('/api/leads', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tenant: demo.slug, name: fd.get('name'), contact: fd.get('contact'),
          note: fd.get('item'), source: 'form',
        }),
      });
      setState('ok');
    } catch {
      setState('err');
    }
  }
  if (state === 'ok')
    return (
      <div style={{ textAlign: 'center', padding: '1.4rem .5rem' }}>
        <div style={{ fontSize: '1.3rem' }}>✓</div>
        <p style={{ margin: '.4rem 0 0', color: '#9FB3C8', fontSize: '.86rem' }}>
          Saved to the owner dashboard. The business will confirm within a minute.
        </p>
      </div>
    );
  return (
    <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '.6rem' }}>
      <input name="name" required placeholder="Name" style={inp} />
      <input name="contact" required placeholder="WhatsApp or email" style={inp} />
      <select name="item" style={inp}>
        {demo.formOptions.map((o) => <option key={o}>{o}</option>)}
      </select>
      <button className="m-btn block" type="submit" disabled={state === 'saving'} style={{ marginTop: '.2rem' }}>
        {state === 'saving' ? 'Saving…' : state === 'err' ? 'Try again' : demo.formCta}
      </button>
    </form>
  );
}

const inp = {
  width: '100%', padding: '.55rem .75rem', borderRadius: '9px',
  border: '1.5px solid rgba(255,255,255,.16)', background: 'rgba(255,255,255,.06)',
  color: '#fff', fontSize: '.88rem', fontFamily: 'inherit',
};
