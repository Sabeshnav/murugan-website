# Murugan Portfolio Website — Project Brief

> **Source of truth:** `BUILD_SPEC.md` is the technical spec (scroll choreography, timings,
> asset wiring); its **Revision 2** and **Revision 1** sections override anything older in it. This file is
> the content and context brief. All on-site copy lives in `lib/content.ts`.

## Concept
A public-facing website presenting the Tamil deity Lord Murugan as if he had a personal
portfolio site — his mythology reframed as projects, skills and testimonials. Built for
posting on reels and as a portfolio piece. AI-generated painterly concept art images and
videos throughout.

**Mythological tradition followed:** Tamil tradition (Kandhar Sashti Kavasam, Sangam
literature, Arupadaiveedu) — not the pan-Indian/Sanskrit Puranic version.

**Visual style:** painterly concept art, consistent across every generated asset.

---

## Site-wide design rules (user's standing rules — apply to this and every future site)

1. **It must feel like a website, not a video reel.** Scroll-driven media always sits inside
   real website chrome.
2. **Floating island navbar**, glass style only (frosted glass — never a gradient or solid
   fill). Here: brand (Vel mark + MURUGAN + முருகன்), section links with a sliding active
   pill, a CTA button; collapses to a glass menu sheet on small screens. It switches to dark
   ink over light scenes (`setNavTheme` in `lib/nav.ts`).
3. **Custom scrollbar** (gold thumb on dark track) and a **custom progress tracker** on the
   right edge (rail fill, a diamond marker per section, active label, percent).
4. **Big, unmissable titles.** Each project opens with a large centred title (Tamil +
   English + one-line tagline) that lifts away into a prominent label card.
5. **Heavy, readable text on cards** — bold weights, dark glass card, strong contrast.
6. **Designed buttons everywhere they'd naturally appear**, even if they do nothing yet
   (`components/RitualButton.tsx`: shine sweep, lift, icon nudge, click ripple; no action).
7. **Speech bubbles must be ornate**, never basic (`components/SpeechBubble.tsx`: double
   gold rule, corner flourishes, seamless curved tail; calm / wrath / hero tones).
8. **A title shower before each major section** (`components/SectionTitle.tsx`): full
   screen, rotating mandala, rising gold motes, Tamil + English title with letters rising
   in, Vel divider; it holds for a beat and the section then slides up over it.
9. **Bold fonts that suit the Sangam/Tamil setting, never funny or casual**, self-hosted in
   `app/fonts/` (OFL): Cinzel (display), EB Garamond (body), Noto Serif Tamil (Tamil),
   Roboto (only for the mock Google-review UI).
