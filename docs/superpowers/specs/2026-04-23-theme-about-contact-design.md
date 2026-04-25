# Theme-Specific About/Contact Panels

## Problem
Cinematic Vault and Dimensional Glitch bypass Shell.tsx (which renders AboutPopup/ContactPopup), so About/Contact buttons are non-functional. Even if wired up, the generic modal breaks immersion.

## Solution
Build theme-native About/Contact panels for Cinematic and Glitch. Magnetic already works with generic popups (acceptable for now).

---

## Cinematic Vault — Classified Dossier

### CinematicAbout
- **Entry**: Slide-in from right (matches CinematicDetail pattern)
- **Header**: "PRODUCTION DOSSIER" label with brand accent line
- **Headshot**: Framed with ring, Ken Burns slow-zoom via GSAP
- **Name**: Large display font, same style as project titles
- **Awards**: "COMMENDATIONS" section, orange pills
- **Bio**: Paragraphs stagger-fade in sequentially
- **Footer**: Education + LinkedIn button
- **Close**: Circular button matching CinematicDetail, cinematic slide-out

### CinematicContact
- **Entry**: Same slide-in
- **Header**: "PRODUCTION CONTACTS" with brand line
- **Cards**: Each contact method as an elegant horizontal card with icon, label, value
- **Separator**: Subtle horizontal rules between items
- **Hover**: Slight brand-color glow shift
- **Footer**: "Open to freelance..." tagline

---

## Dimensional Glitch — Terminal Access

### GlitchAbout
- **Entry**: clipPath glitch-in (matching ExpandedDetail)
- **Chrome**: Terminal window with traffic lights + title `OPERATOR_PROFILE`
- **Content**: Simulated terminal session
  - `mjay@studio:~$ cat /sys/operator/profile.dat`
  - ASCII box with name, role, status
  - Bio renders as terminal output with line-by-line stagger
  - Awards as `[OK] 2018 Silver ADDY` verified entries
  - Education + LinkedIn at bottom
- **Headshot**: Bordered terminal sub-window with green tint
- **Cursor**: Blinking block cursor at end
- **Close**: Green-bordered button with X

### GlitchContact
- **Entry**: Same clipPath glitch-in
- **Content**: `mjay@studio:~$ ls -la /sys/operator/links/`
  - File listing with permissions, each clickable
  - On hover: line highlights bright green
  - On click: brief `> CONNECTING...` flash, then navigates
- **Header**: "ESTABLISH CONNECTION" terminal prompt
- **Tagline**: System message style availability note

---

## Files to Create
1. `src/components/cinematic/CinematicAbout.tsx`
2. `src/components/cinematic/CinematicContact.tsx`
3. `src/components/glitch/GlitchAbout.tsx`
4. `src/components/glitch/GlitchContact.tsx`

## Files to Modify
5. `src/components/cinematic/CinematicView.tsx` — import + render
6. `src/components/glitch/GlitchView.tsx` — import + render
