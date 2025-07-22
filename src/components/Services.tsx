import React, { useState } from 'react';
import { Car, Users, Shield, Briefcase, Clock, MapPin, X, CheckCircle, Star, Award, Plane } from 'lucide-react';
import chev from '../img/092861_2019_chevrolet_Trax.jpg'
import asistente from '../img/d156b0d46f883ea68a37eda2936ac54f.png'


const Services = () => {
  const [selectedService, setSelectedService] = useState<number | null>(null);

  const services = [
    {
      icon: Car,
      title: 'Transporte Ejecutivo',
      description: 'Servicios de transporte de personal con vehículos  particulares y conductores profesionales capacitados.',
      features: ['Vehículos particulares SUV y Sedán', 'Conductores certificados', 'Puntualidad garantizada', 'Servicio 24/7'],
      image: 'https://i.pinimg.com/736x/46/7c/b8/467cb8311f7042c64c5b8368ab8bf115.jpg',
      detailedInfo: {
        overview: 'Nuestros servicios de transporte de personal particular y ejecutivo ofrece la máxima comodidad y seguridad para usuarios que valoran su tiempo y privacidad.',
        benefits: [
          'Flota de vehículos de SUV, Sedán y Microbuses',
          'Conductores con experiencia y documentación vigente',
          'Seguimiento GPS en tiempo real',
          'Servicio de recogida y entrega ',
          'Unidades con Mantenimiento preventivo garantizado'
        ],
        pricing: 'Cotización personalizada según requerimientos',
        availability: 'Disponible 24/7'
      }
    },
    {
      icon: Users,
      title: 'Traslados de Grupos',
      description: 'Soluciones de transporte para empresas y eventos.',
      features: ['Traslados grupales', 'Gestión logística', 'Tours y eventos', 'Conductores certificados'],
      image: 'https://i.pinimg.com/736x/51/6e/ec/516eec68a348df9270fd85ac5083e2ca.jpg',
      detailedInfo: {
        overview: 'Servicios especializados para eventos sociales, tours y empresas que requieren soluciones de transporte.',
        benefits: [
          'Organización de traslados grupales',
          'Traslados seguros y cómodos'
        ],
        pricing: 'Cotización personalizada según requerimientos',
        availability: 'Inmediata y planificación con anticipación'
      }
    },
    {
      icon: Plane,
      title: 'Traslados al Aeropuerto',
      description: 'Servicio confortable y sobre todo seguro para nuestros pasajeros y su equipaje.',
      features: ['Vehículos particulares SUV,Sedán y Microbuses', 'Conductores certificados', 'Puntualidad garantizada', 'Servicio 24/7'],
      image: 'https://i.pinimg.com/736x/77/e6/8b/77e68b240deab55b32293604c7cf3745.jpg',
      detailedInfo: {
        overview: 'Servicios de transporte personal con conductores calificacos para el traslado seguro de ejecutivos y personalidades.',
        benefits: [
          'Vehiculo con capacidad segun sus requerimientos',
          'Espacio para equipaje y pertenencias',
          'Conductor altamente capacitado',
          'Combustible para todo el recorrido',
          'Unidades con asistencia satelital'
        ],
        pricing: 'Cotización personalizada según requerimientos',
        availability: 'Disponible 24/7 y planificación con anticipación'
      }
    },
    {
      icon: Briefcase,
      title: 'Asistencia Personalizada',
      description: 'Servicios de apoyo administrativo y logístico',
      features: ['Gestión de agenda', 'Coordinación de viajes', 'Servicios de mensajería', 'Apoyo administrativo'],
      image: 'https://i.pinimg.com/736x/7a/eb/90/7aeb903ea041e92350445703e03b19e6.jpg',
      detailedInfo: {
        overview: 'Servicios de asistencia personal que permiten seguir con sus compromisos mientras nosotros manejamos los detalles. Ofrecemos una red de servicios de transporte personal, empresarial y grupal que cubre todo el territorio nacional e internacional, garantizando un traslado seguro y eficiente.',
        benefits: [
          'Gestión completa de reservaciones',
          'Coordinación de viajes nacionales e internacionales',
          'Servicios de ecomiendas',
          'Gestión de reservas y eventos',
          'Centro de llamadas 24/7',
          'Tiempo de respuesta menor a 15 minutos',
          'Coordinación de servicios de emergencia',
          'Monitoreo de servicios en tiempo real',

        ],
        pricing: 'Cotización personalizada según requerimientos',
        availability: 'Disponible 24/7',
      }
    }
  ];

  const openModal = (index: number) => {
    setSelectedService(index);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedService(null);
    document.body.style.overflow = 'unset';
  };

  return (
    <>
      <section id="servicios" className="py-12 sm:py-16 lg:py-20 bg-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Nuestros Servicios
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-white max-w-2xl mx-auto px-4 sm:px-0">
            Ofrecemos una gama completa de servicios de transporte diseñados para satisfacer 
            las necesidades más exigentes de nuestros clientes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-gray-500 rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-500"
            >
              <div className="relative mb-6 rounded-xl overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-40 sm:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              
              <div className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-black to-black rounded-2xl mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                <service.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 group-hover:text-gray-200 transition-colors">
                {service.title}
              </h3>
              
              <p className="text-sm sm:text-base text-white mb-4 sm:mb-6 leading-relaxed">
                {service.description}
              </p>

              <ul className="space-y-2 sm:space-y-3">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-gradient-to-r from-white to-white rounded-full"></div>
                    <span className="text-sm sm:text-base text-white">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-100">
                <button onClick={() => openModal(index)} className="text-sm sm:text-base text-white font-semibold hover:text-blue-400 transition-colors group-hover:underline">
                  Más información →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      </section>

      {/* Modal */}
      {selectedService !== null && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 sm:p-6">
          <div className="bg-gray-600/90 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto mx-4 sm:mx-0">
            <div className="relative">
              <img 
                src={services[selectedService].image} 
                alt={services[selectedService].title}
                className="w-full h-48 sm:h-64 object-cover rounded-t-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-t-2xl"></div>
              <button
                onClick={closeModal}
                className="absolute top-2 right-2 sm:top-4 sm:right-4 w-8 h-8 sm:w-10 sm:h-10 bg-gray-600 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-gray-500/90 transition-colors"
              >
                <X className="w-4 h-4 sm:w-6 sm:h-6" />
              </button>
              <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6">
                <div className="flex items-center space-x-2 sm:space-x-3 mb-2">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    {React.createElement(services[selectedService].icon, { className: "w-5 h-5 sm:w-6 sm:h-6 text-white" })}
                  </div>
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">{services[selectedService].title}</h3>
                </div>
              </div>
            </div>

            <div className="p-4 sm:p-6 lg:p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                <div>
                  <h4 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4 flex items-center">
                    <Award className="w-5 h-5 text-blue-600 mr-2" />
                    Descripción del Servicio
                  </h4>
                  <p className="text-sm sm:text-base text-white/100 mb-4 sm:mb-6 leading-relaxed">
                    {services[selectedService].detailedInfo.overview}
                  </p>

                  <h4 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4 flex items-center">
                    <Star className="w-5 h-5 text-yellow-500 mr-2" />
                    Beneficios Incluidos
                  </h4>
                  <ul className="space-y-2 sm:space-y-3">
                    {services[selectedService].detailedInfo.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm sm:text-base text-white/100">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-4 sm:space-y-6">
                  <div className="bg-blue-100 rounded-xl p-4 sm:p-6">
                    <h4 className="text-base sm:text-lg font-bold text-black mb-2 sm:mb-3">💰 Precios</h4>
                    <p className="text-sm sm:text-base text-gray-700">{services[selectedService].detailedInfo.pricing}</p>
                  </div>

                  <div className="bg-green-100 rounded-xl p-4 sm:p-6">
                    <h4 className="text-base sm:text-lg font-bold text-gray-800 mb-2 sm:mb-3">⏰ Disponibilidad</h4>
                    <p className="text-sm sm:text-base text-gray-700">{services[selectedService].detailedInfo.availability}</p>
                  </div>

                  <div className="bg-gradient-to-r from-blue-400 to-blue-400 rounded-xl p-4 sm:p-6 text-white">
                    <h4 className="text-base sm:text-lg font-bold mb-2 sm:mb-3">¿Conoce nuestros servicios ?</h4>
                    <p className="mb-3 sm:mb-4 text-black/90 text-sm sm:text-base">Contáctanos para una cotización personalizada</p>
                    <a 
                      href="#contacto" 
                      onClick={closeModal}
                      className="inline-block bg-white text-blue-600 px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-sm sm:text-base font-semibold hover:bg-blue-50 transition-colors"
                    >
                      Solicitar Cotización
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Services;