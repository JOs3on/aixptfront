# Synara-inspired landing page

A self-contained React + CSS landing page inspired by the public Synara hero redesign at:

`https://synara-hero-redesign.opulent-automation.pages.dev`

## Run it

The page is mounted in the main app at:

`/synara-clone`

Start the existing Vite app with `npm run dev`, then open `http://localhost:3123/synara-clone`.

The reusable implementation lives in:

- `SynaraClone.tsx` — page structure, content, Framer Motion effects, interactive mobile menu, and FAQ state.
- `synara.css` — visual system, responsive breakpoints, mock desktop application UI, CSS illustrations, hover states, and keyframes.

## What the design uses

- **Obsidian developer-tool palette:** near-black page surfaces, softly separated panels, low-opacity borders, muted gray body copy, and a lime-green action accent.
- **Tight editorial typography:** oversized negative-tracked headings with a bright emphasized phrase; small uppercase mono kickers establish the page's rhythm.
- **Conversion-first composition:** compact navigation, centered hero, primary macOS download CTA, secondary GitHub CTA, download proof, product preview, feature pillars, FAQ, and a final full-width CTA.
- **Product storytelling:** the large “desktop app” preview is built from semantic divs and CSS rather than an image, so lanes, agents, diffs, status indicators, and worktrees can be adapted to a real product.
- **Responsive behavior:** desktop navigation collapses into a mobile menu; the preview scales and crops deliberately on narrow screens; grids become two-column or stacked layouts.

## Motion and interaction reproduction

- Hero copy fades and rises on first load with Framer Motion.
- The desktop app preview reveals and settles into place when it enters the viewport.
- Sections and provider cards use `whileInView` reveal variants with staggered card timing.
- Provider cards lift and brighten their borders on hover.
- The marquee continuously translates horizontally and pauses naturally if you add a hover pause rule.
- The preview's running agent indicator and terminal cursor use lightweight CSS keyframes.
- The FAQ uses local React state plus a CSS grid-row transition to open one answer at a time.
- `prefers-reduced-motion` disables long-running motion for accessibility.

## Adapting it

Replace the provider array, hero copy, download URLs, GitHub URL, FAQ content, and the CSS-built preview markup with your actual product data. For production downloads, change the CTA anchors from hash links to real signed asset URLs. If your product has real screenshots, the preview can be replaced with an image/video while keeping the same framed window styles.

The page intentionally recreates the visual language and interaction patterns without copying proprietary source code or remote assets.
