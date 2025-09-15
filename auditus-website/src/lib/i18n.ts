import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  es: {
    testimonials: {
      title: "Lo que dicen nuestros Pacientes",
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