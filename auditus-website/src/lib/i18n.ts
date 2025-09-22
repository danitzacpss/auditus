import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  es: {
    testimonials: {
      title: "Lo que dicen nuestros <span class='text-primary-blue relative inline-block'>Pacientes<svg class='absolute -bottom-2 left-0 w-full h-3 text-blue-200' viewBox='0 0 100 12' preserveAspectRatio='none' fill='currentColor'><path d='M0,8 Q50,0 100,8 L100,12 L0,12 Z' /></svg></span>",
      subtitle: "La confianza de nuestros pacientes es nuestro mayor orgullo. Conoce las experiencias de quienes han confiado en {{centerName}} para su cuidado auditivo.",
      centerName: "Centro Auditus",
      verifiedTestimonials: "Testimonios Verificados",
      verified: "Verificado",
      rating: "{{rating}}.0",
      googleReviews: {
        from: "Desde Google Reviews",
        verifiedByGoogle: "Verificado por Google",
        originallyIn: "Originalmente en {{language}}",
        showOriginal: "Ver original",
        showTranslation: "Ver traducción"
      },
      loadingStates: {
        loading: "Cargando reseñas...",
        error: "Error al cargar reseñas",
        retry: "Reintentar",
        noReviews: "No se encontraron reseñas"
      },
      trustMetrics: {
        title: "Centro Auditus: Tu Mejor Elección",
        subtitle: "Nos enorgullece la confianza que nuestros pacientes depositan en nosotros.",
        description: "Cada testimonio refleja nuestro compromiso con la {{excellence}}.",
        excellence: "excelencia profesional",
        trustAndSatisfaction: "Confianza y Satisfacción",
        averageRating: "Calificación Promedio",
        patientSatisfaction: "Satisfacción del Paciente",
        yearsOfExperience: "Años de Experiencia",
        certifiedProfessional: "Profesional Certificada",
        ourCommitment: "Nuestro Compromiso",
        commitments: {
          personalizedCare: "Atención personalizada y profesional",
          modernTechnology: "Tecnología moderna y segura",
          painFreeProcedures: "Procedimientos sin dolor",
          followUp: "Seguimiento post-procedimiento"
        }
      },
      cta: {
        question: "¿Quieres ser parte de nuestros testimonios de éxito?",
        joinSatisfied: "Únete a nuestros pacientes satisfechos"
      },
      reviewsModal: {
        viewAllReviews: "Ver todas las reseñas",
        title: "Todas las Reseñas de Google"
      },
      googleRedirect: {
        button: "Ver todas las reseñas en Google",
        moreReviews: "Ver más reseñas"
      },
      modal: {
        title: "Todas las Reseñas",
        reviewsCount: "{{count}} reseña{{count === 1 ? '' : 's'}} en total",
        closeModal: "Cerrar modal de reseñas",
        searchPlaceholder: "Buscar por nombre, contenido o servicio...",
        searchLabel: "Buscar reseñas",
        searchDescription: "Busca por nombre del paciente, contenido de la reseña o servicio mencionado",
        searchTips: "Puedes buscar por nombre, contenido o tipo de servicio",
        clearSearch: "Limpiar búsqueda",
        filterByRating: "Filtrar por calificación",
        showAll: "Ver todos",
        allRatings: "Todas las calificaciones",
        showAllReviews: "Ver todas las {{count}} reseñas",
        showingFiltered: "Mostrando {{count}} de {{total}} reseñas",
        showingAll: "Mostrando {{count}} reseñas",
        showingRatingFilter: "Mostrando reseñas con {{rating}} estrellas ({{count}})",
        noReviewsForRating: "No hay reseñas con {{rating}} estrellas",
        clearFilters: "Limpiar filtros",
        noResultsFound: "No se encontraron reseñas que coincidan con tu búsqueda",
        noReviewsAvailable: "No hay reseñas disponibles en este momento",
        showingReviews: "Mostrando {{count}} reseñas",
        viewReviewDetail: "Ver detalles de la reseña de {{name}}",
        loading: "Cargando reseñas...",
        errorTitle: "Error al cargar las reseñas",
        retryButton: "Intentar de nuevo",
        errorHelpText: "Si el problema persiste, intenta recargar la página",
        emptyStateTitle: "No hay reseñas",
        emptyStateMessage: "No se encontraron reseñas que coincidan con tus criterios de búsqueda",
        emptyStateTips: {
          searchTips: "Intenta usar términos de búsqueda más generales",
          filterTips: "O ajusta los filtros de calificación para ver más resultados"
        },
        paginationInfo: "Mostrando {{start}} a {{end}} de {{total}} reseñas",
        previousPage: "Página anterior",
        nextPage: "Página siguiente",
        goToPage: "Ir a la página {{page}}",
        goToFirstPage: "Ir a la primera página",
        goToLastPage: "Ir a la última página",
        searchReviews: "Buscar reseñas...",
        loadingStates: {
          loading: "Cargando reseñas...",
          loadingText: "Cargando",
          error: "Error al cargar las reseñas",
          retry: "Intentar de nuevo",
          noReviews: "No hay reseñas disponibles"
        }
      }
    },
    translation: {
    quickDiagnosis: {
      title: "Diagnóstico Rápido de <span class='text-primary-blue relative inline-block'>Orientación<svg class='absolute -bottom-2 left-0 w-full h-3 text-blue-200' viewBox='0 0 100 12' preserveAspectRatio='none' fill='currentColor'><path d='M0,8 Q50,0 100,8 L100,12 L0,12 Z' /></svg></span>",
      subtitle: "Herramienta de orientación para entender qué tipo de consulta podrías necesitar según tus síntomas",
      disclaimer: {
        title: "Importante",
        text: "La información es orientativa y no sustituye evaluación profesional. Ante dolor intenso, fiebre o supuración, acuda a un médico.",
        icon: "⚠️"
      },
      form: {
        title: "Selecciona los síntomas que presentas",
        subtitle: "Puedes seleccionar múltiples opciones que mejor describan tu situación actual",
        submitButton: "Generar Orientación",
        resetButton: "Reiniciar",
        backButton: "Volver"
      },
      symptoms: {
        title: "Síntomas",
        itching: "Picazón en el oído",
        discharge: "Supuración (secreción)",
        pain: "Dolor de oído",
        blocked: "Sensación de oído tapado",
        tinnitus: "Zumbidos (tinnitus)",
        suddenLoss: "Pérdida súbita de audición",
        noiseExposure: "Exposición reciente a ruido intenso",
        others: "Otros síntomas"
      },
      additionalInfo: {
        title: "Información Adicional (Opcional)",
        placeholder: "Describe brevemente otros síntomas o detalles relevantes...",
        label: "Síntomas adicionales o comentarios"
      },
      results: {
        title: "Orientación Basada en Tus Síntomas",
        subtitle: "Recomendación profesional para tu caso específico",
        loading: "Analizando síntomas...",
        medical: {
          urgent: {
            primary: "Se recomienda consulta médica urgente con otorrinolaringólogo debido a la presencia de síntomas que podrían indicar una infección u otra condición que requiere atención médica inmediata.",
            secondary1: "El dolor intenso y/o la supuración pueden ser signos de infección que requieren tratamiento médico.",
            secondary2: "No demores la consulta médica. Es importante recibir atención profesional lo antes posible."
          },
          suddenLoss: {
            primary: "La pérdida súbita de audición requiere evaluación médica urgente. Se recomienda consultar con un otorrinolaringólogo de inmediato.",
            secondary1: "La atención temprana es crucial en casos de pérdida auditiva súbita para mejores resultados del tratamiento."
          }
        },
        videotoscopy: {
          itching: {
            primary: "La picazón sin otros síntomas graves sugiere realizar una Videotoscopía para evaluar el estado del canal auditivo y determinar la causa.",
            secondary1: "Este procedimiento permitirá visualizar si hay acumulación de cerumen, irritación o alguna otra condición."
          },
          blocked: {
            primary: "La sensación de oído tapado puede indicar acumulación de cerumen. Se recomienda Videotoscopía inicial para evaluación.",
            secondary1: "Si se confirma cerumen impactado, podrá procederse con un Lavado de Oídos profesional.",
            secondary2: "El procedimiento es seguro y puede resolver la sensación de bloqueo inmediatamente."
          },
          general: {
            primary: "Se recomienda una Videotoscopía como evaluación inicial para determinar la causa de los síntomas.",
            secondary1: "Este examen visual permitirá identificar el problema y recomendar el tratamiento más apropiado.",
            secondary2: "Es el primer paso recomendado para la mayoría de problemas auditivos."
          }
        },
        audiometry: {
          noise: {
            primary: "La exposición a ruido intenso junto con zumbidos sugiere realizar una Audiometría para evaluar posible daño auditivo.",
            secondary1: "Es importante evaluar si ha habido afectación de la capacidad auditiva.",
            secondary2: "La detección temprana permite tomar medidas preventivas adecuadas."
          },
          tinnitus: {
            primary: "Los zumbidos persistentes requieren evaluación auditiva completa mediante Audiometría.",
            secondary1: "Este examen determinará si existe alguna pérdida auditiva asociada a los zumbidos."
          }
        },
        severity: {
          low: "Baja prioridad",
          moderate: "Prioridad moderada",
          high: "Alta prioridad",
          urgent: "Atención urgente"
        },
        estimatedPrice: "Precio estimado: ${{price}}",
        priceOnConsult: "Precio por consultar"
      },
      actions: {
        scheduleVideotoscopy: "Agendar Videotoscopía",
        scheduleAudiometry: "Agendar Audiometría",
        consultWhatsApp: "Consultar por WhatsApp",
        seeDoctor: "Consultar Médico",
        urgentMedical: "Atención Médica Urgente",
        newDiagnosis: "Nueva Consulta",
        backToForm: "Volver al Formulario"
      },
      validation: {
        noSymptoms: "Debes seleccionar al menos un síntoma para continuar.",
        genericError: "Ha ocurrido un error. Por favor, inténtalo nuevamente."
      },
      steps: {
        symptoms: "Síntomas",
        details: "Detalles",
        results: "Resultados"
      }
    },
    common: {
      loading: "Cargando...",
      error: "Error",
      retry: "Reintentar",
      close: "Cerrar",
      cancel: "Cancelar",
      confirm: "Confirmar",
      save: "Guardar",
      edit: "Editar",
      delete: "Eliminar",
      view: "Ver",
      hide: "Ocultar"
    },
    results: {
      medical: {
        urgent: {
          primary: "Se recomienda consulta médica urgente con otorrinolaringólogo debido a la presencia de síntomas que podrían indicar una infección u otra condición que requiere atención médica inmediata.",
          secondary1: "El dolor intenso y/o la supuración pueden ser signos de infección que requieren tratamiento médico.",
          secondary2: "No demores la consulta médica. Es importante recibir atención profesional lo antes posible."
        },
        suddenLoss: {
          primary: "La pérdida súbita de audición requiere evaluación médica urgente. Se recomienda consultar con un otorrinolaringólogo de inmediato.",
          secondary1: "La atención temprana es crucial en casos de pérdida auditiva súbita para mejores resultados del tratamiento."
        }
      },
      videotoscopy: {
        itching: {
          primary: "La picazón sin otros síntomas graves sugiere realizar una Videotoscopía para evaluar el estado del canal auditivo y determinar la causa.",
          secondary1: "Este procedimiento permitirá visualizar si hay acumulación de cerumen, irritación o alguna otra condición."
        },
        blocked: {
          primary: "La sensación de oído tapado puede indicar acumulación de cerumen. Se recomienda Videotoscopía inicial para evaluación.",
          secondary1: "Si se confirma cerumen impactado, podrá procederse con un Lavado de Oídos profesional.",
          secondary2: "El procedimiento es seguro y puede resolver la sensación de bloqueo inmediatamente."
        },
        general: {
          primary: "Se recomienda una Videotoscopía como evaluación inicial para determinar la causa de los síntomas.",
          secondary1: "Este examen visual permitirá identificar el problema y recomendar el tratamiento más apropiado.",
          secondary2: "Es el primer paso recomendado para la mayoría de problemas auditivos."
        }
      },
      audiometry: {
        noise: {
          primary: "La exposición a ruido intenso junto con zumbidos sugiere realizar una Audiometría para evaluar posible daño auditivo.",
          secondary1: "Es importante evaluar si ha habido afectación de la capacidad auditiva.",
          secondary2: "La detección temprana permite tomar medidas preventivas adecuadas."
        },
        tinnitus: {
          primary: "Los zumbidos persistentes requieren evaluación auditiva completa mediante Audiometría.",
          secondary1: "Este examen determinará si existe alguna pérdida auditiva asociada a los zumbidos."
        }
      }
    },
    actions: {
      scheduleVideotoscopy: "Agendar Videotoscopía",
      scheduleAudiometry: "Agendar Audiometría",
      consultWhatsApp: "Consultar por WhatsApp",
      seeDoctor: "Consultar Médico",
      urgentMedical: "Atención Médica Urgente",
      newDiagnosis: "Nueva Consulta",
      backToForm: "Volver al Formulario"
    }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: 'es',
    fallbackLng: 'es',
    debug: process.env.NODE_ENV === 'development',

    interpolation: {
      escapeValue: false,
    },

    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },

    react: {
      useSuspense: false,
    },
  });

export default i18n;