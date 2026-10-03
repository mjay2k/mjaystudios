'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { cities, email, image, phone, phoneHref, projects, services } from './data';

type Direction = 'standard' | 'partner';
type Inquiry = { role?: string; service?: string };
type Project = (typeof projects)[number];

function Plus({ minus = false }: { minus?: boolean }) {
  return <svg viewBox="0 0 24 24" width="24" height="24" fill="none" aria-hidden="true"><path d="M5 12h14" stroke="currentColor" strokeWidth="1.5" />{!minus && <path d="M12 5v14" stroke="currentColor" strokeWidth="1.5" />}</svg>;
}

export function PreviewBar({ direction }: { direction?: Direction }) {
  return <div className="ld-preview"><Link href="/labradon" className="ld-preview-brand">MJAY STUDIOS <span>/ LABRADON PREVIEW</span></Link><nav aria-label="Design directions"><Link aria-current={direction === 'standard' ? 'page' : undefined} href="/labradon">01 <span>The Property Standard</span></Link><Link aria-current={direction === 'partner' ? 'page' : undefined} href="/labradon/partner">02 <span>The Operating Partner</span></Link><Link href="/labradon/strategy" className="ld-preview-notes">Design notes</Link></nav></div>;
}

function Header({ direction, onInquiry, work = false }: { direction: Direction; onInquiry: (v?: Inquiry) => void; work?: boolean }) {
  const [menu, setMenu] = useState(false);
  const root = direction === 'partner' ? '/labradon/partner' : '/labradon';
  return <header className={`ld-header ${direction === 'partner' ? 'ld-header-dark' : ''}`}>
    <Link href={root} aria-label="LabraDon Properties home" className="ld-brand"><Image src={image('LabraDon-horizontal-logo')} alt="LabraDon Properties LLC — Labrador and house logo" width={676} height={160} sizes="(max-width: 800px) 230px, 280px" priority /></Link>
    <button className="ld-menu-toggle" aria-expanded={menu} aria-controls="ld-main-nav" onClick={() => setMenu(!menu)}>{menu ? 'Close' : 'Menu'} <Plus minus={menu} /></button>
    <nav id="ld-main-nav" className={menu ? 'is-open' : ''} aria-label="Main navigation" onKeyDown={e => { if (e.key === 'Escape') setMenu(false); }}>
      <Link href={work ? `${root}#services` : '#services'} onClick={() => setMenu(false)}>What we do</Link>
      <Link href="/labradon/work" onClick={() => setMenu(false)}>Our work</Link>
      <Link href={work ? `${root}#about` : '#about'} onClick={() => setMenu(false)}>Our story</Link>
      <a href={phoneHref} className="ld-nav-phone">{phone}</a>
      <button className="ld-button ld-button-small" onClick={() => { setMenu(false); onInquiry(); }}>Let’s talk property</button>
    </nav>
  </header>;
}

function Hero({ direction, onInquiry }: { direction: Direction; onInquiry: (v?: Inquiry) => void }) {
  if (direction === 'partner') return <section className="ld-partner-hero">
    <div className="ld-partner-hero-copy"><p className="ld-eyebrow"><span className="ld-tiny-rule" /> VETERAN-OWNED. LOCALLY ACCOUNTABLE.</p><h1>Vacant.<br />Ready.<br /><span>Valuable.</span></h1><p className="ld-hero-description">Your next tenant shouldn’t have to wait on your next contractor.</p><p className="ld-partner-subcopy">Turnovers, repairs and final cleaning. One point of contact for the work between move-out and move-in.</p><button className="ld-button" onClick={() => onInquiry({ role: 'Property manager', service: 'Unit turnovers' })}>Plan your next turnover</button></div>
    <div className="ld-partner-hero-photo"><Image src={image('IMG_9813-1024x768')} alt="LabraDon’s completed Chesapeake turnover with fresh paint, white trim and wood-look flooring" fill sizes="(max-width: 800px) 100vw, 58vw" priority /><div className="ld-photo-caption"><span>THE WORK BETWEEN TENANTS</span><strong>One partner.<br />Every phase.</strong></div><span className="ld-photo-index">HAMPTON ROADS / VA</span></div>
    <div className="ld-partner-hero-base"><span>FOR PROPERTY MANAGERS, INVESTORS & OWNERS</span><a href="#results">See what a finished turnover looks like</a></div>
  </section>;
  return <section className="ld-standard-hero">
    <div className="ld-hero-image"><Image src={image('721F1D2D-DEEE-4758-8853-843674566884')} alt="A bright living room with natural light, warm wood floors and white seating" fill sizes="100vw" priority /></div>
    <div className="ld-standard-hero-copy"><p className="ld-eyebrow">PROPERTY SERVICES · HAMPTON ROADS, VA</p><h1>Every property.<br /><em>More possibility.</em></h1><p className="ld-hero-description">From the home you love to the properties you own. Renovation, turnover and care, brought together.</p><div className="ld-hero-actions"><button className="ld-button ld-button-white" onClick={() => onInquiry()}>Tell us about your property</button><Link className="ld-text-link ld-link-white" href="/labradon/work">Explore our work</Link></div><div className="ld-hero-signature"><span className="ld-signature-mark">L</span><span>VETERAN OWNED & OPERATED<br /><small>Care in the details. Pride in the finish.</small></span></div></div>
    <div className="ld-hero-project-label"><span>CARE FOR WHAT COMES NEXT.</span><p>Made for living.<br />Ready for possibility.</p></div>
    <a className="ld-hero-scroll" href="#results">SCROLL TO DISCOVER <span>↓</span></a>
  </section>;
}

