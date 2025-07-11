import React from 'react';
import { ArrowRight, Shield, Clock, Star } from 'lucide-react';

const Hero = () => {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 lg:pt-0">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-950 to-blue-900">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-transparent"></div>
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-48 h-48 md:w-96 md:h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 md:w-96 md:h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight">
            Servicios{' '}
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Ejecutivos
            </span>
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>
            de Excelencia
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed px-4 sm:px-0">
            Brindamos soluciones integrales para empresas y ejecutivos, 
            con el más alto nivel de profesionalismo y confidencialidad.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8 sm:mb-12 px-4 sm:px-0">
            <a href="#contacto" className="group bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl">
              <span>Solicitar Cotización</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            
            <a href="#servicios" className="border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-white hover:text-blue-800 transition-all duration-300">
              Conocer Más
            </a>
          </div>

          {/* Trust indicators */}
          <div className="grid grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-2xl mx-auto px-4 sm:px-0">
            <div className="text-center">
              <div className="flex justify-center mb-2">
                <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-green-400" />
              </div>
              <p className="text-white/80 text-xs sm:text-sm">100% Seguro</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-2">
                <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-400" />
              </div>
              <p className="text-white/80 text-xs sm:text-sm">24/7 Disponible</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-2">
                <Star className="w-6 h-6 sm:w-8 sm:h-8 text-orange-400" />
              </div>
              <p className="text-white/80 text-xs sm:text-sm">Calidad Premium</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden sm:block">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;