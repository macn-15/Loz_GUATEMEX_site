import heroImage from '../assets/hero.JPG';
import SectionTitle from './SectionTitle.jsx';

function Hero({ content, about }) {
  return (
    <section id="home" className="hero section">
      <div className="container hero-content hero-layout">
        <header className="hero-heading">
          <p className="eyebrow">{content.eyebrow}</p>
          <h1>Los Guatemex</h1>
        </header>

        <div className="hero-body">
          <figure className="hero-media">
            <img src={heroImage} alt="Los Guatemex en presentacion" loading="eager" />
          </figure>

          <article id="about" className="hero-about-panel">
            <SectionTitle eyebrow={about.eyebrow} title={about.title} subtitle={about.subtitle} />
            <p>{about.paragraphs[0]}</p>
          </article>
        </div>
      </div>
    </section>
  );
}

export default Hero;
