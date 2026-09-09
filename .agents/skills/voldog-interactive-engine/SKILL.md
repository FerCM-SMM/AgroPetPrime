---
name: voldog-interactive-engine
description: "Direct engineering specification for high-end luxury e-commerce motion and interactive mechanics, reverse-engineered from Voldog Food (voldogfood.com). Covers Lenis inertia scroll, GSAP ScrollTrigger scrollerProxy, physics-driven follower cursor with 'ARRASTE' drag state, split-text word reveal, 3D mouse parallax tilt, and interactive drag carousels."
---

# Voldog Interactive Engine Specification

This skill documents the exact interactive architecture and motion dynamics derived directly from **Voldog Food (`voldogfood.com`)**, adapted for modern Next.js (App Router), React 19, TypeScript, and Tailwind CSS.

---

## 1. Core Mechanics

### 1.1. Lenis Smooth Inertia Scrolling
- **Library:** `lenis`
- **Tuning:**
  - `lerp: 0.06` (luxury deceleration lag, weight without latency)
  - `touchMultiplier: 1.2`
  - `wheelMultiplier: 1.1`
- **GSAP Sync:** Connect Lenis `scroll` events to `ScrollTrigger.update` and configure `ScrollTrigger.scrollerProxy`.
- **Accessibility:** If `prefers-reduced-motion: reduce` or touch device, bypass smoothing and use native scroller.

### 1.2. Follower Cursor (`CursorFollower`)
- **Physics:** `requestAnimationFrame` lerp interpolation:
  `currentX += (targetX - currentX) / 6; currentY += (targetY - currentY) / 6;`
- **States:**
  1. **Default (`scale-100`):** Solid circle with brand accent color (`#20BEE2`), centered with `translate(-50%, -50%)`.
  2. **Link/Clickable Hover (`scale-175` / `opacity-30`):** Expands over clickable targets (`a`, `button`, interactive pills).
  3. **Magic Spotlight Hover (`scale-300` / `mix-blend-difference`):** Expands over hero cards, badges, and logo.
  4. **Drag Pill Mode (`drag-active`):** Triggered when hovering over horizontal product carousels. Expands into an elongated capsule displaying the uppercase label `"ARRASTE"` with bold typography.
- **Rules:** Hide cursor on touch devices or small screens (`< 1024px`) to preserve native mobile UX.

### 1.3. Split-Text Staggered Reveal
- Segment headings into words wrapped in `<span class="inline-block overflow-hidden"><span class="inline-block word">...</span></span>`.
- Trigger reveal when entering viewport with staggered delay (`index * 30ms`).
- Translates from `translateY(100%)` to `translateY(0)` with smooth ease.

### 1.4. Mouse Tilt 3D (Parallax Depth)
- Calculate mouse offset relative to card center `(x - centerX) / (width / 2)` and `(y - centerY) / (height / 2)`.
- Apply subtle 3D transform: `perspective(1000px) rotateX(-y * 8deg) rotateY(x * 8deg)`.
- Smooth reset on `mouseleave`.

### 1.5. Tactile Hero Toggle
- Sliding pill indicator using `transform: translateX(...)` with spring timing.
- Crossfade background image or video with simultaneous scale nudge (`scale: 0.98 -> 1.0`).
- Update headline text and CTA destination seamlessly without page reloads.
