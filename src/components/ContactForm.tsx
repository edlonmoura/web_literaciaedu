"use client"

import { useState } from "react"
import { Send, CheckCircle2, AlertCircle } from "lucide-react"

interface ContactFormProps {
  labels: {
    name: string
    institution: string
    role: string
    email: string
    phone: string
    message: string
    namePlaceholder: string
    institutionPlaceholder: string
    rolePlaceholder: string
    emailPlaceholder: string
    phonePlaceholder: string
    messagePlaceholder: string
  }
  statusLabels: {
    successTitle: string
    successText: string
    errorTitle: string
    errorText: string
  }
  submitLabel: string
  sendingLabel: string
}

export default function ContactForm({
  labels,
  statusLabels,
  submitLabel,
  sendingLabel,
}: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    institution: "",
    role: "",
    email: "",
    phone: "",
    message: "",
  })
  
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle")
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const tempErrors: Record<string, string> = {}
    if (!formData.name.trim()) tempErrors.name = "Nome é obrigatório"
    if (!formData.institution.trim()) tempErrors.institution = "Instituição é obrigatória"
    if (!formData.email.trim()) {
      tempErrors.email = "E-mail é obrigatório"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "E-mail inválido"
    }
    if (!formData.message.trim()) tempErrors.message = "Mensagem é obrigatória"
    
    setErrors(tempErrors)
    return Object.keys(tempErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error for field
    if (errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev }
        delete copy[name]
        return copy
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setStatus("sending")

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Failed to send message')
      }
      
      setStatus("success")
      setFormData({
        name: "",
        institution: "",
        role: "",
        email: "",
        phone: "",
        message: "",
      })
    } catch (err) {
      console.error(err)
      setStatus("error")
    }
  }

  if (status === "success") {
    return (
      <div
        className="bg-[#F5F9FA] border border-[#06B7A7]/20 rounded-2xl p-8 flex flex-col items-center text-center gap-4 animate-scale-in"
        role="alert"
        aria-live="polite"
      >
        <CheckCircle2 className="w-16 h-16 text-[#06B7A7]" />
        <h3 className="text-xl font-bold text-primary-teal font-sans">
          {statusLabels.successTitle}
        </h3>
        <p className="text-[#0B1E21]/80 max-w-md text-sm leading-relaxed">
          {statusLabels.successText}
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-4 px-6 py-2.5 bg-primary-teal text-white rounded-xl font-semibold text-sm hover:bg-bright-teal transition-colors"
        >
          Enviar nova mensagem
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>
      {status === "error" && (
        <div
          className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3 text-red-800 text-sm"
          role="alert"
        >
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-red-600" />
          <div>
            <h4 className="font-semibold">{statusLabels.errorTitle}</h4>
            <p className="mt-1">{statusLabels.errorText}</p>
          </div>
        </div>
      )}

      {/* Grid Name and Institution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="name" className="text-sm font-semibold text-[#0B1E21]/90">
            {labels.name}
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder={labels.namePlaceholder}
            className={`w-full px-4 py-3 rounded-xl border bg-white focus:outline-none transition-all duration-200 text-sm ${
              errors.name
                ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                : "border-primary-teal/15 focus:border-bright-teal focus:ring-2 focus:ring-bright-teal/10"
            }`}
            required
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          {errors.name && (
            <span id="name-error" className="text-xs text-red-500 font-medium mt-0.5">
              {errors.name}
            </span>
          )}
        </div>

        {/* Institution */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="institution" className="text-sm font-semibold text-[#0B1E21]/90">
            {labels.institution}
          </label>
          <input
            type="text"
            id="institution"
            name="institution"
            value={formData.institution}
            onChange={handleChange}
            placeholder={labels.institutionPlaceholder}
            className={`w-full px-4 py-3 rounded-xl border bg-white focus:outline-none transition-all duration-200 text-sm ${
              errors.institution
                ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                : "border-primary-teal/15 focus:border-bright-teal focus:ring-2 focus:ring-bright-teal/10"
            }`}
            required
            aria-describedby={errors.institution ? "institution-error" : undefined}
          />
          {errors.institution && (
            <span id="institution-error" className="text-xs text-red-500 font-medium mt-0.5">
              {errors.institution}
            </span>
          )}
        </div>
      </div>

      {/* Grid Role and Email */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Role */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="role" className="text-sm font-semibold text-[#0B1E21]/90">
            {labels.role}
          </label>
          <input
            type="text"
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            placeholder={labels.rolePlaceholder}
            className="w-full px-4 py-3 rounded-xl border border-primary-teal/15 bg-white focus:outline-none focus:border-bright-teal focus:ring-2 focus:ring-bright-teal/10 transition-all duration-200 text-sm"
          />
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-sm font-semibold text-[#0B1E21]/90">
            {labels.email}
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder={labels.emailPlaceholder}
            className={`w-full px-4 py-3 rounded-xl border bg-white focus:outline-none transition-all duration-200 text-sm ${
              errors.email
                ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                : "border-primary-teal/15 focus:border-bright-teal focus:ring-2 focus:ring-bright-teal/10"
            }`}
            required
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email && (
            <span id="email-error" className="text-xs text-red-500 font-medium mt-0.5">
              {errors.email}
            </span>
          )}
        </div>
      </div>

      {/* Phone */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="phone" className="text-sm font-semibold text-[#0B1E21]/90">
          {labels.phone}
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder={labels.phonePlaceholder}
          className="w-full px-4 py-3 rounded-xl border border-primary-teal/15 bg-white focus:outline-none focus:border-bright-teal focus:ring-2 focus:ring-bright-teal/10 transition-all duration-200 text-sm"
        />
      </div>

      {/* Message */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className="text-sm font-semibold text-[#0B1E21]/90">
          {labels.message}
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={formData.message}
          onChange={handleChange}
          placeholder={labels.messagePlaceholder}
          className={`w-full px-4 py-3 rounded-xl border bg-white focus:outline-none transition-all duration-200 text-sm resize-y ${
            errors.message
              ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
              : "border-primary-teal/15 focus:border-bright-teal focus:ring-2 focus:ring-bright-teal/10"
          }`}
          required
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        {errors.message && (
          <span id="message-error" className="text-xs text-red-500 font-medium mt-0.5">
            {errors.message}
          </span>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full inline-flex items-center justify-center gap-2 bg-primary-teal text-white font-semibold py-4 rounded-xl hover:bg-bright-teal transition-all duration-300 shadow-md shadow-primary-teal/10 disabled:bg-primary-teal/50 disabled:cursor-not-allowed text-sm focus:ring-2 focus:ring-bright-teal/20"
      >
        <Send className="w-4 h-4" />
        {status === "sending" ? sendingLabel : submitLabel}
      </button>
    </form>
  )
}
