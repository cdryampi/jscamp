import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import { IoEarthSharp } from 'react-icons/io5';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    eventos: [
      { label: 'Próximos Eventos', path: '/eventos' },
      { label: 'Eventos Pasados', path: '/eventos/pasados' },
      { label: 'Categorías', path: '/categorias' }
    ],
    recursos: [
      { label: 'Blog', path: '/blog' },
      { label: 'Galería', path: '/galeria' },
      { label: 'Recursos', path: '/recursos' }
    ],
    empresa: [
      { label: 'Sobre Nosotros', path: '/sobre-nosotros' },
      { label: 'Contacto', path: '/contacto' },
      { label: 'Política de Privacidad', path: '/privacidad' }
    ]
  };

  const socialLinks = [
    { name: 'Facebook', icon: FaFacebookF, url: 'https://facebook.com' },
    { name: 'Instagram', icon: FaInstagram, url: 'https://instagram.com' },
    { name: 'Twitter', icon: FaTwitter, url: 'https://twitter.com' },
    { name: 'YouTube', icon: FaYoutube, url: 'https://youtube.com' }
  ];

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <IoEarthSharp className="text-3xl text-primary" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">Cultura Indígena</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 max-w-md">
              Conectando comunidades a través de eventos culturales indígenas.
              Celebrando tradiciones ancestrales de América Latina.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                  >
                    <Icon className="text-lg" />
                  </a>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 uppercase tracking-wider">Eventos</h3>
            <ul className="space-y-3">
              {footerLinks.eventos.map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path} 
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 uppercase tracking-wider">Recursos</h3>
            <ul className="space-y-3">
              {footerLinks.recursos.map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path} 
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 uppercase tracking-wider">Empresa</h3>
            <ul className="space-y-3">
              {footerLinks.empresa.map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path} 
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © {currentYear} Cultura Indígena. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-4 text-sm">
            <Link 
              to="/terminos" 
              className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
            >
              Términos de Uso
            </Link>
            <span className="text-gray-400 dark:text-gray-600">•</span>
            <Link 
              to="/privacidad" 
              className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
            >
              Privacidad
            </Link>
            <span className="text-gray-400 dark:text-gray-600">•</span>
            <Link 
              to="/cookies" 
              className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
