import { useRef, useState } from 'react';
import SectionTitle from './SectionTitle.jsx';

function Contact({ content }) {
  const startedAtRef = useRef(Date.now());
  const [status, setStatus] = useState('idle');
  const [feedback, setFeedback] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFeedback('');

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get('name') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const message = String(formData.get('message') || '').trim();
    const company = String(formData.get('company') || '').trim();

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!name || !emailOk || !message) {
      setStatus('error');
      setFeedback(content.validationError);
      return;
    }

    setStatus('sending');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          message,
          company,
          startedAt: startedAtRef.current
        })
      });

      if (!response.ok) {
        throw new Error('failed-request');
      }

      setStatus('success');
      setFeedback(content.success);
      event.currentTarget.reset();
      startedAtRef.current = Date.now();
    } catch {
      setStatus('error');
      setFeedback(content.error);
    }
  };

  return (
    <section id="contact" className="section contact-section">
      <div className="container contact-layout">
        <div>
          <SectionTitle eyebrow={content.eyebrow} title={content.title} subtitle={content.subtitle} />

          <ul className="contact-list">
            <li>
              {content.emailLabel}:{' '}
              <a href="mailto:mcuevas9151@gmail.com">mcuevas9151@gmail.com</a>
            </li>
            <li>
              {content.phoneLabel}:{' '}
              <a href="tel:+15551234567">+1 (848) 565-8065</a>
            </li>
          </ul>
        </div>

        <form className="contact-form" aria-label={content.formAriaLabel} onSubmit={handleSubmit}>
          <label htmlFor="name">{content.fields.name}</label>
          <input id="name" name="name" type="text" placeholder={content.fields.namePlaceholder} required />

          <label htmlFor="email">{content.fields.email}</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder={content.fields.emailPlaceholder}
            required
          />

          <label htmlFor="message">{content.fields.message}</label>
          <textarea
            id="message"
            name="message"
            rows="4"
            placeholder={content.fields.messagePlaceholder}
            required
          />

          <label className="contact-honeypot" htmlFor="company">
            No llenar este campo
          </label>
          <input
            className="contact-honeypot"
            id="company"
            name="company"
            type="text"
            autoComplete="off"
            tabIndex="-1"
          />

          <button
            type="submit"
            className="btn btn-primary"
            aria-label={content.submit}
            disabled={status === 'sending'}
          >
            {status === 'sending' ? content.sending : content.submit}
          </button>

          {feedback ? (
            <p className={`contact-feedback ${status === 'success' ? 'is-success' : 'is-error'}`}>
              {feedback}
            </p>
          ) : null}
        </form>
      </div>
    </section>
  );
}

export default Contact;
