import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import { IoEarthSharp } from 'react-icons/io5';
import { Separator } from '@/components/ui/separator';

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
    <footer className="bg-white! dark:bg-gray-900! border-t! border-gray-200! dark:border-gray-800! mt-auto!">
      <div className="container! mx-auto! px-4! sm:px-6! lg:px-8! py-12! lg:py-16!">
        <div className="grid! grid-cols-1! md:grid-cols-2! lg:grid-cols-5! gap-8! lg:gap-12! mb-8!">
          <div className="lg:col-span-2! space-y-4!">
            <div className="flex! items-center! gap-2! mb-4!">
              <IoEarthSharp className="text-3xl! text-primary! dark:text-orange-500!" />
              <span className="text-xl! font-bold! text-gray-900! dark:text-white! no-underline!">Cultura Indígena</span>
            </div>
            <p className="text-sm! text-gray-600! dark:text-gray-400! mb-6! max-w-md! leading-relaxed!">
              Conectando comunidades a través de eventos culturales indígenas.
              Celebrando tradiciones ancestrales de América Latina.
            </p>
            <div className="flex! gap-3! items-center!">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    className="w-10! h-10! rounded-full! bg-gray-100! dark:bg-gray-800! flex! items-center! justify-center! text-gray-600! dark:text-gray-400! hover:bg-primary! hover:text-white! dark:hover:bg-orange-500! dark:hover:text-white! transition-all! duration-200! no-underline!"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                  >
                    <Icon className="text-lg!" />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="space-y-4!">
            <h3 className="text-sm! font-semibold! text-gray-900! dark:text-white! mb-4! uppercase! tracking-wider! no-underline!">Eventos</h3>
            <ul className="space-y-3! list-none! m-0! p-0!">
              {footerLinks.eventos.map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path} 
                    className="text-sm! text-gray-600! dark:text-gray-400! hover:text-primary! dark:hover:text-orange-500! transition-colors! no-underline! inline-block!"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4!">
            <h3 className="text-sm! font-semibold! text-gray-900! dark:text-white! mb-4! uppercase! tracking-wider! no-underline!">Recursos</h3>
            <ul className="space-y-3! list-none! m-0! p-0!">
              {footerLinks.recursos.map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path} 
                    className="text-sm! text-gray-600! dark:text-gray-400! hover:text-primary! dark:hover:text-orange-500! transition-colors! no-underline! inline-block!"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4!">
            <h3 className="text-sm! font-semibold! text-gray-900! dark:text-white! mb-4! uppercase! tracking-wider! no-underline!">Empresa</h3>
            <ul className="space-y-3! list-none! m-0! p-0!">
              {footerLinks.empresa.map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path} 
                    className="text-sm! text-gray-600! dark:text-gray-400! hover:text-primary! dark:hover:text-orange-500! transition-colors! no-underline! inline-block!"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-8! bg-gray-200! dark:bg-gray-800!" />

        <div className="flex! flex-col! sm:flex-row! justify-between! items-center! gap-4! pt-4!">
          <p className="text-sm! text-gray-600! dark:text-gray-400! m-0! p-0!">
            © {currentYear} Cultura Indígena. Todos los derechos reservados.
          </p>
          <div className="flex! items-center! gap-4! text-sm!">
            <Link 
              to="/terminos" 
              className="text-gray-600! dark:text-gray-400! hover:text-primary! dark:hover:text-orange-500! transition-colors! no-underline!"
            >
              Términos de Uso
            </Link>
            <span className="text-gray-400! dark:text-gray-600!">•</span>
            <Link 
              to="/privacidad" 
              className="text-gray-600! dark:text-gray-400! hover:text-primary! dark:hover:text-orange-500! transition-colors! no-underline!"
            >
              Privacidad
            </Link>
            <span className="text-gray-400! dark:text-gray-600!">•</span>
            <Link 
              to="/cookies" 
              className="text-gray-600! dark:text-gray-400! hover:text-primary! dark:hover:text-orange-500! transition-colors! no-underline!"
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
