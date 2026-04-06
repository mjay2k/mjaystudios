'use client';

import { useState } from 'react';

const displayFonts = [
  // === RETURNING CHAMPION ===
  {
    name: 'Syne',
    style: 'Modern geometric with artistic weight shifts',
    url: 'https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&display=swap',
    family: "'Syne', sans-serif",
    vibe: 'Round 1 favorite — bold, contemporary, slightly experimental',
    champion: true,
  },
  // === NEW CHALLENGERS ===
  {
    name: 'Archivo Black + Archivo',
    style: 'Heavy gothic display with matching family',
    url: 'https://fonts.googleapis.com/css2?family=Archivo+Black&family=Archivo:wght@400;500;600;700&display=swap',
    family: "'Archivo Black', sans-serif",
    vibe: 'Commanding presence, industrial edge with clean lines',
    champion: false,
  },
  {
    name: 'Darker Grotesque',
    style: 'Condensed modern with dramatic thin-to-bold range',
    url: 'https://fonts.googleapis.com/css2?family=Darker+Grotesque:wght@400;500;600;700;800;900&display=swap',
    family: "'Darker Grotesque', sans-serif",
    vibe: 'Artistic tension — delicate at light weights, powerful at bold',
    champion: false,
  },
  {
    name: 'Familjen Grotesk',
    style: 'Swedish-designed with subtle optical personality',
    url: 'https://fonts.googleapis.com/css2?family=Familjen+Grotesk:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap',
    family: "'Familjen Grotesk', sans-serif",
    vibe: 'Understated confidence, the "I know what I\'m doing" font',
    champion: false,
  },
  {
    name: 'Bricolage Grotesque',
    style: 'Expressive variable with optical sizing and width variation',
    url: 'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,500;12..96,600;12..96,700;12..96,800&display=swap',
    family: "'Bricolage Grotesque', sans-serif",
    vibe: 'Playful at display sizes, serious at text — dual personality',
    champion: false,
  },
  {
    name: 'Be Vietnam Pro',
    style: 'Sharp geometric with Vietnamese-inspired letterforms',
    url: 'https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400&display=swap',
    family: "'Be Vietnam Pro', sans-serif",
    vibe: 'Precise, modern, unexpectedly distinctive at large sizes',
    champion: false,
  },
  {
    name: 'Cabinet Grotesk (via Epilogue)',
    style: 'Contemporary geometric grotesk with personality',
    url: 'https://fonts.googleapis.com/css2?family=Epilogue:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400&display=swap',
    family: "'Epilogue', sans-serif",
    note: '(Showing Epilogue — Cabinet Grotesk is premium Fontshare)',
    vibe: 'Art director\'s grotesk — clean but never boring',
    champion: false,
  },
  {
    name: 'Schibsted Grotesk',
    style: 'Nordic design with strong geometry and editorial presence',
    url: 'https://fonts.googleapis.com/css2?family=Schibsted+Grotesk:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400&display=swap',
    family: "'Schibsted Grotesk', sans-serif",
    vibe: 'Scandinavian precision meets creative warmth',
    champion: false,
  },
];

const bodyFonts = [
  {
    name: 'Plus Jakarta Sans',
    url: 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;1,400&display=swap',
    family: "'Plus Jakarta Sans', sans-serif",
    champion: true,
  },
  {
    name: 'Nunito Sans',
    url: 'https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,400;0,6..12,500;0,6..12,600;1,6..12,400&display=swap',
    family: "'Nunito Sans', sans-serif",
    champion: false,
  },
  {
    name: 'Outfit',
    url: 'https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600&display=swap',
    family: "'Outfit', sans-serif",
    champion: false,
  },
  {
    name: 'Figtree',
    url: 'https://fonts.googleapis.com/css2?family=Figtree:ital,wght@0,400;0,500;0,600;1,400&display=swap',
    family: "'Figtree', sans-serif",
    champion: false,
  },
];

const sampleText = {
  hero: 'Created to Create',
  subtitle: 'A career in art direction, brand design, and building things that matter.',
  era: 'Agency Life',
  project: 'Heaven Hill Brands',
  body: 'Bourbon and spirits branding, packaging, and advertising campaigns spanning print, outdoor, and digital.',
  nav: 'Timeline  By Type  About  Contact',
};

