import React, { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';

const WhatsAppButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  // Mostrar el botón después de un pequeño delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Mostrar tooltip automáticamente después de unos segundos
  useEffect(() => {
    if (isVisible) {
      const tooltipTimer = setTimeout(() => {
        setShowTooltip(true);
        // Ocultar tooltip después de 3 segundos
        setTimeout(() => setShowTooltip(false), 3000);
      }, 3000);
      return () => clearTimeout(tooltipTimer);
    }
  }, [isVisible]);

  const handleWhatsAppClick = () => {
    const phoneNumber = '70993538'; // Reemplazar con el número real
    const message = encodeURIComponent('¡Hola! Me interesa conocer más sobre sus servicios de transporte.');
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Botón principal de WhatsApp */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="relative">
          {/* Tooltip */}
          {showTooltip && (
            <div className="absolute bottom-16 right-0 mb-2 animate-fade-in-up">
              <div className="bg-white rounded-2xl shadow-2xl p-4 max-w-xs border border-gray-100 relative">
                <button
                  onClick={() => setShowTooltip(false)}
                  className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
                <div className="pr-6">
                  <h4 className="font-semibold text-gray-900 mb-1">¿Necesitas servicio de transporte?</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Contáctanos por WhatsApp para reservas inmediatas y cotizaciones personalizadas.
                  </p>
                  <button
                    onClick={handleWhatsAppClick}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center space-x-2"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>Chatear ahora</span>
                  </button>
                </div>
                {/* Flecha del tooltip */}
                <div className="absolute bottom-0 right-6 transform translate-y-full">
                  <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white"></div>
                </div>
              </div>
            </div>
          )}

          {/* Botón principal */}
          <button
            onClick={handleWhatsAppClick}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 animate-pulse-glow group relative overflow-hidden"
          >
            {/* Efecto de ondas */}
            <div className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-20"></div>
            <div className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-10 animation-delay-200"></div>
            
            {/* Icono */}
            <MessageCircle className="h-7 w-7 relative z-10 group-hover:rotate-12 transition-transform duration-200" />
            
            {/* Indicador de notificación */}
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            </div>
          </button>

          {/* Texto flotante */}
          <div className="absolute bottom-0 right-16 transform translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none">
            <div className="bg-gray-900 text-white px-3 py-1 rounded-lg text-sm font-medium whitespace-nowrap">
              Reservas WhatsApp
            </div>
          </div>
        </div>
      </div>

      {/* Estilos adicionales para las animaciones */}
      <style jsx>{`
        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(34, 197, 94, 0.4);
          }
          50% {
            box-shadow: 0 0 30px rgba(34, 197, 94, 0.8);
          }
        }
        
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
        
        .shadow-3xl {
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }
      `}</style>
    </>
  );
};

export default WhatsAppButton;