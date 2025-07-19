import React, { useState, useEffect } from 'react';
import { Award, Users, Clock, CheckCircle } from 'lucide-react';

const About = () => {
  const [stats, setStats] = useState({
    years: 0,
    clients: 0,
    services: 0,
    satisfaction: 0
  });

  useEffect(() => {
    const animateStats = () => {
      const targets = { years: 15, clients: 500, services: 1000, satisfaction: 98 };
      const duration = 2000;
      const steps = 60;
      const increment = duration / steps;

      const intervals = Object.keys(targets).map(key => {
        const target = targets[key as keyof typeof targets];
        const step = target / steps;
        let current = 0;

        return setInterval(() => {
          current += step;
          if (current >= target) {
            current = target;
            clearInterval(intervals[Object.keys(targets).indexOf(key)]);
          }
          setStats(prev => ({ ...prev, [key]: Math.floor(current) }));
        }, increment);
      });

      return () => intervals.forEach(clearInterval);
    };

    const timer = setTimeout(animateStats, 500);
    return () => clearTimeout(timer);
  }, []);

  const features = [
    {
      icon: Award,
      title: 'Experiencia y Calidad Certificada',
      description: ''
    },
    {
      icon: Users,
      title: 'Equipo Profesional',
      description: 'Personal altamente capacitado y certificado en protocolos de seguridad y servicio.'
    },
    {
      icon: Clock,
      title: 'Puntualidad Garantizada',
      description: 'Comprometidos con la puntualidad y el cumplimiento de todos nuestros servicios.'
    }
  ];

  return (
    <section id="nosotros" className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-4 sm:mb-6">
              Sobre Nosotros
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed">
              Somos una empresa líder en servicios ejecutivos en El Salvador, comprometida 
              con brindar soluciones integrales de la más alta calidad para empresas y 
              ejecutivos que valoran la excelencia.
            </p>
            <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8 leading-relaxed">
              Nuestro enfoque se centra en la discreción, profesionalismo y atención 
              personalizada, garantizando que cada cliente reciba un servicio que supere 
              sus expectativas. Trabajamos con los más altos estándares de seguridad y 
              confidencialidad.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <feature.icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-semibold text-gray-800 mb-1">{feature.title}</h3>
                    <p className="text-xs sm:text-sm text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6 sm:space-y-8 mt-8 lg:mt-0">
            <div className="bg-gray-50 rounded-2xl p-6 sm:p-8">
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">Nuestra Misión</h3>
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                Brindar servicios ejecutivos de clase mundial que permitan a nuestros clientes 
                enfocarse en lo que realmente importa, mientras nosotros nos encargamos de 
                todos los detalles con la máxima profesionalidad.
              </p>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-sm sm:text-base text-gray-700 font-medium">Certificación ISO 9001:2015</span>
              </div>
              <div className="mt-4">
                <a href="#contacto" className="inline-block bg-gray-900 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-sm sm:text-base font-semibold hover:bg-blue-700 transition-colors">
                  Conocer Más Sobre Nosotros
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;