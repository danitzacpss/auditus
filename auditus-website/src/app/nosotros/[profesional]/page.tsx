import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PROFESSIONALS, CONTACT_INFO } from "@/data/constants";
import {
  CheckIcon,
  StarIcon,
  ArrowRightIcon,
  PhoneIcon,
  CalendarIcon,
} from "@/components/ui/Icon";
import ProfessionalPageClient from "./ProfessionalPageClient";

interface ProfessionalPageProps {
  params: Promise<{ profesional: string }>;
}

export default async function ProfessionalPage({
  params,
}: ProfessionalPageProps) {
  const { profesional } = await params;
  const professional = PROFESSIONALS.find((p) => p.slug === profesional);

  if (!professional) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header con navegación */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link
              href="/"
              className="text-gray-500 hover:text-primary-blue transition-colors"
            >
              Inicio
            </Link>
            <span className="text-gray-300">/</span>
            <Link
              href="/nosotros"
              className="text-gray-500 hover:text-primary-blue transition-colors"
            >
              Nosotros
            </Link>
            <span className="text-gray-300">/</span>
            <span className="text-gray-900 font-medium">
              {professional.name}
            </span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-2">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          <ProfessionalPageClient professional={professional} />

          {/* Contenido principal */}
          <div className="lg:col-span-8">
            <div className="space-y-12">
              {/* Biografía */}
              <section>
                <div className="professional-badge inline-flex items-center gap-2 text-sm font-medium font-secondary mb-6">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  <span>Conoce a tu Fonoaudióloga</span>
                </div>

                <h2 className="text-3xl font-bold text-gray-900 mb-6 font-primary">
                  Profesional especializada en audiología
                </h2>

                <p className="text-lg text-gray-600 font-secondary leading-relaxed mb-8">
                  {professional.bio}
                </p>

                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-100">
                  <p className="text-primary-blue font-medium font-secondary">
                    <strong>Experiencia:</strong> {professional.experience}
                  </p>
                </div>
              </section>

              {/* Formación Académica */}
              <section>
                <h3 className="text-2xl font-bold text-gray-900 mb-6 font-primary">
                  Formación Académica
                </h3>

                <div className="space-y-4">
                  {professional.education.map((edu, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
                    >
                      <div className="flex items-start space-x-4">
                        <div className="w-3 h-3 bg-primary-blue rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-gray-700 font-secondary leading-relaxed">
                          {edu}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Credenciales */}
              <section>
                <h3 className="text-2xl font-bold text-gray-900 mb-6 font-primary">
                  Credenciales Profesionales
                </h3>

                <div className="grid md:grid-cols-2 gap-4">
                  {professional.credentials.map((credential, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100"
                    >
                      <div className="flex items-start space-x-3">
                        <CheckIcon
                          size="sm"
                          className="text-green-600 mt-1 flex-shrink-0"
                        />
                        <p className="text-gray-700 font-secondary leading-relaxed font-medium">
                          {credential}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Especialidades */}
              <section>
                <h3 className="text-2xl font-bold text-gray-900 mb-6 font-primary">
                  Especialidades
                </h3>

                <div className="grid md:grid-cols-2 gap-4">
                  {professional.specializations.map((spec, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-secondary-turquoise rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-gray-700 font-secondary leading-relaxed">
                          {spec}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
