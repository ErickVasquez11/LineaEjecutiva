import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Mail } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Inicio', href: '#inicio' },
    { name: 'Servicios', href: '#servicios' },
    { name: 'Nosotros', href: '#nosotros' },
    { name: 'Contacto', href: '#contacto' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-lg' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">LE</span>
            </div>
            <div className="hidden sm:block">
              <h1 className={`text-xl font-bold ${isScrolled ? 'text-gray-800' : 'text-white'}`}>
                Línea Ejecutiva
              </h1>
            </div>
          </div>

          <nav className="hidden lg:flex space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`font-medium transition-colors hover:text-blue-600 ${
                  isScrolled ? 'text-gray-800' : 'text-white'
                }`}
              >
                {item.name}
              </a>
            ))}
          </nav>

          <div className="hidden xl:flex items-center space-x-2 lg:space-x-4">
            <a href="tel:+50322222222" className={`hidden lg:flex items-center space-x-2 hover:scale-105 transition-transform ${
              isScrolled ? 'text-gray-600' : 'text-white/90'
            }`}>
              <Phone className="w-4 h-4" />
              <span className="text-xs lg:text-sm">+503 2222-2222</span>
            </a>
            <a href="mailto:info@lineaejecutiva.com" className={`hidden xl:flex items-center space-x-2 hover:scale-105 transition-transform ${
              isScrolled ? 'text-gray-600' : 'text-white/90'
            }`}>
              <Mail className="w-4 h-4" />
              <span className="text-xs lg:text-sm">info@lineaejecutiva.com</span>
            </a>
            <a href="#contacto" className="bg-blue-600 text-white px-3 lg:px-4 py-2 rounded-lg text-xs lg:text-sm font-semibold hover:bg-blue-700 transition-colors ml-2 lg:ml-4">
              Cotizar
            </a>
          </div>

          <button
            className={`lg:hidden ${isScrolled ? 'text-gray-800' : 'text-white'}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200 shadow-lg">
            <nav className="py-4 px-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block py-3 text-gray-800 hover:text-blue-600 border-b border-gray-100 last:border-b-0 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <div className="pt-4 mt-4 border-t border-gray-200 space-y-3">
                <a href="tel:+50322222222" className="flex items-center space-x-3 text-gray-600 hover:text-blue-600">
                  <Phone className="w-5 h-5" />
                  <span>+503 2222-2222</span>
                </a>
                <a href="#contacto" onClick={() => setIsMenuOpen(false)} className="block bg-blue-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                  Solicitar Cotización
                </a>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;