import React, { useState } from 'react';
import { Car, Users, Fuel, Settings, Calendar, Clock, CheckCircle, X, Star, Shield, Award } from 'lucide-react';

const VehicleRental = () => {
  const [selectedVehicle, setSelectedVehicle] = useState<number | null>(null);
  const [showTerms, setShowTerms] = useState(false);
  const [showReservation, setShowReservation] = useState(false);
  const [reservationData, setReservationData] = useState({
    vehicleId: null as number | null,
    name: '',
    email: '',
    phone: '',
    license: '',
    pickupDate: '',
    returnDate: '',
    pickupTime: '',
    returnTime: '',
    pickupLocation: '',
    additionalServices: [] as string[],
    termsAccepted: false
  });

  const vehicles = [
    {
      id: 1,
      name: 'Sedán',
      category: 'Particular',
      image: 'https://i.pinimg.com/1200x/1b/da/61/1bda619835574c64ad87fc02595e0226.jpg',
      price: 35,
      passengers: 4,
      transmission: 'Automática',
      fuel: 'Premium',
      features: ['Asientos de tela', 'Sistema de navegación', 'Conectividad Bluetooth', 'Aire acondicionado', 'Sistema de sonido premium','Camara de reversa'],
      description: 'Ideal para ejecutivos y viajes urbanos. Este sedán combina elegancia, eficiencia y confort, brindando una experiencia de conducción premium con excelente rendimiento de combustible.'
    },
    {
      id: 2,
     name: 'SUV',
      category: 'SUV',
      image: 'https://i.pinimg.com/736x/a8/4e/8c/a84e8cd2713edd4548156b9e0ecda40d.jpg',
      price: 50,
      passengers: 7,
      transmission: 'Automática',
      fuel: 'Premium',
      features: ['Tracción AWD', 'Asientos de tela', '7 pasajeros', 'Sistema de entretenimiento Apple CarPlay, Android Auto', 'Climatizador automático dual'],
      description: 'Versátil y espaciosa, perfecta para familias o grupos. Su diseño robusto y sus características de seguridad la hacen ideal para viajes largos con total comodidad.'
    },
    {
      id: 3,
      name: 'Pickup',
      category: 'Pickup',
      image: 'https://i.pinimg.com/1200x/dd/39/72/dd39725af9fccaa10ab2acb0548ec620.jpg',
      price: 75,
      passengers: 4,
      transmission: 'Automática',
      fuel: 'Diesel',
      features: ['Tracción 4x4', 'Conectividad Bluetooth', 'Iluminación LED', 'Asientos de cuero', 'Sistema de navegación GPS'],
      description: 'Potente pickup para trabajo o aventura. Con motor diésel y diseño resistente, es ideal para terrenos exigentes sin sacrificar confort y tecnología.'
    }
  ];

  const additionalServices = [
    { id: 'chauffeur', name: 'Chofer profesional', price: 25 },
    { id: 'insurance', name: 'Seguro premium', price: 15 },
    { id: 'gps', name: 'GPS avanzado', price: 5 },
    { id: 'wifi', name: 'WiFi ilimitado', price: 8 },
    { id: 'fuel', name: 'Combustible incluido', price: 30 },
    { id: 'cleaning', name: 'Limpieza premium', price: 20 }
  ];

  const locations = [
    'Aeropuerto Internacional de El Salvador',
    'Hotel Sheraton Presidente',
    'Centro Comercial Multiplaza',
    'Zona Rosa, San Salvador',
    'Hotel Crowne Plaza',
    'Oficina Central - Col. Escalón'
  ];

  const openVehicleModal = (index: number) => {
    setSelectedVehicle(index);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedVehicle(null);
    setShowTerms(false);
    setShowReservation(false);
    document.body.style.overflow = 'unset';
  };

  const openReservation = (vehicleId: number) => {
    setReservationData({ ...reservationData, vehicleId });
    setSelectedVehicle(null);
    setShowReservation(true);
  };

  const handleReservationChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      if (name === 'termsAccepted') {
        setReservationData({ ...reservationData, termsAccepted: checked });
      } else {
        const services = checked 
          ? [...reservationData.additionalServices, name]
          : reservationData.additionalServices.filter(service => service !== name);
        setReservationData({ ...reservationData, additionalServices: services });
      }
    } else {
      setReservationData({ ...reservationData, [name]: value });
    }
  };

  const handleReservationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Reserva enviada:', reservationData);
    alert('¡Reserva enviada exitosamente! Nos contactaremos contigo en las próximas 2 horas.');
    closeModal();
    setReservationData({
      vehicleId: null,
      name: '',
      email: '',
      phone: '',
      license: '',
      pickupDate: '',
      returnDate: '',
      pickupTime: '',
      returnTime: '',
      pickupLocation: '',
      additionalServices: [],
      termsAccepted: false
    });
  };

  const calculateTotal = () => {
    if (!reservationData.vehicleId || !reservationData.pickupDate || !reservationData.returnDate) return 0;
    
    const vehicle = vehicles.find(v => v.id === reservationData.vehicleId);
    if (!vehicle) return 0;

    const pickupDate = new Date(reservationData.pickupDate);
    const returnDate = new Date(reservationData.returnDate);
    const days = Math.ceil((returnDate.getTime() - pickupDate.getTime()) / (1000 * 60 * 60 * 24));
    
    const vehicleTotal = vehicle.price * days;
    const servicesTotal = reservationData.additionalServices.reduce((total, serviceId) => {
      const service = additionalServices.find(s => s.id === serviceId);
      return total + (service ? service.price * days : 0);
    }, 0);

    return vehicleTotal + servicesTotal;
  };

  return (
    <>
      <section id="renta-vehiculos" className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
              Renta de Vehículos
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4 sm:px-0">
              Flota de vehículos para uso personal, eventos  y ocasiones especiales. 
              Todos nuestros vehículos incluyen seguro completo y mantenimiento garantizado.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
            {vehicles.map((vehicle, index) => (
              <div
                key={vehicle.id}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 overflow-hidden"
              >
                <div className="relative">
                  <img 
                    src={vehicle.image} 
                    alt={vehicle.name}
                    className="w-full h-48 sm:h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4 bg-gray-900 text-white px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
                    {vehicle.category}
                  </div>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-sm font-bold">
                    ${vehicle.price}/día
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                    {vehicle.name}
                  </h3>
                  
                  <p className="text-sm sm:text-base text-gray-600 mb-4 leading-relaxed">
                    {vehicle.description}
                  </p>

                  <div className="grid grid-cols-3 gap-4 mb-4 text-center">
                    <div className="flex flex-col items-center">
                      <Users className="w-5 h-5 text-blue-600 mb-1" />
                      <span className="text-xs text-gray-600">{vehicle.passengers} personas</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <Settings className="w-5 h-5 text-blue-600 mb-1" />
                      <span className="text-xs text-gray-600">{vehicle.transmission}</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <Fuel className="w-5 h-5 text-blue-600 mb-1" />
                      <span className="text-xs text-gray-600">{vehicle.fuel}</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                    <button 
                      onClick={() => openVehicleModal(index)}
                      className="flex-1 border border-gray-200 text-black px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors"
                    >
                      Ver Detalles
                    </button>
                    <button 
                      onClick={() => openReservation(vehicle.id)}
                      className="flex-1 bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors"
                    >
                      Reservar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button 
              onClick={() => setShowTerms(true)}
              className="text-blue-600 hover:text-blue-700 font-semibold underline"
            >
              Ver Términos y Condiciones de Renta
            </button>
          </div>
        </div>
      </section>

      {/* Modal de Detalles del Vehículo */}
      {selectedVehicle !== null && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <img 
                src={vehicles[selectedVehicle].image} 
                alt={vehicles[selectedVehicle].name}
                className="w-full h-48 sm:h-64 object-cover rounded-t-2xl"
              />
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="absolute bottom-4 left-4">
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">{vehicles[selectedVehicle].name}</h3>
                <div className="flex items-center space-x-4">
                  <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                    {vehicles[selectedVehicle].category}
                  </span>
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                    ${vehicles[selectedVehicle].price}/día
                  </span>
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <Car className="w-5 h-5 text-blue-600 mr-2" />
                    Especificaciones
                  </h4>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                      <div className="font-semibold">{vehicles[selectedVehicle].passengers}</div>
                      <div className="text-sm text-gray-600">Pasajeros</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <Settings className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                      <div className="font-semibold">{vehicles[selectedVehicle].transmission}</div>
                      <div className="text-sm text-gray-600">Transmisión</div>
                    </div>
                  </div>

                  <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <Star className="w-5 h-5 text-yellow-500 mr-2" />
                    Características
                  </h4>
                  <ul className="space-y-3">
                    {vehicles[selectedVehicle].features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-6">
                  <div className="bg-blue-50 rounded-xl p-6">
                    <h4 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
                      <Shield className="w-5 h-5 text-blue-600 mr-2" />
                      Incluido en la Renta
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>Seguro completo contra todo riesgo</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>Mantenimiento y limpieza incluidos</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>Asistencia 24/7 en carretera</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>Entrega y recogida sin costo adicional</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-green-50 rounded-xl p-6">
                    <h4 className="text-lg font-bold text-gray-800 mb-3">💰 Precio por Día</h4>
                    <div className="text-3xl font-bold text-green-600 mb-2">${vehicles[selectedVehicle].price}</div>
                    <p className="text-sm text-gray-600 mb-4">Descuentos disponibles para rentas de 7+ días</p>
                    <button 
                      onClick={() => openReservation(vehicles[selectedVehicle].id)}
                      className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                    >
                      Reservar Ahora
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Términos y Condiciones */}
      {showTerms && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 sm:p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-800">Términos y Condiciones de Renta</h3>
                <button
                  onClick={closeModal}
                  className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6 text-sm sm:text-base text-gray-700">
                <section>
                  <h4 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
                    <Shield className="w-5 h-5 text-blue-600 mr-2" />
                    1. Condiciones del alquiler
                  </h4>
                  <ul className="space-y-2 ml-4">
                    <li>• Edad mínima: 20 años</li>
                    <li>• Licencia de conducir vigente (mínimo 3 años de experiencia)</li>
                    <li>• Tarjeta de crédito a nombre del conductor principal</li>
                    <li>• Identificación oficial vigente (DUI o Pasaporte)</li>
                  </ul>
                </section>

                <section>
                  <h4 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
                    <Calendar className="w-5 h-5 text-blue-600 mr-2" />
                    2. Condiciones de renta
                  </h4>
                  <ul className="space-y-2 ml-4">
                    
                    <li>• Tarjeta de crédito para cargo de depósito de garantía La unidad deberá ser entregada en las mismas condiciones como fue recibida, en caso de cualquier daño el depósito de garantía será usado para cubrir el costo de cualquier daño, pero en el caso que, por lineamientos del seguro, el total de los costos no sean cubiertos por la aseguradora, los daños totales deberán ser cubiertos por el cliente.</li>
                    <li>• Los vehículos deberán ser devueltos con el mismo nivel de combustible con el que se les entrega. La penalidad a cargar a su tarjeta de crédito dependerá de la cantidad de combustible y el tipo de unidad</li>
                    <li>• El vehículo alquilado sólo podrá ser conducido por el titular del contrato de alquiler, o conductores adicionales solicitados en el momento de la apertura del contrato ( personas adicionales no agregadas en el contrato no son sujetas a la cobertura del seguro)</li>
                    <li>• La devolución del auto deberá ser realizado a las misma horas que fue entregada; este proceso contara con hasta 2 hora de tolerancia que generaran un costo de $20 USD mas IVA por hora y después de las dos horas se aplicara un día mas de alquiler.</li>
                    <li>• Tolerancia de entrega: 30 minutos (después se cobra hora completa)</li>
                  </ul>
                </section>

                <section>
                  <h4 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
                    <X className="w-5 h-5 text-red-600 mr-2" />
                    3. Política de Cancelación
                  </h4>
                  <ul className="space-y-2 ml-4">
                    <li>• Cancelación gratuita hasta 24 horas antes</li>
                    <li>• Cancelación 12-24 horas antes: 25% del total</li>
                    <li>• Cancelación 6-12 horas antes: 50% del total</li>
                    <li>• Cancelación menos de 6 horas: 100% del total</li>
                    <li>• No show: Se cobra el 100% de la reserva</li>
                  </ul>
                </section>

                <section>
                  <h4 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
                    <Users className="w-5 h-5 text-blue-600 mr-2" />
                    4. Responsabilidad del cliente
                  </h4>
                  <ul className="space-y-2 ml-4">
                    <li>• Inspeccionar el vehículo antes de recibirlo</li>
                    <li>• Reportar cualquier daño inmediatamente</li>
                    <li>• Mantener el vehículo en condiciones adecuadas</li>
                    <li>• Cumplir con todas las leyes de tránsito</li>
                    <li>• Devolver el vehículo en las mismas condiciones</li>
                  </ul>
                </section>
                <div className="bg-red-200 border border-red-200 rounded-lg p-4 mt-6">
                  <p className="text-sm text-black">
                    <strong>Nota importante:</strong> Nos reservamos el derecho de rechazar el alquiler de los vehículos a menores de edad, personas sin permiso de conducción. Personas incapaces de demostrar capacidad crediticia para efectuar el pago, o personas que en opinión de la empresa  constituyan un riesgo.
                    <br />
                     UNIDADES SUJETAS A DISPONIBILIDAD AL MOMENTO DE RESERVAR

                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Reserva */}
      {showReservation && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 sm:p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-800">Realizar Reserva</h3>
                <button
                  onClick={closeModal}
                  className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleReservationSubmit} className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <h4 className="text-lg font-bold text-gray-800">Información Personal</h4>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Nombre Completo *</label>
                      <input
                        type="text"
                        name="name"
                        value={reservationData.name}
                        onChange={handleReservationChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                        <input
                          type="email"
                          name="email"
                          value={reservationData.email}
                          onChange={handleReservationChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono *</label>
                        <input
                          type="tel"
                          name="phone"
                          value={reservationData.phone}
                          onChange={handleReservationChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Número de Licencia *</label>
                      <input
                        type="text"
                        name="license"
                        value={reservationData.license}
                        onChange={handleReservationChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <h4 className="text-lg font-bold text-gray-800 pt-4">Fechas y Horarios</h4>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Fecha de Recogida *</label>
                        <input
                          type="date"
                          name="pickupDate"
                          value={reservationData.pickupDate}
                          onChange={handleReservationChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Fecha de Devolución *</label>
                        <input
                          type="date"
                          name="returnDate"
                          value={reservationData.returnDate}
                          onChange={handleReservationChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Hora de Recogida *</label>
                        <input
                          type="time"
                          name="pickupTime"
                          value={reservationData.pickupTime}
                          onChange={handleReservationChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Hora de Devolución *</label>
                        <input
                          type="time"
                          name="returnTime"
                          value={reservationData.returnTime}
                          onChange={handleReservationChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Lugar de Recogida *</label>
                      <select
                        name="pickupLocation"
                        value={reservationData.pickupLocation}
                        onChange={handleReservationChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      >
                        <option value="">Seleccionar ubicación</option>
                        {locations.map((location, index) => (
                          <option key={index} value={location}>{location}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h4 className="text-lg font-bold text-gray-800">Servicios Adicionales</h4>
                    
                    <div className="space-y-3">
                      {additionalServices.map((service) => (
                        <label key={service.id} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                          <input
                            type="checkbox"
                            name={service.id}
                            checked={reservationData.additionalServices.includes(service.id)}
                            onChange={handleReservationChange}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <div className="flex-1">
                            <div className="font-medium text-gray-800">{service.name}</div>
                            <div className="text-sm text-gray-600">+${service.price}/día</div>
                          </div>
                        </label>
                      ))}
                    </div>

                    <div className="bg-blue-50 rounded-xl p-6">
                      <h4 className="text-lg font-bold text-gray-800 mb-4">Resumen de Reserva</h4>
                      {reservationData.vehicleId && (
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Vehículo:</span>
                            <span className="font-medium">{vehicles.find(v => v.id === reservationData.vehicleId)?.name}</span>
                          </div>
                          {reservationData.pickupDate && reservationData.returnDate && (
                            <>
                              <div className="flex justify-between">
                                <span>Días:</span>
                                <span className="font-medium">
                                  {Math.ceil((new Date(reservationData.returnDate).getTime() - new Date(reservationData.pickupDate).getTime()) / (1000 * 60 * 60 * 24))}
                                </span>
                              </div>
                              <div className="border-t border-blue-200 pt-2 mt-2">
                                <div className="flex justify-between text-lg font-bold">
                                  <span>Total:</span>
                                  <span className="text-blue-600">${calculateTotal()}</span>
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="space-y-4">
                      <label className="flex items-start space-x-3">
                        <input
                          type="checkbox"
                          name="termsAccepted"
                          checked={reservationData.termsAccepted}
                          onChange={handleReservationChange}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-1"
                          required
                        />
                        <span className="text-sm text-gray-700">
                          Acepto los{' '}
                          <button
                            type="button"
                            onClick={() => setShowTerms(true)}
                            className="text-blue-600 hover:text-blue-700 underline"
                          >
                            términos y condiciones
                          </button>
                          {' '}de renta de vehículos *
                        </span>
                      </label>

                      <button
                        type="submit"
                        disabled={!reservationData.termsAccepted}
                        className="w-full bg-blue-600 text-white py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                      >
                        Confirmar Reserva
                      </button>

                      <p className="text-center text-sm text-gray-500">
                        📞 ¿Necesitas ayuda?{' '}
                        <a
                          href="https://wa.me/50370993538"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-green-600 hover:underline font-semibold"
                        >
                          Llámanos al +503 7099-3538
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VehicleRental;