function TrustStrip() { return <div className="ld-trust-strip"><span>Veteran-owned & operated</span><span>One point of contact</span><span>From repair to final clean</span><span>Local to Hampton Roads</span></div>; }

function ProjectFeature({ direction, onOpen }: { direction: Direction; onOpen: (p: Project) => void }) {
  const [state, setState] = useState<'after' | 'before'>('after');
  const p = projects[0];
  return <section id="results" className="ld-section ld-project-section">
    <div className="ld-section-heading"><p className="ld-eyebrow">01 / PROOF IN THE PROPERTY</p><div><h2>{direction === 'partner' ? <>Ready is in<br />the details.</> : <>The difference<br /><em>is in the details.</em></>}</h2><p>Real properties. Visible progress. A closer look at the work that turns the next chapter into a place you can walk into.</p></div><Link className="ld-text-link" href="/labradon/work">View all projects</Link></div>
    <div className="ld-project-display"><div className="ld-project-image"><Image key={state} src={image(p[state])} alt={state === 'after' ? p.alt : 'Chesapeake living room before turnover, with dated carpet, paint and belongings'} fill sizes="(max-width: 800px) 100vw, 72vw" /><div className="ld-image-switch" role="group" aria-label="View project before or after"><button aria-pressed={state === 'before'} onClick={() => setState('before')}>Before</button><button aria-pressed={state === 'after'} onClick={() => setState('after')}>After</button></div><span className="ld-image-state" aria-live="polite">{state === 'after' ? 'THE FINISHED SPACE' : 'THE STARTING POINT'}</span></div><div className="ld-project-story"><span className="ld-project-category">{p.category}</span><h3>{p.title}</h3><p>{p.summary}</p><ul>{p.facts.map(f => <li key={f}>{f}</li>)}</ul><button className="ld-text-link" onClick={() => onOpen(p)}>Take a closer look</button><span className="ld-project-location">CHESAPEAKE / VIRGINIA</span></div></div>
  </section>;
}

function Services({ direction, onInquiry }: { direction: Direction; onInquiry: (v?: Inquiry) => void }) {
  const [active, setActive] = useState<string | null>('turnovers');
  return <section id="services" className={`ld-section ld-services ${direction === 'partner' ? 'ld-service-grid-section' : ''}`}>
    <div className="ld-section-heading"><p className="ld-eyebrow">02 / ONE PARTNER, EVERY PHASE</p><div><h2>{direction === 'partner' ? <>Everything between<br />vacant and ready.</> : <>Your property.<br /><em>Our responsibility.</em></>}</h2><p>One company for the work that keeps your property moving. Choose what you need. We’ll help bring the pieces together.</p></div></div>
    {direction === 'partner' ? <div className="ld-service-grid">{services.map(s => <article key={s.id}><span className="ld-service-number">{s.number}</span><h3>{s.title}</h3><p>{s.text}</p><ul>{s.items.slice(0,3).map(i => <li key={i}>{i}</li>)}</ul><button className="ld-text-link" onClick={() => onInquiry({service:s.title})}>Discuss {s.title.toLowerCase()}</button></article>)}</div> : <div className="ld-service-list">{services.map(s => <article className={active === s.id ? 'is-active' : ''} key={s.id}><button className="ld-service-trigger" aria-expanded={active === s.id} aria-controls={`service-${s.id}`} onClick={() => setActive(active === s.id ? null : s.id)}><span>{s.number}</span><h3>{s.title}</h3><span className="ld-service-line">{s.line}</span><Plus minus={active === s.id} /></button><div id={`service-${s.id}`} hidden={active !== s.id} className="ld-service-detail"><p>{s.text}</p><ul>{s.items.map(i => <li key={i}>{i}</li>)}</ul><button className="ld-text-link" onClick={() => onInquiry({service:s.title})}>Let’s talk about your project</button></div></article>)}</div>}
  </section>;
}

