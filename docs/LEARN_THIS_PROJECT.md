# Learn This Project (Beginner Edition)

This guide explains how this Los Guatemex site works from first load to final render.
It is written so someone with limited coding experience can trace the code and safely make edits.

## 1) How the app boots and renders

### `index.html` -> browser entry document
- `<!doctype html>` tells the browser to use modern HTML rules.
- `<html lang="en">` sets default document language before JavaScript runs.
- `<head>` includes metadata (SEO/Open Graph) and font loading.
- `<div id="root"></div>` is the mount target for React.
- `<script type="module" src="/src/main.jsx"></script>` starts the app by loading JavaScript modules.

### `src/main.jsx` -> React bootstrap
- Imports React/ReactDOM and root component (`App`).
- Imports CSS so styles are bundled.
- `ReactDOM.createRoot(...)` creates a React root tied to `#root`.
- `.render(<React.StrictMode><App /></React.StrictMode>)` renders the app tree.

What you see in UI:
- Without `main.jsx`, nothing interactive appears; you would only have raw HTML shell.

## 2) How props flow through components

### Top-down data model
`App.jsx` is the source of truth for:
- Language (`es` or `en`)
- Theme (`light` or `dark`)
- All translated text (`content` object)

Then App passes data into child components as props:
- `Navbar` gets labels + state + handlers.
- Section components get only their own content slices.
- `Footer` gets brand + footer text.

Why this pattern:
- Keeps business logic centralized.
- Keeps UI components simple and reusable.
- Makes translation/theme updates instant across the page.

Tradeoff:
- `App.jsx` becomes large because it stores content + orchestration.

## 3) How language switching works

### State and initialization
- `useState(getInitialLanguage)` initializes language once.
- `getInitialLanguage()` reads `localStorage` key `los-guatemex-language`.
- If no saved value, defaults to Spanish (`es`) for Spanish-first behavior.

### Persistence and document language
- `useEffect(..., [language])` runs whenever language changes.
- Saves new language back to localStorage.
- Sets `document.documentElement.lang` to `es` or `en`.

Why set `<html lang>`:
- Better screen reader pronunciation rules.
- Better accessibility/SEO semantics.

### UI control
- `Navbar` renders ES/EN buttons.
- Click handler calls `onLanguageChange('es'|'en')`.
- `aria-pressed` indicates active state for assistive technology.

## 4) How dark mode works

### Theme selection priority
`getInitialTheme()` uses:
1. Saved localStorage theme if present
2. OS preference (`prefers-color-scheme: dark`)
3. Fallback to `light`

### CSS activation
- App sets `data-theme="light|dark"` on `<html>`.
- CSS uses `[data-theme='dark']` to override design tokens.

### Why token-based theming
- Most rules use semantic CSS variables (`--surface-1`, `--text-primary`, etc.).
- You change values once; all components update automatically.

Tradeoff:
- Initial variable setup is verbose, but long-term maintenance is much easier.

## 5) How to safely edit copy, links, members, and styles

### Edit text/copy
File: `src/App.jsx`
- Update `content.es` and `content.en` together.
- Keep structure identical in both languages.

Common mistake:
- Adding a key in `es` but not `en` causes undefined text when switching language.

### Edit social links
File: `content.{lang}.social.items`
- Each item needs: `name`, `href`, `copy`.
- Keep URL as full `https://...`.

### Edit member cards
File: `content.{lang}.members.members`
- Each member object needs:
  - `name`
  - `role`
  - `bio`
  - `portraitAlt`

Why `portraitAlt` matters:
- Screen readers need image-equivalent description.

### Edit styling safely
File: `src/styles.css`
- Prefer changing variables first in `:root` and `[data-theme='dark']`.
- Avoid changing component layout rules unless needed.

Common mistake:
- Hardcoding colors in component rules breaks dark mode consistency.

## 6) Glossary of core terms (JS, React, CSS)

### JavaScript
- `const`: variable that cannot be reassigned.
- `function Name(...) { ... }`: function declaration.
- Arrow function: `(arg) => expression`.
- Template literal: `` `btn btn-${variant}` `` inserts JS value into string.
- Ternary: `condition ? valueIfTrue : valueIfFalse`.
- `.map(...)`: transforms array into new array (used to render lists in JSX).

### React
- Component: function returning JSX UI.
- Props: inputs passed from parent to child component.
- `useState`: stores reactive values that trigger re-render on change.
- `useEffect`: runs side effects after render.
- Dependency array: controls when effect re-runs.

