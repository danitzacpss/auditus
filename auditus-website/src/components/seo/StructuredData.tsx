import Script from 'next/script';
import { SITE_CONFIG, CONTACT_INFO, PROFESSIONAL_INFO, SERVICES } from '@/data/constants';

interface StructuredDataProps {
  type?: 'organization' | 'service' | 'article' | 'faq';
  serviceId?: string;
}

export default function StructuredData({ type = 'organization', serviceId }: StructuredDataProps) {
  // Base organization schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalOrganization",
    "name": SITE_CONFIG.name,
    "alternateName": "Centro Auditus Concepción",
    "description": SITE_CONFIG.description,
    "url": SITE_CONFIG.url,
    "logo": `${SITE_CONFIG.url}/logo.png`,
    "image": `${SITE_CONFIG.url}/images/centro-exterior.jpg`,
    "telephone": CONTACT_INFO.phone,
    "email": CONTACT_INFO.email,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": CONTACT_INFO.address.street,
      "addressLocality": CONTACT_INFO.address.city,
      "addressRegion": CONTACT_INFO.address.region,
      "postalCode": CONTACT_INFO.address.postalCode,
      "addressCountry": "CL"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -36.8270,
      "longitude": -73.0444
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "18:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "09:00",
        "closes": "13:00"
      }
    ],
    "areaServed": {
      "@type": "City",
      "name": "Concepción",
      "containedInPlace": {
        "@type": "State",
        "name": "Región del Biobío"
      }
    },
    "founder": {
      "@type": "Person",
      "name": PROFESSIONAL_INFO.name,
      "jobTitle": PROFESSIONAL_INFO.title,
      "description": PROFESSIONAL_INFO.bio,
      "alumniOf": "Universidad de Concepción",
      "hasCredential": PROFESSIONAL_INFO.credentials
    },
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": CONTACT_INFO.phone,
        "contactType": "customer service",
        "availableLanguage": "Spanish",
        "areaServed": "CL"
      },
      {
        "@type": "ContactPoint",
        "url": `https://wa.me/${CONTACT_INFO.whatsapp}`,
        "contactType": "customer service",
        "availableLanguage": "Spanish",
        "areaServed": "CL"
      }
    ],
    "medicalSpecialty": [
      "Audiology",
      "Speech-Language Pathology",
      "Hearing Diagnostics"
    ],
    "serviceType": "Audiological Services",
    "availableService": SERVICES.map(service => ({
      "@type": "MedicalProcedure",
      "name": service.name,
      "description": service.description,
      "procedureType": "Diagnostic",
      "duration": `PT${service.duration}M`,
      "price": service.price > 0 ? service.price : undefined,
      "priceCurrency": "CLP"
    })),
    "priceRange": "$10,000 - $15,000 CLP",
    "paymentAccepted": ["Cash", "Credit Card", "Debit Card"],
    "currenciesAccepted": "CLP",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Servicios de Audiología",
      "itemListElement": SERVICES.map((service, index) => ({
        "@type": "Offer",
        "position": index + 1,
        "itemOffered": {
          "@type": "Service",
          "name": service.name,
          "description": service.description
        },
        "price": service.price > 0 ? service.price : undefined,
        "priceCurrency": "CLP"
      }))
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "reviewCount": "3",
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": [
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "María González"
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5"
        },
        "reviewBody": "Excelente atención profesional. La videotoscopía me permitió ver exactamente qué estaba pasando en mis oídos. Muy recomendado."
      }
    ]
  };

  // Service-specific schema
  const getServiceSchema = (serviceId: string) => {
    const service = SERVICES.find(s => s.id === serviceId);
    if (!service) return null;

    return {
      "@context": "https://schema.org",
      "@type": "MedicalProcedure",
      "name": service.name,
      "description": service.description,
      "procedureType": "Diagnostic",
      "duration": `PT${service.duration}M`,
      "price": service.price > 0 ? service.price : undefined,
      "priceCurrency": "CLP",
      "provider": {
        "@type": "MedicalOrganization",
        "name": SITE_CONFIG.name,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": CONTACT_INFO.address.street,
          "addressLocality": CONTACT_INFO.address.city,
          "addressRegion": CONTACT_INFO.address.region,
          "addressCountry": "CL"
        }
      },
      "preparation": service.preparation || [],
      "followup": service.aftercare || [],
      "bodyLocation": "Ear",
      "category": "Audiology"
    };
  };

  // FAQ Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "¿Es doloroso el lavado de oídos?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No, el procedimiento es completamente indoloro. Utilizamos técnicas profesionales y equipamiento especializado para garantizar tu comodidad durante todo el proceso."
        }
      },
      {
        "@type": "Question",
        "name": "¿Cuánto tiempo dura cada procedimiento?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "La videotoscopía toma aproximadamente 20 minutos, el lavado de oídos 30 minutos, y la audiometría completa 45 minutos. Siempre incluimos tiempo para explicar los resultados."
        }
      },
      {
        "@type": "Question",
        "name": "¿Qué incluye la videotoscopía?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "La videotoscopía incluye exploración visual completa del canal auditivo, registro fotográfico del procedimiento, explicación detallada de hallazgos y recomendaciones profesionales."
        }
      }
    ]
  };

  // Website schema
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": SITE_CONFIG.name,
    "description": SITE_CONFIG.description,
    "url": SITE_CONFIG.url,
    "publisher": {
      "@type": "Organization",
      "name": SITE_CONFIG.name
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${SITE_CONFIG.url}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };

  const getSchema = () => {
    switch (type) {
      case 'service':
        return serviceId ? getServiceSchema(serviceId) : organizationSchema;
      case 'faq':
        return faqSchema;
      case 'organization':
      default:
        return [organizationSchema, websiteSchema];
    }
  };

  const schema = getSchema();
  
  if (!schema) return null;

  return (
    <Script
      id={`structured-data-${type}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(Array.isArray(schema) ? schema : [schema])
      }}
    />
  );
}