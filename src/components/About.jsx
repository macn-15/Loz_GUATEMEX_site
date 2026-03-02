// FILE PURPOSE:
// About section supports two modes:
// 1) full section mode (default)
// 2) compact panel mode for above-the-fold split layout

import SectionTitle from './SectionTitle.jsx';

function About({ content, mode = 'section' }) {
  if (mode === 'panel') {
    return (
      <article className="intro-about-panel">
        <SectionTitle eyebrow={content.eyebrow} title={content.title} subtitle={content.subtitle} />
        {content.paragraphs.slice(0, 1).map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </article>
    );
  }

  return (
    <section id="about" className="section about">
      <div className="container">
        <SectionTitle eyebrow={content.eyebrow} title={content.title} subtitle={content.subtitle} />
        {content.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </section>
  );
}

export default About;
