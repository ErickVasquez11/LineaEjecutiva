"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, AlertCircle } from "lucide-react"
import emailjs from "@emailjs/browser"
import { PhoneNumberUtil } from "google-libphonenumber"
const phoneUtil = PhoneNumberUtil.getInstance()

const isPhoneValid = (phone: string) => {
  try {
    return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(phone))
  } catch (error) {
    return false
  }
}

const Contact = () => {
  const form = useRef<HTMLFormElement>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "+503 ", // Inicializar con código de El Salvador
    service: "Transporte Personal",
    message: "",
  })
  const [submitStatus, setSubmitStatus] = useState<"idle" | "sending" | "success" | "error">("idle")
  const [statusMessage, setStatusMessage] = useState("")

  // Validar si el teléfono es válido
  const isValid = isPhoneValid(formData.phone)

  // Mapeo de servicios para mostrar nombres más descriptivos
  const serviceLabels: { [key: string]: string } = {
    "Transporte Personal": "Transporte Personal",
    "Traslados de Grupos": "Traslados de Grupos",
    "Traslados al Aeropuerto": "Traslados al Aeropuerto",
    "Asistencia Personalizada": "Asistencia Personalizada",
  }

  // Función para generar la plantilla HTML exacta del email
  const generateEmailTemplate = (data: typeof formData, currentTime: string) => {
    return `<div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-size: 14px; color: #2c3e50; line-height: 1.6;">
  <div style="padding: 20px; border: 1px solid #e1e1e1; border-radius: 8px; background-color: #ffffff;">
    <h2 style="margin-top: 0; color: #1a1a1a;">📩 Nuevo mensaje de contacto</h2>
    <p>Hola equipo de <strong>Urbania Transportes</strong>,</p>
    <p>Hemos recibido un nuevo mensaje desde el formulario de contacto en la página web. A continuación, se detallan los datos enviados:</p>
    <div style="margin-top: 20px; padding: 15px; background-color: #f9f9f9; border: 1px dashed #ccc; border-radius: 6px;">
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 10px;"><strong>👤 Nombre Completo:</strong></td>
          <td style="padding: 10px;">${data.name}</td>
        </tr>
        <tr>
          <td style="padding: 10px;"><strong>📧 Email:</strong></td>
          <td style="padding: 10px;">${data.email}</td>
        </tr>
        <tr>
          <td style="padding: 10px;"><strong>📞 Teléfono:</strong></td>
          <td style="padding: 10px;">${data.phone}</td>
        </tr>
        <tr>
          <td style="padding: 10px;"><strong>🛣️ Servicio de Interés:</strong></td>
          <td style="padding: 10px;">${data.service}</td>
        </tr>
        <tr>
          <td style="padding: 10px; vertical-align: top;"><strong>💬 Mensaje:</strong></td>
          <td style="padding: 10px;">${data.message}</td>
        </tr>
        <tr>
          <td style="padding: 10px;"><strong>⏰ Fecha/Hora:</strong></td>
          <td style="padding: 10px;">${currentTime}</td>
        </tr>
      </table>
    </div>
    <p style="margin-top: 25px;">Por favor, responder a la brevedad posible.</p>
    <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
    <footer style="font-size: 13px; color: #777;">
      Este correo fue generado automáticamente por el sistema de contacto de <strong>Urbania Transportes</strong>.<br>
      Si recibió este mensaje por error, simplemente ignórelo.
    </footer>
  </div>
</div>`
  }

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault()

    // Validar teléfono antes de enviar
    if (!isValid) {
      setSubmitStatus("error")
      setStatusMessage("Por favor, ingresa un número de teléfono válido.")
      setTimeout(() => {
        setSubmitStatus("idle")
        setStatusMessage("")
      }, 5000)
      return
    }

    setSubmitStatus("sending")
    setStatusMessage("Enviando mensaje...")

    if (!form.current) return

    // Agregar la fecha/hora actual en formato español
    const currentTime = new Date().toLocaleString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone: "America/El_Salvador",
    })

    // Configuración de EmailJS - Actualiza estos valores con tus credenciales
    const serviceID = "service_8njjce9" // Tu Service ID
    const templateID = "template_f2k4ypy" // Tu Template ID
    const publicKey = "aHXCqqvASVIzBke_K" // Tu Public Key

    // Preparar los datos para enviar directamente a EmailJS
    const templateParams = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      service: formData.service,
      message: formData.message,
      time: currentTime,
      html_content: generateEmailTemplate(formData, currentTime),
    }

    emailjs
      .send(serviceID, templateID, templateParams, {
        publicKey: publicKey,
      })
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text)
          setSubmitStatus("success")
          setStatusMessage("¡Mensaje enviado exitosamente! Te contactaremos pronto.")
          // Reset form
          setFormData({
            name: "",
            email: "",
            phone: "+503 ",
            service: "Transporte Personal",
            message: "",
          })
          // Clear status after 5 seconds
          setTimeout(() => {
            setSubmitStatus("idle")
            setStatusMessage("")
          }, 5000)
        },
        (error) => {
          console.log("FAILED...", error)
          setSubmitStatus("error")
          setStatusMessage("Error al enviar el mensaje. Por favor, intenta nuevamente o contáctanos directamente.")
          // Clear status after 5 seconds
          setTimeout(() => {
            setSubmitStatus("idle")
            setStatusMessage("")
          }, 5000)
        },
      )
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handlePhoneChange = (phone: string) => {
    setFormData((prev) => ({
      ...prev,
      phone: phone,
    }))
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
          className="text-green-500 hover:underline"
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
      info: "55 Av.Sur, #6, Av. Olímpica, San Salvador",
      subInfo: "El Salvador, C.A.",
    },
    {
      icon: Clock,
      title: "Horarios",
      info: "24/7 Disponible",
    },
  ]

  return (
    <section id="contacto" className="py-12 sm:py-16 lg:py-20 bg-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">Contáctanos</h2>
          <p className="text-base sm:text-lg lg:text-xl text-white max-w-2xl mx-auto px-4 sm:px-0">
            Estamos aquí para atender tus necesidades. Contáctanos y te brindaremos una propuesta personalizada para tus
            requerimientos.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-6 sm:mb-8">Información de Contacto</h3>
            <div className="space-y-4 sm:space-y-6">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center">
                    <item.icon className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-semibold text-white">{item.title}</h4>
                    <p className="text-sm sm:text-base text-gray-300">{item.info}</p>
                    {item.subInfo && <p className="text-xs sm:text-sm text-gray-400">{item.subInfo}</p>}
                    {item.extraInfo && <p className="text-xs sm:text-sm text-gray-400">{item.extraInfo}</p>}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 sm:mt-12 p-4 sm:p-6 bg-gray-800 rounded-2xl border border-gray-700">
              <h4 className="text-sm sm:text-base font-semibold text-white mb-2 sm:mb-3">
                ¿Necesitas una cotización rápida?
              </h4>
              <p className="text-sm sm:text-base text-gray-300 mb-3 sm:mb-4">
                Llámanos directamente y te proporcionaremos una cotización inmediata para tu requerimiento específico.
              </p>
              <a
                href="tel:+50370993538"
                className="inline-block bg-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-sm sm:text-base font-semibold hover:bg-blue-700 transition-colors"
              >
                Llamar Ahora
              </a>
            </div>
          </div>

          <div className="bg-gray-800 rounded-2xl p-6 sm:p-8 shadow-2xl border border-gray-700 mt-8 lg:mt-0">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">Solicitar Información</h3>

            {/* Status Message */}
            {submitStatus !== "idle" && statusMessage && (
              <div
                className={`mb-6 p-4 rounded-lg flex items-center space-x-3 ${
                  submitStatus === "success"
                    ? "bg-green-900/50 text-green-300 border border-green-700"
                    : submitStatus === "error"
                      ? "bg-red-900/50 text-red-300 border border-red-700"
                      : "bg-blue-900/50 text-blue-300 border border-blue-700"
                }`}
              >
                {submitStatus === "success" && <CheckCircle className="w-5 h-5" />}
                {submitStatus === "error" && <AlertCircle className="w-5 h-5" />}
                {submitStatus === "sending" && (
                  <div className="w-5 h-5 border-2 border-blue-300 border-t-transparent rounded-full animate-spin" />
                )}
                <p className="text-sm sm:text-base font-medium">{statusMessage}</p>
              </div>
            )}

            <form ref={form} onSubmit={sendEmail} className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">Nombre Completo</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-white placeholder-gray-400"
                    placeholder="Tu nombre completo"
                    required
                    disabled={submitStatus === "sending"}
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-white placeholder-gray-400"
                    placeholder="tu@email.com"
                    required
                    disabled={submitStatus === "sending"}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">Teléfono</label>
                  <div className="flex gap-2">
                    <div className="relative">
                      <select
                        name="countryCode"
                        value={formData.phone.split(" ")[0] || "+503"}
                        onChange={(e) => {
                          const newCountryCode = e.target.value
                          const phoneNumber = formData.phone.split(" ").slice(1).join(" ") || ""
                          setFormData((prev) => ({
                            ...prev,
                            phone: `${newCountryCode} ${phoneNumber}`.trim(),
                          }))
                        }}
                        className="w-20 sm:w-24 px-2 sm:px-3 py-2 sm:py-3 text-xs sm:text-sm bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-white appearance-none cursor-pointer"
                        disabled={submitStatus === "sending"}
                      >
                        <option value="+503">🇸🇻</option>
                        <option value="+502">🇬🇹</option>
                        <option value="+504">🇭🇳</option>
                        <option value="+505">🇳🇮</option>
                        <option value="+506">🇨🇷</option>
                        <option value="+507">🇵🇦</option>
                        <option value="+52">🇲🇽</option>
                        <option value="+1">🇺🇸</option>
                        <option value="+34">🇪🇸</option>
                        <option value="+33">🇫🇷</option>
                        <option value="+49">🇩🇪</option>
                        <option value="+39">🇮🇹</option>
                        <option value="+44">🇬🇧</option>
                        <option value="+351">🇵🇹</option>
                        <option value="+55">🇧🇷</option>
                        <option value="+54">🇦🇷</option>
                        <option value="+56">🇨🇱</option>
                        <option value="+57">🇨🇴</option>
                        <option value="+58">🇻🇪</option>
                        <option value="+51">🇵🇪</option>
                        <option value="+593">🇪🇨</option>
                      </select>
                      <div className="absolute inset-y-0 right-1 flex items-center pointer-events-none">
                        <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex-1 relative">
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-400 pointer-events-none">
                        {formData.phone.split(" ")[0] || "+503"}
                      </div>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone.split(" ").slice(1).join(" ") || ""}
                        onChange={(e) => {
                          const countryCode = formData.phone.split(" ")[0] || "+503"
                          const newPhone = `${countryCode} ${e.target.value}`.trim()
                          setFormData((prev) => ({
                            ...prev,
                            phone: newPhone,
                          }))
                        }}
                        placeholder="7099-3538"
                        className="w-full pl-16 pr-3 sm:pr-4 py-2 sm:py-3 text-sm sm:text-base bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-white placeholder-gray-400"
                        required
                        disabled={submitStatus === "sending"}
                      />
                    </div>
                  </div>
                  {formData.phone && formData.phone.length > 4 && (
                    <div className="flex items-center justify-between mt-1">
                      <p className={`text-xs ${isValid ? "text-green-400" : "text-red-400"}`}>
                        {isValid ? "✓ Número válido" : "✗ Número no válido"}
                      </p>
                      <p className="text-xs text-gray-400">{formData.phone}</p>
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">Servicio de Interés</label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-white"
                    required
                    disabled={submitStatus === "sending"}
                  >
                    <option value="Transporte Personal">Transporte Personal</option>
                    <option value="Traslados de Grupos">Traslados de Grupos</option>
                    <option value="Traslados al Aeropuerto">Traslado al Aeropuerto</option>
                    <option value="Asistencia Personalizada">Asistencia Personalizada</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">Mensaje</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none text-white placeholder-gray-400"
                  placeholder="Describe tus necesidades específicas..."
                  required
                  disabled={submitStatus === "sending"}
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={submitStatus === "sending" || !isValid}
                className={`w-full py-3 sm:py-4 rounded-lg text-sm sm:text-base font-semibold transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg ${
                  submitStatus === "sending" || !isValid
                    ? "bg-gray-600 cursor-not-allowed text-gray-400"
                    : "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 hover:shadow-xl transform hover:scale-105"
                }`}
              >
                {submitStatus === "sending" ? (
                  <>
                    <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                    <span>Enviando...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Enviar Mensaje</span>
                  </>
                )}
              </button>

              <p className="text-center text-xs sm:text-sm text-gray-300 mt-3 sm:mt-4">
                📞 <strong>¿Necesitas atención inmediata?</strong>{" "}
                <a
                  href="https://wa.me/50370993538"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-400 hover:underline hover:text-green-300 transition-colors"
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