export default function FontSampler() {
  const [selectedBody, setSelectedBody] = useState(0); // Plus Jakarta Sans default

  return (
    <>
      {displayFonts.map((f) => (
        <link key={f.name} rel="stylesheet" href={f.url} />
      ))}
      {bodyFonts.map((f) => (
        <link key={f.name} rel="stylesheet" href={f.url} />
      ))}

      <div className="min-h-screen bg-neutral-100 px-8 py-12 max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold mb-2">Font Sampler — Round 2</h1>
        <p className="text-sm text-neutral-500 mb-1">
          Syne returns as the champion from Round 1. Seven new challengers in the same lane — modern geometric with artistic character.
        </p>
        <p className="text-xs text-neutral-400 mb-8">
          Body font defaults to your Round 1 pick (Plus Jakarta Sans). Three new body options added to test pairings.
        </p>

        {/* Body font selector */}
        <div className="mb-12 flex flex-wrap items-center gap-3">
          <span className="text-xs font-medium text-neutral-400 uppercase tracking-wider">Body font:</span>
          {bodyFonts.map((f, i) => (
            <button
              key={f.name}
              onClick={() => setSelectedBody(i)}
              className={`rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
                selectedBody === i
                  ? 'bg-neutral-900 text-white'
                  : 'bg-neutral-200 text-neutral-600 hover:bg-neutral-300'
              }`}
            >
              {f.name} {f.champion ? '★' : ''}
            </button>
          ))}
        </div>

        {/* Display font options */}
        {displayFonts.map((font, index) => (
          <div
            key={font.name}
            className={`mb-16 pb-16 border-b border-neutral-200 last:border-0 ${
              font.champion ? 'bg-neutral-50 -mx-8 px-8 py-8 rounded-2xl border border-neutral-200' : ''
            }`}
          >
            {/* Option label */}
            <div className="flex flex-wrap items-baseline gap-4 mb-6">
              <span className={`text-xs font-bold uppercase tracking-widest ${
                font.champion ? 'text-orange-500' : 'text-neutral-400'
              }`}>
                {font.champion ? 'Returning champion' : `Challenger ${index}`}
              </span>
              <span className="text-sm font-semibold text-neutral-700">
                {font.name}
              </span>
              <span className="text-xs text-neutral-400">
                {font.style}
              </span>
            </div>
            {font.note && (
              <p className="text-[10px] text-neutral-400 -mt-4 mb-6">{font.note}</p>
            )}

            {/* Vibe tag */}
            <div className="mb-8">
              <span className={`inline-block rounded-full px-3 py-1 text-[10px] font-medium ${
                font.champion ? 'bg-orange-100 text-orange-600' : 'bg-neutral-200 text-neutral-500'
              }`}>
                {font.vibe}
              </span>
            </div>

            {/* Sample: Hero */}
            <div className="mb-8">
              <h2
                style={{ fontFamily: font.family }}
                className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.05]"
              >
                {sampleText.hero}
              </h2>
              <p
                style={{ fontFamily: bodyFonts[selectedBody].family }}
                className="mt-4 text-lg text-neutral-500 max-w-md"
              >
                {sampleText.subtitle}
              </p>
            </div>

            {/* Sample: Era title + section */}
            <div className="mb-8 flex flex-col md:flex-row gap-8">
              <div className="flex-1">
                <h3
                  style={{ fontFamily: font.family }}
                  className="text-3xl md:text-5xl font-bold text-red-500 tracking-tight mb-3"
                >
                  {sampleText.era}
                </h3>
                <p
                  style={{ fontFamily: bodyFonts[selectedBody].family }}
                  className="text-sm text-neutral-400"
                >
                  2010 — 2017
                </p>
              </div>
              <div className="flex-1">
                <h3
                  style={{ fontFamily: font.family }}
                  className="text-3xl md:text-5xl font-bold text-blue-500 tracking-tight mb-3"
                >
                  Berry Life
                </h3>
                <p
                  style={{ fontFamily: bodyFonts[selectedBody].family }}
                  className="text-sm text-neutral-400"
                >
                  2017 — 2023
                </p>
              </div>
              <div className="flex-1">
                <h3
                  style={{ fontFamily: font.family }}
                  className="text-3xl md:text-5xl font-bold text-orange-500 tracking-tight mb-3"
                >
                  After Berry
                </h3>
                <p
                  style={{ fontFamily: bodyFonts[selectedBody].family }}
                  className="text-sm text-neutral-400"
                >
                  2023 — Present
                </p>
              </div>
            </div>

            {/* Sample: Project card */}
            <div className="mb-8 max-w-sm">
              <div className="h-32 rounded-lg bg-neutral-200 mb-3" />
              <h4
                style={{ fontFamily: font.family }}
                className="text-sm font-semibold"
              >
                {sampleText.project}
              </h4>
              <p
                style={{ fontFamily: bodyFonts[selectedBody].family }}
                className="mt-1 text-xs leading-relaxed text-neutral-500"
              >
                {sampleText.body}
              </p>
            </div>

            {/* Sample: Nav */}
            <div
              style={{ fontFamily: bodyFonts[selectedBody].family }}
              className="flex flex-wrap items-center gap-6 text-sm text-neutral-400"
            >
              <span
                style={{ fontFamily: font.family }}
                className="text-lg font-bold text-neutral-900"
              >
                MJay Studios
              </span>
              <span>Timeline</span>
              <span>By Type</span>
              <span>About</span>
              <span>Contact</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
