# Murugan Portfolio Website — Complete Build Specification for Claude Code

This is the full, final spec covering every section of the site. Read `CLAUDE.md` in the
project root first for mythology/content context and character designs; this document is
the technical build spec — DOM structure, scroll behavior, exact timings, copy, and asset
wiring for the entire page, start to finish.

**Status (2 Oct 2026):** built end to end to this spec. Where the build had to depart from
the original wording, the change is marked **[BUILD NOTE]** below. All copy now lives in
`lib/content.ts`.

---

## Revision 2 (2 Oct 2026) — premium polish; overrides Revision 1 where they differ

- **Speech bubbles:** body and pointer are now ONE continuous SVG path, measured from the
  text box with a ResizeObserver (`SpeechBubble.tsx`), plus an inner rule inset 7px. The
  pointer can never look detached. Tails: `left`, `right`, `bottom` (`mobileTail` switches
  under 768px).
- **Rangoli (title showers and the About intro)** rotates at a constant speed forever (CSS,
  60s per turn, on the SVG). GSAP only scales/fades its wrapper, so the two never fight. Its
  size is `min(100vh − 200px, 92vw)`, centred 24px low, so it stays inside the screen and
  clear of the navbar. Shared component: `components/Rangoli.tsx`.
- **Project labels (top-left) are plain bold text with no card.** The captions are the cards,
  and a card-shaped title next to card-shaped content reads as clutter.
- **Hero:** the "Scroll Down, Now!!" bubble now sits to the LEFT of Murugan's back with a
  right-pointing tail (top-left with a bottom tail on phones).
- **Projects scroll slower:** Soorasamharam 620vh, Leading the Devas 500vh, Swamimalai 600vh.
- **About Me intro:** "About me?" glides in from the left and the full-body image from the
  right as the pinned timeline starts (power3.out). The backdrop is no longer plain white:
  warm ivory gradient, kolam dot grid, soft sun-ray burst, a slowly turning gold rangoli
  and a temple-border frieze (lotus petals and arches) along the bottom. The backdrop fades
  out when the calm loop arrives.
- **Skills:** the deck is back to its original fanned size (scale 0.56 / 0.5 on phones) and
  raised so every card's name and class stay fully on screen.

## Revision 1 (2 Oct 2026) — overrides everything below where they differ

**Global**
- **Tools section removed** entirely (component, copy, media). Section 5 below is obsolete.
- **Website chrome added:** floating glass island navbar (frosted glass only, no gradient/solid;
  links scroll to sections, active pill, CTA, mobile glass menu; dark ink over light scenes),
  custom scrollbar, right-edge progress tracker (rail fill, section diamonds, active label, %).
- **Title shower before Projects, Skills, Testimonials and Contact** (`SectionTitle.tsx`):
  pinned full-screen title with mandala, gold motes, Tamil + English title whose letters rise
  in (scrubbed), Vel divider; holds for `DWELL_VH` (70vh) then the next section slides up over
  it (pin with `pinSpacing: false` + a spacer). About Me has no title shower.
- **Fonts:** self-hosted Cinzel 700–900 (display), EB Garamond 500–800 (body), Noto Serif
  Tamil 700–900 (Tamil), Roboto (review UI only). No Kalam/comic fonts anywhere.
- **Decorative buttons** (`RitualButton`): navbar CTA, Hero (Begin the Journey / Seek My
  Blessings), Testimonials (Write a review), Contact (Call Upon Me / Walk the Path). No actions.
- **Speech bubbles redesigned** (`SpeechBubble`): parchment or ember body, double gold/red
  rule, corner flourishes, curved SVG tail joined seamlessly.
- **Copy is in Murugan's first-person voice** everywhere except testimonials.
- Every scrubbed video shows its poster as a CSS background so a clip that is still
  decoding never flashes black.

**Hero** — ornate bubble "Scroll Down, Now!!" to the right of his body on the first frame,
fading out within the first ~3% of scroll. "Vanakkam" is now வணக்கம் (Noto Serif Tamil 900)
with the transliteration, a first-person subline and two buttons.

