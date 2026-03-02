# LINE-BY-LINE EXPLANATION (Beginner Teaching Edition)

This guide complements the inline comments in code.
The source files contain line-near explanations for syntax and behavior.
This document gives you:
1. Reading order and key line anchors
2. Symbol/syntax cheat sheet
3. "If you change X, also check Y" table
4. Exercises tied to exact line numbers

## 1) Full file-by-file walkthrough (reading order)

### A. `index.html`
- `index.html:1` doctype enables standards mode.
- `index.html:3` `<html lang="en">` sets default language metadata.
- `index.html:9` charset defines UTF-8 encoding.
- `index.html:12` viewport enables mobile-responsive scaling.
- `index.html:15-29` SEO + Open Graph metadata.
- `index.html:33-41` font preconnect + stylesheet loading.
- `index.html:45` root mount node for React.
- `index.html:49` module script entry to `src/main.jsx`.

### B. `src/main.jsx`
- `src/main.jsx:1-4` imports React, ReactDOM, App, and CSS.
- `src/main.jsx:26` `document.getElementById('root')` fetches mount node.
- `src/main.jsx:30` `ReactDOM.createRoot(...)` creates React render root.
- `src/main.jsx:36-42` renders `<App />` inside `<React.StrictMode>`.

### C. `src/App.jsx`
- `src/App.jsx:1-25` imports hooks and all section components.
- `src/App.jsx:29-281` `content` object holds all bilingual copy + structured section data.
- `src/App.jsx:284-297` `getInitialLanguage()` chooses initial language from localStorage fallback.
- `src/App.jsx:300-326` `getInitialTheme()` chooses theme using localStorage -> system preference -> fallback.
- `src/App.jsx:329-334` `useState` initializes language/theme once.
- `src/App.jsx:337` `content[language]` selects active translation branch.
- `src/App.jsx:341-350` language persistence effect (`localStorage` + `documentElement.lang`).
- `src/App.jsx:354-360` theme persistence effect (`localStorage` + `data-theme` + `colorScheme`).
- `src/App.jsx:363-399` JSX tree composition (skip link, navbar, sections, footer).
- `src/App.jsx:402` default export.

### D. Components

#### `src/components/Navbar.jsx`
- `Navbar.jsx:3` component signature with prop destructuring.
- `Navbar.jsx:5-22` brand + nav link rendering.
- `Navbar.jsx:23-42` language toggle group, active states via `aria-pressed`.
- `Navbar.jsx:44-56` theme toggle behavior and label text swap.
- `Navbar.jsx:64` export.

#### `src/components/Hero.jsx`
- `Hero.jsx:5` imports Button.
- `Hero.jsx:9` component receives `content` prop.
- `Hero.jsx:15-41` renders hero section with translated eyebrow/tagline and CTA anchors.

#### `src/components/About.jsx`
- `About.jsx:4` imports shared title component.
- `About.jsx:7-24` title + mapped paragraph array to `<p>` elements.

#### `src/components/BandMembers.jsx`
- `BandMembers.jsx:4` imports shared title component.
- `BandMembers.jsx:8-25` `getInitials` helper string pipeline.
- `BandMembers.jsx:30-54` map member data to cards with accessible portrait placeholders.

#### `src/components/VideoSection.jsx`
- `VideoSection.jsx:4` imports title.
- `VideoSection.jsx:12-29` iframe embed with accessibility/performance attributes.

#### `src/components/SocialLinks.jsx`
- `SocialLinks.jsx:4` imports title.
- `SocialLinks.jsx:14-34` maps platform data to external link cards with accessible labels.

#### `src/components/Contact.jsx`
- `Contact.jsx:4` imports title.
- `Contact.jsx:14-27` direct email/phone links (`mailto:` / `tel:`).
- `Contact.jsx:31-54` placeholder form inputs and non-submit button.

#### `src/components/Footer.jsx`
- `Footer.jsx:5` component signature.
- `Footer.jsx:19` runtime year generation.
- `Footer.jsx:27-33` map footer links.

#### `src/components/SectionTitle.jsx`
- `SectionTitle.jsx:6-27` shared heading block and conditional subtitle ternary.

