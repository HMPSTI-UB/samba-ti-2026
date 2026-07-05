# DESIGN.md — Brand Design System Reference

> Reference file for AI coding agents. Use these tokens, rules, and patterns whenever generating UI, components, or styles for this project. Do not invent new colors, fonts, or spacing values outside what is defined here unless explicitly instructed.

## 1. Brand Identity

- **Theme**: Futuristic, bold, visionary, tech/space-inspired.
- **Tagline**: "Consistent · Bold · Futuristic · Visionary"
- **Logo**: Geometric arrow/rocket mark with a star and orbit ring accent. Has 4 approved variants (see §7).
- **Tone of voice**: Confident, forward-looking, minimal jargon. Active voice. Short, declarative headlines (e.g. "The Future Is Ours", "Explore Beyond Limits").

## 2. Color Palette

### Primary

| Name       | Hex       | Usage                                                                                                                   |
| ---------- | --------- | ----------------------------------------------------------------------------------------------------------------------- |
| Deep Blue  | `#0D3B66` | Primary dark, headers, primary button gradient start                                                                    |
| Vivid Blue | `#1E78B7` | Primary accent, links, primary button gradient end                                                                      |
| Purple     | `#8E63B6` | Secondary actions, active nav state                                                                                     |
| Orange     | `#F08A00` | Accent / CTA, highlight                                                                                                 |
| Red        | `#D32F2F` | Alerts, errors, high-emphasis accent (use sparingly, close in hue to Orange — ensure sufficient contrast when adjacent) |

### Neutrals

| Name     | Hex       | Usage                                                  |
| -------- | --------- | ------------------------------------------------------ |
| Ink      | `#0B0D12` | Darkest background / near-black surfaces               |
| Charcoal | `#1A1F26` | Dark surface (cards, nav, sidebars)                    |
| Stone    | `#5B606B` | Borders, secondary text, disabled states               |
| Light    | `#E6E5E1` | Light surfaces, dividers                               |
| Cream    | `#F7F2E6` | Light background alternative, logo-on-light background |

### Gradients

| Name          | Stops               | Usage                                  |
| ------------- | ------------------- | -------------------------------------- |
| Blue Horizon  | `#0D3B66 → #1E78B7` | Primary buttons, hero backgrounds      |
| Cosmic Purple | `#6D4AA3 → #B588CC` | Secondary buttons, decorative accents  |
| Ignite        | `#F08A00 → #D32F2F` | Accent CTA buttons, highlight elements |

### Rules

- Dark mode is the default context for components (cards, nav) — most components shown use Ink/Charcoal backgrounds with light text.
- Do not place Orange and Red directly adjacent without a divider or spacing buffer; verify contrast ratio ≥ 4.5:1 for text.
- Gradients always flow in the same direction/order as listed (dark → light for Blue Horizon, cool → warm not applicable to others).

## 3. Typography

| Role             | Font         | Weights available                      |
| ---------------- | ------------ | -------------------------------------- |
| Headings (H1–H3) | **Orbitron** | Bold (primary weight for headings)     |
| Body             | **Inter**    | Light, Regular, Medium, SemiBold, Bold |

### Type scale (relative)

- **H1**: Orbitron Bold, largest, tight leading, used for hero headlines only (e.g. "THE FUTURE IS OURS").
- **H2**: Orbitron Bold, section headers (e.g. "Explore Beyond Limits").
- **H3**: Orbitron Bold/Medium, sub-section headers (e.g. "Built for Visionaries").
- **Body**: Inter Regular for paragraph text; Inter SemiBold/Bold for emphasis, labels, and button text.

### Rules

- Never use Orbitron below H3 size or for long-form body copy — legibility drops at small sizes.
- Inter is the only font for body text, UI labels, forms, and captions.
- Headings: prefer sentence case or title case matching examples (mixed usage observed — default to sentence case for UI, title case for marketing headlines).

## 4. Spacing, Radius & Borders

| Token                 | Value                       | Usage                                        |
| --------------------- | --------------------------- | -------------------------------------------- |
| Card/Container radius | `12px`                      | Cards, containers, modals                    |
| Pill button radius    | `999px`                     | Buttons (fully rounded)                      |
| Standard border       | `1px solid #5B606B` (Stone) | Input borders, dividers, outlined containers |

> No explicit spacing/grid scale was defined in the source brand guide. Default to an 8px base spacing scale (8/16/24/32/48/64) until the team specifies otherwise.

## 5. Icons

- Style: **line/outline icons**, consistent stroke width, minimal, geometric (planet, sparkle/star, flag/arrow, hexagon, lightning bolt shown as examples).
- No filled icon style observed — stick to outline/stroke icons for consistency.
- Icon color: inherits from text/neutral palette (typically Light or Stone on dark backgrounds).

## 6. Buttons

| Variant       | Style                                                                      | Use case                               |
| ------------- | -------------------------------------------------------------------------- | -------------------------------------- |
| **Primary**   | Blue Horizon gradient, white text, pill radius, trailing arrow icon        | Main call-to-action (e.g. "Explore")   |
| **Secondary** | Purple solid, white text, pill radius, trailing arrow icon                 | Alternative action (e.g. "Learn More") |
| **Accent**    | Ignite gradient (orange→red), white text, pill radius, trailing arrow icon | High-emphasis CTA (e.g. "Get Started") |
| **Ghost**     | Dark/Charcoal fill or outline, white text, pill radius                     | Tertiary action (e.g. "View Details")  |

### Rules