**My Projects** — every project opens with a big centred title (index pill, Tamil, English,
tagline) that lifts away in the first ~7% of its scroll; a larger label card (kicker, title,
Tamil) stays top-left. Caption cards are bolder (EB Garamond 700, ~1.2–1.55rem, 84% dark
glass, gold border).
- **Swamimalai rebuilt:** no scroll locking. All five clips are scroll-scrubbed (re-encoded
  all-intra, with `-sm` phone versions). Pinned for 430vh: per clip, the next layer pulls up
  over ~0.22 of its segment while the clip's camera move scrubs to its end by 0.6, and the
  card shows from 0.6 to the end of the segment. A 5-step progress bar sits bottom-centre.

**About Me** — intro heading and full-body image sit side by side, centred and close. Calm
and wrath phases each centre the bust + bubble as one group (`.about-duo`).

**Skills** — fanned deck cards enlarged (scale 0.8 desktop / 0.66 phone, ~57% visible).

**Testimonials** — the roller viewport now spans the full screen, so the active card is at
the exact screen centre; the place header overlays the top with a fade.

**Contact** — the bubble is replaced by a dark-glass text card (title, Tamil title, locked
copy with Vel bullets, two buttons). Finale: the Vel is cut out of `8.png`
(`finale-spear.webp`), shown ~66vh tall (no overflow), and **spears up from below the screen**
as a time-based strike (expo-out, motion blur, shock ring, slight shake) when the scroll
reaches the white phase; scrolling back rewinds it. The Tamil line fades in after it lands.


Nothing in this document is deferred. Where the original brief was ambiguous or internally
inconsistent, a decision has been made and flagged with **[DECISION]** so you know it was a
judgment call rather than an explicit instruction — build it as written, but these are the
points most likely to warrant a quick look once the page is running end-to-end.

---

## Tech Stack
- **Next.js** (App Router)
- **Framer Motion** — discrete component animation (card flips, fades, modals)
- **GSAP + ScrollTrigger** — scroll-scrubbed video and pinned-section choreography
- **Tailwind CSS** — styling
- **Lenis** — smooth scrolling, feeding ScrollTrigger (`lib/scroll.tsx`)
- Static export (`output: "export"`): `npm run build` writes a self-contained site to `/out`.
- Run locally: `npm install` then `npm run dev` → http://localhost:3000

## Asset Inventory (`/assets`, already generated)

| File | Section | Duration | Resolution |
|---|---|---|---|
| `1.mp4` | Hero | 5.167s | 2560×1440, 24fps |
| `2.mp4` | My Projects → Soorasamharam | 8.000s | 2560×1440, 24fps |
| `3.mp4` | My Projects → Leading the Devas | 6.100s | 1920×1080, 30fps |
| `4.mp4` | My Projects → Swamimalai #1 (Om question) | 1.281s | 1920×1080, 30fps |
| `5.mp4` | My Projects → Swamimalai #2 (imprisonment) | 2.433s | 1920×1080, 30fps |
| `6.mp4` | My Projects → Swamimalai #3 (devas plead) | 3.381s | 1920×1080, 30fps |
| `7.mp4` | My Projects → Swamimalai #4 (Shiva orders/refusal) | 2.202s | 1920×1080, 30fps |
| `8.mp4` | My Projects → Swamimalai #5 (teaching) | 2.164s | 1920×1080, 30fps |
| `9.mp4` | Tools | 5.167s | 2560×1440, 24fps |
| `10.mp4` | Contact | 5.167s | 2560×1440, 24fps |
| `11.mp4` | About Me — calm bg | 5.167s | 2560×1440, 24fps |
| `12.mp4` | About Me — wrath bg | 5.167s | 2560×1440, 24fps |
| `1.png`–`3.png` | About Me panels 1–3 | — | — |
| `4.png` | Skills section bg (night-sky six-point constellation — this settles the bg decision) | — | — |
| `5.png` | Tools dialog — Vel | — | — |
| `6.png` | Tools dialog — Peacock | — | — |
| `7a.png` / `7b.png` / `7c.png` | Testimonials — Shiva / Tamil People / Brahma | — | — |
| `8.png` | Contact finale — the Vel that rises behind "யாமிருக்க பயமேன்" (full frame, white bg) | — | — |
| `7.png` | *unused* — the earlier 3-headshot batch, superseded by 7a/7b/7c | — | — |
| `9.png` | *unused* — spare standalone Vel cutout (8.png replaced it in Contact) | — | — |

