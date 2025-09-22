"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { PROFESSIONALS, CONTACT_INFO } from "@/data/constants";
import {
  CheckIcon,
  StarIcon,
  ArrowRightIcon,
  EarIcon,
  HeartIcon,
  TargetIcon,
  ShieldIcon,
  AwardIcon,
  CalendarIcon,
  EyeIcon,
} from "@/components/ui/Icon";
import { CalendarBookingModal } from "@/components/ui";

export default function NosotrosPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Enhanced Hero Section - Similar to Services */}
      <section className="pt-16 pb-8 lg:pt-20 lg:pb-12 hero-gradient relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-[0.015]">
          <svg
            className="w-full h-full"
            viewBox="0 0 400 400"
            preserveAspectRatio="none"
          >
            <defs>
              <pattern
                id="medical-pattern"
                x="0"
                y="0"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M20 5 L20 35 M5 20 L35 20"
                  stroke="currentColor"
                  strokeWidth="1"
                />
                <circle cx="20" cy="20" r="2" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#medical-pattern)" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Professional Badge - Centered */}
          <div className="text-center mb-6 lg:mb-12">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500 to-cyan-500 px-8 py-4 rounded-full text-sm font-semibold font-secondary shadow-lg text-white">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <span>Centro de Audiología Profesional</span>
            </div>
          </div>

          {/* Main Hero Content - Centered Layout without Image */}
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 font-primary leading-tight max-w-4xl mx-auto">
              Acerca de{" "}
              <span className="text-primary-blue relative inline-block">
                Centro Auditus
                <svg
                  className="absolute -bottom-2 left-0 w-full h-3 text-blue-200"
                  viewBox="0 0 100 12"
                  preserveAspectRatio="none"
                  fill="currentColor"
                >
                  <path d="M0,8 Q50,0 100,8 L100,12 L0,12 Z" />
                </svg>
              </span>
            </h1>

            <p className="text-xl lg:text-2xl text-gray-600 font-secondary leading-relaxed mb-8 max-w-4xl mx-auto">
              Centro especializado en diagnóstico y cuidado auditivo profesional
              en Concepción, comprometidos con brindarte{" "}
              <strong className="text-gray-900">atención de excelencia</strong>{" "}
              con tecnología moderna.
            </p>

            {/* Professional Credentials */}
            <div className="flex flex-wrap justify-center gap-6 text-gray-600 text-sm font-secondary mb-8">
              <div className="flex items-center space-x-2">
                <AwardIcon size="sm" className="text-blue-500" />
                <span>5+ Años de Experiencia</span>
              </div>
              <div className="flex items-center space-x-2">
                <ShieldIcon size="sm" className="text-green-500" />
                <span>Profesional Certificada</span>
              </div>
              <div className="flex items-center space-x-2">
                <StarIcon size="sm" className="text-yellow-500" />
                <span>500+ Pacientes Atendidos</span>
              </div>
              <div className="flex items-center space-x-2">
                <HeartIcon size="sm" className="text-pink-500" />
                <span>Atención Personalizada</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/servicios" className="w-full sm:w-auto">
                <button className="btn-primary text-lg px-8 py-4 flex items-center justify-center space-x-2 w-full sm:w-auto">
                  <span>Conocer Servicios</span>
                  <ArrowRightIcon
                    size="sm"
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </button>
              </Link>
              {CONTACT_INFO.calendarBooking ? (
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="btn-secondary text-lg px-8 py-4 flex items-center justify-center space-x-2 w-full sm:w-auto"
                >
                  <CalendarIcon size="sm" />
                  <span>Agendar Cita</span>
                </button>
              ) : (
                <Link href="/contacto" className="w-full sm:w-auto">
                  <button className="btn-secondary text-lg px-8 py-4 flex items-center justify-center space-x-2 w-full sm:w-auto">
                    <span>Agendar Cita</span>
                    <ArrowRightIcon
                      size="sm"
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </button>
                </Link>
              )}
            </div>
          </div>

          {/* Professional Highlights - Similar to Services Layout */}
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-blue-100/50 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <EarIcon size="sm" className="text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2 font-primary">
                Especialización
              </h3>
              <p className="text-sm text-gray-600 font-secondary">
                Fonoaudiología especializada en salud auditiva
              </p>
            </div>

            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-blue-100/50 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <ShieldIcon size="sm" className="text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2 font-primary">
                Tecnología
              </h3>
              <p className="text-sm text-gray-600 font-secondary">
                Equipos modernos de alta precisión
              </p>
            </div>

            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-blue-100/50 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-rose-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <HeartIcon size="sm" className="text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2 font-primary">
                Calidez Humana
              </h3>
              <p className="text-sm text-gray-600 font-secondary">
                Atención personalizada y cercana
              </p>
            </div>
          </div>
        </div>

        {/* Professional Wave Separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            className="w-full h-16 text-white"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            fill="currentColor"
          >
            <path d="M0,60 C300,100 900,20 1200,60 L1200,120 L0,120 Z" />
          </svg>
        </div>
      </section>

      {/* Nuestra Historia - Reestructurada y Mejorada */}
      <section className="pt-12 pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="text-center mb-16">
            <div className="professional-badge inline-flex items-center gap-2 text-sm font-medium font-secondary mb-6">
              <div className="w-2 h-2 bg-secondary-turquoise rounded-full animate-pulse"></div>
              <span>Nuestra Historia</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 font-primary leading-tight">
              El Origen de{" "}
              <span className="text-primary-blue relative inline-block">
                Centro Auditus
                <svg
                  className="absolute -bottom-2 left-0 w-full h-3 text-blue-200"
                  viewBox="0 0 100 12"
                  preserveAspectRatio="none"
                  fill="currentColor"
                >
                  <path d="M0,8 Q50,0 100,8 L100,12 L0,12 Z" />
                </svg>
              </span>
            </h2>

            <p className="text-xl text-gray-700 font-secondary max-w-3xl mx-auto leading-relaxed">
              Una historia de compromiso profesional y dedicación al cuidado
              auditivo especializado
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-5 gap-12 items-start">
            {/* Story Content */}
            <div className="lg:col-span-3 space-y-8">
              {/* Foundation Story */}
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 border border-blue-100">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-primary-blue rounded-xl flex items-center justify-center mr-4">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 font-primary">
                    Nuestros Inicios
                  </h3>
                </div>
                <p className="text-gray-700 font-secondary leading-relaxed text-base">
                  Centro Auditus nació en{" "}
                  <strong className="text-primary-blue">Concepción</strong> con
                  una visión clara: crear un espacio especializado donde la{" "}
                  <strong className="text-gray-900">
                    fonoaudiología profesional{" "}
                  </strong>
                  se combinara con tecnología avanzada para ofrecer diagnósticos
                  precisos y tratamientos efectivos.
                </p>
              </div>

              {/* Professional Journey */}
              <div className="bg-gradient-to-br from-cyan-50 to-teal-50 rounded-2xl p-8 border border-cyan-100">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-secondary-turquoise rounded-xl flex items-center justify-center mr-4">
                    <EarIcon size="sm" className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 font-primary">
                    Experiencia y Especialización
                  </h3>
                </div>
                <p className="text-gray-700 font-secondary leading-relaxed text-base">
                  Bajo el liderazgo de{" "}
                  <strong className="text-secondary-turquoise">
                    Valeska Campos Sovino
                  </strong>
                  , fonoaudióloga titulada de la Universidad de Concepción,
                  hemos desarrollado protocolos especializados en{" "}
                  <strong className="text-gray-900">
                    videotoscopía, lavado de oídos y audiometría
                  </strong>{" "}
                  que garantizan la más alta calidad en cada procedimiento.
                </p>
              </div>

              {/* Innovation Focus */}
              <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-8 border border-pink-100">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-pink-400 rounded-xl flex items-center justify-center mr-4">
                    <HeartIcon size="sm" className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 font-primary">
                    Compromiso Humano
                  </h3>
                </div>
                <p className="text-gray-700 font-secondary leading-relaxed text-base">
                  Más que un centro médico, somos un espacio donde la{" "}
                  <strong className="text-pink-500">calidez humana </strong>
                  se encuentra con la{" "}
                  <strong className="text-gray-900">
                    excelencia profesional
                  </strong>
                  . Cada paciente recibe atención personalizada, explicaciones
                  claras y el tiempo necesario para comprender su salud
                  auditiva.
                </p>
              </div>
            </div>

            {/* Enhanced Sidebar */}
            <div className="lg:col-span-2 space-y-6">
              {/* Key Numbers - Redesigned */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 sticky top-8">
                <div className="text-center mb-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Nuestra Trayectoria
                  </h3>
                  <p className="text-gray-600 text-sm">
                    En números que reflejan nuestro compromiso
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-xl border border-blue-100">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-primary-blue rounded-lg flex items-center justify-center mr-3">
                        <AwardIcon size="sm" className="text-white" />
                      </div>
                      <div>
                        <div className="text-lg font-bold text-gray-900">
                          5+
                        </div>
                        <div className="text-xs text-gray-600">
                          Años de Experiencia
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-cyan-50 rounded-xl border border-cyan-100">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-secondary-turquoise rounded-lg flex items-center justify-center mr-3">
                        <StarIcon
                          size="sm"
                          className="text-white fill-current"
                        />
                      </div>
                      <div>
                        <div className="text-lg font-bold text-gray-900">
                          500+
                        </div>
                        <div className="text-xs text-gray-600">
                          Pacientes Atendidos
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl border border-green-100">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center mr-3">
                        <CheckIcon size="sm" className="text-white" />
                      </div>
                      <div>
                        <div className="text-lg font-bold text-gray-900">
                          100%
                        </div>
                        <div className="text-xs text-gray-600">
                          Profesionalismo
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Story Continuation */}
          <div className="mt-16 text-center">
            <div className="max-w-4xl mx-auto">
              <p className="text-lg text-gray-700 font-secondary leading-relaxed">
                Hoy, Centro Auditus se consolida como un referente en{" "}
                <strong className="text-primary-blue">cuidado auditivo </strong>
                en la región del Biobío, manteniendo nuestro compromiso
                original: brindar atención de excelencia con
                <strong className="text-secondary-turquoise">
                  {" "}
                  tecnología avanzada
                </strong>{" "}
                y
                <strong className="text-pink-500"> trato humano cercano</strong>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Misión y Visión */}
      <section className="pt-8 pb-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 font-primary">
              Misión y{' '}
              <span className="text-primary-blue relative inline-block">
                Visión
                <svg
                  className="absolute -bottom-2 left-0 w-full h-3 text-blue-200"
                  viewBox="0 0 100 12"
                  preserveAspectRatio="none"
                  fill="currentColor"
                >
                  <path d="M0,8 Q50,0 100,8 L100,12 L0,12 Z" />
                </svg>
              </span>
            </h2>
            <p className="text-lg text-gray-600 font-secondary max-w-2xl mx-auto">
              Los valores que nos guían en nuestro compromiso con la excelencia
              en salud auditiva
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-blue to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <TargetIcon size="lg" className="text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 font-primary text-center">
                Misión
              </h3>
              <p className="text-gray-600 font-secondary leading-relaxed text-center">
                Proporcionar servicios especializados en audiología de la más
                alta calidad, utilizando tecnología moderna y un enfoque
                personalizado para mejorar la calidad de vida de nuestros
                pacientes a través del cuidado integral de su salud auditiva.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-br from-secondary-turquoise to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <EyeIcon size="lg" className="text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 font-primary text-center">
                Visión
              </h3>
              <p className="text-gray-600 font-secondary leading-relaxed text-center">
                Ser el centro de referencia en audiología en la región del
                Biobío, reconocidos por nuestra excelencia profesional,
                innovación tecnológica y compromiso con la prevención y
                tratamiento de los trastornos auditivos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Conoce a Nuestro Equipo Section */}
      <section className="pt-4 pb-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="professional-badge inline-flex items-center gap-2 text-sm font-medium font-secondary mb-6">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <span>Profesionales Especializados</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 font-primary">
              Conoce a{" "}
              <span className="text-primary-blue relative inline-block">
                Nuestro Equipo
                <svg
                  className="absolute -bottom-2 left-0 w-full h-3 text-blue-200"
                  viewBox="0 0 100 12"
                  preserveAspectRatio="none"
                  fill="currentColor"
                >
                  <path d="M0,8 Q50,0 100,8 L100,12 L0,12 Z" />
                </svg>
              </span>
            </h2>

            <p className="text-lg text-gray-600 font-secondary max-w-2xl mx-auto">
              Profesionales comprometidos con brindarte atención de excelencia
            </p>
          </div>

          <div className="flex justify-center">
            {PROFESSIONALS.map((professional) => (
              <div
                key={professional.id}
                className="bg-white rounded-3xl shadow-lg p-8 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 max-w-md"
              >
                {/* Foto del profesional */}
                <div className="relative mb-6">
                  <div className="w-32 h-32 mx-auto relative">
                    <Image
                      src="/images/valeska-campos-profesional.jpg"
                      alt="Valeska Campos Sovino, Fonoaudióloga Especialista en Centro Auditus"
                      width={128}
                      height={128}
                      className="w-full h-full rounded-full object-cover shadow-lg border-4 border-white"
                      priority
                    />

                    {/* Badge de verificación */}
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                      <CheckIcon size="sm" className="text-white" />
                    </div>
                  </div>
                </div>

                {/* Información básica */}
                <h3 className="text-xl font-bold text-gray-900 font-primary mb-2">
                  {professional.name}
                </h3>

                <p className="text-primary-blue font-medium font-secondary mb-4">
                  {professional.title}
                </p>

                {/* Rating */}
                <div className="flex items-center justify-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      size="sm"
                      className="text-yellow-400 fill-current"
                    />
                  ))}
                  <span className="text-sm text-gray-600 ml-2 font-secondary">
                    5.0
                  </span>
                </div>

                {/* Estadísticas rápidas */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-lg font-bold text-primary-blue">
                      {professional.yearsExperience}+
                    </div>
                    <div className="text-xs text-gray-600">Años</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-secondary-turquoise">
                      {professional.satisfaction}%
                    </div>
                    <div className="text-xs text-gray-600">Satisfacción</div>
                  </div>
                </div>

                {/* Breve descripción */}
                <p className="text-gray-600 text-sm font-secondary mb-6 leading-relaxed line-clamp-3">
                  {professional.experience}
                </p>

                {/* Botón ver perfil */}
                <Link href={`/nosotros/${professional.slug}`}>
                  <button className="btn-primary w-full flex items-center justify-center space-x-2">
                    <span>Ver Perfil Completo</span>
                    <ArrowRightIcon size="sm" />
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Por Qué Elegirnos */}
      <section className="pt-4 pb-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 font-primary">
              ¿Por Qué Elegir{" "}
              <span className="text-primary-blue relative inline-block">
                Centro Auditus
                <svg
                  className="absolute -bottom-2 left-0 w-full h-3 text-blue-200"
                  viewBox="0 0 100 12"
                  preserveAspectRatio="none"
                  fill="currentColor"
                >
                  <path d="M0,8 Q50,0 100,8 L100,12 L0,12 Z" />
                </svg>
              </span>
              ?
            </h2>
            <p className="text-lg text-gray-600 font-secondary max-w-2xl mx-auto">
              Razones que nos convierten en tu mejor opción para el cuidado
              auditivo
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-primary-blue rounded-xl flex items-center justify-center flex-shrink-0">
                <AwardIcon size="md" className="text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 font-primary">
                  Profesional Certificada
                </h3>
                <p className="text-gray-600 font-secondary text-sm">
                  Fonoaudióloga titulada con registro profesional y formación
                  especializada
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-secondary-turquoise rounded-xl flex items-center justify-center flex-shrink-0">
                <EarIcon size="md" className="text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 font-primary">
                  Tecnología Avanzada
                </h3>
                <p className="text-gray-600 font-secondary text-sm">
                  Videotoscopía de alta resolución y equipamiento especializado
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <CheckIcon size="md" className="text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 font-primary">
                  Procedimientos Seguros
                </h3>
                <p className="text-gray-600 font-secondary text-sm">
                  Protocolos médicos estrictos y técnicas profesionales
                  especializadas
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-pink-400 rounded-xl flex items-center justify-center flex-shrink-0">
                <HeartIcon size="md" className="text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 font-primary">
                  Atención Personalizada
                </h3>
                <p className="text-gray-600 font-secondary text-sm">
                  Evaluación individual y recomendaciones específicas para cada
                  caso
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <TargetIcon size="md" className="text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 font-primary">
                  Ubicación Conveniente
                </h3>
                <p className="text-gray-600 font-secondary text-sm">
                  Centro de Concepción, fácil acceso y horarios flexibles
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <div className="flex space-x-0.5">
                  {[...Array(3)].map((_, i) => (
                    <StarIcon
                      key={i}
                      size="sm"
                      className="text-white fill-current"
                    />
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 font-primary">
                  Satisfacción Garantizada
                </h3>
                <p className="text-gray-600 font-secondary text-sm">
                  Compromiso con resultados excepcionales y seguimiento
                  post-atención
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Calendar Booking Modal */}
      {CONTACT_INFO.calendarBooking && (
        <CalendarBookingModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          calendarUrl={CONTACT_INFO.calendarBooking}
          serviceName="Evaluación Auditiva"
        />
      )}
    </div>
  );
}
