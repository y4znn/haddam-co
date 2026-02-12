---
trigger: always_on
---

# Design System Constitution (Imperative)

1. **NO MAGIC NUMBERS:** Usage of arbitrary pixel values (e.g., `margin: 17px`) is STRICTLY FORBIDDEN. You MUST use Tailwind utility classes (e.g., `p-4`, `gap-6`).
2. **KINETIC PHYSICS:** All interactive motion must use `framer-motion` springs.
   - Standard Spring: `type: "spring", stiffness: 300, damping: 30`
   - NO linear CSS transitions for UI elements.
3. **DEEP GLASS PROTOCOL:**
   - Glass surfaces must use: `bg-white/5` (Dark) or `bg-white/60` (Light).
   - Must include `backdrop-blur-xl`.
   - Must include a subtle border: `border-white/10`.
   - Must include an inner glow: `shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]`.
4. **ACCESSIBILITY (WCAG 2.4.13):**
   - All interactive elements must have a visible `:focus-visible` ring (Orange-500).
   - Text opacity on glass must never be below 80% (`text-white/90`).
5. **INTERACTION:**
   - All clickable items must have `cursor-pointer`.
   - Buttons must scale down (`0.98`) on tap/click.
6. MICRO-INTERACTION PROTOCOL (TIER AAA)
Every interactive component (Card, Button, Input) MUST implement the following physics:
1. **The "Snap Back" Rule:** ALL hover states (scale, tilt, color) MUST explicitly define an `onMouseLeave` or `exit` transition to return to the `initial` state. Never leave an element in a "stuck" hover state.
2. **Tactile Feedback:**
   - **Click:** `whileTap={{ scale: 0.98 }}`.
   - **Hover:** `cursor: pointer` is mandatory.
3. **Motion Physics:**
   - Use `type: "spring"` with `stiffness: 400, damping: 30` for all UI movements.
   - Avoid linear `ease-in-out` for interactive elements.