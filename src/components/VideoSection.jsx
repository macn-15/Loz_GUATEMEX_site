import SectionTitle from './SectionTitle.jsx';
import displayVideo from '../assets/displayVideo.mp4';
import logoPoster from '../assets/logo.JPG';

function VideoSection({ content }) {
  return (
    <section id="video" className="section video-section">
      <div className="container">
        <SectionTitle eyebrow={content.eyebrow} title={content.title} subtitle={content.subtitle} />

        <div className="video-wrapper">
          <video controls preload="metadata" playsInline poster={logoPoster}>
            <source src={displayVideo} type="video/quicktime" />
            Tu navegador no soporta este formato de video.
          </video>
        </div>

        <div className="video-links">
          <a
            className="youtube-channel-link"
            href={content.channelUrl}
            target="_blank"
            rel="noreferrer"
            aria-label={content.channelAriaLabel}
          >
            <span className="youtube-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" role="presentation" focusable="false">
                <path d="M23.5 7.2a3.2 3.2 0 0 0-2.2-2.2C19.4 4.5 12 4.5 12 4.5s-7.4 0-9.3.5A3.2 3.2 0 0 0 .5 7.2 33.8 33.8 0 0 0 0 12a33.8 33.8 0 0 0 .5 4.8 3.2 3.2 0 0 0 2.2 2.2c1.9.5 9.3.5 9.3.5s7.4 0 9.3-.5a3.2 3.2 0 0 0 2.2-2.2A33.8 33.8 0 0 0 24 12a33.8 33.8 0 0 0-.5-4.8ZM9.6 15.2V8.8L15.8 12l-6.2 3.2Z" />
              </svg>
            </span>
            <span>{content.channelCta}</span>
          </a>

          <a
            className="facebook-channel-link"
            href={content.facebookUrl}
            target="_blank"
            rel="noreferrer"
            aria-label={content.facebookAriaLabel}
          >
            <span className="facebook-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" role="presentation" focusable="false">
                <path d="M13.6 22v-8h2.7l.4-3.2h-3.1V8.7c0-.9.3-1.6 1.7-1.6h1.5V4.2c-.3 0-1.2-.1-2.4-.1-2.4 0-4.1 1.5-4.1 4.2v2.4H8v3.2h2.3v8h3.3Z" />
              </svg>
            </span>
            <span>{content.facebookCta}</span>
          </a>
        </div>
      </div>
    </section>
  );
}

export default VideoSection;
