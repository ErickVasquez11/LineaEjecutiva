"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"
import '../img/pexel-315938.png'
import heroImg from '../img/pexel-315938.png'
import contryImg from '..//img/Sin título-2.png'
import trax from '../img/2a2c6e268ff1498680112606dfd24ac0_2000x700.jpg'

const MinimalCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const slides = [
    {
      image: heroImg,
      title: "Servicios de Transporte",
      subtitle: "Transporte Premium en El Salvador",
      description:
        "Experiencia garantizada brindando servicios de transporte de personal, ejecutivos y corporativos con el más alto nivel de profesionalismo y seguridad.",
      isMainPage: true,
    },
     {
      image: contryImg,
        title: "Servicios de Transporte",
      subtitle: "Transporte Premium en El Salvador",
      description:
        "Experiencia garantizada brindando servicios de transporte de personal, ejecutivos y corporativos con el más alto nivel de profesionalismo y seguridad.",
      isMainPage: true,
    },
    {
      image: "https://www.lukesheppardkia.com/wp-content/uploads/2024/03/kia-sorento-hero.webp",
      title: "Servicios de Transporte",
      subtitle: "Transporte Premium en El Salvador",
      description:
        "Experiencia garantizada brindando servicios de transporte de personal, ejecutivos y corporativos con el más alto nivel de profesionalismo y seguridad.",
      isMainPage: true,
    },
    {
      image: "https://isuzuworld.my/images/6272024121339PMx-terrain_heroNew.png",
      title: "Servicios de Transporte",
      subtitle: "Transporte Premium en El Salvador",
      description:
        "Experiencia garantizada brindando servicios de transporte de personal, ejecutivos y corporativos con el más alto nivel de profesionalismo y seguridad.",
      isMainPage: true,
    },
    {
      image: "https://wallpapercave.com/wp/wp7542934.jpg",
      title: "Servicios de Transporte",
      subtitle: "Transporte Premium en El Salvador",
      description:
         "Experiencia garantizada brindando servicios de transporte de personal, ejecutivos y corporativos con el más alto nivel de profesionalismo y seguridad.",
      isMainPage: true,
    },
    {
      image: trax,
      title: "Servicios de Transporte",
      subtitle: "Transporte Premium en El Salvador",
      description:
        "Experiencia garantizada brindando servicios de transporte de personal, ejecutivos y corporativos con el más alto nivel de profesionalismo y seguridad.",
      isMainPage: true,
    }
  ]

  useEffect(() => {
    if (!isAutoPlaying) return
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [isAutoPlaying, slides.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  return (
    <section className="relative h-screen bg-white overflow-hidden">
      {/* Image Container - Responsive */}
      <div className="absolute inset-0 w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* Desktop Image */}
            <img
              src={slide.image || "/placeholder.svg"}
              alt={slide.title}
              className="hidden md:block w-full h-full object-cover object-center"
            />
            {/* Mobile Image - Optimized for mobile viewing */}
            <img
              src={slide.image || "/placeholder.svg"}
              alt={slide.title}
              className="block md:hidden w-full h-full object-cover object-center scale-110"
            />
            {/* Responsive overlay */}
            <div className="absolute inset-0 bg-black/30 md:bg-black/20"></div>
          </div>
        ))}
      </div>

      {/* Content Container - Responsive */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <div className="max-w-2xl">
            {/* Content */}
            <div className="bg-gray-600 backdrop-blur-sm p-4 sm:p-6 md:p-8 lg:p-12 rounded-lg shadow-lg">
              <p className="text-xs sm:text-sm font-medium text-gray-600 mb-2 tracking-wide uppercase">
                {slides[currentSlide].subtitle}
              </p>

              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-white mb-3 sm:mb-4 leading-tight">
                {slides[currentSlide].title}
              </h1>

              <p className="text-white text-sm sm:text-base md:text-lg mb-4 sm:mb-6 leading-relaxed">
                {slides[currentSlide].description}
              </p>

              {/* Información adicional solo en la primera slide - Responsive */}
              {slides[currentSlide].isMainPage && (
                <div className="mb-6 sm:mb-8 space-y-4 ">
                  <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center">
                    <div className="p-2 sm:p-4 bg-gray-50 rounded-lg align-middle">
                      <div className="text-lg sm:text-2xl font-light text-gray-900 mb-1">100%</div>
                      <div className="text-xs sm:text-sm text-gray-600">Seguro</div>
                    </div>
                    <div className="p-2 sm:p-4 bg-gray-50 rounded-lg align-middle ">
                      <div className="text-lg sm:text-2xl font-light text-gray-900 mb-1">24/7</div>
                      <div className="text-xs sm:text-sm text-gray-600">Disponible</div>
                    </div>
                  </div>

                  <div className="pt-3 sm:pt-4 border-t border-gray-200 space-y-1 sm:space-y-2 text-xs sm:text-sm text-white">
                    <div className="flex items-center space-x-2">
                      <span>📞</span>
                      <span>+503 7099-3538</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span>📧</span>
                      <span>urbaniatransportes@gmail.com</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span>📍</span>
                      <span>San Salvador, El Salvador</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <a
                  href="#contacto"
                  className="group inline-flex items-center justify-center space-x-2 bg-gray-900 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-md hover:bg-gray-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 text-sm sm:text-base"
                >
                  <span>Solicitar Cotización</span>
                  <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </a>

                {slides[currentSlide].isMainPage && (
                  <a
                    href="#servicios"
                    className="inline-flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 border border-gray-300 text-gray-900 rounded-md hover:bg-gray-50 transition-colors duration-200 text-sm sm:text-base"
                  >
                    Conocer Más
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation - Responsive */}
      <button
        onClick={prevSlide}
        className="absolute left-2 sm:left-4 md:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-900 hover:bg-white transition-all duration-200 shadow-lg"
      >
        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-2 sm:right-4 md:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-900 hover:bg-white transition-all duration-200 shadow-lg"
      >
        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>

      {/* Indicators - Responsive */}
      <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-1 sm:space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-200 ${
              index === currentSlide ? "bg-white w-6 sm:w-8" : "bg-white/50 hover:bg-white/70"
            }`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-black/10">
        <div
          className="h-full bg-white transition-all duration-300 ease-out"
          style={{
            width: `${((currentSlide + 1) / slides.length) * 100}%`,
          }}
        />
      </div>
    </section>
  )
}

export default MinimalCarousel
