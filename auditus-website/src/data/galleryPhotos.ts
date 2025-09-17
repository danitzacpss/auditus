export interface GalleryPhoto {
  id: string;
  title: string;
  description: string;
  category: 'reception' | 'consultation' | 'equipment' | 'treatment' | 'facilities';
  thumbnail: string;
  medium: string;
  large: string;
  alt: string;
  aspectRatio: '3:4' | '4:3' | '16:9';
}

export const galleryPhotos: GalleryPhoto[] = [
  {
    id: 'dsc05933',
    title: 'Recepción Principal',
    description: 'Área de recepción moderna y acogedora',
    category: 'reception',
    thumbnail: '/images/gallery/thumbnails/DSC05933.jpg',
    medium: '/images/gallery/medium/DSC05933.jpg',
    large: '/images/gallery/large/DSC05933.jpg',
    alt: 'Área de recepción principal de Centro Auditus con diseño moderno y acogedor',
    aspectRatio: '3:4'
  },
  {
    id: 'dsc05956',
    title: 'Sala de Consulta',
    description: 'Ambiente privado y profesional para consultas',
    category: 'consultation',
    thumbnail: '/images/gallery/thumbnails/DSC05956.jpg',
    medium: '/images/gallery/medium/DSC05956.jpg',
    large: '/images/gallery/large/DSC05956.jpg',
    alt: 'Sala de consulta privada con equipamiento profesional para evaluaciones auditivas',
    aspectRatio: '4:3'
  },
  {
    id: 'dsc05981',
    title: 'Equipo de Audiometría',
    description: 'Tecnología avanzada para evaluaciones precisas',
    category: 'equipment',
    thumbnail: '/images/gallery/thumbnails/DSC05981.jpg',
    medium: '/images/gallery/medium/DSC05981.jpg',
    large: '/images/gallery/large/DSC05981.jpg',
    alt: 'Equipo de audiometría profesional para evaluaciones auditivas precisas',
    aspectRatio: '3:4'
  },
  {
    id: 'dsc05991',
    title: 'Área de Tratamiento',
    description: 'Espacio especializado para procedimientos',
    category: 'treatment',
    thumbnail: '/images/gallery/thumbnails/DSC05991.jpg',
    medium: '/images/gallery/medium/DSC05991.jpg',
    large: '/images/gallery/large/DSC05991.jpg',
    alt: 'Área de tratamiento especializada con equipamiento médico profesional',
    aspectRatio: '4:3'
  },
  {
    id: 'dsc05998',
    title: 'Instalaciones Modernas',
    description: 'Ambiente profesional y tecnológico',
    category: 'facilities',
    thumbnail: '/images/gallery/thumbnails/DSC05998.jpg',
    medium: '/images/gallery/medium/DSC05998.jpg',
    large: '/images/gallery/large/DSC05998.jpg',
    alt: 'Instalaciones modernas del centro con tecnología de última generación',
    aspectRatio: '3:4'
  },
  {
    id: 'dsc06009',
    title: 'Sala de Procedimientos',
    description: 'Espacio equipado para tratamientos especializados',
    category: 'treatment',
    thumbnail: '/images/gallery/thumbnails/DSC06009.jpg',
    medium: '/images/gallery/medium/DSC06009.jpg',
    large: '/images/gallery/large/DSC06009.jpg',
    alt: 'Sala de procedimientos equipada con tecnología especializada para tratamientos auditivos',
    aspectRatio: '4:3'
  },
  {
    id: 'dsc06077',
    title: 'Ambiente Profesional',
    description: 'Instalaciones diseñadas para el bienestar del paciente',
    category: 'facilities',
    thumbnail: '/images/gallery/thumbnails/DSC06077.jpg',
    medium: '/images/gallery/medium/DSC06077.jpg',
    large: '/images/gallery/large/DSC06077.jpg',
    alt: 'Ambiente profesional y acogedor diseñado para el confort del paciente',
    aspectRatio: '3:4'
  }
];