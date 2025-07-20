"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, AlertCircle } from "lucide-react"
import emailjs from "@emailjs/browser"

const Contact = () => {
  const form = useRef<HTMLFormElement>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "transporte",
    message: "",
  })

  const [submitStatus, setSubmitStatus] = useState<"idle" | "sending" | "success" | "error">("idle")
  const [statusMessage, setStatusMessage] = useState("")

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitStatus("sending")

    if (!form.current) return

    // Agregar la fecha/hora actual al formulario
    const currentTime = new Date().toLocaleString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "America/El_Salvador",
    })

    // Crear un input hidden para el tiempo
    const timeInput = document.createElement("input")
    timeInput.type = "hidden"
    timeInput.name = "time"
    timeInput.value = currentTime
    form.current.appendChild(timeInput)

    emailjs
      .sendForm("service_jtty8p4", "template_1i36y5l", form.current, {
        publicKey: "_WJqcpBtNh2uCLEZi",
      })
      .then(
        () => {
          console.log("SUCCESS!")
          setSubmitStatus("success")
          setStatusMessage("¡Mensaje enviado exitosamente! Te contactaremos pronto.")

          // Reset form
          setFormData({
            name: "",
            email: "",
            phone: "",
            service: "transporte",
            message: "",
          })

          // Remove the time input
          if (form.current && timeInput.parentNode) {
            form.current.removeChild(timeInput)
          }

          // Clear status after 5 seconds
          setTimeout(() => {
            setSubmitStatus("idle")
            setStatusMessage("")
          }, 5000)
        },
        (error) => {
          console.log("FAILED...", error.text)
          setSubmitStatus("error")
          setStatusMessage("Error al enviar el mensaje. Por favor, intenta nuevamente o contáctanos directamente.")

          // Remove the time input
          if (form.current && timeInput.parentNode) {
            form.current.removeChild(timeInput)
          }

          // Clear status after 5 seconds
          setTimeout(() => {
            setSubmitStatus("idle")
            setStatusMessage("")
          }, 5000)
        },
      )
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const contactInfo = [
    {
      icon: Phone,
      title: "Teléfono",
      info: (
        <a
          href="https://wa.me/50370993538"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          +503 7099-3538
        </a>
      ),
      extraInfo: "Línea directa 24/7",
    },
    {
      icon: Mail,
      title: "Email",
      info: "urbaniatransportes@gmail.com",
      subInfo: "Respuesta en 15 Minutos",
    },
    {
      icon: MapPin,
      title: "Dirección",
      info: "55 Av.Sur, Local #6, Av. Olímpica, San Salvador",
      subInfo: "El Salvador, C.A.",
    },
    {
      icon: Clock,
      title: "Horarios",
      info: "24/7 Disponible",
    },
  ]

  return (
    <section id="contacto" className="py-12 sm:py-16 lg:py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">Contáctanos</h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto px-4 sm:px-0">
            Estamos aquí para atender tus necesidades. Contáctanos y te brindaremos una propuesta personalizada para tus
            requerimientos.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 sm:mb-8">Información de Contacto</h3>
            <div className="space-y-4 sm:space-y-6">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <item.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-semibold text-gray-800">{item.title}</h4>
                    <p className="text-sm sm:text-base text-gray-600">{item.info}</p>
                    <p className="text-xs sm:text-sm text-gray-500">{item.subInfo}</p>
                    {item.extraInfo && <p className="text-xs sm:text-sm text-gray-500">{item.extraInfo}</p>}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 sm:mt-12 p-4 sm:p-6 bg-blue-50 rounded-2xl">
              <h4 className="text-sm sm:text-base font-semibold text-gray-800 mb-2 sm:mb-3">
                ¿Necesitas una cotización rápida?
              </h4>
              <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">
                Llámanos directamente y te proporcionaremos una cotización inmediata para tu requerimiento específico.
              </p>
              <a
                href="tel:+50370993538"
                className="inline-block bg-gray-900 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-sm sm:text-base font-semibold hover:bg-blue-700 transition-colors"
              >
                Llamar Ahora
              </a>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg mt-8 lg:mt-0">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">Solicitar Información</h3>

            {/* Status Message */}
            {submitStatus !== "idle" && statusMessage && (
              <div
                className={`mb-6 p-4 rounded-lg flex items-center space-x-3 ${
                  submitStatus === "success"
                    ? "bg-green-50 text-green-800 border border-green-200"
                    : submitStatus === "error"
                      ? "bg-red-50 text-red-800 border border-red-200"
                      : "bg-blue-50 text-blue-800 border border-blue-200"
                }`}
              >
                {submitStatus === "success" && <CheckCircle className="w-5 h-5" />}
                {submitStatus === "error" && <AlertCircle className="w-5 h-5" />}
                {submitStatus === "sending" && (
                  <div className="w-5 h-5 border-2 border-blue-800 border-t-transparent rounded-full animate-spin" />
                )}
                <p className="text-sm sm:text-base font-medium">{statusMessage}</p>
              </div>
            )}

            <form ref={form} onSubmit={sendEmail} className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Nombre Completo</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    required
                    disabled={submitStatus === "sending"}
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    required
                    disabled={submitStatus === "sending"}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Teléfono</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    required
                    disabled={submitStatus === "sending"}
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Servicio de Interés</label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    required
                    disabled={submitStatus === "sending"}
                  >
                    <option value="transporte">Transporte Personal</option>
                    <option value="corporativo">Traslados de Grupos</option>
                    <option value="traslados">Traslados al Aeropuerto</option>
                    <option value="asistenciaPersonal">Asistencia Personalizada</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Mensaje</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                  placeholder="Describe tus necesidades específicas..."
                  required
                  disabled={submitStatus === "sending"}
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={submitStatus === "sending"}
                className={`w-full py-3 sm:py-4 rounded-lg text-sm sm:text-base font-semibold transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg ${
                  submitStatus === "sending"
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-gray-800 to-gray-900 text-white hover:from-blue-700 hover:to-blue-800 hover:shadow-xl transform hover:scale-105"
                }`}
              >
                {submitStatus === "sending" ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Enviando...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Enviar Mensaje</span>
                  </>
                )}
              </button>

              <p className="text-center text-xs sm:text-sm text-gray-500 mt-3 sm:mt-4">
                📞 <strong>¿Necesitas atención inmediata?</strong>{" "}
                <a
                  href="https://wa.me/50370993538"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Llámanos al +503 7099-3538
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