function Audience({ onInquiry }: { onInquiry: (v?: Inquiry) => void }) {
  return <section className="ld-audience ld-section"><p className="ld-eyebrow">FOR THE PEOPLE BEHIND THE PROPERTY</p><h2>A home. A portfolio.<br /><em>A partner you can count on.</em></h2><div className="ld-audience-grid">{[
    ['Property managers', 'Keep your next move-in moving.', 'Unit turnovers and ongoing support, with one accountable point of contact.', 'Property manager'],
    ['Homeowners', 'Make room for what’s next.', 'Repairs, practical renovations, and preparation for renting or selling your home.', 'Homeowner'],
    ['Investors & agents', 'Get the property ready to perform.', 'Cleanouts, improvements and punch-list work before a listing or a new lease.', 'Investor / real estate agent'],
  ].map(([label,title,text,role]) => <article key={role}><span>{label}</span><h3>{title}</h3><p>{text}</p><button className="ld-text-link" onClick={() => onInquiry({role})}>Start a conversation</button></article>)}</div></section>;
}

function VacancyCalculator({ onInquiry }: { onInquiry: (v?: Inquiry) => void }) {
  const [rent, setRent] = useState(1800);
  const [turns, setTurns] = useState(12);
  const [days, setDays] = useState(5);
  const value = Math.round(rent / 30 * turns * days);
  return <section className="ld-section ld-calculator"><div><p className="ld-eyebrow">THE BUSINESS CASE FOR BETTER TURNS</p><h2>Empty days<br />add up.</h2><p>See the rent exposure associated with vacancy time across your properties. Use your own numbers to put the opportunity in perspective.</p><button className="ld-text-link" onClick={() => onInquiry({role:'Property manager',service:'Unit turnovers'})}>Talk about your portfolio</button></div><div className="ld-calculator-panel"><div className="ld-calculator-inputs">{[
    {label:'Average monthly rent',id:'rent',value:rent,min:500,max:5000,step:50,set:setRent,display:`$${rent.toLocaleString()}`},
    {label:'Turnovers per year',id:'turns',value:turns,min:1,max:100,step:1,set:setTurns,display:String(turns)},
    {label:'Vacancy days to compare per turn',id:'days',value:days,min:1,max:30,step:1,set:setDays,display:String(days)},
  ].map(i=><label key={i.id} htmlFor={`calc-${i.id}`}><span>{i.label}<strong>{i.display}</strong></span><input id={`calc-${i.id}`} type="range" min={i.min} max={i.max} step={i.step} value={i.value} onChange={e=>i.set(Number(e.target.value))}/></label>)}</div><div className="ld-calculator-result" aria-live="polite"><span>ILLUSTRATIVE ANNUAL RENT EXPOSURE</span><strong>${value.toLocaleString()}</strong><p>Monthly rent ÷ 30 × vacancy days × annual turnovers.</p></div><p className="ld-calculator-note">An illustration, not a quote or a savings guarantee. Actual rent, vacancy, scheduling and project scope vary.</p></div></section>;
}

function Process({ direction }: { direction: Direction }) {
  return <section className="ld-section ld-process"><div className="ld-process-heading"><p className="ld-eyebrow">03 / A CLEAR WAY FORWARD</p><h2>{direction === 'partner' ? <>One contact.<br />A clear path.</> : <>Less to coordinate.<br /><em>More to look forward to.</em></>}</h2><p>You should know what’s happening at your property, and what happens next.</p></div><ol>{[
    ['Walk the property', 'We start with the condition of the space, your priorities and the work you need completed.'],
    ['Agree on the scope', 'Clarify the work, scheduling and condition-based services before the project moves forward.'],
    ['Bring it together', 'Repairs, improvements and cleaning are coordinated with clear communication throughout.'],
    ['Finish with care', 'A final quality check and attention to presentation, so the space is ready for its next chapter.'],
  ].map(([title,text],i)=><li key={title}><span>0{i+1}</span><div><h3>{title}</h3><p>{text}</p></div></li>)}</ol></section>;
}

