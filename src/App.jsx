import { useEffect, useState } from 'react';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import BandMembers from './components/BandMembers.jsx';
import VideoSection from './components/VideoSection.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';

const content = {
  skipLink: 'Saltar al contenido principal',
  brand: 'Los Guatemex',
  nav: {
    ariaLabel: 'Navegacion principal',
    themeToggleLabel: 'Cambiar tema',
    themeDark: 'Oscuro',
    themeLight: 'Claro',
    mobileMenuOpen: 'Abrir menu',
    mobileMenuClose: 'Cerrar menu'
  },
  navItems: [
    { href: '#home', label: 'Inicio' },
    { href: '#about', label: 'Nosotros' },
    { href: '#video', label: 'Video' },
    // { href: '#members', label: 'Integrantes' },
    { href: '#contact', label: 'Contacto' }
  ],
  hero: {
    eyebrow: 'Musica Sierreña Mexicana',
    tagline: 'Tradicion, energia y sentimiento en cada presentacion.'
  },
  about: {
    eyebrow: 'Nosotros',
    title: 'Quienes Son Los Guatemex',
    subtitle:
      'Una agrupacion mexicana con raices familiares, armonias potentes y un show hecho para bailar.',
    paragraphs: [
      'Los GUATEMEX tocamos musica sierreña con dos guitarras docerolas y bajo electrico. Formamos la agrupacion en 2025 en New Brunswick, New Jersey.',
      'Somos tres companeros: Angelo Cuevas (director, bajo y segunda voz), Dany Carpio (guitarra docerola y primera voz), y Jose Luis Muñoz (segunda guitarra).'
    ]
  },
  members: {
    eyebrow: 'Integrantes',
    title: 'Conoce A Los Guatemex',
    subtitle: 'Los musicos detras del sonido.',
    members: [
      {
        name: 'Miguel "El Guero" Ramirez',
        role: 'Voz Principal / Acordeon',
        bio: 'Lider de la agrupacion con gran presencia en escenario y una voz que honra el estilo norteño de siempre.',
        portraitAlt: 'Retrato ilustrativo de Miguel El Guero Ramirez'
      },
      {
        name: 'Carlos Mendoza',
        role: 'Bajo Quinto',
        bio: 'Carlos sostiene la base armonica del grupo con ejecucion firme y un toque moderno en cada arreglo.',
        portraitAlt: 'Retrato ilustrativo de Carlos Mendoza'
      },
      {
        name: 'Javier Soto',
        role: 'Bajo Electrico / Armonias',
        bio: 'Javier amarra el ritmo con precision y aporta armonias vocales que distinguen el sonido en vivo.',
        portraitAlt: 'Retrato ilustrativo de Javier Soto'
      }
    ]
  },
  video: {
    eyebrow: 'Video',
    title: 'Mira A Los Guatemex En Vivo',
    subtitle: 'Presentacion destacada. Mira el video y visita nuestro canal oficial en YouTube.',
    titleAttr: 'Video destacado de Los Guatemex',
    channelCta: 'Visita nuestro canal en YouTube',
    channelUrl: 'https://www.youtube.com/@LosGuatemex',
    channelAriaLabel: 'Abrir canal oficial de Los Guatemex en YouTube',
    facebookCta: 'Visita nuestro Facebook',
    facebookUrl: 'https://www.facebook.com/angelo.cuevas.980/',
    facebookAriaLabel: 'Abrir pagina de Facebook de Los Guatemex'
  },
  contact: {
    eyebrow: 'Contacto',
    title: 'Contrata A Los Guatemex',
    subtitle: 'Disponible para eventos privados, festivales y presentaciones en vivo.',
    emailLabel: 'Correo',
    phoneLabel: 'Telefono',
    formAriaLabel: 'Formulario de contacto de muestra',
    fields: {
      name: 'Nombre',
      email: 'Correo',
      message: 'Mensaje',
      namePlaceholder: 'Tu nombre',
      emailPlaceholder: 'tu@correo.com',
      messagePlaceholder: 'Cuentanos sobre tu evento'
    },
    submit: 'Enviar solicitud',
    sending: 'Enviando...',
    success: 'Gracias. Recibimos tu mensaje y te contactaremos pronto.',
    error: 'No se pudo enviar el mensaje. Intentalo de nuevo en unos minutos.',
    validationError: 'Por favor completa nombre, correo valido y mensaje.'
  },
  footer: {
    rights: 'Todos los derechos reservados.',
    links: [
      { href: '#home', label: 'Inicio' },
      { href: '#members', label: 'Integrantes' },
      { href: '#contact', label: 'Contacto' }
    ]
  }
};

const getInitialTheme = () => {
  if (typeof window === 'undefined') {
    return 'light';
  }

  const savedTheme = window.localStorage.getItem('los-guatemex-theme');
  const initialTheme = savedTheme === 'light' || savedTheme === 'dark' ? savedTheme : 'light';

  document.documentElement.setAttribute('data-theme', initialTheme);
  return initialTheme;
};

function App() {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.lang = 'es';
  }, []);

  useEffect(() => {
    window.localStorage.setItem('los-guatemex-theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.style.colorScheme = theme;
  }, [theme]);

  return (
    <div className="app">
      <a className="skip-link" href="#main-content">
        {content.skipLink}
      </a>

      <Navbar
        brand={content.brand}
        nav={content.nav}
        navItems={content.navItems}
        theme={theme}
        onThemeToggle={() => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))}
      />

      <main id="main-content">
        <Hero content={content.hero} about={content.about} />
        <VideoSection content={content.video} />
        {/* <BandMembers content={content.members} /> */}
        <Contact content={content.contact} />
      </main>

      <Footer brand={content.brand} content={content.footer} />
    </div>
  );
}

export default App;
