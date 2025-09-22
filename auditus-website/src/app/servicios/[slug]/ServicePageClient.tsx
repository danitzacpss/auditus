'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, Button, ClockIcon, CheckIcon, ArrowRightIcon, WhatsAppIcon, CalendarIcon, CalendarBookingModal, ShieldIcon } from '@/components/ui';
import StructuredData from '@/components/seo/StructuredData';
import { CONTACT_INFO } from '@/data/constants';
import { formatCurrency, formatDuration, getWhatsAppUrl } from '@/lib/utils';
import type { Service } from '@/types';
import CTASection from '@/components/sections/CTASection';

interface ServicePageClientProps {
  service: Service;
}

export default function ServicePageClient({ service }: ServicePageClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const appointmentMessage = `Hola, me interesa agendar una cita para ${service.name}. ¿Cuándo tienen disponibilidad?`;

  const formatTitleWithBlueGradient = (title: string) => {
    const words = title.split(' ');
    if (words.length === 1) {
      // Single word - make it fully blue with SVG underline
      return (
        <span className="text-primary-blue relative inline-block">
          {title}
          <svg
            className="absolute -bottom-2 left-0 w-full h-3 text-blue-200"
            viewBox="0 0 100 12"
            preserveAspectRatio="none"
            fill="currentColor"
          >
            <path d="M0,8 Q50,0 100,8 L100,12 L0,12 Z" />
          </svg>
        </span>
      );
    } else {
      // Multiple words - make last word blue with SVG underline
      const lastWordIndex = words.length - 1;
      return (
        <>
          {words.slice(0, lastWordIndex).join(' ')}{' '}
          <span className="text-primary-blue relative inline-block">
            {words[lastWordIndex]}
            <svg
              className="absolute -bottom-2 left-0 w-full h-3 text-blue-200"
              viewBox="0 0 100 12"
              preserveAspectRatio="none"
              fill="currentColor"
            >
              <path d="M0,8 Q50,0 100,8 L100,12 L0,12 Z" />
            </svg>
          </span>
        </>
      );
    }
  };

  const formatSectionTitle = (title: string) => {
    const words = title.split(' ');
    const lastWordIndex = words.length - 1;
    return (
      <>
        {words.slice(0, lastWordIndex).join(' ')}{' '}
        <span className="text-primary-blue relative inline-block">
          {words[lastWordIndex]}
          <svg
            className="absolute -bottom-2 left-0 w-full h-3 text-blue-200"
            viewBox="0 0 100 12"
            preserveAspectRatio="none"
            fill="currentColor"
          >
            <path d="M0,8 Q50,0 100,8 L100,12 L0,12 Z" />
          </svg>
        </span>
      </>
    );
  };

  const formatSectionTitleTwoWords = (title: string) => {
    const words = title.split(' ');
    const lastTwoWordsIndex = Math.max(0, words.length - 2);
    return (
      <>
        {words.slice(0, lastTwoWordsIndex).join(' ')}{lastTwoWordsIndex > 0 ? ' ' : ''}
        <span className="text-primary-blue relative inline-block">
          {words.slice(lastTwoWordsIndex).join(' ')}
          <svg
            className="absolute -bottom-2 left-0 w-full h-3 text-blue-200"
            viewBox="0 0 100 12"
            preserveAspectRatio="none"
            fill="currentColor"
          >
            <path d="M0,8 Q50,0 100,8 L100,12 L0,12 Z" />
          </svg>
        </span>
      </>
    );
  };

  return (
    <>
      <StructuredData type="service" serviceId={service.id} />
      <main className="min-h-screen bg-white relative overflow-hidden">
        {/* Modern Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl" />
          <div className="absolute top-1/3 left-1/2 w-[400px] h-[400px] bg-gradient-to-r from-blue-300/15 to-cyan-300/15 rounded-full blur-3xl" />
        </div>

      {/* Hero Section - Compact Modern Layout with Integrated Navigation */}
      <section className="relative pt-20 pb-4 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100 overflow-hidden">
        {/* Floating Background Elements - Similar to image */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-10 w-32 h-32 bg-blue-200/30 rounded-full blur-2xl animate-pulse" />
          <div className="absolute top-40 left-20 w-24 h-24 bg-cyan-200/40 rounded-full blur-xl" />
          <div className="absolute bottom-32 right-32 w-40 h-40 bg-blue-300/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-10 w-28 h-28 bg-cyan-100/50 rounded-full blur-2xl" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-200/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Integrated Navigation */}
          <nav className="mb-8">
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Link href="/" className="hover:text-blue-600 transition-colors">
                  Inicio
                </Link>
                <span>/</span>
                <Link href="/servicios" className="hover:text-blue-600 transition-colors">
                  Servicios
                </Link>
                <span>/</span>
                <span className="text-gray-900 font-medium">{service.name}</span>
              </div>
              <Link
                href="/servicios"
                className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors text-sm bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-blue-200/50 shadow-sm hover:shadow-md"
              >
                <ArrowRightIcon size="sm" className="rotate-180" />
                <span>Volver a Servicios</span>
              </Link>
            </div>

            {/* Mobile Navigation */}
            <div className="md:hidden space-y-4 mb-6">
              {/* Breadcrumb */}
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Link href="/" className="hover:text-blue-600 transition-colors">
                  Inicio
                </Link>
                <span>/</span>
                <Link href="/servicios" className="hover:text-blue-600 transition-colors">
                  Servicios
                </Link>
                <span>/</span>
                <span className="text-gray-900 font-medium">{service.name}</span>
              </div>

              {/* Back Button */}
              <div className="flex justify-start">
                <Link
                  href="/servicios"
                  className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors text-sm bg-white/80 backdrop-blur-sm px-4 py-2.5 rounded-full border border-blue-200/50 shadow-sm hover:shadow-md"
                >
                  <ArrowRightIcon size="sm" className="rotate-180" />
                  <span>Volver a Servicios</span>
                </Link>
              </div>
            </div>
          </nav>
          {/* Conditional Layout for Videotoscopia and Lavado de Oídos */}
          {service.id === 'videotoscopia' ? (
            /* Enhanced Layout for Videotoscopia with Professional Image */
            <div className="space-y-8">
              {/* Mobile Layout */}
              <div className="lg:hidden space-y-6">
                {/* Floating Badge */}
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/60 backdrop-blur-md border border-blue-200/50 shadow-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse" />
                  <span className="text-blue-700 font-medium text-sm">Videotoscopía Profesional</span>
                </div>

                {/* Main Title */}
                <div className="space-y-4">
                  <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                    {formatTitleWithBlueGradient(service.name)}
                    <span className="block text-xl lg:text-2xl font-normal text-gray-600 mt-2">
                      Visualización en alta definición y registro profesional
                    </span>
                  </h1>

                  <p className="text-lg text-gray-700 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Image */}
                <div className="hero-professional-image relative">
                  <Image
                    src="/images/hero-videotoscopia.jpg"
                    alt="Profesional realizando videotoscopía con equipamiento moderno, mostrando procedimiento en tiempo real con tecnología de alta definición"
                    width={600}
                    height={400}
                    className="w-full h-80 object-cover object-center rounded-2xl shadow-2xl"
                    priority
                    sizes="100vw"
                  />

                  {/* Professional certification badge */}
                  <div className="absolute top-4 right-4 professional-badge-certified text-white px-3 py-1 rounded-full text-xs font-bold font-secondary">
                    <div className="flex items-center space-x-1">
                      <span className="text-yellow-300">✨</span>
                      <span>Profesional</span>
                    </div>
                  </div>
                </div>

                {/* Key Benefits for Videotoscopia */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2 bg-white/50 rounded-lg p-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                      <span className="text-white text-xs font-bold">HD</span>
                    </div>
                    <span className="text-sm font-medium text-gray-700">Alta Resolución</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-white/50 rounded-lg p-3">
                    <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                      <CheckIcon size="sm" className="text-white" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">Sin Dolor</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-white/50 rounded-lg p-3">
                    <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                      <span className="text-white text-xs">📷</span>
                    </div>
                    <span className="text-sm font-medium text-gray-700">Con Registro</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-white/50 rounded-lg p-3">
                    <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center">
                      <span className="text-white text-xs">⚡</span>
                    </div>
                    <span className="text-sm font-medium text-gray-700">Proceso Rápido</span>
                  </div>
                </div>

                {/* Primary Actions */}
                <div className="flex flex-col sm:flex-row gap-4">
                  {CONTACT_INFO.calendarBooking && (
                    <Button
                      variant="primary"
                      size="lg"
                      onClick={() => setIsModalOpen(true)}
                      className="group flex items-center justify-center space-x-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 px-8 py-4 rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
                    >
                      <CalendarIcon size="sm" className="text-white group-hover:scale-110 transition-transform" />
                      <span>Reservar Ahora</span>
                    </Button>
                  )}

                  <Button
                    variant="outline"
                    size="lg"
                    href={getWhatsAppUrl(CONTACT_INFO.whatsapp, appointmentMessage)}
                    external
                    className="flex items-center justify-center space-x-3 border-2 border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50 px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                  >
                    <WhatsAppIcon size="sm" className="text-green-500" />
                    <span>Consultar por WhatsApp</span>
                  </Button>
                </div>

                {/* Quick Info Row */}
                <div className="flex items-center space-x-6 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <ClockIcon size="sm" className="text-blue-500" />
                    <span>{formatDuration(service.duration)}</span>
                  </div>
                  {service.price > 0 && (
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-green-600">{formatCurrency(service.price)}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Desktop Layout */}
              <div className="hidden lg:grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                {/* Left Content Column */}
                <div className="space-y-6">
                  {/* Floating Badge */}
                  <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/60 backdrop-blur-md border border-blue-200/50 shadow-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse" />
                    <span className="text-blue-700 font-medium text-sm">Videotoscopía Profesional</span>
                  </div>

                  {/* Main Title */}
                  <div className="space-y-4">
                    <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                      {formatTitleWithBlueGradient(service.name)}
                      <span className="block text-xl lg:text-2xl font-normal text-gray-600 mt-2">
                        Visualización en alta definición y registro profesional
                      </span>
                    </h1>

                    <p className="text-lg text-gray-700 leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* Key Benefits for Videotoscopia */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2 bg-white/50 rounded-lg p-3">
                      <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                        <span className="text-white text-xs font-bold">HD</span>
                      </div>
                      <span className="text-sm font-medium text-gray-700">Alta Resolución</span>
                    </div>
                    <div className="flex items-center space-x-2 bg-white/50 rounded-lg p-3">
                      <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                        <CheckIcon size="sm" className="text-white" />
                      </div>
                      <span className="text-sm font-medium text-gray-700">Sin Dolor</span>
                    </div>
                    <div className="flex items-center space-x-2 bg-white/50 rounded-lg p-3">
                      <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                        <span className="text-white text-xs">📷</span>
                      </div>
                      <span className="text-sm font-medium text-gray-700">Con Registro</span>
                    </div>
                    <div className="flex items-center space-x-2 bg-white/50 rounded-lg p-3">
                      <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center">
                        <span className="text-white text-xs">⚡</span>
                      </div>
                      <span className="text-sm font-medium text-gray-700">Proceso Rápido</span>
                    </div>
                  </div>

                  {/* Primary Actions */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    {CONTACT_INFO.calendarBooking && (
                      <Button
                        variant="primary"
                        size="lg"
                        onClick={() => setIsModalOpen(true)}
                        className="group flex items-center justify-center space-x-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 px-8 py-4 rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
                      >
                        <CalendarIcon size="sm" className="text-white group-hover:scale-110 transition-transform" />
                        <span>Reservar Ahora</span>
                      </Button>
                    )}

                    <Button
                      variant="outline"
                      size="lg"
                      href={getWhatsAppUrl(CONTACT_INFO.whatsapp, appointmentMessage)}
                      external
                      className="flex items-center justify-center space-x-3 border-2 border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50 px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                    >
                      <WhatsAppIcon size="sm" className="text-green-500" />
                      <span>Consultar por WhatsApp</span>
                    </Button>
                  </div>

                  {/* Quick Info Row */}
                  <div className="flex items-center space-x-6 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <ClockIcon size="sm" className="text-blue-500" />
                      <span>{formatDuration(service.duration)}</span>
                    </div>
                    {service.price > 0 && (
                      <div className="flex items-center space-x-2">
                        <span className="text-green-600 font-bold">$</span>
                        <span className="font-semibold">{formatCurrency(service.price)}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Image Column */}
                <div className="relative">
                  <div className="hero-professional-image relative">
                    <Image
                      src="/images/hero-videotoscopia.jpg"
                      alt="Profesional realizando videotoscopía con equipamiento moderno, mostrando procedimiento en tiempo real con tecnología de alta definición"
                      width={600}
                      height={400}
                      className="w-full h-80 lg:h-96 object-cover object-center rounded-2xl shadow-2xl"
                      priority
                      sizes="(max-width: 1024px) 50vw, 600px"
                    />

                    {/* Professional certification badge */}
                    <div className="absolute top-4 right-4 professional-badge-certified text-white px-3 py-1 rounded-full text-xs font-bold font-secondary">
                      <div className="flex items-center space-x-1">
                        <span className="text-yellow-300">✨</span>
                        <span>Profesional</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : service.id === 'lavado-oidos' ? (
            /* Enhanced Layout for Lavado de Oídos with Professional Image */
            <div className="space-y-8">
              {/* Mobile Layout */}
              <div className="lg:hidden space-y-6">
                {/* Floating Badge */}
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/60 backdrop-blur-md border border-green-200/50 shadow-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
                  <span className="text-green-700 font-medium text-sm">Limpieza Profesional de Oídos</span>
                </div>

                {/* Main Title */}
                <div className="space-y-4">
                  <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                    {formatTitleWithBlueGradient(service.name)}
                    <span className="block text-xl lg:text-2xl font-normal text-gray-600 mt-2">
                      Procedimiento seguro y profesional con tecnología avanzada
                    </span>
                  </h1>

                  <p className="text-lg text-gray-700 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Image */}
                <div className="hero-professional-image relative">
                  <Image
                    src="/images/hero-lavado-oidos.jpg"
                    alt="Profesional realizando lavado de oídos con equipamiento especializado en ambiente clínico profesional"
                    width={600}
                    height={400}
                    className="w-full h-80 object-cover object-center rounded-2xl shadow-2xl"
                    priority
                    sizes="100vw"
                  />

                  {/* Professional certification badge */}
                  <div className="absolute top-4 right-4 professional-badge-certified text-white px-3 py-1 rounded-full text-xs font-bold font-secondary">
                    <div className="flex items-center space-x-1">
                      <span className="text-green-300">✨</span>
                      <span>Profesional</span>
                    </div>
                  </div>
                </div>

                {/* Key Benefits for Lavado de Oídos */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2 bg-white/50 rounded-lg p-3">
                    <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                      <CheckIcon size="sm" className="text-white" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">Sin Dolor</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-white/50 rounded-lg p-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                      <span className="text-white text-xs">🔬</span>
                    </div>
                    <span className="text-sm font-medium text-gray-700">Con Videotoscopía</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-white/50 rounded-lg p-3">
                    <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center">
                      <span className="text-white text-xs">💧</span>
                    </div>
                    <span className="text-sm font-medium text-gray-700">Limpieza Profunda</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-white/50 rounded-lg p-3">
                    <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                      <span className="text-white text-xs">🛡️</span>
                    </div>
                    <span className="text-sm font-medium text-gray-700">100% Seguro</span>
                  </div>
                </div>

                {/* Primary Actions */}
                <div className="flex flex-col sm:flex-row gap-4">
                  {CONTACT_INFO.calendarBooking && (
                    <Button
                      variant="primary"
                      size="lg"
                      onClick={() => setIsModalOpen(true)}
                      className="group flex items-center justify-center space-x-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 px-8 py-4 rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
                    >
                      <CalendarIcon size="sm" className="text-white group-hover:scale-110 transition-transform" />
                      <span>Reservar Ahora</span>
                    </Button>
                  )}

                  <Button
                    variant="outline"
                    size="lg"
                    href={getWhatsAppUrl(CONTACT_INFO.whatsapp, appointmentMessage)}
                    external
                    className="flex items-center justify-center space-x-3 border-2 border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50 px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                  >
                    <WhatsAppIcon size="sm" className="text-green-500" />
                    <span>Consultar por WhatsApp</span>
                  </Button>
                </div>

                {/* Quick Info Row */}
                <div className="flex items-center space-x-6 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <ClockIcon size="sm" className="text-green-500" />
                    <span>{formatDuration(service.duration)}</span>
                  </div>
                  {service.price > 0 && (
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-green-600">{formatCurrency(service.price)}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Desktop Layout */}
              <div className="hidden lg:grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                {/* Left Content Column */}
                <div className="space-y-6">
                  {/* Floating Badge */}
                  <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/60 backdrop-blur-md border border-green-200/50 shadow-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
                    <span className="text-green-700 font-medium text-sm">Limpieza Profesional de Oídos</span>
                  </div>

                  {/* Main Title */}
                  <div className="space-y-4">
                    <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                      {formatTitleWithBlueGradient(service.name)}
                      <span className="block text-xl lg:text-2xl font-normal text-gray-600 mt-2">
                        Procedimiento seguro y profesional con tecnología avanzada
                      </span>
                    </h1>

                    <p className="text-lg text-gray-700 leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* Key Benefits for Lavado de Oídos */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2 bg-white/50 rounded-lg p-3">
                      <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                        <CheckIcon size="sm" className="text-white" />
                      </div>
                      <span className="text-sm font-medium text-gray-700">Sin Dolor</span>
                    </div>
                    <div className="flex items-center space-x-2 bg-white/50 rounded-lg p-3">
                      <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                        <span className="text-white text-xs">🔬</span>
                      </div>
                      <span className="text-sm font-medium text-gray-700">Con Videotoscopía</span>
                    </div>
                    <div className="flex items-center space-x-2 bg-white/50 rounded-lg p-3">
                      <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center">
                        <span className="text-white text-xs">💧</span>
                      </div>
                      <span className="text-sm font-medium text-gray-700">Limpieza Profunda</span>
                    </div>
                    <div className="flex items-center space-x-2 bg-white/50 rounded-lg p-3">
                      <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                        <span className="text-white text-xs">🛡️</span>
                      </div>
                      <span className="text-sm font-medium text-gray-700">100% Seguro</span>
                    </div>
                  </div>

                  {/* Primary Actions */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    {CONTACT_INFO.calendarBooking && (
                      <Button
                        variant="primary"
                        size="lg"
                        onClick={() => setIsModalOpen(true)}
                        className="group flex items-center justify-center space-x-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 px-8 py-4 rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
                      >
                        <CalendarIcon size="sm" className="text-white group-hover:scale-110 transition-transform" />
                        <span>Reservar Ahora</span>
                      </Button>
                    )}

                    <Button
                      variant="outline"
                      size="lg"
                      href={getWhatsAppUrl(CONTACT_INFO.whatsapp, appointmentMessage)}
                      external
                      className="flex items-center justify-center space-x-3 border-2 border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50 px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                    >
                      <WhatsAppIcon size="sm" className="text-green-500" />
                      <span>Consultar por WhatsApp</span>
                    </Button>
                  </div>

                  {/* Quick Info Row */}
                  <div className="flex items-center space-x-6 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <ClockIcon size="sm" className="text-green-500" />
                      <span>{formatDuration(service.duration)}</span>
                    </div>
                    {service.price > 0 && (
                      <div className="flex items-center space-x-2">
                        <span className="text-green-600 font-bold">$</span>
                        <span className="font-semibold">{formatCurrency(service.price)}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Image Column */}
                <div className="relative">
                  <div className="hero-professional-image relative">
                    <Image
                      src="/images/hero-lavado-oidos.jpg"
                      alt="Profesional realizando lavado de oídos con equipamiento especializado en ambiente clínico profesional"
                      width={600}
                      height={400}
                      className="w-full h-80 lg:h-96 object-cover object-center rounded-2xl shadow-2xl"
                      priority
                      sizes="(max-width: 1024px) 50vw, 600px"
                    />

                    {/* Professional certification badge */}
                    <div className="absolute top-4 right-4 professional-badge-certified text-white px-3 py-1 rounded-full text-xs font-bold font-secondary">
                      <div className="flex items-center space-x-1">
                        <span className="text-green-300">✨</span>
                        <span>Profesional</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : service.id === 'audiometria' ? (
            /* Enhanced Layout for Audiometría with Professional Image */
            <div className="space-y-8">
              {/* Mobile Layout */}
              <div className="lg:hidden space-y-6">
                {/* Floating Badge */}
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/60 backdrop-blur-md border border-purple-200/50 shadow-lg">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-2 animate-pulse" />
                  <span className="text-purple-700 font-medium text-sm">Evaluación Auditiva Completa</span>
                </div>

                {/* Main Title */}
                <div className="space-y-4">
                  <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                    {formatTitleWithBlueGradient(service.name)}
                    <span className="block text-xl lg:text-2xl font-normal text-gray-600 mt-2">
                      Diagnóstico preciso con tecnología de última generación
                    </span>
                  </h1>

                  <p className="text-lg text-gray-700 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Image */}
                <div className="hero-professional-image relative">
                  <Image
                    src="/images/hero-audiometria.jpg"
                    alt="Profesional realizando audiometría con equipamiento de diagnóstico auditivo avanzado en ambiente clínico especializado"
                    width={600}
                    height={400}
                    className="w-full h-80 object-cover object-center rounded-2xl shadow-2xl"
                    priority
                    sizes="100vw"
                  />

                  {/* Professional certification badge */}
                  <div className="absolute top-4 right-4 professional-badge-certified text-white px-3 py-1 rounded-full text-xs font-bold font-secondary">
                    <div className="flex items-center space-x-1">
                      <span className="text-purple-300">✨</span>
                      <span>Profesional</span>
                    </div>
                  </div>
                </div>

                {/* Key Benefits for Audiometría */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2 bg-white/50 rounded-lg p-3">
                    <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                      <span className="text-white text-xs">🎧</span>
                    </div>
                    <span className="text-sm font-medium text-gray-700">Evaluación Completa</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-white/50 rounded-lg p-3">
                    <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                      <CheckIcon size="sm" className="text-white" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">Sin Dolor</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-white/50 rounded-lg p-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                      <span className="text-white text-xs">📊</span>
                    </div>
                    <span className="text-sm font-medium text-gray-700">Resultados Precisos</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-white/50 rounded-lg p-3">
                    <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                      <span className="text-white text-xs">⚡</span>
                    </div>
                    <span className="text-sm font-medium text-gray-700">Tecnología Avanzada</span>
                  </div>
                </div>

                {/* Primary Actions */}
                <div className="flex flex-col sm:flex-row gap-4">
                  {CONTACT_INFO.calendarBooking && (
                    <Button
                      variant="primary"
                      size="lg"
                      onClick={() => setIsModalOpen(true)}
                      className="group flex items-center justify-center space-x-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 px-8 py-4 rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
                    >
                      <CalendarIcon size="sm" className="text-white group-hover:scale-110 transition-transform" />
                      <span>Reservar Ahora</span>
                    </Button>
                  )}

                  <Button
                    variant="outline"
                    size="lg"
                    href={getWhatsAppUrl(CONTACT_INFO.whatsapp, appointmentMessage)}
                    external
                    className="flex items-center justify-center space-x-3 border-2 border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50 px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                  >
                    <WhatsAppIcon size="sm" className="text-green-500" />
                    <span>Consultar por WhatsApp</span>
                  </Button>
                </div>

                {/* Quick Info Row */}
                <div className="flex items-center space-x-6 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <ClockIcon size="sm" className="text-purple-500" />
                    <span>{formatDuration(service.duration)}</span>
                  </div>
                  {service.price > 0 && (
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-green-600">{formatCurrency(service.price)}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Desktop Layout */}
              <div className="hidden lg:grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                {/* Left Content Column */}
                <div className="space-y-6">
                  {/* Floating Badge */}
                  <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/60 backdrop-blur-md border border-purple-200/50 shadow-lg">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-2 animate-pulse" />
                    <span className="text-purple-700 font-medium text-sm">Evaluación Auditiva Completa</span>
                  </div>

                  {/* Main Title */}
                  <div className="space-y-4">
                    <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                      {formatTitleWithBlueGradient(service.name)}
                      <span className="block text-xl lg:text-2xl font-normal text-gray-600 mt-2">
                        Diagnóstico preciso con tecnología de última generación
                      </span>
                    </h1>

                    <p className="text-lg text-gray-700 leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* Key Benefits for Audiometría */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2 bg-white/50 rounded-lg p-3">
                      <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                        <span className="text-white text-xs">🎧</span>
                      </div>
                      <span className="text-sm font-medium text-gray-700">Evaluación Completa</span>
                    </div>
                    <div className="flex items-center space-x-2 bg-white/50 rounded-lg p-3">
                      <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                        <CheckIcon size="sm" className="text-white" />
                      </div>
                      <span className="text-sm font-medium text-gray-700">Sin Dolor</span>
                    </div>
                    <div className="flex items-center space-x-2 bg-white/50 rounded-lg p-3">
                      <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                        <span className="text-white text-xs">📊</span>
                      </div>
                      <span className="text-sm font-medium text-gray-700">Resultados Precisos</span>
                    </div>
                    <div className="flex items-center space-x-2 bg-white/50 rounded-lg p-3">
                      <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                        <span className="text-white text-xs">⚡</span>
                      </div>
                      <span className="text-sm font-medium text-gray-700">Tecnología Avanzada</span>
                    </div>
                  </div>

                  {/* Primary Actions */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    {CONTACT_INFO.calendarBooking && (
                      <Button
                        variant="primary"
                        size="lg"
                        onClick={() => setIsModalOpen(true)}
                        className="group flex items-center justify-center space-x-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 px-8 py-4 rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
                      >
                        <CalendarIcon size="sm" className="text-white group-hover:scale-110 transition-transform" />
                        <span>Reservar Ahora</span>
                      </Button>
                    )}

                    <Button
                      variant="outline"
                      size="lg"
                      href={getWhatsAppUrl(CONTACT_INFO.whatsapp, appointmentMessage)}
                      external
                      className="flex items-center justify-center space-x-3 border-2 border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50 px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                    >
                      <WhatsAppIcon size="sm" className="text-green-500" />
                      <span>Consultar por WhatsApp</span>
                    </Button>
                  </div>

                  {/* Quick Info Row */}
                  <div className="flex items-center space-x-6 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <ClockIcon size="sm" className="text-purple-500" />
                      <span>{formatDuration(service.duration)}</span>
                    </div>
                    {service.price > 0 && (
                      <div className="flex items-center space-x-2">
                        <span className="text-green-600 font-bold">$</span>
                        <span className="font-semibold">{formatCurrency(service.price)}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Image Column */}
                <div className="relative">
                  <div className="hero-professional-image relative">
                    <Image
                      src="/images/hero-audiometria.jpg"
                      alt="Profesional realizando audiometría con equipamiento de diagnóstico auditivo avanzado en ambiente clínico especializado"
                      width={600}
                      height={400}
                      className="w-full h-80 lg:h-96 object-cover object-center rounded-2xl shadow-2xl"
                      priority
                      sizes="(max-width: 1024px) 50vw, 600px"
                    />

                    {/* Professional certification badge */}
                    <div className="absolute top-4 right-4 professional-badge-certified text-white px-3 py-1 rounded-full text-xs font-bold font-secondary">
                      <div className="flex items-center space-x-1">
                        <span className="text-purple-300">✨</span>
                        <span>Profesional</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Default Layout for Other Services */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

              {/* Left Content - 8/12 columns */}
              <div className="lg:col-span-8 space-y-6">
                {/* Floating Badge */}
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/60 backdrop-blur-md border border-blue-200/50 shadow-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse" />
                  <span className="text-blue-700 font-medium text-sm">Servicios Especializados de Audiología</span>
                </div>

                {/* Main Title */}
                <div className="space-y-4">
                  <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                    {formatTitleWithBlueGradient(service.name)}
                    <span className="block text-xl lg:text-2xl font-normal text-gray-600 mt-6">
                      Tecnología moderna y atención profesional personalizada
                    </span>
                  </h1>

                  <p className="text-lg text-gray-700 leading-relaxed max-w-2xl">
                    {service.description}
                  </p>
                </div>

                {/* Primary Actions */}
                <div className="flex flex-col sm:flex-row gap-4">
                  {CONTACT_INFO.calendarBooking && (
                    <Button
                      variant="primary"
                      size="lg"
                      onClick={() => setIsModalOpen(true)}
                      className="group flex items-center justify-center space-x-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 px-8 py-4 rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
                    >
                      <CalendarIcon size="sm" className="text-white group-hover:scale-110 transition-transform" />
                      <span>Reservar Ahora</span>
                    </Button>
                  )}

                  <Button
                    variant="outline"
                    size="lg"
                    href={getWhatsAppUrl(CONTACT_INFO.whatsapp, appointmentMessage)}
                    external
                    className="flex items-center justify-center space-x-3 border-2 border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50 px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                  >
                    <WhatsAppIcon size="sm" className="text-green-500" />
                    <span>Consultar por WhatsApp</span>
                  </Button>
                </div>
              </div>

              {/* Right Content - 4/12 columns */}
              <div className="lg:col-span-4 relative">
                {/* Compact Info Cards */}
                <div className="space-y-4">
                  {/* Quick Stats */}
                  <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 border border-white/50 shadow-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                        <ClockIcon size="sm" className="text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Duración</p>
                        <p className="font-bold text-gray-900">{formatDuration(service.duration)}</p>
                      </div>
                    </div>
                  </div>

                  {service.price > 0 && (
                    <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 border border-white/50 shadow-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                          <span className="text-white font-bold text-lg">$</span>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Precio</p>
                          <p className="font-bold text-gray-900">{formatCurrency(service.price)}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Benefits Grid */}
                  <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 border border-white/50 shadow-lg">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Beneficios</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="text-center">
                        <div className="w-10 h-10 bg-green-500 rounded-lg mx-auto mb-2 flex items-center justify-center">
                          <CheckIcon size="sm" className="text-white" />
                        </div>
                        <p className="text-xs font-medium text-gray-800">Sin Dolor</p>
                      </div>

                      <div className="text-center">
                        <div className="w-10 h-10 bg-blue-500 rounded-lg mx-auto mb-2 flex items-center justify-center">
                          <span className="text-white text-xs font-bold">HD</span>
                        </div>
                        <p className="text-xs font-medium text-gray-800">Alta Resolución</p>
                      </div>

                      <div className="text-center">
                        <div className="w-10 h-10 bg-purple-500 rounded-lg mx-auto mb-2 flex items-center justify-center">
                          <span className="text-white text-xs">⚡</span>
                        </div>
                        <p className="text-xs font-medium text-gray-800">Rápido</p>
                      </div>

                      <div className="text-center">
                        <div className="w-10 h-10 bg-cyan-500 rounded-lg mx-auto mb-2 flex items-center justify-center">
                          <span className="text-white text-xs">📷</span>
                        </div>
                        <p className="text-xs font-medium text-gray-800">Con Registro</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Service Details */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-10 right-10 w-64 h-64 bg-gradient-to-br from-cyan-400 to-blue-400 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-gray-900">
              {formatSectionTitleTwoWords('Todo lo que Necesitas Saber')}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Información detallada presentada de forma clara y organizada
            </p>
          </div>

          {/* Bento Grid Layout - Optimized Space Usage */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">

            {/* Main Features Card - Takes 7 columns */}
            <div className="lg:col-span-7">
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 h-full hover:shadow-2xl transition-all duration-500 group">
                <div className="flex items-center mb-6">
                  <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl mr-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <CheckIcon size="sm" className="text-white" />
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-bold">
                    <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                      ¿Qué Incluye?
                    </span>
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  {/* DEBUG: Check features length */}
                  {console.log('Service features:', service.features)}
                  {service.features.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3 group/item">
                      <div className="p-1.5 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full mt-1 flex-shrink-0 group-hover/item:scale-110 transition-transform duration-200">
                        <CheckIcon size="sm" className="text-white" />
                      </div>
                      <span className="text-gray-700 leading-relaxed text-sm lg:text-base">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Price and Booking Section */}
                {service.price > 0 && (
                  <div className="border-t border-gray-200 pt-6">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                      {/* Price Display */}
                      <div className="text-center sm:text-left">
                        <div className="text-2xl lg:text-3xl font-bold mb-1">
                          <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                            {formatCurrency(service.price)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">Precio del servicio</p>

                        {/* Special Note for Videotoscopia */}
                        {service.id === 'videotoscopia' && (
                          <div className="mt-2">
                            <p className="text-xs text-blue-700 font-medium bg-blue-50 px-3 py-1 rounded-full inline-block">
                              ✨ Incluido sin costo si se realiza lavado de oídos
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Booking Button */}
                      {CONTACT_INFO.calendarBooking && (
                        <Button
                          variant="primary"
                          size="lg"
                          onClick={() => setIsModalOpen(true)}
                          className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                        >
                          <CalendarIcon size="sm" className="text-white mr-2" />
                          <span className="font-semibold">Reservar Ahora</span>
                        </Button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Side Cards Container - Takes 5 columns */}
            <div className="lg:col-span-5 space-y-6">

              {/* Preparation Card */}
              {service.preparation && service.preparation.length > 0 && (
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-500 group">
                  <div className="flex items-center mb-4">
                    <div className="p-2.5 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-xl mr-3 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <ClockIcon size="sm" className="text-white" />
                    </div>
                    <h3 className="text-xl font-bold">
                      <span className="bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent">
                        Preparación
                      </span>
                    </h3>
                  </div>
                  <ul className="space-y-3">
                    {service.preparation.map((item, index) => (
                      <li key={index} className="flex items-start space-x-3 group/item">
                        <div className={`w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0 group-hover/item:scale-125 transition-transform duration-200 ${
                          item.includes('Requisito Obligatorio')
                            ? 'bg-gradient-to-r from-red-400 to-red-500'
                            : 'bg-gradient-to-r from-cyan-400 to-teal-400'
                        }`} />
                        <span className={`leading-relaxed text-sm ${
                          item.includes('Requisito Obligatorio')
                            ? 'text-red-700 font-semibold'
                            : 'text-gray-700'
                        }`}>
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Aftercare Card */}
              {service.aftercare && service.aftercare.length > 0 && (
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-500 group">
                  <div className="flex items-center mb-4">
                    <div className="p-2.5 bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl mr-3 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <span className="text-white font-bold text-lg">♥</span>
                    </div>
                    <h3 className="text-xl font-bold">
                      <span className="bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                        Cuidados
                      </span>
                    </h3>
                  </div>
                  <ul className="space-y-3">
                    {service.aftercare.map((item, index) => (
                      <li key={index} className="flex items-start space-x-3 group/item">
                        <div className="w-2.5 h-2.5 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full mt-1.5 flex-shrink-0 group-hover/item:scale-125 transition-transform duration-200" />
                        <span className="text-gray-700 leading-relaxed text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

            </div>
          </div>
        </div>
      </section>

      {/* Process Timeline - Horizontal Visual Flow */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-slate-50 via-blue-50/50 to-purple-50/50 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-1/4 left-0 w-80 h-80 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-gradient-to-tl from-purple-500 to-pink-500 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 border border-purple-200 mb-6">
              <span className="text-purple-700 font-medium text-sm">Proceso Paso a Paso</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-gray-900">
              {formatSectionTitleTwoWords('Cómo Funciona Nuestro Proceso')}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Una experiencia cuidadosamente diseñada para tu comodidad y seguridad
            </p>
          </div>

          {/* Horizontal Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 rounded-full transform -translate-y-1/2 hidden lg:block" />

            {/* Timeline Steps */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">

              {/* Step 1: Recepción */}
              <div className="relative group">
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full">
                  {/* Step Number */}
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg group-hover:scale-110 transition-transform duration-300">
                      1
                    </div>
                  </div>

                  <div className="text-center pt-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-2xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg"></div>
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-gray-800">Bienvenida</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Te recibimos en nuestras instalaciones y revisamos tu información médica
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 2: Evaluación */}
              <div className="relative group">
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full">
                  {/* Step Number */}
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg group-hover:scale-110 transition-transform duration-300">
                      2
                    </div>
                  </div>

                  <div className="text-center pt-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-cyan-100 to-teal-100 rounded-2xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-lg"></div>
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-gray-800">Evaluación</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Examen inicial para determinar el mejor abordaje para tu caso específico
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 3: Procedimiento */}
              <div className="relative group">
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full">
                  {/* Step Number */}
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg group-hover:scale-110 transition-transform duration-300">
                      3
                    </div>
                  </div>

                  <div className="text-center pt-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg"></div>
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-gray-800">Procedimiento</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Realizamos el {service.name.toLowerCase()} con equipos modernos y técnicas seguras
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 4: Seguimiento */}
              <div className="relative group">
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full">
                  {/* Step Number */}
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg group-hover:scale-110 transition-transform duration-300">
                      4
                    </div>
                  </div>

                  <div className="text-center pt-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-pink-100 to-rose-100 rounded-2xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg"></div>
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-gray-800">Seguimiento</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Explicamos resultados y proporcionamos recomendaciones para el cuidado futuro
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* Bottom CTA */}
            <div className="text-center mt-16">
              <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <span className="mr-2">✨</span>
                <span>Experiencia Profesional Garantizada</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section - Minimalist Accordion Design */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-3 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-tl from-cyan-200 to-pink-200 rounded-full blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto relative z-10">

          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gray-100 border border-gray-200 mb-6">
              <span className="text-gray-700 font-medium text-sm">💭 Respuestas Rápidas</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-gray-900">
              {formatSectionTitle('Preguntas Frecuentes')}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Encuentra respuestas inmediatas a las consultas más comunes
            </p>
          </div>

          {/* Minimalist Accordion */}
          <div className="space-y-2">
            {[
              {
                question: "¿Es doloroso el procedimiento?",
                answer: "No, todos nuestros procedimientos son completamente indoloros. Utilizamos técnicas profesionales y equipamiento especializado para garantizar tu comodidad durante todo el proceso.",
                icon: "🩺"
              },
              {
                question: "¿Cuánto tiempo dura la cita?",
                answer: `El ${service.name.toLowerCase()} toma aproximadamente ${formatDuration(service.duration)}, incluyendo tiempo para explicar los resultados y responder tus preguntas.`,
                icon: "⏰"
              },
              {
                question: "¿Puedo retomar mis actividades normales?",
                answer: "Sí, generalmente puedes retomar tus actividades normales inmediatamente después del procedimiento. Te proporcionaremos recomendaciones específicas según tu caso particular.",
                icon: "✅"
              },
              {
                question: "¿Cómo puedo agendar mi cita?",
                answer: "Puedes agendar tu cita de forma fácil usando nuestro calendario online, por WhatsApp, o llamando directamente. Todos nuestros canales están disponibles para tu conveniencia.",
                icon: "📅"
              },
              ...(service.id === 'audiometria' ? [{
                question: "¿Qué pasa si agendo una audiometría y me encuentran un tapón de cerumen?",
                answer: "Previo a realizar una audiometría siempre se evalúa el conducto auditivo a través de una videotoscopía. En caso de encontrar un tapón, nuestro centro ofrece el servicio de lavado de oídos, el cual se puede realizar de inmediato.",
                icon: "🔍"
              }] : [])
            ].map((faq, index) => (
              <div key={index} className="group">
                <button
                  onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                  className="w-full text-left bg-gray-50 hover:bg-gray-100 border border-gray-200 hover:border-gray-300 rounded-2xl p-6 flex items-center justify-between transition-all duration-300 hover:shadow-lg group-hover:scale-[1.01]"
                >
                  <div className="flex items-center space-x-4">
                    <div className="text-2xl">{faq.icon}</div>
                    <span className="font-semibold text-gray-900 text-lg">{faq.question}</span>
                  </div>

                  {/* Modern Toggle Indicator */}
                  <div className="flex-shrink-0">
                    <div className={`w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center transition-all duration-300 ${
                      openFAQ === index
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 rotate-180'
                        : 'group-hover:bg-gray-400'
                    }`}>
                      <svg
                        className={`w-4 h-4 transition-colors duration-300 ${
                          openFAQ === index ? 'text-white' : 'text-gray-600'
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </button>

                {/* Accordion Content */}
                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openFAQ === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <div className="px-6 pb-6 pt-2">
                    <div className="bg-white rounded-xl p-6 border-l-4 border-gradient-to-b from-blue-400 to-purple-400 shadow-sm">
                      <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-8">
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-full">
              <span className="text-blue-700 font-medium text-sm mr-2">¿Tienes más preguntas?</span>
              <span className="text-blue-600 text-sm">Contáctanos directamente</span>
            </div>
          </div>

        </div>
      </section>

      {/* Call to Action */}
      <section className="pt-1 pb-8 lg:pt-2 lg:pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <CTASection />
        </div>
      </section>

    {/* Floating Booking Hub - Sticky with Micro-animations */}
    <div className="fixed bottom-6 right-6 z-50 group">
      {/* Main Booking Button */}
      <div className="relative">
        {/* Pulse Animation Ring */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-ping opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse opacity-30 animation-delay-150"></div>

        {/* Main Button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 group-hover:rotate-6"
          aria-label="Abrir calendario de reservas"
        >
          {/* Calendar Icon with Micro-animation */}
          <div className="w-8 h-8 relative">
            <CalendarIcon size="sm" className="text-white transform group-hover:scale-110 transition-transform duration-300" />
            {/* Notification Dot */}
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full animate-bounce"></div>
          </div>
        </button>

        {/* Floating Label */}
        <div className="absolute right-full mr-4 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
          <div className="bg-white/95 backdrop-blur-sm rounded-xl px-4 py-2 shadow-xl border border-white/20 whitespace-nowrap">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-gray-800">¡Reserva tu cita!</span>
            </div>
            {/* Arrow pointing to button */}
            <div className="absolute right-0 top-1/2 transform translate-x-1 -translate-y-1/2 w-0 h-0 border-l-4 border-l-white/95 border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
          </div>
        </div>
      </div>

      {/* Quick Action Bubbles - Appear on Hover */}
      <div className="absolute bottom-full mb-4 right-0 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 ease-out space-y-3">

        {/* WhatsApp Bubble */}
        <div className="relative group/bubble">
          <a
            href={getWhatsAppUrl(CONTACT_INFO.whatsapp, appointmentMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 group-hover/bubble:rotate-12"
            aria-label="Contactar por WhatsApp"
          >
            <WhatsAppIcon size="sm" className="text-white" />
          </a>

          {/* WhatsApp Label */}
          <div className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 opacity-0 group-hover/bubble:opacity-100 transition-all duration-300 pointer-events-none">
            <div className="bg-green-50 backdrop-blur-sm rounded-lg px-3 py-1 shadow-lg border border-green-100 whitespace-nowrap">
              <span className="text-xs font-medium text-green-700">WhatsApp</span>
              <div className="absolute right-0 top-1/2 transform translate-x-1 -translate-y-1/2 w-0 h-0 border-l-3 border-l-green-50 border-t-3 border-t-transparent border-b-3 border-b-transparent"></div>
            </div>
          </div>
        </div>

        {/* Phone Bubble */}
        <div className="relative group/bubble">
          <a
            href={`tel:${CONTACT_INFO.phone}`}
            className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 group-hover/bubble:rotate-12"
            aria-label="Llamar por teléfono"
          >
            <span className="text-white font-bold text-lg">📞</span>
          </a>

          {/* Phone Label */}
          <div className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 opacity-0 group-hover/bubble:opacity-100 transition-all duration-300 pointer-events-none">
            <div className="bg-blue-50 backdrop-blur-sm rounded-lg px-3 py-1 shadow-lg border border-blue-100 whitespace-nowrap">
              <span className="text-xs font-medium text-blue-700">Llamar</span>
              <div className="absolute right-0 top-1/2 transform translate-x-1 -translate-y-1/2 w-0 h-0 border-l-3 border-l-blue-50 border-t-3 border-t-transparent border-b-3 border-b-transparent"></div>
            </div>
          </div>
        </div>

      </div>
    </div>

      </main>

    {/* Calendar Booking Modal */}
    {CONTACT_INFO.calendarBooking && (
      <CalendarBookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        calendarUrl={CONTACT_INFO.calendarBooking}
        serviceName={service.name}
      />
    )}
    </>
  );
}