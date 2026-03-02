import logoImage from '../assets/logo.JPG';

function Navbar({ brand, nav, navItems, theme, onThemeToggle }) {
  return (
    <header className="site-header" aria-label={nav.ariaLabel}>
      <nav className="nav container">
        <a className="brand" href="#home" aria-label={brand}>
          <img src={logoImage} alt={`${brand} logo`} />
        </a>

        <ul>
          {navItems.map((item) => (
            <li key={item.href}>
              <a href={item.href}>{item.label}</a>
            </li>
          ))}
        </ul>

        <div className="toggle-controls">
          <button
            type="button"
            className="theme-toggle"
            onClick={onThemeToggle}
            aria-label={nav.themeToggleLabel}
            aria-pressed={theme === 'dark'}
            title={nav.themeToggleLabel}
          >
            <span aria-hidden="true">{theme === 'dark' ? '☀︎' : '🌙'}</span>
            <span className="theme-toggle-text">{theme === 'dark' ? nav.themeLight : nav.themeDark}</span>
          </button>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
