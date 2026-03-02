// FILE PURPOSE:
// Social links section with card-style external links.

import SectionTitle from './SectionTitle.jsx';

function SocialLinks({ content }) {
  return (
    <section id="social" className="section social-section">
      <div className="container">
        <SectionTitle eyebrow={content.eyebrow} title={content.title} subtitle={content.subtitle} />

        <div className="social-grid">
          {/* Map each social platform into one clickable card. */}
          {content.items.map((item) => (
            <a
              key={item.name}
              className="social-card"
              href={item.href}
              // Opens link in new browser tab/window.
              target="_blank"
              // Security/privacy companion for target="_blank".
              rel="noreferrer"
              // Accessibility label gives full context to screen reader users.
              aria-label={`${content.openLabel} Los Guatemex ${item.name}`}
            >
              <h3>{item.name}</h3>
              <p>{item.copy}</p>
              <span>
                {content.openLabel} {item.name}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SocialLinks;
