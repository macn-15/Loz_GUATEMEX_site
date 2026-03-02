// FILE PURPOSE:
// Members section showing cards with placeholder portraits, role, and bio.

import SectionTitle from './SectionTitle.jsx';

// Utility function to compute initials from a full name.
// Arrow function syntax: `const name = (params) => expression`.
const getInitials = (name) =>
  // String method chain breakdown:
  // 1) replace(...) removes non-letter/non-space characters.
  // 2) split(' ') makes array of words.
  // 3) filter(Boolean) removes empty items.
  // 4) slice(0, 2) keeps first two words.
  // 5) map(...) takes first letter of each word.
  // 6) join('') combines letters.
  // 7) toUpperCase() ensures uppercase initials.
  name
    .replace(/[^a-zA-Z\s]/g, '')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();

function BandMembers({ content }) {
  return (
    <section id="members" className="section members-section">
      <div className="container">
        <SectionTitle eyebrow={content.eyebrow} title={content.title} subtitle={content.subtitle} />

        {/* Grid container for member cards. */}
        <div className="members-grid">
          {/* Render one <article> per member object.
              `member` callback param holds current member object. */}
          {content.members.map((member) => (
            <article key={member.name} className="member-card">
              {/* Placeholder portrait uses role="img" so assistive tech treats it as image-like content.
                  aria-label provides spoken description. */}
              <div className="member-portrait" role="img" aria-label={member.portraitAlt}>
                {/* Call helper function inside JSX expression braces. */}
                <span className="member-portrait-initials">{getInitials(member.name)}</span>
              </div>

              {/* Member identity + details. */}
              <h3>{member.name}</h3>
              <p className="member-role">{member.role}</p>
              <p>{member.bio}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default BandMembers;