**[BUILD NOTE] Web media pipeline.** Raw files stay in `/Assets`; `npm run media`
(`scripts/build_media.py`, needs ffmpeg + Python with Pillow/numpy/scipy) writes the web
versions to `/public/media`:
- `hero`, `sooras`, `devas` — the scroll-scrubbed clips — are encoded **all-intra** (every
  frame a keyframe) so seeking is instant in both directions, at 1920px plus a 1280px `-sm`
  variant served to phones. Everything else is a normal H.264 web encode.
- `2.png` and `3.png` were delivered on solid white; the script cuts them out to
  transparent PNG→WebP (flood-fill from the edges + white-halo defringe) so they sit cleanly
  on the pattern/lava loops. `1.png` already had transparency.
- The testimonial avatars are square face crops of 7a/7b/7c, shown as circles.
- Re-run `npm run media` whenever an asset in `/Assets` changes.

**Resolution mismatch:** videos 3–8 are 1920×1080; every other video is 2560×1440. Use
`object-fit: cover` on a fixed-aspect-ratio container for every `<video>` so this never
causes layout shift.

**Global card styling:** all scroll-triggered caption cards across every project (Soorasamharam,
Leading the Devas, Swamimalai) should share one visual component — same font, same card
background treatment, same corner radius/shadow — so "My Projects" reads as one consistent
system even though the three sub-projects have different internal mechanics. Build one
reusable `<ProjectCaptionCard>` component and use it everywhere in this section.

---

## 1. Hero Section

- `1.mp4` fills the viewport, pinned, scroll-scrubbed: scroll position drives the video's
  `currentTime` directly (GSAP ScrollTrigger `scrub: true`), bidirectional — scrolling down
  plays forward, scrolling up rewinds.
- At the end of the scrub range: cross-fade the final frame out, fade in **"Vanakkam"**,
  large, centered, with the subline "I'm Murugan. Welcome to my portfolio."
- A small "Scroll to begin" cue sits at the bottom of the first frame and fades as soon as
  scrubbing starts.
- A preloader holds the page (scroll locked) until `1.mp4` and `2.mp4` are fully downloaded
  (fetched to blob URLs), then `3.mp4` is warmed in the background.
- Continued scroll carries "Vanakkam" up and out (normal, unpinned scroll), and My Projects
  scrolls up beneath it.

## 2. My Projects

A shared visual language across all three projects: each project is its own pinned
scroll-scrubbed video section with caption cards keyed to timestamps. Scroll one continuous
direction moves through all three projects in order (Soorasamharam → Leading the Devas →
Swamimalai), each pinning and releasing in turn.

### Project I — Soorasamharam

`2.mp4`, pinned, scroll-scrubbed (bidirectional), 8.000s total. Cards are keyed to the
video's scrubbed timestamp, not to scroll distance — they appear and fade based on what's
currently on screen, so reversing scroll direction naturally reverses the cards too.

| Video time | On screen | Card |
|---|---|---|
| 0.00s – 0.40s | Static face-off, no beam yet | **Card A** (bottom-right): "The asura Surapadman held a boon: only Shiva's son could defeat him. He considered that a guarantee." |
| 0.40s – 0.50s | — | Card A fades out |
| 0.50s – 2.80s | Beam fires, Surapadman dissolving | *(no card — let the dissolve play uninterrupted)* |
| 3.00s – 6.60s | Only Murugan, Vel, and beam visible | **Card B** (left-center): "Weapon of choice: the Vel — not built to destroy, built to discern." |
| 6.60s – 6.80s | — | Card B fades out |
| 6.80s – 7.00s | Peacock and rooster materializing | *(no card)* |
| 7.00s – 8.00s | Final static frame, birds fully formed | **Card C** (bottom-right, two lines): "Outcome: Surapadman wasn't eliminated. He was reassigned." / "The lesson wasn't written in victory. It was written in what he did with it afterward." |

