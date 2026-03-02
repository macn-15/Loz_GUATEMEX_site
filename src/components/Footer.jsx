// FILE PURPOSE:
// Bottom footer with copyright and quick links.
// Content comes from App-level translation data.

function Footer({ brand, content }) {
  // `brand` is a string like "Los Guatemex".
  // `content` is an object with `rights` and `links`.

  return (
    // `<footer>` semantic element marks page footer region.
    <footer className="site-footer">
      {/* `container` limits width; `footer-content` controls layout. */}
      <div className="container footer-content">
        <p>
          {/* `new Date().getFullYear()` gets current year as number.
              Dot syntax:
              - `new Date()` creates Date object.
              - `.getFullYear()` calls method on that object. */}
          © {new Date().getFullYear()} {brand}. {content.rights}
        </p>

        {/* Unordered list for navigation-like links. */}
        <ul>
          {/* `.map(...)` loops through each link object and returns JSX.
              Callback param `link` is each array element.
              IMPORTANT: `key` should be stable and unique for React list diffing. */}
          {content.links.map((link) => (
            <li key={link.href}>
              {/* Anchor to internal section id (e.g. #home). */}
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
