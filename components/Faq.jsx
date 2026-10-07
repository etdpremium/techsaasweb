'use client';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { QA } from '../lib/faq';

export default function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <div style={{ maxWidth: 820, margin: '0 auto' }}>
      {QA.map((item, i) => (
        <div key={i} className={`faq-item${open === i ? ' open' : ''}`}>
          <button onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
            {item.q}
            <ChevronDown size={18} className="chev" />
          </button>
          {open === i && <p>{item.a}</p>}
        </div>
      ))}
    </div>
  );
}
