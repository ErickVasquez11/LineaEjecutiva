import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' }
  ];

  const quickLinks = [
    { name: 'Inicio', href: '#inicio' },
    { name: 'Servicios', href: '#servicios' },
    { name: 'Nosotros', href: '#nosotros' },
    { name: 'Contacto', href: '#contacto' }
  ];

  const services = [
    'Transporte Ejecutivo',
    'Servicios Corporativos',
    'Seguridad Personal',
    'Asistencia Ejecutiva'
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Company Info */}
          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">LE</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold">Línea Ejecutiva</h3>
            </div>
            <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
              Servicios ejecutivos de excelencia con más de 15 años de experiencia 
              en El Salvador. Profesionalismo y calidad garantizada.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6">Enlaces Rápidos</h4>
            <ul className="space-y-2 sm:space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-sm sm:text-base text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6">Servicios</h4>
            <ul className="space-y-2 sm:space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <span className="text-sm sm:text-base text-gray-400">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6">Contacto</h4>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-blue-400 mt-0.5" />
                <div>
                  <a href="tel:+50322222222" className="text-sm sm:text-base text-gray-400 hover:text-white transition-colors">+503 2222-2222</a>
                  <p className="text-xs sm:text-sm text-gray-500">Línea directa 24/7</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-blue-400 mt-0.5" />
                <div>
                  <a href="mailto:info@lineaejecutiva.com" className="text-sm sm:text-base text-gray-400 hover:text-white transition-colors">info@lineaejecutiva.com</a>
                  <p className="text-xs sm:text-sm text-gray-500">Respuesta en 2 horas</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-blue-400 mt-0.5" />
                <div>
                  <p className="text-sm sm:text-base text-gray-400">Col. Escalón, San Salvador</p>
                  <p className="text-xs sm:text-sm text-gray-500">El Salvador, C.A.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 sm:mt-12 pt-6 sm:pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4 lg:space-x-6">
              <p className="text-sm sm:text-base text-gray-400 text-center sm:text-left">
                © 2024 Línea Ejecutiva. Todos los derechos reservados.
              </p>
              <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
                <a href="tel:+50322222222" className="bg-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-sm sm:text-base font-semibold hover:bg-blue-700 transition-colors">
                  Llamar Ahora
                </a>
                <a href="#" className="text-sm sm:text-base text-gray-400 hover:text-white transition-colors">
                  Términos de Servicio
                </a>
              </div>
            </div>
            <div className="text-xs sm:text-sm text-gray-400 text-center lg:text-right">
              Diseñado con ❤️ para la excelencia
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;