10. **Murugan speaks to the visitor in the first person** in all copy, except the
    testimonials (those are other people's voices).
11. **Scroll must never stall or feel slow** — no long scroll locks — but scrubbed video must
    not race either: give each clip enough scroll (≈500–620vh for a 6–8s clip).
12. **Speech bubbles are one continuous SVG outline** (body + pointer in a single path), so the
    pointer is always perfectly attached. Never build the pointer as a separate piece.
13. **No card around a title when the content is already a card.** Titles and labels are
    bold text on their own; only the content gets a card.
14. **Decorative rangoli/mandala art rotates at a constant speed** and always fits inside the
    screen, clear of the navbar.
15. **Title blocks assemble in** (e.g. heading from the left, image from the right) rather than
    simply appearing.
16. **Light sections never sit on plain white.** Give them a themed backdrop (here: ivory,
    kolam dots, sun rays, rangoli, temple frieze).

---

## Running the site
- `npm install` then `npm run dev` → http://localhost:3000
- `npm run build` → static site in `/out` (deploy that folder anywhere).
- `npm run media` → rebuilds `/public/media` from `/Assets` (needs ffmpeg and Python with
  Pillow, numpy and scipy). Run it whenever an asset changes.
- Stack: Next.js 16 (App Router, static export) · GSAP + ScrollTrigger · Framer Motion ·
  Tailwind v4 · Lenis smooth scroll.

## Code map
- `app/page.tsx` — section order · `app/globals.css` — all styling · `app/fonts.ts` + `app/fonts/`
- `components/Navbar.tsx`, `components/ProgressTracker.tsx`, `components/SectionTitle.tsx`,
  `components/RitualButton.tsx`, `components/SpeechBubble.tsx`, `components/Icons.tsx`
- `components/sections/` — `Hero`, `Soorasamharam`, `LeadingTheDevas`, `Swamimalai`,
  `AboutMe`, `Skills`, `Testimonials`, `Contact`
- `components/ProjectIntro.tsx`, `ProjectLabel.tsx`, `ProjectCaptionCard.tsx` — My Projects pieces
- `lib/content.ts` — **all copy** · `lib/nav.ts` + `lib/useActiveSection.ts` — sections,
  scroll-to, active section, nav theme · `lib/useScrubVideo.ts` — scroll-scrubbed video ·
  `lib/media.ts` — full-file preloading · `lib/scroll.tsx` — Lenis
- `scripts/build_media.py` — web media pipeline

---

## Final Section Structure (do not add/reorder sections without the user's explicit say-so)

Hero → *title: My Projects* → My Projects (I Soorasamharam · II Leading the Devas ·
III The Swamimalai Incident) → About Me (no title shower; it has its own intro) →
*title: Skills* → Skills → *title: Testimonials* → Testimonials → *title: Contact* → Contact.
One continuous downward scroll.

Cut — do not reintroduce unless asked: **the whole Tools section (removed in revision 1)**,
Eternal Youth skill, Vel Mastery skill, Rooster anywhere but Soorasamharam, the 8-milestone
timeline, Deivanai/Valli stories, Tiruttani, Idumban, devotee stories, Race for the Mango,
the Avvaiyar incident, Ganesha/Avvaiyar/Surapadman testimonials, physical address in Contact.

---

## Asset map (`/Assets` → `/public/media`)

| Asset | Used in |
|---|---|
| `1.mp4` | Hero — scroll-scrubbed arc from his back to his face |
| `2.mp4` | Soorasamharam — scrubbed |
| `3.mp4` | Leading the Devas — scrubbed |
| `4.mp4`–`8.mp4` | Swamimalai clips 1–5 — scrubbed (all-intra encodes) |
| `10.mp4` | Contact — reclining Murugan loop |
| `11.mp4` / `12.mp4` | About Me — calm pattern loop / wrath lava loop |
| `1.png` | About Me intro (full body, shy) |
| `2.png` / `3.png` | About Me calm / wrath busts (white bg cut out by the media script) |
| `4.png` | Skills background (night sky, six-point constellation) |
| `7a.png` / `7b.png` / `7c.png` | Testimonial avatars — Shiva / The Tamil People / Brahma |
| `8.png` | Contact finale — the Vel, cut out to `finale-spear.webp`, spears up behind யாமிருக்க பயமேன் |
| `5.png`, `6.png`, `7.png`, `9.png`, `9.mp4` | Not used (Tools assets and spares) |

---

## Sections (current)

**Hero** — `1.mp4` pinned and scrubbed. On the first frame (his back) an ornate bubble to the
left of his back says **"Scroll Down, Now!!"** and fades as soon as scrolling starts. At the
end the frame fades and **வணக்கம்** appears large in Tamil (with "VANAKKAM" beneath), the line
"I am Murugan. Come — walk with me through my story." and two buttons (Begin the Journey /
Seek My Blessings).

**My Projects** — each project opens with a large centred title (index pill, Tamil name,
English name, tagline) that lifts away as scrubbing starts; a label card stays top-left.
Captions are bold dark-glass cards, in Murugan's voice:
- *Soorasamharam* (`சூரசம்ஹாரம்`, "The war I ended with mercy."): A "Surapadman held a boon —
  only Shiva's son could defeat him. He believed it made him safe. I am Shiva's son." · B "My
  weapon of choice: the Vel. It was never made to destroy — it was made to discern." · C "I did
  not end Surapadman. I gave him a new purpose." / "Victory was never the lesson. What I did
  with it was."
- *Leading the Devas* (`தேவர்களின் தலைவன்`): letter-by-letter card — "Command is not given; it
  is earned at the front. So I ride ahead — my peacock beneath me, the armies of the heavens
  behind me."
- *The Swamimalai Incident* (`சுவாமிமலை`, "The day I became my father's teacher."): five
  clips, all scroll-scrubbed with pull-up transitions and no scroll locking; each card shows
  once its shot settles. Cards: the Om question · "Creation can wait. Ignorance cannot." · the
  devas go to my father · "that I teach first" · "Even Lord Shiva sat down to listen."

**About Me** — Sangam-themed ivory intro (kolam dots, sun rays, turning rangoli, temple
frieze) where "About me?" glides in from the left and the shy full-body image from the right,
ending side by side and centred. Then the calm loop with the calm bust + calm bubble centred together
("Ohh!! I am just… the one who comes when you call."), then the lava loop with the fierce bust
+ wrath bubble in the same centred spot ("But to those who prey upon the weak…").

**Skills** — trump-card deck over the constellation; cards fanned at the bottom at their
original size, fully readable; each
flips while rising to centre, then returns face-down (text side, dimmed). Copy in first person
("I gave Tamil its grammar, and I taught it to Agastya." etc.).

**Testimonials** — mock Google-review roller; the active card sits at the exact centre of the
screen; place header (Murugan · 4.9 ★ · ∞ reviews · Open 24 hours, every yuga) with a "Write a
review" button. Quotes stay in the reviewers' voices.

**Contact** — `10.mp4` with a dark-glass text card (no bubble): "Call Upon Me / என்னை அழைக்க",
the locked five values, the closing line and two buttons. Then the screen turns white and the
Vel **spears up from below the screen** (fast strike, shock ring, slight shake), settling at
~66vh tall, with **யாமிருக்க பயமேன்** fading in over it and "Yaamirukka bayamen — Why fear, when
I am here?" beneath.

---

## Character Reference Sheets (painterly concept art, 8-pose turnaround: 5 full-body angles + 3 face close-ups, plain grey background)

- **Murugan** — lean, muscular, chiseled, hunter-eyed young man. Long loose wavy black hair,
  three horizontal white vibhuti stripes with a red dot on the forehead, gold teardrop
  earrings, gold necklace with red ruby pendant, thick white/red/green flower garland, gold
  armlets/bracelets, saffron-orange dhoti with ornate gold belt, red-orange gold-bordered
  angavastram over the left shoulder, barefoot with gold anklets. Always shown holding the
  Vel.
- **The Vel** — tall slender divine spear, broad teardrop-shaped golden blade with three
  horizontal white stripes and a red dot at center, ornate fleur-de-lis base below the blade,
  ornate gold collar/knob, long slender gold shaft.
- **Surapadman** — towering, broad, big round belly, deep dark-brown skin, tall ornate gold
  crown with red gems, long wavy black hair, thick black handlebar mustache, wide glaring
  rageful eyes, snarling fanged mouth, ornate gold-and-dark-steel kavacha with chain details,
  broad shoulder guards, wide gold belt, red dhoti with gold borders, barefoot.
- **Shiva** — broad-shouldered, muscular, cool blue skin, calm face with closed eyes, high
  topknot with a white crescent moon, three vibhuti stripes with a vertical third eye, gold
  hoop earrings, cobra around the neck/shoulder, dark rudraksha necklaces/armbands,
  leopard-skin wrap, Trishul (dark-steel trident, small damaru with an orange-red streamer).
- **Brahma** — elderly, warm golden-tan skin, long white beard/mustache, THREE identical faces
  on one head, three tall ornate golden crowns (center largest, red gem), white vibhuti + red
  tilaka; four arms holding a palm-leaf book, raised in blessing, a rudraksha mala, a small
  gold kamandalu; mustard-yellow top, orange-red gold-bordered angavastram and dhoti. (Tamil
  tradition has him four-faced/Nanmugan; 3-faced is the locked design unless corrected.)
- **Peacock** — adult male Indian peafowl, iridescent cobalt-blue neck/breast, small upright
  crest, long green-gold eyed train.
- **Rooster** — realistic adult rooster, red comb/wattles, crimson-and-gold plumage, long
  arching dark green tail. Appears only in the Soorasamharam transformation.

---

## Standing Production Rules (all future asset generation)

1. **Art style is locked:** painterly concept art, consistent visible brushwork, across every
   image and video. Do not deviate without explicit instruction.
2. **Character sheets are always assumed attached** when generating an established
   character — prompts should not hedge on, or flag, a "missing" reference.
3. **Deliberate camera-angle vocabulary** (over-the-shoulder, low angle, symmetrical, side
   angle, orbit, dolly, slider…) — every new prompt names and commits to a specific angle/move
   and flags which was chosen if the user didn't specify.
4. **Static "game avatar" loops keep the character completely motionless** and move only
   secondary elements (flora, clouds, butterflies, embers), so fixed-position hotspots line up.
5. Do not reintroduce any cut content listed above without the user asking.
6. Cutout/portrait images are best delivered on transparency; white backgrounds work but
   need the media script's cutout step.

---


## Open / Next Tasks

- [ ] Review the copy (all in `lib/content.ts`), especially the first-person rewrites.
- [ ] Try it on a real phone and tune scroll lengths if any section feels long or short
      (`end: "+=…%"` in each section file; title-shower hold is `DWELL_VH` in `SectionTitle.tsx`).
- [ ] Optional: deploy `/out` for a shareable link.
- [x] Revisions 1 and 2 done and tested (2 Oct 2026) — see BUILD_SPEC.md.
