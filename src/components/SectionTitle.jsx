// FILE PURPOSE:
// Shared section heading component used across multiple sections.
// It prevents repeated markup and keeps heading structure consistent.

// Function component with destructured props.
function SectionTitle({ eyebrow, title, subtitle }) {
  // `eyebrow`: small overline text (like "About", "Featured").
  // `title`: main heading text.
  // `subtitle`: optional supporting text.

  return (
    // `<header>` is semantic HTML for introductory content of a section.
    <header className="section-header">
      {/* `<p>` paragraph for eyebrow label.
          `className` connects to CSS styling rules. */}
      <p className="section-eyebrow">{eyebrow}</p>

      {/* `<h2>` second-level heading.
          Keeping this as h2 preserves heading hierarchy under the page h1 in Hero. */}
      <h2>{title}</h2>

      {/* Conditional rendering with ternary syntax:
          condition ? valueIfTrue : valueIfFalse
          If `subtitle` is truthy, render paragraph; otherwise render `null` (nothing). */}
      {subtitle ? <p className="section-subtitle">{subtitle}</p> : null}
    </header>
  );
}

export default SectionTitle;