### JSX
- HTML-like syntax inside JavaScript.
- `className` instead of `class`.
- `{...}` injects JavaScript expression inside JSX.
- Lists need stable `key` prop.

### Accessibility
- `aria-label`: accessible name when visible text is insufficient.
- `aria-pressed`: communicates pressed/toggled state.
- `role="group"`: tells assistive tech controls belong together.
- Semantic tags: `header`, `main`, `section`, `footer` help navigation.

### CSS
- CSS variable: `--token-name` and `var(--token-name)` usage.
- Pseudo-class: `:hover`, `:focus-visible`.
- Media query: applies rules only at certain viewport widths.
- `clamp(min, preferred, max)`: responsive values with safety bounds.

## 7) “If you change X, update Y too” checklist

- If you add a new section:
  - Add component render in `App.jsx`.
  - Add nav item in both `content.es.navItems` and `content.en.navItems`.
  - Add matching `id` in section tag.

- If you rename a section `id`:
  - Update any anchor links (`href="#id"`) that target it.

- If you add a new translated field:
  - Add it in both `es` and `en` content objects.
  - Update component prop usage.

- If you add a new theme color token:
  - Define in `:root` and `[data-theme='dark']`.
  - Reference token in component rules.

- If you change form fields:
  - Keep `label htmlFor` and input `id` matching.

- If you add list rendering (`.map`) in JSX:
  - Provide stable `key` per item.

## 8) Step-by-step mini exercises

### Exercise A: Change hero tagline in both languages
1. Open `src/App.jsx`.
2. Find `content.es.hero.tagline` and `content.en.hero.tagline`.
3. Edit both strings.
4. Save and verify language toggle updates both versions.

### Exercise B: Add a fourth member
1. Open `src/App.jsx`.
2. Add new member object in:
   - `content.es.members.members`
   - `content.en.members.members`
3. Include `portraitAlt` in both languages.
4. Save and verify card appears in grid.

### Exercise C: Adjust dark mode card contrast
1. Open `src/styles.css`.
2. Inside `[data-theme='dark']`, tweak:
   - `--surface-1`
   - `--border-soft`
3. Save and test readability.

### Exercise D: Add a new social platform
1. Add an item to `social.items` in both languages.
2. Keep keys: `name`, `href`, `copy`.
3. Save and test that new card appears and opens correctly.

## Deep syntax walk-through examples

### Example 1: Destructured function parameters
```jsx
function Hero({ content }) {
```
- `Hero` is a function component.
- `{ content }` means: extract property `content` from props object.
- Equivalent verbose version:
```jsx
function Hero(props) {
  const content = props.content;
}
```

### Example 2: Template literal in class composition
```jsx
const className = `btn btn-${variant}`;
```
- Backticks create a template literal string.
- `${variant}` injects runtime value.
- If `variant` is `secondary`, result is `btn btn-secondary`.

### Example 3: Ternary expression in UI text
```jsx
{theme === 'dark' ? nav.themeLight : nav.themeDark}
```
- Reads as: if current theme is dark, show “Light” as the action label; otherwise show “Dark”.
- This is action-oriented text (“what clicking will do next”), not status text.

### Example 4: `useEffect` dependency array
```jsx
useEffect(() => {
  window.localStorage.setItem('los-guatemex-language', language);
}, [language]);
```
- Effect runs after render when `language` changes.
- Without `[language]`, it would run after every render.
- With `[]`, it would run only once and fail to persist updates.

### Example 5: Mapping arrays to JSX
```jsx
{content.items.map((item) => (
  <a key={item.name} ...>
```
- `map` iterates over each array element and returns JSX.
- `key` helps React identify which list elements changed.
- Use stable, unique keys to avoid rendering bugs.

## Beginner safety notes (important)

- Do not rename props in child components unless you also update the parent usage.
- Do not remove `aria-*` attributes unless you replace accessibility meaning another way.
- Do not hardcode language strings directly inside components; keep them in `content`.
- Do not replace semantic tokens with raw colors unless intentional and mirrored in dark mode.
- Do not change `type="button"` to `submit` unless you add real form submit handling.

## Suggested learning path after this project
1. Learn JavaScript arrays/objects deeply (`map`, `filter`, destructuring).
2. Learn React state/effects lifecycle with small isolated demos.
3. Learn CSS layout (Flexbox + Grid) and responsive media queries.
4. Learn accessibility basics (WCAG, keyboard navigation, ARIA semantics).