Transition style for every card: fade + slight slide (in: fade + slide up ~12px; out: fade +
slide down ~8px). ~250–300ms each way.

**[BUILD NOTE] Scroll pacing.** Card A's window is only 0.4s of video (5% of a linear
scrub), which is too short to read. The scroll-to-time mapping is therefore piecewise:
the first 0.3s of video takes ~14% of the section's scroll, the rest is linear, and the
final frame is held for ~12% so Card C can be read. Cards are still keyed to video time.

### Project II — Leading the Devas

`3.mp4`, pinned, scroll-scrubbed (bidirectional), 6.100s total. One single card, bottom-center,
generous margin from the bottom edge, that reveals its text **letter by letter as the video
scrubs forward**, fully revealed by the time the scrub reaches the end, and holds complete
for a short beat before release.

**[DECISION] Copy** (written to match the actual visual beats of the video — dive through
the fleet, catch up to Murugan, arrive beside him as he points the Vel forward):

> "Command isn't given. It's earned at the front of the formation — leading the devas into
> battle, peacock beneath him, the fleet of the heavens at his back."

**[DECISION] Letter-reveal pacing**, mapped to the confirmed visual beats:
- **0.0s – 3.4s** (fleet dive-through, chariots and doves passing beneath the camera): reveal
  the first ~45% of the text at a **steady, moderate pace** — this is the longest, most
  visually busy stretch, so the reveal should feel unhurried and let the fleet imagery
  breathe rather than racing to finish early.
- **3.4s – 4.3s** (camera catches up behind Murugan on the peacock): reveal the next ~20% of
  the text at a **slightly faster pace** — this is a short beat, so the reveal needs to pick
  up speed to stay in sync.
- **4.3s – 6.1s** (arc to his side as he extends the Vel toward camera — the emotional climax
  of the shot): reveal the final ~35% of the text, timed so the **very last word lands within
  the final ~0.3s**, coinciding with the Vel fully extending toward the viewer. This is the
  payoff beat, so the last few words should land with the visual climax, not well before it.
- Implementation: drive letter-count directly off scrub progress using three linear
  interpolation segments matching the percentages/time-ranges above (a simple piecewise
  function of `scrubProgress → charactersRevealed`), rather than a single constant-speed
  typewriter — this is what "increase/decrease the reveal speed as required" calls for.
- Once scrubProgress reaches 1.0 (end of video), hold the fully-revealed card in place,
  unpinning only after a short additional scroll buffer (~15–20vh) so it doesn't snap away
  instantly.