function Founder({ direction }: { direction: Direction }) {
  return <section id="about" className={`ld-founder ${direction === 'partner' ? 'ld-founder-partner' : ''}`}><div className="ld-founder-photo"><Image src={image('IMG_3871')} alt="Founder Seth French with his Labrador Donnie on the Virginia coast" fill sizes="(max-width: 800px) 100vw, 45vw" /><span>SETH & DONNIE / THE STORY BEHIND THE NAME</span></div><div className="ld-founder-copy"><p className="ld-eyebrow">VETERAN OWNED. PERSONALLY INVESTED.</p><h2>{direction === 'partner' ? <>Built on discipline.<br />Grounded in care.</> : <>Good work starts<br /><em>with good people.</em></>}</h2><p>After serving in the United States Marine Corps, Seth French brought his focus on integrity, discipline and attention to detail to the properties and people of Hampton Roads.</p><p>LabraDon takes its name from his Labrador, Donnie. That personal connection says something about the business: local roots, hands-on work, and care for the people who trust us with their property.</p><div className="ld-founder-name"><strong>Seth French</strong><span>FOUNDER, LABRADON PROPERTIES</span></div><div className="ld-founder-values"><span>Integrity.</span><span>Discipline.</span><span>Attention to detail.</span></div></div></section>;
}

function FAQ() {
  const items = [
    ['Where do you work?', 'LabraDon is based in Hampton Roads, Virginia, serving Norfolk, Virginia Beach, Chesapeake, Portsmouth, Suffolk, Hampton and Newport News. Tell us the location of your property so we can confirm service availability.'],
    ['Can you handle more than one rental unit?', 'Yes. LabraDon supports property managers, landlords and residential portfolios with unit turnovers and make-ready services. Share the number of units and your upcoming schedule to discuss a coordinated scope.'],
    ['What if the property needs more than cleaning?', 'Repairs, painting, flooring, light carpentry and debris removal can be coordinated alongside the clean. Heavy soil, odors and other special conditions are assessed separately, with the additional scope clarified before work begins when possible.'],
    ['How long does a project take?', 'Timing depends on property condition, scope and scheduling. A five-day apartment turnover is documented in our gallery; it is an example of a completed project, not a promised turnaround for every property. A walkthrough helps establish a realistic plan.'],
  ];
  return <section className="ld-section ld-faq"><div><p className="ld-eyebrow">BEFORE WE GET STARTED</p><h2>A few good<br />questions.</h2></div><div>{items.map(([q,a])=><details key={q}><summary>{q}<Plus /></summary><p>{a}</p></details>)}</div></section>;
}

function Footer({ onInquiry }: { onInquiry: (v?: Inquiry) => void }) {
  return <footer className="ld-footer"><div className="ld-footer-top"><div><p className="ld-eyebrow">YOUR NEXT CHAPTER STARTS HERE</p><h2>Let’s put your<br /><em>property in good hands.</em></h2></div><div className="ld-footer-contact"><button className="ld-button ld-button-white" onClick={() => onInquiry()}>Tell us what you have in mind</button><a href={phoneHref}>{phone}</a><a href={`mailto:${email}`}>{email}</a></div></div><div className="ld-footer-bottom"><Link href="/labradon" aria-label="LabraDon home"><Image src={image('LabraDon-horizontal-logo')} alt="LabraDon Properties LLC" width={676} height={160} sizes="(max-width: 800px) 230px, 260px"/></Link><p>VETERAN-OWNED PROPERTY SERVICES<br /><span>{cities.join(' · ')}</span></p><div><span>© {new Date().getFullYear()} LabraDon Properties LLC</span><span>Design preview by MJay Studios</span></div></div></footer>;
}

