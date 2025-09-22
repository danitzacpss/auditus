import type { ContactInfo, Professional, Service, NavItem, Testimonial, PressArticle } from '@/types';

export const SITE_CONFIG = {
  name: 'Centro Auditus',
  description: 'Centro especializado en diagnóstico y cuidado auditivo profesional en Concepción. Servicios de fonoaudiología con tecnología avanzada y atención personalizada.',
  url: 'https://centroauditus.cl',
  author: 'Valeska Campos Sovino',
  keywords: [
    'fonoaudiología',
    'audiometría',
    'lavado de oídos',
    'videotoscopía',
    'diagnóstico auditivo',
    'Concepción',
    'audiología',
    'cuidado auditivo',
    'centro médico',
    'salud auditiva'
  ] as string[],
} as const;

export const CONTACT_INFO: ContactInfo = {
  phone: '+56952024377',
  whatsapp: '56952024377',
  email: 'valecampossovino@gmail.com',
  address: {
    street: 'Aníbal Pinto 486',
    office: 'Oficina 403',
    city: 'Concepción',
    region: 'Región del Biobío',
    postalCode: '4030000'
  },
  hours: {
    weekdays: 'Lunes a Viernes: 9:00 - 18:00',
    saturday: 'Sábado: 9:00 - 13:00',
    sunday: 'Domingo: Cerrado'
  },
  social: {
    instagram: '@valefonoaudiologa',
    facebook: 'Centro Auditus Concepción'
  },
  calendarBooking: 'https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ05fQMTlAW4u0fp-eqo8Cty4Oyvu08ydGoj6-D66lXq1kGWOmDS8ht4JTvhu_Va9SNXnMvKOir7'
};

export const PROFESSIONAL_INFO: Professional = {
  name: 'Valeska Campos Sovino',
  title: 'Fonoaudióloga Especialista',
  credentials: [
    'Fonoaudióloga Universidad de Concepción',
    'Especialista en Audiología Diagnóstica',
    'Registro Nacional de Prestadores Individuales'
  ],
  experience: 'Más de 5 años de experiencia en diagnóstico auditivo',
  education: [
    'Licenciatura en Fonoaudiología - Universidad de Concepción',
    'Diplomado en Audiología Avanzada',
    'Certificación en Videotscopía Diagnóstica'
  ],
  specializations: [
    'Diagnóstico audiológico integral',
    'Evaluación de la función auditiva',
    'Procedimientos de limpieza auditiva',
    'Asesoría en salud auditiva preventiva'
  ],
  bio: 'Fonoaudióloga titulada de la Universidad de Concepción con amplia experiencia en el diagnóstico y cuidado de la salud auditiva. Mi compromiso es brindar atención profesional de calidad, utilizando tecnología moderna y procedimientos seguros para el bienestar de mis pacientes.'
};

// Array of all professionals for scalability
export const PROFESSIONALS: (Professional & { 
  id: string; 
  slug: string; 
  photo?: string; 
  yearsExperience: number;
  satisfaction: number;
})[] = [
  {
    id: 'valeska-campos',
    slug: 'valeska-campos-sovino',
    name: 'Valeska Campos Sovino',
    title: 'Fonoaudióloga Especialista',
    yearsExperience: 5,
    satisfaction: 100,
    credentials: [
      'Fonoaudióloga Universidad de Concepción',
      'Especialista en Audiología Diagnóstica', 
      'Registro Nacional de Prestadores Individuales'
    ],
    experience: 'Más de 5 años de experiencia en diagnóstico auditivo',
    education: [
      'Licenciatura en Fonoaudiología - Universidad de Concepción',
      'Diplomado en Audiología Avanzada',
      'Certificación en Videotoscopía Diagnóstica'
    ],
    specializations: [
      'Diagnóstico audiológico integral',
      'Evaluación de la función auditiva',
      'Procedimientos de limpieza auditiva',
      'Asesoría en salud auditiva preventiva'
    ],
    bio: 'Fonoaudióloga titulada de la Universidad de Concepción con amplia experiencia en el diagnóstico y cuidado de la salud auditiva. Mi compromiso es brindar atención profesional de calidad, utilizando tecnología moderna y procedimientos seguros para el bienestar de mis pacientes.'
  }
];