- All buttons use pill radius (`999px`) and often include a trailing chevron/arrow icon for forward action.
- Maintain a strict hierarchy: only one Primary and at most one Accent button visible per view/section to avoid competing CTAs.
- Define states explicitly when building (hover, active, disabled, focus) — not specified in source, so derive from base colors: hover = 10% lighter/darker, disabled = 40% opacity, focus = 2px outline in Vivid Blue.

## 7. Components

### Card

- Background: Charcoal/Ink dark surface.
- Radius: `12px`.
- Contains: logo/icon mark, bold title (Orbitron or Inter SemiBold), short Inter body description, and a text link with arrow (e.g. "Explore →") in Vivid Blue.

### Navigation (Sidebar)

- Background: dark (Ink/Charcoal).
- Logo mark at top.
- Nav items: icon + label pairs (Home, About, Mission, Projects, Contact).
- Active state: Purple background highlight on the current item, rounded corners.
- Inactive items: Stone/Light text, no background.

## 8. Backgrounds & Textures

| Name           | Description                                | Usage                              |
| -------------- | ------------------------------------------ | ---------------------------------- |
| Space Gradient | Purple-to-dark radial/diagonal gradient    | Hero sections, marketing pages     |
| Star Field     | Dark background with subtle star particles | Ambient/decorative backgrounds     |
| Grunge Texture | Subtle dark noise/grain texture            | Section backgrounds needing depth  |
| Grid Lines     | Faint grid overlay on dark background      | Technical/dashboard-style sections |

Use these as background treatments behind hero or feature sections — never behind body text blocks where they'd hurt readability.

## 9. Logo Usage

Four approved variants — use the correct one per background:

| Variant          | Background                    |
| ---------------- | ----------------------------- |
| Full Color       | Default / neutral backgrounds |
| Light Background | Cream/light surfaces          |

### Rules

- Maintain clear space around the logo equal to at least the height of the star element at the top of the mark.
- Do not stretch, rotate, or skew the logo.

## 10. Gaps to Resolve Before Production Use

The source brand guide does not define the following — confirm with design lead or use sensible defaults noted:

- [ ] Full spacing/grid system (default: 8px base scale)
- [ ] Interactive states for buttons/inputs (hover, focus, disabled, error)
- [ ] Elevation/shadow tokens for depth and layering
- [ ] Responsive type scale (font sizes per breakpoint)
- [ ] Accessibility contrast audit, especially Orange/Red on dark backgrounds
- [ ] Motion/animation guidelines

---

_Generated from brand guide v1.0. Update this file if the source design system changes._

---

## 11. UI Components (Radix + Tailwind)

Components live in `src/components/ui/` (kebab-case files, named exports). Built on **Radix UI** primitives for accessibility + **Tailwind CSS v4** for styling. All components use `cn()` for class merging.

**Living reference**: `http://localhost:3000/design-system`

### Button (`button.tsx`)

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `"primary"` `|` `"secondary"` `|` `"accent"` `|` `"ghost"` `|` `"outline"` `|` `"destructive"` | `"primary"` | Visual style |
| `size` | `"sm"` `|` `"md"` `|` `"lg"` | `"md"` | Size preset |
| `asChild` | `boolean` | `false` | Render as child via Radix Slot (for `<a>`, `<Link>`) |
| `loading` | `boolean` | `false` | Show spinner + disable interaction |
| `disabled` | `boolean` | — | Native disabled state |

**Rules:**
- Only one `primary` button per view
- At most one `accent` button per view
- Use `destructive` for delete/danger confirmations only
- `ghost` / `outline` for tertiary or toolbar actions
- Pass `asChild` + wrap content in `<a>` to render as a link

### Input (`input.tsx`)

| Prop | Type | Description |
|---|---|---|
| `label` | `string` | Optional label linked via `htmlFor` |
| `error` | `string` | Error message, turns border red + shows message |
| `helperText` | `string` | Helper text (hidden when `error` is set) |

All native `<input>` attributes are forwarded.

### Select (`select.tsx`)

| Prop | Type | Description |
|---|---|---|
| `items` | `{ value: string, label: string }[]` | Dropdown options |
| `placeholder` | `string` | Placeholder text |
| `label` | `string` | Optional label |
| `error` | `string` | Error message |
| `value` / `onValueChange` | Controlled value | Radix Select controlled API |

### Checkbox (`checkbox.tsx`)

| Prop | Type | Description |
|---|---|---|
| `label` | `string` | Clickable label beside the box |
| `error` | `string` | Error message below |
| `defaultChecked` / `checked` | `boolean` | Radix Checkbox API |

### Switch (`switch.tsx`)

| Prop | Type | Description |
|---|---|---|
| `label` | `string` | Clickable label beside the toggle |
| `defaultChecked` / `checked` | `boolean` | Radix Switch API |

### Dialog (`dialog.tsx`)

Exports: `Dialog`, `DialogTrigger`, `DialogContent`, `DialogClose`

`DialogContent` props:

| Prop | Type | Description |
|---|---|---|
| `title` | `string` | Renders `DialogTitle` (bold, Orbitron) |
| `description` | `string` | Renders `DialogDescription` (muted) |

Contains glassmorphism overlay + backdrop blur on the background.

### Dropdown Menu (`dropdown-menu.tsx`)

Exports: `DropdownMenu`, `DropdownMenuTrigger`, `DropdownMenuContent`, `DropdownMenuItem`, `DropdownMenuSeparator`, `DropdownMenuCheckboxItem`

All Radix DropdownMenu props forwarded. Styled with cosmic dark theme.

### Conventions

- All files use **kebab-case** (`button.tsx`)
- All components use **named exports**
- All components use `forwardRef` + `displayName`
- Use `asChild` (Radix Slot) for polymorphic rendering instead of separate `as` prop
- Import pattern: `import { Button } from "@/components/ui/button"`