function Modal({ children, onClose, label, className = '' }: { children: React.ReactNode; onClose: () => void; label: string; className?: string }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current;
    const overflow = document.body.style.overflow;
    dialog?.showModal();
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = overflow; dialog?.close(); };
  }, []);
  return <dialog ref={ref} className={`ld-modal ${className}`} aria-label={label} onCancel={onClose} onClick={e=>{if(e.target===e.currentTarget)onClose();}}><button className="ld-modal-close" onClick={onClose} aria-label={`Close ${label}`}>Close <span>×</span></button>{children}</dialog>;
}

function InquiryModal({ initial, onClose }: { initial: Inquiry; onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [done, setDone] = useState(false);
  const [brief, setBrief] = useState({role:initial.role || '',service:initial.service || '',city:'',timeline:'',name:'',email:'',phone:'',message:''});
  const [copied, setCopied] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const field = (key: keyof typeof brief, value: string) => setBrief(prev=>({...prev,[key]:value}));
  useEffect(()=>{titleRef.current?.focus();},[step,done]);
  const text = `LabraDon project brief\nName: ${brief.name}\nEmail: ${brief.email}\nPhone: ${brief.phone || 'Not provided'}\nRole: ${brief.role}\nService: ${brief.service}\nLocation: ${brief.city}\nTiming: ${brief.timeline}\nDetails: ${brief.message || 'Not provided'}`;
  return <Modal label="Project inquiry" onClose={onClose} className="ld-inquiry"><p className="ld-eyebrow">LET’S TALK ABOUT YOUR PROPERTY</p><h2 ref={titleRef} tabIndex={-1}>{done ? 'Your brief is ready.' : step === 1 ? 'What’s your next chapter?' : step === 2 ? 'A little about the property.' : 'How can we reach you?'}</h2><p className="ld-preview-form-note">Client design preview. No inquiry will be sent.</p>{done ? <div className="ld-inquiry-complete"><p>This is how the finished website will capture a useful project inquiry. Your information has not been submitted or saved.</p><dl><div><dt>Project</dt><dd>{brief.service}</dd></div><div><dt>Location</dt><dd>{brief.city}</dd></div><div><dt>Timing</dt><dd>{brief.timeline}</dd></div><div><dt>Contact</dt><dd>{brief.name} · {brief.email}</dd></div></dl><button className="ld-button" onClick={async()=>{try{await navigator.clipboard.writeText(text);setCopied(true);}catch{setCopied(false);}}}>{copied?'Brief copied':'Copy project brief'}</button><button className="ld-text-link" onClick={onClose}>Back to the website</button></div> : <form onSubmit={e=>{e.preventDefault();if(step<3)setStep(step+1);else setDone(true);}}><div className="ld-form-progress" aria-label={`Step ${step} of 3`}>{[1,2,3].map(i=><span key={i} className={i<=step?'is-active':''}/>)}<small>0{step} / 03</small></div>{step===1?<><fieldset><legend>I’m a…</legend><div className="ld-choice-grid">{['Property manager','Homeowner','Investor / real estate agent','Commercial property owner'].map(v=><label key={v}><input type="radio" name="role" required value={v} checked={brief.role===v} onChange={()=>field('role',v)}/><span>{v}</span></label>)}</div></fieldset><label className="ld-form-field">What do you need?<select required value={brief.service} onChange={e=>field('service',e.target.value)}><option value="">Choose a service</option>{services.map(s=><option key={s.id}>{s.title}</option>)}<option>Not sure yet — let’s discuss</option></select></label></>:step===2?<><label className="ld-form-field">Property location<select required value={brief.city} onChange={e=>field('city',e.target.value)}><option value="">Choose a city</option>{cities.map(c=><option key={c}>{c}</option>)}<option>Another nearby location</option></select></label><label className="ld-form-field">When are you hoping to start?<select required value={brief.timeline} onChange={e=>field('timeline',e.target.value)}><option value="">Choose a timeframe</option><option>As soon as possible</option><option>Within the next month</option><option>In 1–3 months</option><option>Planning ahead / recurring work</option></select></label><label className="ld-form-field">Anything we should know? <span>(optional)</span><textarea rows={3} value={brief.message} placeholder="Property condition, number of units, or the work you have in mind…" onChange={e=>field('message',e.target.value)}/></label></>:<><label className="ld-form-field">Your name<input autoComplete="name" required value={brief.name} onChange={e=>field('name',e.target.value)}/></label><label className="ld-form-field">Email address<input type="email" autoComplete="email" required value={brief.email} onChange={e=>field('email',e.target.value)}/></label><label className="ld-form-field">Phone number <span>(optional)</span><input type="tel" autoComplete="tel" value={brief.phone} onChange={e=>field('phone',e.target.value)}/></label></>}<div className="ld-form-actions">{step>1&&<button type="button" className="ld-text-link" onClick={()=>setStep(step-1)}>Back</button>}<button className="ld-button" type="submit">{step===3?'Preview my inquiry':'Continue'}</button></div></form>}</Modal>;
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const [selected, setSelected] = useState(0);
  return <Modal label="Project gallery" onClose={onClose} className="ld-project-modal"><div className="ld-project-modal-image"><Image src={image(project.gallery[selected])} alt={`${project.category}: ${selected===0?project.alt:'additional finished room, photo '+(selected+1)}`} fill sizes="(max-width: 800px) 100vw, 65vw"/></div><div className="ld-project-modal-content"><p className="ld-eyebrow">{project.category}</p><h2>{project.title}</h2><p>{project.summary}</p><div className="ld-thumbnails" role="group" aria-label="Project photos">{project.gallery.map((f,i)=><button key={f} onClick={()=>setSelected(i)} aria-pressed={i===selected} aria-label={`Show project photo ${i+1}`}><Image src={image(f)} alt="" fill sizes="90px"/></button>)}</div><p className="ld-image-credit">Original LabraDon project photography.<br />{project.tag}</p></div></Modal>;
}

export function Site({ direction }: { direction: Direction }) {
  const [inquiry, setInquiry] = useState<Inquiry | null>(null);
  const [project, setProject] = useState<Project | null>(null);
  const open = (v: Inquiry = {}) => setInquiry(v);
  return <div className={`ld-site ld-${direction}`}><a href="#ld-main" className="ld-skip">Skip to content</a><PreviewBar direction={direction}/><Header direction={direction} onInquiry={open}/><main id="ld-main"><Hero direction={direction} onInquiry={open}/><TrustStrip/><ProjectFeature direction={direction} onOpen={setProject}/><Services direction={direction} onInquiry={open}/>{direction==='partner'?<VacancyCalculator onInquiry={open}/>:<Audience onInquiry={open}/>}<Process direction={direction}/><Founder direction={direction}/><FAQ/></main><Footer onInquiry={open}/><div className="ld-mobile-cta"><a href={phoneHref}>Call LabraDon</a><button onClick={()=>open()}>Start a project</button></div>{inquiry&&<InquiryModal initial={inquiry} onClose={()=>setInquiry(null)}/>} {project&&<ProjectModal project={project} onClose={()=>setProject(null)}/>}</div>;
}

export function WorkPage() {
  const [inquiry,setInquiry]=useState<Inquiry|null>(null);
  const [project,setProject]=useState<Project|null>(null);
  return <div className="ld-site ld-standard"><a href="#ld-main" className="ld-skip">Skip to content</a><PreviewBar/><Header direction="standard" work onInquiry={(v={})=>setInquiry(v)}/><main id="ld-main" className="ld-section ld-work-page"><p className="ld-eyebrow">THE LABRADON PROJECT JOURNAL</p><h1>See the work.<br /><em>Picture the possibilities.</em></h1><p className="ld-work-intro">Real transformations from the LabraDon gallery. Fresh paint, updated flooring, thoughtful repairs, and spaces ready for what’s next.</p><div className="ld-work-grid">{projects.map(p=><article key={p.title}><button className="ld-work-photo" onClick={()=>setProject(p)} aria-label={`View ${p.category} project`}><Image src={image(p.after)} alt={p.alt} fill sizes="(max-width: 800px) 100vw, 48vw"/><span>VIEW PROJECT</span></button><div className="ld-work-title"><div><p className="ld-eyebrow">{p.tag}</p><h2>{p.title}</h2></div><button aria-label={`Open ${p.title}`} onClick={()=>setProject(p)}><Plus/></button></div><p>{p.summary}</p><details className="ld-work-before"><summary>See the starting point <Plus/></summary><div><Image src={image(p.before)} alt={`${p.category} before the work began`} width={640} height={480}/></div></details></article>)}</div></main><Footer onInquiry={(v={})=>setInquiry(v)}/>{inquiry&&<InquiryModal initial={inquiry} onClose={()=>setInquiry(null)}/>} {project&&<ProjectModal project={project} onClose={()=>setProject(null)}/>}</div>;
}
