import React, { useState, useEffect } from 'react';
import { Award, Users, Clock, CheckCircle, AlignCenter } from 'lucide-react';

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
      description: ''
    },
    {
      icon: Clock,
      title: 'Puntualidad Garantizada',
      description: ''
    }
  ];

  return (
    <section id="nosotros" className="py-12 sm:py-16 lg:py-20 bg-black flex justify-center items-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-center items-center">
      <div className="mx-auto flex flex-col items-center text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
        Sobre Nosotros
        </h2>
        <p className="text-base sm:text-lg lg:text-xl text-white mb-6 sm:mb-8 leading-relaxed">
        Somos una empresa que brinda soluciones de transporte personal, empresarial y traslados de grupos en El Salvador, comprometida 
        con brindar un excelente servicio a nuestros clientes.
        </p>
        <p className="text-sm sm:text-base text-white mb-6 sm:mb-8 leading-relaxed">
        Nuestro enfoque se centra en la discreción, profesionalismo y atención 
        personalizada, garantizando que cada cliente reciba un servicio que supere 
        sus expectativas.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 w-full justify-items-center">
        {features.map((feature, index) => (
          <div key={index} className="flex flex-col items-center space-y-2">
          <div className="flex-shrink-0 w-10 h-10 bg-black rounded-lg flex items-center justify-center">
            <feature.icon className="w-5 h-5 text-green-600" />
          </div>
          <h3 className="text-sm sm:text-base font-semibold text-white mb-1">{feature.title}</h3>
          <p className="text-xs sm:text-sm text-white">{feature.description}</p>
          </div>
        ))}
        </div>
      </div>
      </div>
    </section>
  );
};

export default About;