'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { audiences, audienceById, type AudienceId, type Field } from '@/data/labradon/audiences';
import { site } from '@/data/labradon/site';

type Contact = { name: string; company: string; phone: string; email: string; prefer: string };

function FieldInput({ field, value, onChange }: { field: Field; value: string; onChange: (v: string) => void }) {
  const id = `req-${field.name}`;
  const common = { id, name: field.name, required: !field.optional, value, placeholder: field.placeholder };
  return (
    <label className="lab-field" htmlFor={id}>
      <span>
        {field.label}
        {field.optional && <em> optional</em>}
      </span>
      {field.type === 'select' ? (
        <select {...common} onChange={(e) => onChange(e.target.value)}>
          <option value="">Choose one</option>
          {field.options?.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      ) : field.type === 'textarea' ? (
        <textarea {...common} rows={4} onChange={(e) => onChange(e.target.value)} />
      ) : (
        <input {...common} type={field.type} min={field.type === 'number' ? 1 : undefined} onChange={(e) => onChange(e.target.value)} />
      )}
    </label>
  );
}

/**
 * Three short steps: who you are, the property, how to reach you. Step two's
 * fields depend on the audience. Preview only: nothing is posted or stored; the
 * final screen offers to open the visitor's own email app with the request.
 */
export function RequestForm({ initialFor }: { initialFor?: string }) {
  const [who, setWho] = useState<AudienceId | ''>(audienceById(initialFor)?.id ?? '');
  const [step, setStep] = useState(who ? 2 : 1);
  const [details, setDetails] = useState<Record<string, string>>({});
  const [contact, setContact] = useState<Contact>({ name: '', company: '', phone: '', email: '', prefer: 'Call' });
  const [done, setDone] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);
  const audience = audienceById(who || undefined);

  useEffect(() => {
    heading.current?.focus({ preventScroll: true });
  }, [step, done]);

  const lines = useMemo(() => {
    if (!audience) return [];
    return [
      ['Request', audience.task],
      ['From', `${contact.name}${contact.company ? `, ${contact.company}` : ''}`],
      ...audience.fields.filter((f) => details[f.name]).map((f) => [f.label, details[f.name]]),
      ['Phone', contact.phone],
      ['Email', contact.email],
      ['Prefers', contact.prefer],
    ] as [string, string][];
  }, [audience, contact, details]);

  const mailto = `mailto:${site.email}?subject=${encodeURIComponent(`Walkthrough request: ${audience?.task ?? ''}`)}&body=${encodeURIComponent(
    lines.map(([k, v]) => `${k}: ${v}`).join('\n'),
  )}`;

  if (done && audience) {
    return (
      <div className="lab-form lab-form-done">
        <p className="lab-kicker">Request ready</p>
        <h2 ref={heading} tabIndex={-1}>
          Thanks, {contact.name.split(' ')[0] || 'there'}. Here is your request.
        </h2>
        <dl className="lab-workorder">
          {lines.map(([k, v]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
        <p className="lab-form-note">
          Design preview: nothing has been sent or saved. On the live site this goes straight to LabraDon, and {site.replyPromise.toLowerCase()}
        </p>
        <div className="lab-actions">
          <a className="lab-btn" href={mailto}>
            Email this request
          </a>
          <a className="lab-link" href={site.phoneHref}>
            Or call {site.phone}
          </a>
        </div>
      </div>
    );
  }

  return (
    <form
      className="lab-form"
      onSubmit={(e) => {
        e.preventDefault();
        if (step < 3) setStep(step + 1);
        else setDone(true);
      }}
    >
      <div className="lab-steps" aria-label={`Step ${step} of 3`}>
        {['You', 'The property', 'Contact'].map((s, i) => (
          <span key={s} className={i + 1 <= step ? 'is-on' : ''}>
            <b>{String(i + 1).padStart(2, '0')}</b> {s}
          </span>
        ))}
      </div>

      {step === 1 && (
        <fieldset>
          <legend>
            <h2 ref={heading} tabIndex={-1}>
              What can we help with?
            </h2>
          </legend>
          <div className="lab-choices">
            {audiences.map((a) => (
              <label key={a.id} className="lab-choice">
                <input type="radio" name="who" value={a.id} required checked={who === a.id} onChange={() => setWho(a.id)} />
                <span>
                  <b>{a.task}</b>
                  <small>{a.who}</small>
                </span>
              </label>
            ))}
          </div>
        </fieldset>
      )}

      {step === 2 && audience && (
        <fieldset>
          <legend>
            <h2 ref={heading} tabIndex={-1}>
              {audience.headline}
            </h2>
          </legend>
          <div className="lab-fields">
            {audience.fields.map((f) => (
              <FieldInput key={f.name} field={f} value={details[f.name] ?? ''} onChange={(v) => setDetails((d) => ({ ...d, [f.name]: v }))} />
            ))}
          </div>
        </fieldset>
      )}

      {step === 3 && (
        <fieldset>
          <legend>
            <h2 ref={heading} tabIndex={-1}>
              How do we reach you?
            </h2>
          </legend>
          <div className="lab-fields">
            <FieldInput field={{ name: 'name', label: 'Your name', type: 'text' }} value={contact.name} onChange={(v) => setContact({ ...contact, name: v })} />
            <FieldInput field={{ name: 'company', label: 'Company', type: 'text', optional: true }} value={contact.company} onChange={(v) => setContact({ ...contact, company: v })} />
            <label className="lab-field" htmlFor="req-phone">
              <span>Phone</span>
              <input id="req-phone" type="tel" autoComplete="tel" required value={contact.phone} onChange={(e) => setContact({ ...contact, phone: e.target.value })} />
            </label>
            <label className="lab-field" htmlFor="req-email">
              <span>Email</span>
              <input id="req-email" type="email" autoComplete="email" required value={contact.email} onChange={(e) => setContact({ ...contact, email: e.target.value })} />
            </label>
            <FieldInput
              field={{ name: 'prefer', label: 'Best way to reach you', type: 'select', options: ['Call', 'Text', 'Email'] }}
              value={contact.prefer}
              onChange={(v) => setContact({ ...contact, prefer: v })}
            />
          </div>
        </fieldset>
      )}

      <div className="lab-form-actions">
        {step > 1 && (
          <button type="button" className="lab-link" onClick={() => setStep(step - 1)}>
            Back
          </button>
        )}
        <button type="submit" className="lab-btn">
          {step === 3 ? 'Review request' : 'Continue'}
        </button>
      </div>
      <p className="lab-form-note">Design preview. Nothing you enter is sent or saved.</p>
    </form>
  );
}