export const SERVICES: Service[] = [
  {
    id: 'videotoscopia',
    name: 'Videotoscopía',
    description: 'Exploración visual completa del canal auditivo externo utilizando tecnología de video de alta resolución.',
    price: 10000,
    duration: 20,
    slug: 'videotoscopia',
    features: [
      'Visualización en tiempo real del oído',
      'Detección temprana de problemas',
      'Registro fotográfico del procedimiento',
      'Explicación detallada de hallazgos'
    ],
    preparation: [
      'No usar cotonitos 24 horas antes',
      'Evitar gotas óticas el día anterior',
      'Informar sobre alergias o sensibilidades'
    ],
    aftercare: [
      'Mantener oídos secos por 24 horas',
      'Seguir recomendaciones específicas',
      'Contactar ante cualquier molestia'
    ]
  },
  {
    id: 'lavado-oidos',
    name: 'Lavado de Oídos',
    description: 'Remoción segura y profesional de cerumen mediante técnicas especializadas y equipamiento adecuado.',
    price: 15000,
    duration: 30,
    slug: 'lavado-de-oidos',
    features: [
      'Procedimiento seguro y sin dolor',
      'Evaluación previa con videotoscopía',
      'Técnicas profesionales especializadas',
      'Seguimiento post-procedimiento'
    ],
    preparation: [
      'Aplicar gotas reblandecedoras si se indica',
      'No intentar limpieza casera previa',
      'Informar sobre cirugías previas del oído'
    ],
    aftercare: [
      'Mantener oídos secos por 48 horas',
      'Evitar introducir objetos en el oído',
      'Aplicar gotas si se prescribe'
    ]
  },
  {
    id: 'audiometria',
    name: 'Audiometría',
    description: 'Evaluación completa de la capacidad auditiva mediante pruebas especializadas para detectar pérdidas auditivas.',
    price: 0, // Precio por determinar
    duration: 45,
    slug: 'audiometria',
    features: [
      'Evaluación completa de la audición',
      'Pruebas en cabina audiométrica',
      'Audiograma detallado',
      'Recomendaciones profesionales',
      'Logoaudiometría',
      'Pruebas supraliminares'
    ],
    preparation: [
      'Descansar bien la noche anterior',
      'Evitar exposición a ruidos intensos 24h antes',
      'No usar tapones auditivos el día del examen'
    ],
    aftercare: [
      'Recibir informe detallado de resultados',
      'Seguir recomendaciones específicas',
      'Programar seguimiento si es necesario'
    ]
  }
];

export const NAVIGATION: NavItem[] = [
  {
    label: 'Inicio',
    href: '/'
  },
  {
    label: 'Servicios',
    href: '/servicios',
    children: [
      { label: 'Videotoscopía', href: '/servicios/videotoscopia' },
      { label: 'Lavado de Oídos', href: '/servicios/lavado-de-oidos' },
      { label: 'Audiometría', href: '/servicios/audiometria' }
    ]
  },
  {
    label: 'Nosotros',
    href: '/nosotros'
  },
  {
    label: 'Contacto',
    href: '/contacto'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'María González',
    content: 'Excelente atención profesional. La videotoscopía me permitió ver exactamente qué estaba pasando en mis oídos. Muy recomendado.',
    rating: 5,
    date: '2024-08-15',
    service: 'Videotoscopía',
    verified: true
  },
  {
    id: '2',
    name: 'Carlos Mendoza',
    content: 'El lavado de oídos fue rápido y sin molestias. La doctora explica todo muy bien y el lugar es muy limpio y profesional.',
    rating: 5,
    date: '2024-08-10',
    service: 'Lavado de Oídos',
    verified: true
  },
  {
    id: '3',
    name: 'Ana Rodríguez',
    content: 'Atención de primera calidad. Me sentí muy cómoda durante todo el procedimiento. Los resultados fueron excelentes.',
    rating: 5,
    date: '2024-07-28',
    service: 'Audiometría',
    verified: true
  }
];

