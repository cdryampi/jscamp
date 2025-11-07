import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { IoEarthSharp } from 'react-icons/io5';
import { ModeToggle } from '../../mode-toggle';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'Inicio' },
    { path: '/eventos', label: 'Eventos' },
    { path: '/sobre-nosotros', label: 'Sobre Nosotros' },
    { path: '/contacto', label: 'Contacto' }
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-white/95 dark:bg-gray-900/95 backdrop-blur supports-backdrop-filter:bg-white/80 dark:supports-backdrop-filter:bg-gray-900/80">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8 gap-4">
        {/* Logo */}
        <Link 
          to="/" 
          className="flex items-center gap-2 text-lg sm:text-xl font-bold text-gray-900 dark:text-white hover:text-primary dark:hover:text-primary transition-colors shrink-0"
          onClick={closeMenu}
        >
          <IoEarthSharp className="text-2xl sm:text-3xl text-primary" />
          <span>Cultura Indígena</span>
        </Link>

        {/* Navegación Desktop */}
        <NavigationMenu className="hidden md:flex flex-1 justify-center">
          <NavigationMenuList className="gap-2">
            {navLinks.map((link) => (
              <NavigationMenuItem key={link.path}>
                <NavigationMenuLink asChild>
                  <Link
                    to={link.path}
                    className={cn(
                      "group inline-flex h-10 w-30 items-center justify-center rounded-md px-5 py-2.5 m-5 text-sm font-medium transition-colors",
                      "hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-primary dark:hover:text-primary",
                      "focus:bg-gray-100 dark:focus:bg-gray-800 focus:text-primary dark:focus:text-primary focus:outline-none",
                      "disabled:pointer-events-none disabled:opacity-50",
                      isActive(link.path)
                        ? "bg-gray-100 dark:bg-gray-800 text-primary font-semibold"
                        : "text-gray-700 dark:text-gray-300"
                    )}
                  >
                    {link.label}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Acciones del header */}
        <div className="flex items-center gap-3 shrink-0">
          <ModeToggle />
          
          {/* Botón hamburguesa (móvil) */}
          <button
            className="inline-flex md:hidden items-center justify-center rounded-md p-2.5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-primary dark:hover:text-primary focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary transition-colors"
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <HiX className="h-6 w-6" />
            ) : (
              <HiMenuAlt3 className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Menú móvil */}
        {isMenuOpen && (
          <div className="absolute top-16 left-0 right-0 md:hidden bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-lg">
            <nav className="container mx-auto py-4 px-4 sm:px-6">
              <ul className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className={cn(
                        "block rounded-md px-4 py-3 text-base font-medium transition-colors",
                        "hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-primary dark:hover:text-primary",
                        isActive(link.path)
                          ? "bg-gray-100 dark:bg-gray-800 text-primary font-semibold"
                          : "text-gray-700 dark:text-gray-300"
                      )}
                      onClick={closeMenu}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};