**[BUILD NOTE]** The reveal completes at 5.8s of video time (last word lands 0.3s before
the clip's end, with the Vel fully extended).

### Project III — Swamimalai Incident

Five short clips (`4.mp4`–`8.mp4`), played **in sequence, one at a time**, with a "pull up"
transition animation between each (the incoming clip's section slides/translates upward
from the bottom of the viewport to replace the outgoing one — a vertical slide transition,
not a fade, per the original brief's "pull up in animation when moving from one video to the
next").

**[DECISION] Scrub vs. autoplay:** these five autoplay once they become active (not
scroll-scrubbed), and the scroll gesture instead controls *advancing to the next clip* once
its card has been shown and a short hold has elapsed. This matches the original brief's
"pull up... when moving from one video to the next" framing — that's a per-clip transition
trigger, not a frame-by-frame scrub.

**[BUILD NOTE] Correction — the clips do not settle early.** Frame-difference analysis of
the delivered files shows the camera keeps moving (easing out) for the whole length of every
clip; they only come to rest in their last few frames. So the card appears **when the clip
ends** (its settled final frame), not at the ~0.3–0.5s marks originally listed below.

**[BUILD NOTE] How the hold works.** The section pins for 5 × 100vh. Entering a clip while
scrolling down plays it and briefly locks page scroll (Lenis stop + `overflow: hidden`)
until the clip has ended and its card has been on screen for 1.2s; a dot rail on the right
shows progress through the five. Fast scrolling advances one clip at a time. Scrolling back
up never locks: the previous clip slides back down and shows its settled frame with its
card immediately. If the visitor jumps past the whole section (scrollbar drag, End key)
it settles on the right clip without holding.

**Per-clip behavior:**
1. Clip becomes active (scrolled into view) → clip autoplays from its start.
2. Once the clip reaches its settled/final composition (see timing below) → caption card
   fades in.
3. Card holds for a fixed dwell time (~1.2s) after appearing.
4. User's continued scroll triggers the pull-up transition to the next clip; the card on the
   outgoing clip fades out as part of that transition.
5. On the fifth clip, after its dwell, continued scroll exits Project III and My Projects
   entirely, continuing into About Me (confirmed order: My Projects → About Me → Skills).

**Clip-by-clip settle time and card copy:**

| Clip | Show card | Card copy |
|---|---|---|
| `4.mp4` (1.281s) | at clip end | "He asked the simplest question in the universe. Brahma didn't have an answer." |
| `5.mp4` (2.433s) | at clip end | "Creation can wait. Ignorance can't." |
| `6.mp4` (3.381s) | at clip end | "With Brahma silenced, creation itself stalled. The devas turned to the only one who outranked the problem." |
| `7.mp4` (2.202s) | at clip end | "Shiva asked him to release Brahma. Murugan agreed — on one condition: let him teach first." |
| `8.mp4` (2.164s) | at clip end | "The student became the teacher. Even Shiva took his seat on the floor for this one." |

---

## 3. About Me Section

1. `1.png` enters from/settles on the right side of the screen (full body Murugan); large
   heading "About Me?" on the left.
2. On scroll: `1.png` exits to the right and fades, heading exits to the left and fades.
3. `11.mp4` (calm pattern loop) fades in as the new background.
4. `2.png` appears anchored left, sticking to the bottom of the viewport. A comic-style
   cloud/speech-bubble box fills the remaining screen space with the calm description text
   (copy in `lib/content.ts` → `about.calm`: opens "Ohh!! I'm just… the boy from the
   hills.").
5. Quick transition on further scroll: calm elements exit, `12.mp4` (wrath loop) fades in.
6. `3.png` appears in the same position/scale as `2.png`, same speech-bubble device,
   restyled for wrath (deep red border and dark ember-lit fill instead of the calm phase's
   ivory and warm gold), with the wrath text (`about.wrath`).
   - **[BUILD NOTE]** The heading in step 1 is followed by a shy comic-hand line, "Ohh!! You
     want to know about… me?". Both bust images sit flush to the left edge so the cut-off
     edge of the artwork never shows. On phones the bubble moves above the figure with its
     tail pointing down.
7. Further scroll: `4.png` scrolls up from below to fully cover the screen, transitioning
   into the Skills section.

## 4. Skills Section

- Three cards fanned at bottom-center: **Tamil Mastery → Shanmukha Vision → Transformative
  Combat**, in that order.
- Single continuous GSAP ScrollTrigger timeline (scrub) spanning all three cards, so
  scrolling up naturally reverses the sequence — do not build this as three independent
  triggers.
- Each card: flips (rotating during travel) and animates to center screen to reveal its
  text, then returns to the deck face-down as the next card advances.
- **[BUILD NOTE]** Card face: maroon with gold border, numeral, emblem (Tamil "அ" /
  six-point shatkona / peacock-feather eye), name, and a game-style "Class" tag (Scholar /
  Seer / Warrior). Card back (the text side): ivory, hook + short mythology footnote. "Face
  down" after playing = back (text side) showing, dimmed, so played cards read as used.
- Background: `4.png`, static, shared across all three cards.

**[DECISION] Scroll direction into/out of Tools:** The original brief says Tools' background
(`9.mp4`) comes up "as the user scrolls up," and Tools exits to Testimonials also "as the
user scrolls up" — both inconsistent with the rest of the page's downward flow. Treat this
as a wording slip rather than an intentional reversal: **build the whole page as one
continuous downward scroll** (Hero → My Projects → About Me → Skills → Tools → Testimonials
→ Contact), and do not implement a reversed scroll direction anywhere. If, once the page is
running, the user actually wants a reversed sub-flow around Skills/Tools specifically, that
is a small, isolated change to make from here — safer to build it consistent first.

## 5. Tools Section — REMOVED in Revision 1 (kept for history)

- `9.mp4` centered as the static background.
- **[BUILD NOTE] Hotspot coordinates** (percent of the 16:9 video frame; the frame is sized
  to cover the viewport so these always line up): Vel `left 26.6% top 3.5% w 5.2% h 92%`
  (gold glow), Peacock `left 52% top 36% w 22% h 60%` (blue glow). In portrait the frame is
  shifted so both stay on screen, with a blurred copy of the loop filling above and below.
- Persistent softly-pulsing text: **"Tap Peacock or Vel."**
- Vel and Peacock each carry a colored accent-glow overlay, positioned over their fixed
  on-screen coordinates in the video, **visible at all times**, intensifying further on
  hover.
- Click → a short glow-burst on the hotspot, then a modal: Vel shows `5.png` + description;
  Peacock shows `6.png` + description (copy in `lib/content.ts` → `tools`). Esc, the ×
  button or a click outside closes it; page scroll is locked while it's open.
- Continued scroll fades this section out and brings in Testimonials.

## 6. Testimonials Section

- Vertical roller of mock-Google-review cards. Order: Shiva (`7a.png`) → The Tamil People
  (`7b.png`) → Brahma (`7c.png`).
- Section pins and scroll-locks until all three have rolled through.
- Quote copy and full review-UI chrome (stars, "Local Guide" badge, review count) per the
  design already locked in `CLAUDE.md`. **[BUILD NOTE]** Final quotes were written during
  the build (`lib/content.ts` → `testimonials`): Shiva 5★, The Tamil People 5★, Brahma 4★
  ("one star off for the cell") with a "Response from the owner". Above the roller sits a
  mock place header: "Murugan · 4.9 ★ · ∞ reviews · Open 24 hours, every yuga".
- Each card's real-incident anchor is a "Based on a true story ⓘ" chip that shows a
  tooltip on hover/tap.
- After the roller completes, continued scroll brings up `10.mp4` for Contact.

## 7. Contact Section

- `10.mp4` fills the background (Murugan reclining, left-weighted, deliberate right-side
  margin).
- Comic-style speech/cloud box with the "if you wanna contact me" five-values text (locked
  copy in `CLAUDE.md`).
- Further scroll: background transitions to white.
- "Yaamirukka Bayamen" fades in, in Tamil script.
- `8.png` (the Vel on white) rises into frame like a drawn thread — a bottom-to-top
  clip-path reveal with a slight upward travel — and settles centered, behind the Tamil
  text. (Originally `9.png`; changed on the user's instruction.)
- **[BUILD NOTE]** A small line under the Tamil reads "YAAMIRUKKA BAYAMEN — Why fear, when
  I am here?" so non-Tamil readers get it.
- This is the final state of the page — nothing scrolls past this.

---

## Build Order
1. Hero
2. My Projects → Soorasamharam
3. My Projects → Leading the Devas
4. My Projects → Swamimalai (all five clips)
5. About Me
6. Skills
7. Tools
8. Testimonials
9. Contact
10. Full-page scroll-direction and performance pass (video preloading, especially the five
    short Swamimalai clips which should all preload together since they play in fast
    succession)

All ten steps are done. Code map: `app/page.tsx` (section order), `components/sections/*`
(one file per section), `components/ProjectCaptionCard.tsx` (the shared caption card),
`components/ComicBubble.tsx`, `lib/content.ts` (all copy), `lib/useScrubVideo.ts`,
`lib/media.ts`, `lib/scroll.tsx`, `app/globals.css` (all styling).

## Performance Notes
- Preload `1.mp4` and `2.mp4` fully before allowing scroll-scrub to begin on them — a
  partially-buffered video will visibly stutter when scrubbed.
- The five Swamimalai clips are short; preload all five together when Project III's parent
  section first comes into view, rather than one at a time, to avoid a load-stutter on each
  pull-up transition.
- Every pattern-loop video (`11.mp4`, `12.mp4`) and the Tools/Contact loops (`9.mp4`,
  `10.mp4`) should use native `loop` playback, not manual re-triggering.