// Pricing rules and special conditions
export const PRICING_RULES = {
  combinedServices: {
    videotoscopiaAndCleaning: {
      description: 'Si se realiza lavado de oídos, la videotoscopía está incluida',
      finalPrice: 15000,
      applies: ['videotoscopia', 'lavado-oidos']
    }
  },
  discounts: {
    senior: {
      description: 'Descuento para adultos mayores (65+)',
      percentage: 10,
      requiresVerification: true
    }
  }
} as const;

// FAQ Data
export const FAQ_DATA = [
  {
    question: '¿Es doloroso el lavado de oídos?',
    answer: 'No, el procedimiento es completamente indoloro. Utilizamos técnicas profesionales y equipamiento especializado para garantizar tu comodidad durante todo el proceso.'
  },
  {
    question: '¿Cuánto tiempo dura cada procedimiento?',
    answer: 'La videotoscopía toma aproximadamente 20 minutos, el lavado de oídos 30 minutos, y la audiometría completa 45 minutos. Siempre incluimos tiempo para explicar los resultados.'
  },
  {
    question: '¿Necesito alguna preparación especial?',
    answer: 'Cada servicio tiene preparaciones específicas. Te enviaremos las instrucciones detalladas al confirmar tu cita. Generalmente incluyen evitar cotonitos y seguir indicaciones sobre gotas óticas.'
  },
  {
    question: '¿Qué incluye la videotoscopía?',
    answer: 'La videotoscopía incluye exploración visual completa del canal auditivo, registro fotográfico del procedimiento, explicación detallada de hallazgos y recomendaciones profesionales.'
  },
  {
    question: '¿Atienden con convenios o seguros?',
    answer: 'Consulta por convenios específicos. Aceptamos múltiples formas de pago y podemos proporcionar la documentación necesaria para reembolsos de seguros privados.'
  }
];

// Business hours in different formats
export const BUSINESS_HOURS = {
  formatted: {
    monday: '09:00 - 18:00',
    tuesday: '09:00 - 18:00',
    wednesday: '09:00 - 18:00',
    thursday: '09:00 - 18:00',
    friday: '09:00 - 18:00',
    saturday: '09:00 - 13:00',
    sunday: 'Cerrado'
  },
  structured: [
    { day: 'Lunes', open: '09:00', close: '18:00' },
    { day: 'Martes', open: '09:00', close: '18:00' },
    { day: 'Miércoles', open: '09:00', close: '18:00' },
    { day: 'Jueves', open: '09:00', close: '18:00' },
    { day: 'Viernes', open: '09:00', close: '18:00' },
    { day: 'Sábado', open: '09:00', close: '13:00' },
    { day: 'Domingo', open: null, close: null }
  ]
} as const;

// Press articles and media coverage
export const PRESS_ARTICLES: PressArticle[] = [
  {
    id: 'canal9-ruidos-intensos',
    title: 'Los riesgos de exponer a bebés y niños pequeños a ruidos de alta intensidad',
    publication: 'Canal 9',
    date: '2025-08-19',
    url: 'https://www.canal9.cl/episodios/nuestra-casa/2025/08/19/tras-incidente-en-concierto-de-maluma-los-riesgos-de-exponer-a-bebes-y-ninos-pequenos-a-ruidos-de-alta-intensidad',
    description: 'Tras incidente en concierto de Maluma, analizamos los riesgos auditivos en menores expuestos a sonidos de alta intensidad y la importancia de la protección auditiva desde temprana edad.',
    category: 'awareness'
  },
  {
    id: 'canal9-perdida-auditiva-demencia',
    title: 'Conoce la relación entre la pérdida auditiva y el incremento en la posibilidad de padecer demencia',
    publication: 'Canal 9',
    date: '2025-06-09',
    url: 'https://www.canal9.cl/episodios/nuestra-casa/2025/06/09/conoce-la-relacion-entre-la-perdida-auditiva-y-el-incremento-en-la-posibilidad-de-padecer-demencia',
    description: 'Exploramos la conexión científica entre la pérdida auditiva no tratada y el mayor riesgo de desarrollar demencia, destacando la importancia del diagnóstico temprano.',
    category: 'health'
  }
];