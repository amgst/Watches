# Luxury Watch Catalog - Design Guidelines

## Design Approach
**Reference-Based: Premium E-commerce**
Drawing inspiration from Hodinkee, Chrono24, and luxury fashion e-commerce (Net-a-Porter, Mr Porter). The design emphasizes refined elegance, generous whitespace, and exceptional typography that reflects the craftsmanship of luxury timepieces.

## Typography System

**Font Families:**
- Primary: 'Cormorant Garamond' (serif) - Headers, watch names, brand names
- Secondary: 'Inter' (sans-serif) - Body text, specifications, UI elements
- Accent: 'Playfair Display' (serif) - Hero taglines, feature callouts

**Hierarchy:**
- Hero Headline: text-6xl to text-7xl, font-light, Cormorant
- Watch Names: text-3xl, font-normal, Cormorant
- Brand Names: text-sm, font-semibold, uppercase, tracking-widest, Inter
- Specifications: text-sm, font-normal, Inter
- Body Text: text-base, leading-relaxed, Inter
- Labels: text-xs, uppercase, tracking-wide, font-medium, Inter

## Layout System

**Spacing Primitives:** Tailwind units of 2, 4, 6, 8, 12, 16, 20, 24
- Card padding: p-6 to p-8
- Section spacing: py-20 to py-32
- Grid gaps: gap-6 to gap-8
- Content margins: mb-4, mb-6, mb-8

**Container Strategy:**
- Max width: max-w-7xl for main content
- Watch grid: max-w-screen-2xl for spacious display
- Detail pages: max-w-6xl

## Page Structure

### Hero Section (Full viewport height: min-h-screen)
- Large background image showcasing luxury watch craftsmanship (macro shot of watch movement or elegant wrist shot)
- Centered content with generous vertical spacing
- Headline: "Curated Collection of Fine Timepieces" or similar
- Subheadline describing the catalog
- Primary CTA button with blurred background backdrop
- Subtle scroll indicator at bottom

### Filter & Search Bar (Sticky on scroll)
- Full-width container with light backdrop blur when scrolling
- Search input: Large, prominent (h-14), rounded-lg
- Filter pills: Horizontal scrollable row showing active filters
- Advanced filter dropdown: Multi-select for brands, materials, diameter ranges
- Sort dropdown: Aligned right
- Layout: Single row on desktop, stacked on mobile

### Watch Catalog Grid
- Desktop: grid-cols-3, gap-8
- Tablet: grid-cols-2, gap-6
- Mobile: grid-cols-1, gap-6
- Asymmetric featured layout: First 2 items span 2 rows for visual interest

### Watch Card Design
- Aspect ratio 4:5 for watch image container
- Image: Centered white/light background, watch photographed at 3/4 angle
- Hover state: Subtle scale transform and shadow elevation
- Card content (p-6):
  - Brand name (uppercase, small)
  - Watch family & name (large, elegant serif)
  - Reference number (muted, small)
  - Key specs: 3-column grid showing case material, diameter, movement
  - Subtle divider line between image and content

### Detail Page Layout
- Two-column split (lg:grid-cols-2, gap-16)
- Left: Large watch image with zoom capability, 2-3 additional angles in thumbnail gallery below
- Right: 
  - Brand breadcrumb
  - Watch name (text-4xl)
  - Reference number
  - Price display (if available)
  - Specifications table: Two-column layout with labels and values
  - Full description with proper paragraph spacing
  - CTA section: "Contact for availability" or "View similar watches"

### Specifications Table
- Clean, minimalist rows with alternating subtle background
- Label column: Uppercase, tracking-wide, text-xs
- Value column: Regular weight, slightly larger
- Groupings: Movement, Case, Dial, separated by spacing

## Component Library

**Navigation:**
- Horizontal nav bar: Transparent over hero, solid white with shadow when scrolled
- Logo: Left-aligned, elegant serif wordmark
- Menu items: Spaced generously (mx-8), uppercase, tracking-wide
- Search icon: Right-aligned
- Mobile: Hamburger menu with full-screen overlay

**Buttons:**
- Primary: px-8 py-4, rounded-full, uppercase, tracking-wide
- Secondary: Border-only variant, same sizing
- Ghost: Text-only with underline on hover
- All buttons use backdrop-blur-md when over images

**Search & Filters:**
- Search input: Rounded-lg, h-14, px-6, with search icon
- Filter tags: Rounded-full pills, dismissible with × icon
- Dropdown menus: Rounded-lg, shadow-xl, max-h-96 with scroll

**Data Display:**
- Specification rows: py-3, subtle border-b
- Stat cards: Centered text, large numbers, small labels
- Info badges: Rounded-full, px-4 py-1, uppercase text-xs

## Images

**Hero Image:**
Large, high-resolution photograph of luxury watch details (macro shot of watch mechanism, dial details, or elegant lifestyle shot). Image should convey craftsmanship and luxury. Position: Full-width background with dark overlay (opacity-40) for text readability.

**Watch Product Images:**
Professional product photography on clean white/light gray backgrounds. Each watch photographed at consistent 3/4 angle showing dial, case, and band. Additional detail shots for zoom gallery: movement close-up, case side profile, clasp detail.

**Accent Images:**
Optional: Subtle texture overlays (brushed metal, leather grain) for section backgrounds, used very sparingly.

## Responsive Behavior

- Desktop (lg): 3-column grid, side-by-side detail page
- Tablet (md): 2-column grid, stacked detail page with sticky image
- Mobile (base): Single column, simplified filters (drawer), condensed specs

## Animations

Use minimally and purposefully:
- Card hover: Scale 1.02, shadow transition (300ms ease)
- Image zoom: Smooth scale on click
- Filter drawer: Slide-in transition (200ms)
- Page transitions: Subtle fade (150ms)
- NO scroll-triggered animations, NO parallax effects