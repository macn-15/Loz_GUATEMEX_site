// FILE PURPOSE:
// Reusable button-like link component.
// We use an anchor (`<a>`) because this project's "buttons" jump to in-page sections (#ids).

// `function Button(...)` declares a named function component.
// React calls this function when rendering `<Button ... />` in JSX.
function Button({ href, children, variant = 'primary' }) {
  // Parameter syntax breakdown:
  // - `{ href, children, variant = 'primary' }` is object destructuring.
  // - React passes one `props` object; destructuring extracts keys by name.
  // - `variant = 'primary'` sets a default if parent omits `variant`.

  // Template literal syntax:
  // - Backticks create a string with interpolation.
  // - `${variant}` inserts the runtime value.
  // Result examples: "btn btn-primary" or "btn btn-secondary".
  // If class names don't match CSS, styling will break.
  const className = `btn btn-${variant}`;

  // `return (...)` sends JSX back to React.
  // JSX compiles to JavaScript calls that create virtual DOM elements.
  return (
    // `<a>` creates a clickable hyperlink element.
    // `className` in JSX is the equivalent of HTML `class`.
    // `href` controls destination; with "#section-id" it scrolls to that section.
    <a className={className} href={href}>
      {/* `{children}` inserts content nested between opening/closing Button tags.
          Example: <Button>Watch Video</Button> -> text appears here. */}
      {children}
    </a>
  );
}

// `export default` makes this the file's default export.
// Other files can import with any local name, e.g., `import Button from './Button.jsx'`.
export default Button;
