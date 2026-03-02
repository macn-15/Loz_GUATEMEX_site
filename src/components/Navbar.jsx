import { useEffect, useRef, useState } from 'react';
import logoImage from '../assets/logo.JPG';

function Navbar({ brand, nav, navItems, theme, onThemeToggle }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef(null);
  const mobileBreakpoint = 760;

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    if (!menuOpen) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
      }
    };

    const handlePointerDown = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    const handleResize = () => {
      if (window.innerWidth >= mobileBreakpoint) {
        setMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('resize', handleResize);
    };
  }, [menuOpen]);

  return (
    <header className="site-header" aria-label={nav.ariaLabel}>
      <nav className="nav container" ref={navRef}>
        <a className="brand" href="#home" aria-label={brand}>
          <img src={logoImage} alt={`${brand} logo`} />
        </a>

        <button
          type="button"
          className="menu-toggle"
          aria-label={menuOpen ? nav.mobileMenuClose : nav.mobileMenuOpen}
          aria-expanded={menuOpen}
          aria-controls="primary-nav"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span aria-hidden="true">{menuOpen ? '✕' : '☰'}</span>
        </button>

        <ul id="primary-nav" className={`nav-links ${menuOpen ? 'is-open' : ''}`}>
          {navItems.map((item) => (
            <li key={item.href}>
              <a href={item.href} onClick={closeMenu}>
                {item.label}
              </a>
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
