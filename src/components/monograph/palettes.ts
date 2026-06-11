/* ──────────────────────────────────────────────────────────
   Monograph palette options — all tuned around the brand
   orange (#F15A29) of the MJ mark.

   Theory per option:
   · Umber     — warm brown-black (current). Analogous-warm, gallery feel.
   · Ink       — neutral graphite. Zero color competition → the orange is
                 the only chromatic voice on the page.
   · Midnight  — deep navy. Blue is orange's complement; max glow.
   · Olive     — dark olive-earth. Orange is family (terracotta) → organic,
                 expensive, editorial.
   · Atelier   — warm cream LIGHT mode. Orange-on-paper print-annual look.

   Three tokens drive everything (bg / surface / fg) via CSS variables +
   color-mix(); the hero wall gets its own field color since it's WebGL.
   ────────────────────────────────────────────────────────── */

export type MonoPalette = {
  id: string;
  name: string;
  bg: string; // page background
  surface: string; // cards / alternating sections
  fg: string; // primary text ("bone" or ink)
  slabFrom: string; // hero type-panel gradient
  slabTo: string;
  wall: string; // hero wall WebGL field color
  wallIsLight: boolean; // affects the "drag to explore" label
};

export const MONO_PALETTES: MonoPalette[] = [
  {
    id: 'umber',
    name: 'Umber',
    bg: '#1a1411',
    surface: '#241c17',
    fg: '#f7f2ea',
    slabFrom: '#130e0b',
    slabTo: '#1d1612',
    wall: '#3c424b',
    wallIsLight: false,
  },
  {
    id: 'ink',
    name: 'Ink',
    bg: '#131416',
    surface: '#1d1f22',
    fg: '#f0efea',
    slabFrom: '#0d0e10',
    slabTo: '#17191c',
    wall: '#45484e',
    wallIsLight: false,
  },
  {
    id: 'midnight',
    name: 'Midnight',
    bg: '#0f1620',
    surface: '#172230',
    fg: '#edf1f5',
    slabFrom: '#0a1018',
    slabTo: '#131e2b',
    wall: '#3e4a5c',
    wallIsLight: false,
  },
  {
    id: 'olive',
    name: 'Olive Noir',
    bg: '#14170f',
    surface: '#1e2216',
    fg: '#f3f1e6',
    slabFrom: '#0e110a',
    slabTo: '#181c11',
    wall: '#474b3e',
    wallIsLight: false,
  },
  {
    id: 'atelier',
    name: 'Atelier (light)',
    bg: '#f1ece2',
    surface: '#faf7f0',
    fg: '#241d16',
    slabFrom: '#e9e2d4',
    slabTo: '#f3eee4',
    wall: '#c9c3b6',
    wallIsLight: true,
  },
];
