'use client';

import { useState } from 'react';
import { defaultRent, facts } from '@/data/labradon/facts';

const money = (n: number) => `$${Math.round(n).toLocaleString('en-US')}`;

/** Rent lost to vacant days, seeded with the local average rent (HUD). */
export function VacancyCalculator() {
  const [rent, setRent] = useState(defaultRent);
  const [days, setDays] = useState(5);
  const [turns, setTurns] = useState(12);
  const perDay = (rent * 12) / 365;
  const total = perDay * days * turns;

  const inputs = [
    { id: 'rent', label: 'Monthly rent', value: rent, set: setRent, min: 600, max: 4000, step: 25, show: money(rent) },
    { id: 'days', label: 'Vacant days saved per turn', value: days, set: setDays, min: 1, max: 21, step: 1, show: `${days} days` },
    { id: 'turns', label: 'Turns per year', value: turns, set: setTurns, min: 1, max: 120, step: 1, show: String(turns) },
  ];

  return (
    <div className="lab-calc">
      <div className="lab-calc-inputs">
        {inputs.map((i) => (
          <label key={i.id} htmlFor={`calc-${i.id}`}>
            <span>
              {i.label}
              <output>{i.show}</output>
            </span>
            <input id={`calc-${i.id}`} type="range" min={i.min} max={i.max} step={i.step} value={i.value} onChange={(e) => i.set(Number(e.target.value))} />
          </label>
        ))}
      </div>
      <div className="lab-calc-result" aria-live="polite">
        <span className="lab-mono">Rent back on the books, per year</span>
        <strong>{money(total)}</strong>
        <p className="lab-mono">
          {money(perDay)} per vacant day × {days} days × {turns} turns
        </p>
      </div>
      <p className="lab-calc-note">
        Illustration, not a quote. Default rent is the {facts.localRent.source} average for Hampton Roads apartments.
      </p>
    </div>
  );
}