#### `src/components/Button.jsx`
- `Button.jsx:7` prop destructuring with default `variant`.
- `Button.jsx:18` template literal class composition.
- `Button.jsx:26` anchor rendering.

### E. `src/styles.css`
- `styles.css:13-67` root design tokens (light mode defaults).
- `styles.css:72-108` dark mode variable overrides.
- `styles.css:112-566` component/layout styles consuming tokens.
- `styles.css:548-566` responsive breakpoints for tablet and desktop.

## 2) Syntax cheat sheet (JS/JSX/HTML/CSS)

### JavaScript / JSX
- `import X from 'path'`: import default export.
- `import { A, B } from 'pkg'`: import named exports.
- `const`: block-scoped binding not reassigned.
- `function Name(params) { ... }`: function declaration.
- `({ a, b })`: object destructuring.
- `variant = 'primary'`: default parameter value.
- `` `btn-${variant}` ``: template literal with interpolation.
- `condition ? a : b`: ternary operator.
- `arr.map((item) => (...))`: transform array into new array/JSX list.
- `useState(initial)`: state hook; returns `[value, setter]`.
- `useEffect(fn, [deps])`: effect hook; reruns when deps change.
- `className="..."`: JSX attribute equivalent to HTML `class`.
- `{expression}` inside JSX: evaluate JavaScript and insert result.

### HTML
- `<!doctype html>`: standards mode declaration.
- `<meta charset="UTF-8">`: document encoding.
- `<meta name="viewport" ...>`: mobile viewport behavior.
- `<link rel="preconnect" ...>`: early network connection optimization.
- `<script type="module" ...>`: ES module script loading.

### CSS
- `--token-name`: custom property definition.
- `var(--token-name)`: read custom property value.
- `[data-theme='dark']`: attribute selector.
- `:hover`, `:focus-visible`: pseudo-classes.
- `@media (min-width: Xpx)`: conditional style rules by viewport width.
- `display: flex/grid`: layout models.
- `clamp(min, preferred, max)`: responsive bounded size.

## 3) “If you change this line, check these lines too” cross-reference

| Change this | Also check | Why |
|---|---|---|
| `App.jsx:29` `const content = { ... }` keys | All components consuming those keys | Missing keys cause undefined text or runtime errors |
| `App.jsx:333-334` state keys | `Navbar.jsx` props and effect lines | Toggles depend on these values and setters |
| `App.jsx:385` main id | Skip link `href="#main-content"` | Keyboard skip target must match id |
| `Navbar.jsx` nav item href values | section `id` attributes in components | Broken in-page navigation if mismatch |
| `Button.jsx:18` class template | `.btn-*` styles in `styles.css` | Variant classes must exist in CSS |
| `BandMembers.jsx` helper pipeline | member placeholder output styles | Initials formatting/UI may degrade |
| `styles.css` token names | every `var(--token)` reference | Renaming tokens without updating refs breaks styles |
| `index.html:45` root id | `main.jsx` `getElementById('root')` | React mount fails if IDs differ |

## 4) Beginner exercises tied to exact line numbers

1. Change default language to English:
- Edit `src/App.jsx:297` return ternary fallback `'es'` to `'en'`.
- Verify `Navbar` button active state and copy.

2. Add a new navigation section label:
- Add item in `src/App.jsx` under both `content.es.navItems` and `content.en.navItems`.
- Ensure section `id` exists in a component.

3. Modify primary button style safely:
- Update token `--button-primary-bg` in `src/styles.css:57` and dark override `:95`.
- Do not hardcode color directly in `.btn-primary` unless intentional.

4. Replace YouTube video:
- Update iframe `src` in `src/components/VideoSection.jsx:17`.
- Keep `https://www.youtube.com/embed/...` format.

5. Add a fourth member:
- Add member object in both language branches inside `src/App.jsx`.
- Verify card renders and has `portraitAlt` for accessibility.

## How to use this guide with source comments
- Step 1: Open a source file.
- Step 2: Read line comments directly above code lines.
- Step 3: Use this doc's line anchors to understand cross-file dependencies.
- Step 4: After edits, verify related lines from the cross-reference table.

